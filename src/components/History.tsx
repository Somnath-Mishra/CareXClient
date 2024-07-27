
import React, { useEffect, useState } from "react";
import { appointmentService } from "../utils/appointment.service";
import { Button, PDFView, Input } from "./index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";

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
    link.target = "_blank";
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
      .then((response) => {
        console.log(response);
        const updatedAppointments = response.data.data;
        const index = appointments.findIndex(
          (appointment) => appointment._id === updatedAppointments._id
        );
        appointments[index] = updatedAppointments;
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
    setLoading(true);
    appointmentService
      .getAppointmentHistory()
      .then((res) => {
        const appointmentsHistory = res.data.data;
        console.log(appointmentsHistory);
        setAppointments(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md">
      {!showPdf && (
        <Typography variant="h4" gutterBottom>
          Appointment History
        </Typography>
      )}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && appointments.length === 0 && (
        <Typography>No appointment history</Typography>
      )}
      {!loading &&
        !showPdf &&
        !showUpload &&
        appointments &&
        appointments.length > 0 &&
        appointments.map((appointment) => (
          <Card key={appointment._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>
                Doctor Name: {appointment.doctorFirstName}{" "}
                {appointment.doctorLastName}
              </Typography>
              <Typography>
                Patient Name: {appointment.patientFirstName}{" "}
                {appointment.patientLastName}
              </Typography>
              <Typography>Start Time: {appointment.startTime}</Typography>
              <Typography>End Time: {appointment.endTime}</Typography>
              <Typography>Location: {appointment.location}</Typography>
              <Typography>Mode: {appointment.mode}</Typography>
              {appointment.prescription &&
                appointment.prescription.length > 0 &&
                userRole === "user" && (
                  <CardActions>
                    <Button
                      onClick={() => handleViewClick(appointment.prescription)}
                    >
                      View Prescription
                    </Button>
                    <Button
                      onClick={() => downloadPDF(appointment.prescription)}
                    >
                      Download Prescription
                    </Button>
                  </CardActions>
                )}
              {(!appointment.prescription ||
                appointment.prescription.length === 0) &&
                userRole === "user" && (
                  <Typography>
                    Prescription will be uploaded soon....
                  </Typography>
                )}
              {userRole === "doctor" && (
                <CardActions>
                  <Button
                    onClick={() => bringUploadPrescription(appointment._id)}
                  >
                    Upload Prescription
                  </Button>
                  {appointment.prescription &&
                    appointment.prescription.length > 0 && (
                      <Button
                        onClick={() =>
                          handleViewClick(appointment.prescription)
                        }
                      >
                        View Prescription
                      </Button>
                    )}
                </CardActions>
              )}
            </CardContent>
          </Card>
        ))}
      {showPdf && !showUpload && (
        <>
          <Button onClick={handleCloseClick}>Close</Button>
          <PDFView pdfLink={pdfUrl} />
          <Button onClick={() => downloadPDF(pdfUrl)}>Download</Button>
        </>
      )}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {showUpload && !showPdf && (
        <Box>
          <form onSubmit={handleSubmit(uploadPrescription)}>
            <Input
              label="Upload Prescription"
              type="file"
              accept="application/pdf"
              {...register("prescription", { required: true })}
            />
            <Button type="submit">Upload</Button>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default History;
