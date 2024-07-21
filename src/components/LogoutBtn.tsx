import { useDispatch } from 'react-redux'
import { authService } from '../utils/auth.service';
import {logout as authLogout} from "../redux/slices/UserSlice"


function LogoutBtn() {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(authLogout());
        })
    }
  return (
    <button
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn
