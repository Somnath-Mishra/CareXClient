import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../utils/auth.service";
import { login as authLogin } from "../redux/slices/UserSlice";
import { Input, Button, Logo } from "../components/index";

enum Role {
  User = "user",
  Doctor = "doctor",
}

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  address: string;
  role: Role;
  avatar: FileList;
  coverImage: FileList;
  licence: FileList;
  visitFees: number;
  degree: string;
  instituteName: string;
  specialization:string[];
}

function DoctorRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const create: SubmitHandler<SignupFormInputs> = async (
    data: SignupFormInputs
  ) => {
    setError("");
    const formData = new FormData();

    if (data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    if (data.coverImage.length > 0) {
      formData.append("coverImage", data.coverImage[0]);
    }

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("address", data.address);
    formData.append("phoneNumber", data.phoneNumber.toString());
    formData.append("confirmPassword", data.confirmPassword);

    try {
      const response = await authService.register(formData);
      const userData = response?.data?.data;
      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="First Name: "
                type="text"
                placeholder="Enter your first name"
                {...register("firstName", { required: true })}
              />
              <Input
                label="Last Name: "
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
              <Input
                label="User Name"
                type="text"
                placeholder="Enter your user name"
                {...register("userName")}
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <Input
                label="Confirm Password: "
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", { required: true })}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
              <Input
                label="Address"
                type="text"
                placeholder="Enter your address"
                {...register("address")}
              />
              <div>
                <label htmlFor="role" className="form-label">
                  I am a
                </label>
                <select
                  id="role"
                  {...register("role")}
                  className="form-control"
                >
                  <option value={Role.User}>User</option>
                  <option value={Role.Doctor}>Doctor</option>
                </select>
              </div>
              <Input label="Avatar" type="file" {...register("avatar")} />
              <Input
                label="Cover Image"
                type="file"
                {...register("coverImage")}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegister;
