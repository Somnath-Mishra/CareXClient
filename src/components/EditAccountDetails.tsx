import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Input, Loading } from "./index";
import {
  userService,
} from "../utils/user.service";
import { login as authLogin } from "../redux/slices/UserSlice";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address: string;
}

const EditAccountDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || 0,
      address: user.address || "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await userService.updateAccountDetails(data);
      const userData = response?.data?.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/user/profile");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
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
        <Input
          label="Address"
          type="text"
          placeholder="Update Your Address"
          {...register("address")}
        />
        {error && <p className="text-red-600">{error}</p>}
        <Button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Update Account Details
        </Button>
      </form>
    </>
  );
};

export default EditAccountDetails;
