import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Button, Input } from './index'
import { userService } from '../utils/user.service';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);

    const changePassword=(data)=>{
        setError('');
        setLoading(true);
        userService.changePassword(data)
        .then(()=>{
            alert("Password Changed Successfully");
            setLoading(false);
            navigate('/user/profile');
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
            console.log(error);
        })
    }
  return (
    <>
    {error && <p>{error}</p>}
    {loading && <p>Loading...</p>}
    <form onSubmit={handleSubmit(changePassword)}>
        <Input
        label='Old Password'
        type='password'
        {...register("oldPassword",{
            required:true,
        })}
        />
        <Input
        label='New Password'
        type='password'
        {...register("newPassword",{
            required:true,
        })}
        />
        <Input
        label='Confirm Password'
        type='password'
        {...register("confirmPassword",{
            required:true,
        })}
        />
        <Button
        children='Change Password'
        type='submit'
        />
    </form>
    </>
  )
}

export default ChangePassword
