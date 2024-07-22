import React, { useState } from "react";
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

  const updateAvatar = async (data) => {
    setError("");
    
    userService
      .updateAvatar(data.avatar[0])
      .then((response) => {
        const userData = response.data.data;
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/user/profile");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };
  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(updateAvatar)}>
        <Input
          label="Avatar"
          type="file"
          accept="image/*"
          {...register("avatar")}
        />
        <Button type="submit" children="Update Avatar" />
      </form>
    </>
  );
}

export default UpdateAvatar;
