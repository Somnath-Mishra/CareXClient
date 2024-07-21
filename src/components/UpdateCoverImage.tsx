import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "./index";
import { userService } from "../utils/user.service";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

function UpdateCoverImage() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const updateCoverImage = async(data) => {
    setError("");
    const formData = new FormData();
    if (data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }
    try {
      const response = await userService.updateCoverImage(formData);
      const userData = response.data.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/user/profile");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <>
    {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(updateCoverImage)}>
        <Input
          label="Cover Image"
          type="file"
          accept="image/*"
          {...register("coverImage")}
        />
        <Button type="submit" children="Update Cover Image" />
      </form>
    </>
  );
}

export default UpdateCoverImage;
