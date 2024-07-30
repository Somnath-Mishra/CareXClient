import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  specialization: string;
}

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const dispatch = useDispatch();
  const [basicRegisterData, setBasicRegisterData] = useState<FormData | null>(
    null
  );

  const { register, handleSubmit } = useForm<SignupFormInputs>();

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
        console.log(response);
        const userData = response?.data?.data;
        if (userData) {
          dispatch(authLogin(userData));
          alert("Registration successful");
          alert("Now login to your account using email and password");
          setLoading(false);
          navigate("/login");
        }
      }
      if (data.role === Role.Doctor) {
        setBasicRegisterData(formData);
        setLoading(false);
        setIsDoctor(true);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const submitExtraDetailsForDoctor: SubmitHandler<
    SignupFormExtraDetailsForDoctor
  > = async (data) => {
    setLoading(true);
    const formDataDoctor = new FormData();
    formDataDoctor.append("licence", data.licence[0]);
    formDataDoctor.append("visitFees", data.visitFees.toString());
    formDataDoctor.append("degree", data.degree);
    formDataDoctor.append("instituteName", data.instituteName);
    formDataDoctor.append("specialization", data.specialization);

    if (basicRegisterData) {
      for (const [key, value] of basicRegisterData.entries()) {
        formDataDoctor.append(key, value as string);
      }
    }

    try {
      const res = await doctorService.register(formDataDoctor);
      const userData = res?.data?.data;
      if (userData) {
        dispatch(authLogin(userData));
        alert("Registration successful");
        alert("Now login to your account using email and password");
        setLoading(false);
        navigate("/login");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <Logo width="100" height="100" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Sign up to create an account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?&nbsp;
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", { required: true })}
            className="border rounded-md p-2"
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            {...register("lastName")}
            className="border rounded-md p-2"
          />
          <Input
            label="User Name"
            type="text"
            placeholder="Enter your user name"
            {...register("userName")}
            className="border rounded-md p-2"
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="border rounded-md p-2"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="border rounded-md p-2"
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true })}
            className="border rounded-md p-2"
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phoneNumber")}
            className="border rounded-md p-2"
          />
          <Input
            label="Address"
            type="text"
            placeholder="Enter your address"
            {...register("address")}
            className="border rounded-md p-2"
          />
          <div>
            <label htmlFor="role" className="block text-gray-700 mb-1">
              I am a
            </label>
            <select
              id="role"
              {...register("role")}
              className="border rounded-md p-2 w-full"
            >
              <option value={Role.User}>User</option>
              <option value={Role.Doctor}>Doctor</option>
            </select>
          </div>
          <Input
            label="Avatar"
            type="file"
            {...register("avatar")}
            className="border rounded-md p-2"
          />
          <Input
            label="Cover Image"
            type="file"
            {...register("coverImage")}
            className="border rounded-md p-2"
          />
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Create Account
          </Button>
        </form>

        {isDoctor && (
          <form
            onSubmit={handleSubmitForDoctor(submitExtraDetailsForDoctor)}
            className="space-y-4 mt-6"
          >
            <Input
              label="Licence"
              type="file"
              {...registerForDoctor("licence", { required: true })}
              className="border rounded-md p-2"
            />
            <Input
              label="Visit Fees"
              type="number"
              placeholder="Enter your visit fees"
              {...registerForDoctor("visitFees", { required: true })}
              className="border rounded-md p-2"
            />
            <Input
              label="Degree"
              type="text"
              placeholder="Enter your degree"
              {...registerForDoctor("degree", { required: true })}
              className="border rounded-md p-2"
            />
            <Input
              label="Institute Name"
              type="text"
              placeholder="Enter your institute name"
              {...registerForDoctor("instituteName", { required: true })}
              className="border rounded-md p-2"
            />
            <Input
              label="Specialization (comma separated)"
              type="text"
              placeholder="Enter your specialization"
              {...registerForDoctor("specialization", { required: true })}
              className="border rounded-md p-2"
            />
            <Button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </Button>
          </form>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Signup;
