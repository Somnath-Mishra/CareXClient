
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { userService } from "../utils/user.service";
import { Button } from "./index";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [coverImage, setCoverImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const cImage = useSelector((state: RootState) => state.user.coverImage);
  const avatarImage = useSelector((state: RootState) => state.user.avatar);
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cImage || !avatarImage) {
      userService
        .getCurrentUserDetails()
        .then((response) => {
          const coverImage = response.data.data.coverImage;
          const avatar = response.data.data.avatar;
          if (coverImage || avatar) {
            setCoverImage(coverImage || "./defaultCoverImage.png");
            setAvatar(avatar || "./defaultAvatar.png");
            setLoading(false);
          } else {
            setCoverImage("./defaultCoverImage.png");
            setAvatar("./defaultAvatar.png");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          console.error(`Error occurred: ${error}`);
        });
    } else {
      setCoverImage(cImage);
      setAvatar(avatarImage);
      setLoading(false);
    }
  }, [cImage, avatarImage]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      <div className="relative mb-6">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg border border-gray-300"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-2 text-center">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-600 mb-6 text-center">{user.email}</p>
      <div className="space-y-4">
        <Button
          children="Change Cover Image"
          onClick={() => navigate(`/${user.role}/change-cover-image`)}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          children="Change Avatar"
          onClick={() => navigate(`/${user.role}/change-avatar`)}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          children="Get Appointment History"
          onClick={() => navigate(`/${user.role}/appointment-history`)}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          children="Change Password"
          onClick={() => navigate(`/${user.role}/change-password`)}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          children="Update Account Details"
          onClick={() => navigate(`/${user.role}/update-account-details`)}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

export default Profile;
