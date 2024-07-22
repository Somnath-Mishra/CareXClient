import React, { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../utils/auth.service";
import { login as authLogin } from "../redux/slices/UserSlice";
import { Input, Button, Logo } from "../components/index";
import { doctorService } from "../utils/doctor.service";

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
}

interface SignupFormExtraDetailsForDoctor {
  licence: FileList;
  visitFees: number;
  degree: string;
  instituteName: string;
  specialization: string[];
}

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState("false");
  const dispatch = useDispatch();
  const [basicRegisterData, setBasicRegisterData] =
    useState<SignupFormInputs>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const { register: registerForDoctor, handleSubmit: handleSubmitForDoctor } =
    useForm<SignupFormExtraDetailsForDoctor>();

  const create: SubmitHandler<SignupFormInputs> = async (
    data: SignupFormInputs
  ) => {
    setLoading(true);
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
      if (data.role === Role.User) {
        const response = await authService.register(formData);
        const userData = response?.data?.data;
        if (userData) {
          dispatch(authLogin(userData));
          setLoading(false);
          navigate("/user");
        }
      }
      if (data.role === Role.Doctor) {
        setBasicRegisterData(formData);
        setIsDoctor("true");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const submitExtraDetailsForDoctor = (data) => {
    const formDataDoctor = new FormData();
    formDataDoctor.append("licence", data.licence[0]);
    formDataDoctor.append("visitFees", data.visitFees.toString());
    formDataDoctor.append("degree", data.degree);
    formDataDoctor.append("instituteName", data.instituteName);
    formDataDoctor.append("specialization", data.specialization.toString());
    basicRegisterData.forEach((value, key) => {
      formDataDoctor.append(key, value);
    });
    doctorService
      .register(data)
      .then((res) => {
        const userData = res?.data?.data;
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/doctor");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
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

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      {isDoctor && (
        <form onClick={handleSubmitForDoctor(submitExtraDetailsForDoctor)}>
          <Input
            label="licence"
            type="file"
            {...registerForDoctor("licence")}
          />
          <Input
            label="visitFees"
            type="number"
            {...registerForDoctor("visitFees")}
          />
          <Input label="degree" type="text" {...registerForDoctor("degree")} />
          <Input
            label="instituteName"
            type="text"
            {...registerForDoctor("instituteName")}
          />
          <Input
            label="specialization comma separated"
            type="text"
            {...registerForDoctor("specialization")}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
}

export default Signup;