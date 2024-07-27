// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   clearSearchProblem,
//   setSearchProblem,
// } from "../redux/slices/searchProblemSlice";
// import { useNavigate } from "react-router-dom";
// // import { RootState } from "../redux/store";
// import { userService } from "../utils/user.service";

// interface Disease {
//   name: string;
// }

// const SearchProblem: React.FC = () => {
//   const [diseaseList, setDiseaseList] = useState<Disease[]>([]);
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const userId = useSelector((state: RootState) => state.user.userData?.userId);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState<boolean>(true);

//   // const searchProblem = useSelector(
//   //   (state: RootState) => state.searchProblem.searchProblem
//   // );

//   const fetchData = async () => {
//     try {
//       const response = await userService.getAllDiseaseList();
//       setDiseaseList(response.data.data);
//       setLoading(false);
//     } catch (error:any) {
//       setError(error.message);
//       setLoading(false);
//       console.log(`Error occurred at fetchData() error: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     setError("");
//     dispatch(clearSearchProblem());
//     fetchData();
//   }, [dispatch]);

//   const search = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   const onSearch = (searchItem: string) => {
//     setQuery(searchItem);
//     dispatch(setSearchProblem(searchItem));
//     navigate("/user/doctorList");
//   };

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {loading && <p>Loading...</p>}
//       {!loading && !error && (
//         <div>
//           <h1>Search Your Health Problem</h1>
//           <div className="search-container">
//             <div className="search-inner">
//               <input
//                 type="text"
//                 value={query}
//                 onChange={search}
//                 placeholder="Search here"
//               />
//               <button onClick={() => onSearch(query)}>Search</button>
//             </div>
//             <div className="dropdown">
//               {diseaseList
//                 .filter((item) => {
//                   const searchTerm = query.toLowerCase();
//                   const diseaseName = item.name.toLowerCase();
//                   return (
//                     searchTerm &&
//                     diseaseName.startsWith(searchTerm) &&
//                     diseaseName !== searchTerm
//                   );
//                 })
//                 .slice(0, 10)
//                 .map((disease, index) => (
//                   <div
//                     onClick={() => onSearch(disease.name)}
//                     key={`${disease.name}-${index}`}
//                     className="dropdown-row"
//                   >
//                     {disease.name}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchProblem;
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchProblem,
  setSearchProblem,
} from "../redux/slices/searchProblemSlice";
import { useNavigate } from "react-router-dom";
import { userService } from "../utils/user.service";

interface Disease {
  name: string;
}

const SearchProblem: React.FC = () => {
  const [diseaseList, setDiseaseList] = useState<Disease[]>([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await userService.getAllDiseaseList();
      setDiseaseList(response.data.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      console.log(`Error occurred at fetchData() error: ${error.message}`);
    }
  };

  useEffect(() => {
    setError("");
    dispatch(clearSearchProblem());
    fetchData();
  }, [dispatch]);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSearch = (searchItem: string) => {
    setQuery(searchItem);
    dispatch(setSearchProblem(searchItem));
    navigate("/user/doctorList");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg my-12">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-600">Loading...</p>}
      {!loading && !error && (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Search Your Health Problem
          </h1>
          <div className="relative">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={search}
                placeholder="Search here"
                className="flex-grow p-2 border-none outline-none"
              />
              <button
                onClick={() => onSearch(query)}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
              >
                Search
              </button>
            </div>
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {disease.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProblem;
