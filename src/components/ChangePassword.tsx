// import  { useState } from 'react'
// import {  useForm } from 'react-hook-form'
// import { Button, Input, Loading } from './index'
// import { userService } from '../utils/user.service';
// import { useNavigate } from 'react-router-dom';

// interface changePasswordInterface{
//     oldPassword:string,
//     newPassword:string,
//     confirmPassword:string
// }

// function ChangePassword() {
//     const {register,handleSubmit}=useForm<changePasswordInterface>();
//     const [error,setError]=useState('');
//     const navigate=useNavigate();
//     const [loading,setLoading]=useState(false);

//     const changePassword=(data:changePasswordInterface)=>{
//         setError('');
//         setLoading(true);
//         userService.changePassword(data)
//         .then(()=>{
//             alert("Password Changed Successfully");
//             setLoading(false);
//             navigate('/user/profile');
//         })
//         .catch((error)=>{
//             setError(error.message);
//             setLoading(false);
//             console.log(error);
//         })
//     }
//   return (
//     <>
//     {error && <p>{error}</p>}
//     {loading && <Loading/>}
//     <form onSubmit={handleSubmit(changePassword)}>
//         <Input
//         label='Old Password'
//         type='password'
//         {...register("oldPassword",{
//             required:true,
//         })}
//         />
//         <Input
//         label='New Password'
//         type='password'
//         {...register("newPassword",{
//             required:true,
//         })}
//         />
//         <Input
//         label='Confirm Password'
//         type='password'
//         {...register("confirmPassword",{
//             required:true,
//         })}
//         />
//         <Button
//         children='Change Password'
//         type='submit'
//         />
//     </form>
//     </>
//   )
// }

// export default ChangePassword
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { userService } from "../utils/user.service";
import { useNavigate } from "react-router-dom";

interface changePasswordInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ChangePassword() {
  const { register, handleSubmit } = useForm<changePasswordInterface>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const changePassword = (data: changePasswordInterface) => {
    setError(null);
    setLoading(true);
    userService
      .changePassword(data)
      .then(() => {
        alert("Password Changed Successfully");
        setLoading(false);
        navigate("/user/profile");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <form onSubmit={handleSubmit(changePassword)}>
        <TextField
          label="Old Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("oldPassword", { required: true })}
        />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("newPassword", { required: true })}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("confirmPassword", { required: true })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Change Password
        </Button>
      </form>
    </Box>
  );
}

export default ChangePassword;
