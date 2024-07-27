// import React, { useCallback, useEffect, useState } from "react";
// import { scheduleService } from "../utils/schedule.service";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { Button, Loading } from "./index";
// import useRazorpay from "react-razorpay";
// import { paymentService } from "../utils/payment.service";
// import { conf } from "../conf/conf";
// import { userService } from "../utils/user.service";
// import { appointmentService } from "../utils/appointment.service";

// interface Mode {
//   online: "online";
//   offline: "offline";
// }

// interface ScheduleDetailsInterface {
//   _id: string;
//   startTime: string;
//   endTime: string;
//   mode: keyof Mode;
//   location: string;
// }

// const Schedule: React.FC = () => {
//   const [schedule, setSchedule] = useState<ScheduleDetailsInterface[]>([]);
//   const navigate = useNavigate();
//   const [Razorpay,isLoaded] = useRazorpay();
//   const userId = useSelector((state: RootState) => state.user.userId);
//   const [userName, setUserName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const visitFees = useSelector((state: RootState) => state.schedule.visitFees);
//   const doctorId = useSelector((state: RootState) => state.schedule.doctorId);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await userService.getCurrentUserDetails();
//         setUserName(response.data.data.userName);
//         setEmail(response.data.data.email);
//         setPhone(response.data.data.phone);
//       } catch (error: any) {
//         setError(error.message);
//         console.error(`Error fetching user details: ${error}`);
//       }
//     };

//     const fetchSchedule = async () => {
//       try {
//         const response = await scheduleService.getSchedules(doctorId);
//         const scheduleDetails = response.data.data;
//         if (scheduleDetails) {
//           scheduleDetails.forEach((schedule: ScheduleDetailsInterface) => {
//             if (schedule.mode === "online") {
//               schedule.location = "will be assigned Google Meet link";
//             }
//           });
//           setSchedule(scheduleDetails);
//         } else {
//           setError("No schedule details found");
//           navigate("/user/doctorList");
//         }
//       } catch (error: any) {
//         setError(error.message);
//         console.error(`Error fetching schedule: ${error}`);
//       }
//     };
//     setError("");
//     fetchUserData();
//     fetchSchedule();
//     setLoading(false);
//   }, [doctorId, navigate, userId]);

//   const handlePaymentByRazorPay = useCallback(
//     async (visitFees: number, scheduleId: string) => {
//       try {
//         const order = await paymentService.makePaymentByRazorPay(
//           visitFees,
//           doctorId
//         );
//         const options = {
//           key: conf.razorPayKeyId,
//           amount: order.data.data.paymentDetails.amount,
//           currency: order.data.data.paymentDetails.currency,
//           name: "CareX",
//           description: "Appointment Booking",
//           order_id: order.data.data.paymentDetails.paymentReferrence,
//           prefill: {
//             name: userName,
//             email: email,
//             contact: phone,
//           },
//           handler: async (response: any) => {
//             const verify = await paymentService.verifyPaymentByRazorPay(
//               response.razorpay_payment_id,
//               response.razorpay_signature
//             );
//             if (verify.data.success) {
//               bookSchedule(scheduleId, order.data.data.paymentDetails._id);
//             }
//           },
//         };
//         const paymentObject = new Razorpay(options);
//         paymentObject.open();
//       } catch (error: any) {
//         setError(error.message);
//         console.error(`Error during payment: ${error}`);
//       }
//     },
//     [Razorpay, doctorId, email, phone, userName]
//   );

//   const bookSchedule = async (scheduleId: string, paymentId: string) => {
//     try {
//       setLoading(true);
//       const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//       const country = Intl.DateTimeFormat().resolvedOptions().locale;
//       console.log(doctorId, scheduleId, paymentId, timeZone, country);

//       if (!doctorId || !scheduleId || !paymentId || !timeZone || !country) {
//         console.error(`Error booking schedule: Invalid data`);
//         return;
//       }
//       await appointmentService.createAppointment({
//         doctorId,
//         scheduleId,
//         paymentId,
//         timeZone,
//         country,
//       });
//       setLoading(false);
//       navigate(`/user`);
//     } catch (error: any) {
//       setError(error.message || "Error in bookSchedule() in Schedule.tsx");
//       console.error(`Error booking schedule: ${error}`);
//     }
//   };

//   useEffect(()=>{
//     if(isLoaded){
//       // handlePaymentByRazorPay()
//     }
//   },[isLoaded,handlePaymentByRazorPay])

//   return (
//     <div>
//       {error && <h4>{error}</h4>}
//       {loading && <Loading/>}
//       {!loading && schedule.length === 0 && <h4>No schedule found</h4>}
//       {schedule &&
//         schedule.map((schedule) => (
//           <div key={schedule._id}>
//             <h4>Start Time: {schedule.startTime}</h4>
//             <h4>End Time: {schedule.endTime}</h4>
//             <h4>Mode: {schedule.mode}</h4>
//             <h4>Location: {schedule.location}</h4>
//             <Button
//               children={<h4>Pay $ {visitFees / 100} with Razorpay</h4>}
//               onClick={() =>
//                 handlePaymentByRazorPay(visitFees / 100, schedule._id)
//               }
//             />
//           </div>
//         ))}
//       {error && <h4>{error}</h4>}
//     </div>
//   );
// };

// export default Schedule;
import React, { useCallback, useEffect, useState } from "react";
import { scheduleService } from "../utils/schedule.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Loading } from "./index";
import useRazorpay from "react-razorpay";
import { paymentService } from "../utils/payment.service";
import { conf } from "../conf/conf";
import { userService } from "../utils/user.service";
import { appointmentService } from "../utils/appointment.service";

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

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleDetailsInterface[]>([]);
  const navigate = useNavigate();
  const [Razorpay, isLoaded] = useRazorpay();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
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
      } catch (error: any) {
        setError(error.message);
        console.error(`Error fetching user details: ${error}`);
      }
    };

    const fetchSchedule = async () => {
      try {
        const response = await scheduleService.getSchedules(doctorId);
        const scheduleDetails = response.data.data;
        if (scheduleDetails) {
          scheduleDetails.forEach((schedule: ScheduleDetailsInterface) => {
            if (schedule.mode === "online") {
              schedule.location = "will be assigned Google Meet link";
            }
          });
          setSchedule(scheduleDetails);
        } else {
          setError("No schedule details found");
          navigate("/user/doctorList");
        }
      } catch (error: any) {
        setError(error.message);
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
        const paymentObject = new Razorpay(options);
        paymentObject.open();
      } catch (error: any) {
        setError(error.message);
        console.error(`Error during payment: ${error}`);
      }
    },
    [Razorpay, doctorId, email, phone, userName]
  );

  const bookSchedule = async (scheduleId: string, paymentId: string) => {
    try {
      setLoading(true);
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = Intl.DateTimeFormat().resolvedOptions().locale;

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
    } catch (error: any) {
      setError(error.message || "Error in bookSchedule() in Schedule.tsx");
      console.error(`Error booking schedule: ${error}`);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      // handlePaymentByRazorPay()
    }
  }, [isLoaded, handlePaymentByRazorPay]);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <Loading />}
      {!loading && schedule.length === 0 && (
        <p className="text-gray-500">No schedule found</p>
      )}
      {schedule.map((schedule) => (
        <div
          key={schedule._id}
          className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
        >
          <h4 className="text-xl font-semibold mb-2">
            Start Time: {schedule.startTime}
          </h4>
          <h4 className="text-xl font-semibold mb-2">
            End Time: {schedule.endTime}
          </h4>
          <h4 className="text-xl font-semibold mb-2">Mode: {schedule.mode}</h4>
          <h4 className="text-xl font-semibold mb-4">
            Location: {schedule.location}
          </h4>
          <Button
            children={
              <span className="text-lg font-medium">
                Pay ${visitFees / 100} with Razorpay
              </span>
            }
            onClick={() =>
              handlePaymentByRazorPay(visitFees / 100, schedule._id)
            }
            className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default Schedule;
