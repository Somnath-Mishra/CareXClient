// import { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { authService } from "../utils/auth.service";
// import { login as authLogin } from "../redux/slices/UserSlice";
// import { Input, Button, Logo, Loading } from "./index";

// interface LoginFormInputs {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormInputs>();
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const login: SubmitHandler<LoginFormInputs> = async (data) => {
//     setError("");
//     setLoading(true);
//     try {
//       const response = await authService.login(data);
//       const userData = response?.data?.data?.user;
//       if (userData) {
//         dispatch(authLogin(userData));
//         setLoading(false);
//         navigate(`/${userData.role}`);
//       } else {
//         setLoading(false);
//         setError(response?.data?.message);
//       }
//     } catch (error: any) {
//       setLoading(false);
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-center w-full">
//         <div
//           className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//         >
//           <div className="mb-2 flex justify-center">
//             <span className="inline-block w-full max-w-[100px]">
//               <Logo width="100%" />
//             </span>
//           </div>
//           <h2 className="text-center text-2xl font-bold leading-tight">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-base text-black/60">
//             Don&apos;t have any account?&nbsp;
//             <Link
//               to="/signup"
//               className="font-medium text-primary transition-all duration-200 hover:underline"
//             >
//               Sign Up
//             </Link>
//           </p>
//           {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//           <form onSubmit={handleSubmit(login)} className="mt-8">
//             <div className="space-y-5">
//               <Input
//                 label="Email: "
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//                     message: "Email address must be a valid address",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <p className="text-red-600">{errors.email.message}</p>
//               )}
//               <Input
//                 label="Password: "
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password", { required: "Password is required" })}
//               />
//               {errors.password && (
//                 <p className="text-red-600">{errors.password.message}</p>
//               )}
//               <Input
//                 label="Confirm Password: "
//                 type="password"
//                 placeholder="Confirm your password"
//                 {...register("confirmPassword", {
//                   required: "Confirm password is required",
//                 })}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-600">{errors.confirmPassword.message}</p>
//               )}
//               <Button type="submit" className="w-full">
//                 Sign in
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {loading && <Loading />}
//     </>
//   );
// };

// export default Login;
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../utils/auth.service";
import { login as authLogin } from "../redux/slices/UserSlice";
import { Input, Button, Logo, Loading } from "./index";

interface LoginFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const login: SubmitHandler<LoginFormInputs> = async (data) => {
    setError("");
    setLoading(true);
    try {
      const response = await authService.login(data);
      const userData = response?.data?.data?.user;
      if (userData) {
        dispatch(authLogin(userData));
        setLoading(false);
        navigate(`/${userData.role}`);
      } else {
        setLoading(false);
        setError(response?.data?.message);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="flex justify-center mb-6">
            <Logo width="80" />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
            Sign In
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default Login;
