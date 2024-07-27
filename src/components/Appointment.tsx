// import  { useEffect, useState } from "react";
// import { appointmentService } from "../utils/appointment.service";
// import { Button, Calendar, Loading } from "./index";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// enum modeEnum {
//   online,
//   offline,
// }

// interface appointmentInterface {
//   _id: string;
//   doctorFirstName: string;
//   doctorLastName: string;
//   patientFirstName: string;
//   patientLastName: string;
//   startTime: string;
//   endTime: string;
//   location: string;
//   mode: keyof modeEnum;
// }

// function Appointment() {
//   const [appointments, setAppointments] = useState<appointmentInterface[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const userRole = useSelector((state: RootState) => state.user.role);

//   useEffect(() => {
//     setError(null);
//     appointmentService
//       .getUpcomingAppointmentDetails()
//       .then((res) => {
//         console.log(res);
//         if (res.data.data.length > 0) setAppointments(res.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message); // Ensure the error message is a string
//         setLoading(false);
//         console.error(err);
//       });
//   }, []);

//   const cancelAppointment = async (id: string) => {
//     setError("");
//     setLoading(true);
//     appointmentService
//       .cancelAppointment(id)
//       .then(() => {
//         setError("");
//         setAppointments(
//           appointments.filter((appointment) => appointment._id !== id)
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message); // Ensure the error message is a string
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       {loading && <Loading/>}
//       {appointments.length > 0 && <h3>Upcoming appointments</h3>}
//       {appointments.length > 0 && <Calendar userRole={userRole} />}
//       {appointments.length > 0 &&
//         appointments.map((appointment) => (
//           <div key={appointment._id}>
//             <p>
//               Doctor Name: {appointment.doctorFirstName}{" "}
//               {appointment.doctorLastName}
//             </p>
//             <p>
//               Patient Name: {appointment.patientFirstName}{" "}
//               {appointment.patientLastName}
//             </p>
//             <p>Start Time: {appointment.startTime}</p>
//             <p>End Time: {appointment.endTime}</p>
//             <p>Location: {appointment.location}</p>
//             <p>Mode: {appointment.mode}</p>
//             <Button
//               children="Cancel Appointment"
//               onClick={() => {
//                 cancelAppointment(appointment._id);
//               }}
//             />
//           </div>
//         ))}
//       {appointments.length === 0 && <p>No upcoming appointments</p>}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Appointment;
import { useEffect, useState } from "react";
import { appointmentService } from "../utils/appointment.service";
import { Button, Calendar, Loading } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

enum modeEnum {
  online,
  offline,
}

interface appointmentInterface {
  _id: string;
  doctorFirstName: string;
  doctorLastName: string;
  patientFirstName: string;
  patientLastName: string;
  startTime: string;
  endTime: string;
  location: string;
  mode: keyof modeEnum;
}

function Appointment() {
  const [appointments, setAppointments] = useState<appointmentInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userRole = useSelector((state: RootState) => state.user.role);

  useEffect(() => {
    setError(null);
    appointmentService
      .getUpcomingAppointmentDetails()
      .then((res) => {
        console.log(res);
        if (res.data.data.length > 0) setAppointments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Ensure the error message is a string
        setLoading(false);
        console.error(err);
      });
  }, []);

  const cancelAppointment = async (id: string) => {
    setError("");
    setLoading(true);
    appointmentService
      .cancelAppointment(id)
      .then(() => {
        setError("");
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Ensure the error message is a string
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      {loading && <Loading />}
      {appointments.length > 0 && (
        <h3 className="text-2xl font-semibold mb-4">Upcoming Appointments</h3>
      )}
      {appointments.length > 0 && <Calendar userRole={userRole} />}
      <div className="grid gap-4 mt-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <p className="mb-2">
              <span className="font-semibold">Doctor Name:</span>{" "}
              {appointment.doctorFirstName} {appointment.doctorLastName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Patient Name:</span>{" "}
              {appointment.patientFirstName} {appointment.patientLastName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Start Time:</span>{" "}
              {appointment.startTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold">End Time:</span>{" "}
              {appointment.endTime}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Location:</span>{" "}
              {appointment.location}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Mode:</span> {appointment.mode}
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                cancelAppointment(appointment._id);
              }}
            >
              Cancel Appointment
            </Button>
          </div>
        ))}
      </div>
      {appointments.length === 0 && (
        <p className="text-center text-gray-500">No upcoming appointments</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
}

export default Appointment;
