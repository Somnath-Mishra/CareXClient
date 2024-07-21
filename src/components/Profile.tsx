import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userService } from "../utils/user.service";
import { Button } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [coverImage, setCoverImage] = useState("");
  const cImage = useSelector((state: RootState) => state.user.coverImage);
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate=useNavigate();


  useEffect(() => {
    if (!cImage) {
      try {
        const response = await userService.getCurrentUserDetails();
        const coverImage = response.data.data.coverImage;
        const avatar = response.data.data.avatar;
        if (coverImage || avatar) {
          setCoverImage(coverImage || avatar);
          setLoading(false);
        } else {
          const defaultAvatar = "./defaultAvatar.png";
          setCoverImage(defaultAvatar);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(`Error occurred at fetchDoctorDetails() error: ${error}`);
      }
    } else {
      setCoverImage(cImage);
      setLoading(false);
    }
  });



  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <img src={coverImage} alt="" />
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>{user.email}</p>
      <Button
        children="Change Cover Image"
        onClick={() => {
          navigate("/user/change-cover-image");
        }}
      />
      <Button
        children="Change Avatar"
        onClick={() => {
          navigate("/user/change-avatar");
        }}
      />
      <Button
        children="Get Appointment History"
        onClick={() => {
          navigate('/user/appointment-history')
        }}
      />
      <Button
        children="Change Password"
        onClick={() => {
          navigate("/user/change-password");
        }}
      />
      <Button
        children="Update Account Details"
        onClick={() => {
          navigate("/user/update-account-details");
        }}
      />
    </div>
  );
}

export default Profile;
