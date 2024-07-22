import { useEffect, useState } from "react";
import { modeEnum } from "./Appointment";
import { appointmentService } from "../utils/appointment.service";
import { Button, PDFView, Input } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useForm } from "react-hook-form";

interface appointmentHistory {
  _id: string;
  doctorFirstName: string;
  doctorLastName: string;
  patientFirstName: string;
  patientLastName: string;
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
  const [showUpload, setShowUpload] = useState(false);

  //This for upload prescription storing appointmentId
  const [appointmentId,setAppointmentId]=useState('');
  const userRole = useSelector((state: RootState) => state.user.role);
  const { handleSubmit, register } = useForm();

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

  const bringUploadPrescription = (id:string) => {
    setAppointmentId(id);
    setShowUpload(true);
  };

  const uploadPrescription=(data)=>{
    setLoading(true);
    setError('');
    appointmentService.addPrescription(appointmentId,data.prescription[0])
    .then(()=>{
      alert('Prescription Upload Successful');
      setShowUpload(false);
      setLoading(false);
    })
    .catch((error)=>{
      setError(error.message);
      setLoading(false);
      console.log(error);
    })
  }

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
            <div key={appointment._id}>
              <p>
                Doctor Name: {appointment.doctorFirstName}{" "}
                {appointment.doctorLastName}
              </p>
              <p>
                Patient Name: {appointment.patientFirstName}{" "}
                {appointment.patientLastName}
              </p>
              <p>Start Time: {appointment.startTime}</p>
              <p>End Time: {appointment.EndTime}</p>
              <p>Location: {appointment.location}</p>
              <p>mode: {appointment.mode}</p>
              {appointment.prescription && userRole === "user" && (
                <>
                  <Button
                    children="View Prescription"
                    onClick={() => handleViewClick(appointment.prescription)}
                  />
                  <Button
                    children="Download Prescription"
                    onClick={() => downloadPDF(appointment.prescription)}
                  />
                </>
              )}
              {userRole === "doctor" && (
                <>
                  <Button
                    children="Upload Prescription"
                    onClick={() => bringUploadPrescription(appointment._id)}
                  />
                  <Button
                    children="View Prescription"
                    onClick={() => handleViewClick(appointment.prescription)}
                  />
                </>
              )}
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
      {showUpload && (
        <>
          <form onSubmit={handleSubmit(uploadPrescription)}>
            <Input
              label="Upload Prescription"
              type="file"
              accept="application/pdf"
              {...register("prescription")}
            />
            <Button children="Upload" type="submit" />
          </form>
        </>
      )}
    </div>
  );
}

export default History;
