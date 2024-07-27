// import  { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input } from "./index";
// import { userService } from "../utils/user.service";
// import { useDispatch } from "react-redux";
// import { login as authLogin } from "../redux/slices/UserSlice";
// import { useNavigate } from "react-router-dom";

// function UpdateAvatar() {
//   const { handleSubmit, register } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const updateAvatar = async (data:any) => {
//     setError("");
    
//     userService
//       .updateAvatar(data.avatar[0])
//       .then((response) => {
//         const userData = response.data.data;
//         if (userData) {
//           dispatch(authLogin(userData));
//           navigate("/user/profile");
//         }
//       })
//       .catch((error) => {
//         setError(error.message);
//         console.log(error);
//       });
//   };
//   return (
//     <>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit(updateAvatar)}>
//         <Input
//           label="Avatar"
//           type="file"
//           accept="image/*"
//           {...register("avatar")}
//         />
//         <Button type="submit" children="Update Avatar" />
//       </form>
//     </>
//   );
// }

// export default UpdateAvatar;
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";
import { userService } from "../utils/user.service";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

function UpdateAvatar() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const updateAvatar = async (data: any) => {
    setError("");

    try {
      const response = await userService.updateAvatar(data.avatar[0]);
      const userData = response.data.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/user/profile");
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Update Avatar</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(updateAvatar)} className="space-y-4">
          <Input
            label="Avatar"
            type="file"
            accept="image/*"
            {...register("avatar")}
            className="border rounded-md p-2 w-full"
          />
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Avatar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAvatar;
