
import { useDispatch } from "react-redux";
import { authService } from "../utils/auth.service";
import { logout as authLogout } from "../redux/slices/UserSlice";

const LogoutBtn: React.FC = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(authLogout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
