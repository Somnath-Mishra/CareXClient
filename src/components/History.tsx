import { useEffect, useState } from "react";
import { modeEnum } from "./Appointment";
import { appointmentService } from "../utils/appointment.service";
import { Button, PDFView } from "./index";

interface appointmentHistory {
  appointmentId: string;
  doctorName: string;
  patientName: string;
  startTime: string;
  EndTime: string;
  location: string;
  mode: keyof modeEnum;
  prescription: string;
}

function History() {
  const [appointments, setAppointments] = useState<appointmentHistory[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleViewClick = (pdfLink: string) => {
    setPdfUrl(pdfLink);
    setShowPdf(true);
  };

  const handleCloseClick = () => {
    setPdfUrl("");
    setShowPdf(false);
  };

  const downloadPDF = (pdfUrl: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "prescription.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    appointmentService
      .getAppointmentHistory()
      .then((res) => {
        setAppointments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  });
  return (
    <div>
      {!showPdf && appointments && <h1>Appointment History</h1>}
      {!showPdf && loading && <p>Loading...</p>}
      {!showPdf &&
        appointments &&
        appointments.map((appointment) => {
          return (
            <div key={appointment.appointmentId}>
              <p>Doctor Name: {appointment.doctorName}</p>
              <p>Patient Name: {appointment.patientName}</p>
              <p>Start Time: {appointment.startTime}</p>
              <p>End Time: {appointment.EndTime}</p>
              <p>Location: {appointment.location}</p>
              <p>mode: {appointment.mode}</p>
              <Button
                children="View Prescription"
                onClick={() => handleViewClick(appointment.prescription)}
              />
              <Button
                children="Download Prescription"
                onClick={() => downloadPDF(appointment.prescription)}
              />
            </div>
          );
        })}
      {showPdf && (
        <>
          <Button children="Close" onClick={handleCloseClick} />
          <PDFView pdfLink={pdfUrl} />
          <Button children="Download" onClick={() => downloadPDF(pdfUrl)} />
        </>
      )}
      {appointments.length === 0 && <p>No appointment history</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default History;
