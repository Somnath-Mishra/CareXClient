import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {DoctorSuggestion} from '../components/index';
import { RootState } from '../redux/store';


function DoctorList() {

  const searchProblem=useSelector((state:RootState)=>state.searchProblem.searchProblem);
  const navigate=useNavigate();
  
  

  useEffect(()=>{
    
    if(searchProblem===undefined){
      navigate(`/problem`);
    }
  });

  return (
    <div>
      <DoctorSuggestion searchProblem={searchProblem}/>
    </div>
  )
}

export default DoctorList
