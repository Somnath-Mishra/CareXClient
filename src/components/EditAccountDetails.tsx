import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "./index";
import {
  updateAccountDetailsInterface,
  userService,
} from "../utils/user.service";
import { login as authLogin } from "../redux/slices/UserSlice";

function EditAccountDetails() {
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (data: updateAccountDetailsInterface) => {
    try {
      const response = await userService.updateAccountDetails(data);
      const userData = response?.data?.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/user/profile");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="First Name"
        type="text"
        placeholder="Update Your First Name"
        {...register("firstName")}
      />
      <Input
        label="Last Name"
        type="text"
        placeholder="Update Your Last Name"
        {...register("lastName")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Update Your Email"
        {...register("email")}
      />
      <Input
        label="Phone Number"
        type="number"
        placeholder="Update Your Phone Number"
        {...register("phoneNumber")}
      />
      <Button
      children='Update Account Details'
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
      />
    </form>
  );
}

export default EditAccountDetails;