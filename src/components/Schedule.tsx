import React, { useCallback, useEffect, useState } from "react";
import { scheduleService } from "../utils/schedule.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "./index";
import useRazorpay from "react-razorpay";
import { paymentService } from "../utils/payment.service";
import { conf } from "../conf/conf";
import { userService } from "../utils/user.service";
import { appointmentService } from "../utils/appointment.service";
// import { set } from "react-hook-form";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

interface Mode {
  online: "online";
  offline: "offline";
}

interface ScheduleDetailsInterface {
  _id: string;
  startTime: string;
  endTime: string;
  mode: keyof Mode;
  location: string;
}

// const stripePromise = loadStripe(conf.stripePublicApiKey);

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleDetailsInterface[]>(
    []
  );
  const navigate = useNavigate();
  const Razorpay = useRazorpay();
  const userId = useSelector((state: RootState) => state.user.userData?.userId);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error,setError]=useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const visitFees = useSelector((state: RootState) => state.schedule.visitFees);
  const doctorId = useSelector((state: RootState) => state.schedule.doctorId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.getCurrentUserDetails();
        setUserName(response.data.data.userName);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
      } catch (error) {
        setError(error.message);
        console.error(`Error fetching user details: ${error}`);
      }
    };

    const fetchSchedule = async () => {
      try {
        const response = await scheduleService.getSchedules(doctorId);
        const scheduleDetails = response.data.data;
        if (scheduleDetails) {
          if (scheduleDetails.mode === "online") {
            scheduleDetails.location = "will be assigned Google Meet link";
          }
          setSchedule(scheduleDetails);
        } else {
          setError(error.message);
          navigate(`
            /user/doctorList`);
        }
      } catch (error) {
        console.error(`Error fetching schedule: ${error}`);
      }
    };
    setError("");
    fetchUserData();
    fetchSchedule();
    setLoading(false);
  }, [doctorId, navigate, userId]);

  const handlePaymentByRazorPay = useCallback(
    async (visitFees: number, scheduleId: string) => {
      try {
        const order = await paymentService.makePaymentByRazorPay(
          visitFees,
          doctorId
        );
        const options = {
          key: conf.razorPayKeyId,
          amount: order.data.data.paymentDetails.amount,
          currency: order.data.data.paymentDetails.currency,
          name: "CareX",
          description: "Appointment Booking",
          order_id: order.data.data.paymentDetails.paymentReferrence,
          prefill: {
            name: userName,
            email: email,
            contact: phone,
          },
          handler: async (response: any) => {
            const verify = await paymentService.verifyPaymentByRazorPay(
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            if (verify.data.success) {
              bookSchedule(scheduleId, order.data.data.paymentDetails._id);
            }
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        setError(error.message);
        console.error(`Error during payment: ${error}`);
      }
    },
    [Razorpay]
  );

  // const handlePaymentByStripe = useCallback(
  //   async (visitFees: number, scheduleId: string) => {
  //     try {
  //       const stripe = await stripePromise;
  //       const checkoutSession = await paymentService.makePaymentByStripe(
  //         visitFees,
  //         stripe?.createToken,
  //         doctorId,
  //       );
  //       const result = await stripe?.redirectToCheckout({
  //         sessionId: checkoutSession.data.data.sessionId,
  //       });
  //       if (result?.error) {
  //         console.error(result.error.message);
  //       } else {
  //         bookSchedule(scheduleId, checkoutSession.data.data.id);
  //       }
  //     } catch (error) {
  //       console.error(`Error during payment: ${error}`);
  //     }
  //   },
  //   []
  // );

  const bookSchedule = async (scheduleId: string, paymentId: string) => {
    try {
      setLoading(true);
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = Intl.DateTimeFormat().resolvedOptions().locale;
      console.log(doctorId, scheduleId, paymentId, timeZone, country);

      if (!doctorId || !scheduleId || !paymentId || !timeZone || !country) {
        console.error(`Error booking schedule: Invalid data`);
        return;
      }
      await appointmentService.createAppointment({
        doctorId,
        scheduleId,
        paymentId,
        timeZone,
        country,
      });
      setLoading(false);
      navigate(`/user`);
    } catch (error) {
      setError(error.message||"Error in bookSchedule() in Schedule.tsx");
      console.error(`Error booking schedule: ${error}`);
    }
  };
  // if(error){
  //   return <h4>{error}</h4>;
  // }
  // if(loading){
  //   return <h4>Loading...</h4>;
  // }

  
  return (
    <div>
      {error && <h4>{error}</h4>}
      {loading && <p>Loading...</p>}
      {!loading && schedule.length === 0 && <h4>No schedule found</h4>}
      {schedule &&
        schedule.map((schedule) => (
          <div key={schedule._id}>
            <h4>Start Time: {schedule.startTime}</h4>
            <h4>End Time: {schedule.endTime}</h4>
            <h4>Mode: {schedule.mode}</h4>
            <h4>Location: {schedule.location}</h4>
            <Button
              children={<h4>Pay $ {visitFees / 100} with Razorpay</h4>}
              onClick={() =>
                handlePaymentByRazorPay(visitFees / 100, schedule._id)
              }
            />
          </div>
        ))}
      {error && <h4>{error}</h4>}
    </div>
  );
};

export default Schedule;
