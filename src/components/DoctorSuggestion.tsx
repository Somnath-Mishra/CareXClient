import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../utils/user.service";
import { useDispatch } from "react-redux";
import { Button, Loading } from "./index";
import { setSchedule } from "../redux/slices/scheduleSlice";

interface DoctorSuggestionProps {
  searchProblem: string;
}

interface Doctor {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  address: string;
  instituteName: string;
  degree: string;
  specialization: Array<string>;
  visitFees: number;
}

const DoctorSuggestion: React.FC<DoctorSuggestionProps> = ({
  searchProblem,
}) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDoctorDetails = useCallback(() => {
    setLoading(true);
    userService
      .getDoctorDetailsByPatientProblems(searchProblem)
      .then((response) => {
        setDoctors(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [searchProblem]);

  const bookAppointment = (doctorId: string, visitFees: number) => {
    setLoading(true);
    try {
      dispatch(setSchedule({ doctorId, visitFees }));
      setLoading(false);
      navigate(`/user/schedule`);
    } catch (error) {
      setLoading(false);
      console.error(`Error occurred at bookAppointment() error: ${error}`);
    }
  };

  useEffect(() => {
    setError("");
    if (!searchProblem) {
      setLoading(false);
      navigate(`/user/problem`);
    } else {
      fetchDoctorDetails();
    }
  }, [searchProblem, navigate, fetchDoctorDetails]);

  return (
    <div>
      {error && <h4>{error}</h4>}
      {loading && <Loading />}
      {!loading && doctors.length === 0 && <h4>No doctors found</h4>}
      {doctors.map((doctor: Doctor) => (
        <div className="doctorDetails" key={doctor._id}>
          <div className="doctorName">
            <h3>
              Doctor Name: {doctor.firstName} {doctor.lastName}
            </h3>
          </div>
          <div>
            <h4>Degree: {doctor.degree}</h4>
          </div>
          <div className="doctorEducation">
            <h4>Institute Name: {doctor.instituteName}</h4>
          </div>
          <div>
            <h4>Address: {doctor.address}</h4>
          </div>
          <div className="specialization">
            {doctor.specialization &&
              doctor.specialization.length > 0 &&
              doctor.specialization.map((spec, index) => (
                <div key={index}>
                  <p>{spec}</p>
                </div>
              ))}
          </div>
          <div className="fees">
            <h5>{doctor.visitFees}</h5>
          </div>
          <Button onClick={() => bookAppointment(doctor._id, doctor.visitFees)}>
            Book Appointment
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DoctorSuggestion;
