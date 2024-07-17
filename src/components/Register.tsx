import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        firstName: '',
        address: '',
        avatar: null,
        coverImage: null
    });

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        firstName: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const validateForm = () => {
        const newErrors = { ...errors };

        if (!formData.userName) newErrors.userName = 'User Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.address) newErrors.address = 'Address is required';

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await axios.post('/api/v1/user/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);
            alert('Registration successful');
        } catch (error) {
            console.error('There was an error!', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="registerContainer">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label htmlFor="userName"><b>User Name</b></label>
                <input
                    type="text"
                    placeholder="Choose a User Name"
                    name="userName"
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
                {errors.userName && <p className="error">{errors.userName}</p>}

                <label htmlFor="email"><b>Email</b></label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    id="psw"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password Again"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <label htmlFor="phoneNumber"><b>Phone Number</b></label>
                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

                <label htmlFor="firstName"><b>First Name</b></label>
                <input
                    type="text"
                    placeholder="Enter Your First Name"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}

                <label htmlFor="address"><b>Address</b></label>
                <input
                    type="text"
                    placeholder="Enter Your Address"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                {errors.address && <p className="error">{errors.address}</p>}

                <label htmlFor="avatar"><b>Upload Your Avatar</b></label>
                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleChange}
                />

                <label htmlFor="coverImage"><b>Upload Your Cover Image</b></label>
                <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    onChange={handleChange}
                />

                <hr />
                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                <button type="submit" className="registerbtn">Register</button>
            </div>

            <div className="signin">
                <p>Already have an account? <a href="#">Sign in</a>.</p>
            </div>
        </form>
    );
}

export default Register;
