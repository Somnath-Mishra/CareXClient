import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface DoctorSuggestionProps {
  searchProblem: string;
}

interface Doctor {
  _id: string;
  name: string;
  education: string;
  specialization: Array<string>;
  fees: number;
}

const DoctorSuggestion: React.FC<DoctorSuggestionProps> = ({ searchProblem }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const navigate = useNavigate();




  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get('/api/problem', { params: { searchResult: searchProblem } });
      setDoctors(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(`Error occurred at fetchData() error: ${error}`);
    }
  };

  useEffect(() => {
    if (searchProblem === undefined) {
      navigate(`user/${123}/problem`);
    }
    else {
      fetchDoctorDetails();
    }
  }, [searchProblem, navigate]);

  return (
    <div>
      {doctors.map((doctor: Doctor) => (
        <div className="doctorDetails" key={doctor._id}>
          <div className="doctorName" key={`${doctor._id}-${doctor.name}`}>
            <h3>{doctor.name}</h3>
          </div>
          <div className="doctorEducation" key={`${doctor._id}-${doctor.education}`}>
            <h4>{ doctor.education}</h4>
          </div>
          <div className="specialization" key={`${doctor._id}-${doctor.specialization}`}>
            {doctor.specialization && doctor.specialization.length && doctor.specialization.map((spec, index) => (
              <div key={index}>
                <p>{spec}</p>
              </div>
            ))}
          </div>
          <div className="fees" key={`${doctor._id}-${doctor.fees}`}>
            <h5>{ doctor.fees}</h5>
          </div>
          <button >Book Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorSuggestion;
