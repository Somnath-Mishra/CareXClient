import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchProblem } from '../redux/slices/searchProblemSlice';
import {  useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { userService } from '../utils/user.service';

interface Disease {
  name: string;
}

const SearchProblem: React.FC = () => {
  const [diseaseList, setDiseaseList] = useState<Disease[]>([]);
  const [query, setQuery] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const searchProblem=useSelector((state:RootState)=>state.searchProblem.searchProblem);

  const fetchData = async () => {
    userService.getAllDiseaseList().then((response) => {
      setDiseaseList(response.data);
    }).catch((error) => {
      console.log(`Error is occured at fetchData() error: ${error.message}`);
    });
  }



  useEffect(() => {
    fetchData();
  }, []);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  


  const onSearch = (searchItem: string) => {
    setQuery(searchItem);
    dispatch(setSearchProblem(searchItem));
    
  };


  //Redirect to DoctorList page once  searchProblem is set
  useEffect(()=>{
    if(searchProblem){
      navigate(`/user/${123}/doctorList`);
    }
  },[searchProblem,navigate]);

  return (
    <div>

      <>
        <h1>Search Your Health Problem</h1>
        <div className="search-container">
          <div className="search-inner">
            <input
              type="text"
              value={query}
              onChange={search}
              placeholder="search here"
            />
            <button onClick={() => onSearch(query)}>Search</button>
          </div>
          <div className="dropdown">
            {diseaseList
              .filter((item) => {
                const searchTerm = query.toLowerCase();
                const diseaseName = item.name.toLowerCase();
                return (
                  searchTerm &&
                  diseaseName.startsWith(searchTerm) &&
                  diseaseName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((disease, index) => (
                <div
                  onClick={() => onSearch(disease.name)}
                  key={`${disease.name}-${index}`}
                  className="dropdown-row"
                >
                  {disease.name}
                </div>
              ))}
          </div>
        </div>
      </>

    </div>
  );
};

export default SearchProblem;
