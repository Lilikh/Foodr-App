import { useState } from 'react';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import '../styles/style.css'; 
import Footer from "../components/Footer"
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(`https://azurefoodapi.azurewebsites.net/login2?email=${data.email}&password=${data.password}`, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 200) {
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        console.log(userId + " You Are Successfully Logged In");

        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error: ", error.response.data.message);
      } else {
        console.log("Error: ", error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="registration-form-container">
          <h2 className="text-xl">Login</h2>
          <SignInForm onSubmit={handleSubmit} />
        </div>
      </div>
      <Footer/>
    </>
  );
};

const SignInForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label className="block mb-1" htmlFor="Email">Email</label>
        <input
          className="border-solid border-black border-2 py-2 px-4 w-full"
          id="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="error">This field is required</span>}
      </div>
      <div className="input-group">
        <label className="block mb-1" htmlFor="password">Password</label>
        <div className="password-container">
          <input
            className="border-solid border-black border-2 py-2 px-4 w-full"
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <span className="error">This field is required</span>}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-5"
        type="submit"
      >
        Login
      </button>
      <Link className="login-link" to="/signup">Do not have an Account?</Link>
    </form>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInPage;
