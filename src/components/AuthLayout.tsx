import { useEffect, useState } from "react";
import { useSelector,TypedUseSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserRootState } from "../redux/slices/UserSlice";

interface protectedProps{
    children:React.ReactNode,
    authentication?:boolean
}



export default function Protected({children,authentication=true}:protectedProps){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const useTypedSelector:TypedUseSelectorHook<UserRootState> = useSelector;
    const authStatus=useTypedSelector(state=>state.user.isLoggedIn)
    
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus!==authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    return loader?<h1>Loading...</h1>:<>{children}</>
}