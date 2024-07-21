import React, { useEffect, useId, useState } from "react";
import { appointmentService } from "../utils/appointment.service";
import { Button } from "./index";

export enum modeEnum {
  online,
  offline,
}

interface appointmentInterface {
  appointmentId: string;
  doctorName: string;
  patientName: string;
  startTime: string;
  endTime: string;
  location: string;
  mode: keyof modeEnum;
}

function Appointment() {
  const [appointments, setAppointments] = useState<appointmentInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const id = useId();

  useEffect(() => {
    setError(null);
    appointmentService
      .getUpcomingAppointmentDetails()
      .then((res) => {
        setAppointments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error(err);
      });
  }, []);

  const cancelAppointment = async (id: string) => {
    setError("");
    setLoading(true);
    const response = await appointmentService.cancelAppointment(id);
    if (response.status === 200) {
      setError("");
      setLoading(false);
      setAppointments(
        appointments.filter((appointment) => appointment.appointmentId !== id)
      );
    } else {
      setError(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {appointments.length > 0 && <h3>Upcoming appointments</h3>}
      {appointments.length > 0 &&
        appointments.map((appointment) => (
          <div key={appointment.appointmentId}>
            <p key={id}>Doctor Name: {appointment.doctorName}</p>
            <p key={id}>Patient Name: {appointment.patientName}</p>
            <p key={id}>Start Time: {appointment.startTime}</p>
            <p key={id}>End Time: {appointment.endTime}</p>
            <p key={id}>Location: {appointment.location}</p>
            <p key={id}>Mode: {appointment.mode}</p>
            <Button
              key={id}
              children="Cancel Appointment"
              onClick={() => {
                cancelAppointment(appointment.appointmentId);
              }}
            />
          </div>
        ))}
      {appointments.length === 0 && <p>No upcoming appointments</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Appointment;
