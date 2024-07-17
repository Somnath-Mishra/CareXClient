import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom';
import DoctorSuggestion from '../components/DoctorSuggestion';
import { RootState } from '../redux/store';


function DoctorList() {

  const searchProblem=useSelector((state:RootState)=>state.searchProblem.searchProblem);
  const navigate=useNavigate();

  

  useEffect(()=>{
    if(searchProblem===undefined){
      navigate(`/user/${123}/problem`);
    }
  });

  return (
    <div>
      <DoctorSuggestion searchProblem={searchProblem}/>
    </div>
  )
}

export default DoctorList
