
import { useState } from "react";
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

  const updateCoverImage = async (data: any) => {
    setError("");

    try {
      const response = await userService.updateCoverImage(data.coverImage[0]);
      const userData = response.data.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/user/profile");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Update Cover Image
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(updateCoverImage)} className="space-y-4">
          <Input
            label="Cover Image"
            type="file"
            accept="image/*"
            {...register("coverImage")}
            className="border rounded-md p-2 w-full"
          />
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Cover Image
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCoverImage;
