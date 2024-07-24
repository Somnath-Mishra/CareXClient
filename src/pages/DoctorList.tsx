import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Container, DoctorSuggestion} from '../components/index';
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
    <Container>
      <DoctorSuggestion searchProblem={searchProblem} />
    </Container>
  );
}

export default DoctorList
