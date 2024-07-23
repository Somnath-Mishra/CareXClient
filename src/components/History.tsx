import { useEffect, useState } from "react";
import { appointmentService } from "../utils/appointment.service";
import { Button, PDFView, Input, Loading } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";

enum ModeEnum {
  online = "online",
  offline = "offline",
}

interface PrescriptionInterface {
  prescription: FileList;
}

interface AppointmentHistory {
  _id: string;
  doctorFirstName: string;
  doctorLastName: string;
  patientFirstName: string;
  patientLastName: string;
  startTime: string;
  endTime: string;
  location: string;
  mode: keyof typeof ModeEnum;
  prescription: string;
}

const History: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentHistory[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [showPdf, setShowPdf] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const userRole = useSelector((state: RootState) => state.user.role);
  const { handleSubmit, register } = useForm<PrescriptionInterface>();

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

  const bringUploadPrescription = (id: string) => {
    setAppointmentId(id);
    setShowUpload(true);
  };

  const uploadPrescription: SubmitHandler<PrescriptionInterface> = (data) => {
    setLoading(true);
    setError("");
    appointmentService
      .addPrescription(appointmentId, data.prescription[0])
      .then(() => {
        alert("Prescription Upload Successful");
        setShowUpload(false);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    appointmentService
      .getAppointmentHistory()
      .then((res) => {
        setAppointments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {!showPdf && <h1>Appointment History</h1>}
      {loading && <Loading />}
      {!loading && appointments.length === 0 && <p>No appointment history</p>}
      {!loading &&
        appointments.map((appointment) => (
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
            <p>End Time: {appointment.endTime}</p>
            <p>Location: {appointment.location}</p>
            <p>Mode: {appointment.mode}</p>
            {appointment.prescription && userRole === "user" && (
              <>
                <Button
                  onClick={() => handleViewClick(appointment.prescription)}
                >
                  View Prescription
                </Button>
                <Button onClick={() => downloadPDF(appointment.prescription)}>
                  Download Prescription
                </Button>
              </>
            )}
            {userRole === "doctor" && (
              <>
                <Button
                  onClick={() => bringUploadPrescription(appointment._id)}
                >
                  Upload Prescription
                </Button>
                <Button
                  onClick={() => handleViewClick(appointment.prescription)}
                >
                  View Prescription
                </Button>
              </>
            )}
          </div>
        ))}
      {showPdf && (
        <>
          <Button onClick={handleCloseClick}>Close</Button>
          <PDFView pdfLink={pdfUrl} />
          <Button onClick={() => downloadPDF(pdfUrl)}>Download</Button>
        </>
      )}
      {error && <p className="text-red-600">{error}</p>}
      {showUpload && (
        <>
          <form onSubmit={handleSubmit(uploadPrescription)}>
            <Input
              label="Upload Prescription"
              type="file"
              accept="application/pdf"
              {...register("prescription", { required: true })}
            />
            <Button type="submit">Upload</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default History;
