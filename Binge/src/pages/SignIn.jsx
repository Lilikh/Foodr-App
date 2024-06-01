import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css'; // Import the CSS file

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      console.log('Sending data:', data); // Log the data being sent

      const response = await axios.post('https://azurefoodapi.azurewebsites.net/login', {
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Log the entire response to see its structure
      console.log('API response:', response);
      console.log('Response data:', response.data);

      // Assuming userId is nested within a user object in the response
      const userId = response.data.user.userId;
      if (userId) {
        localStorage.setItem('userId', userId);
        console.log(userId + " You Are Successfully Logged In");
        navigate("/cookbook"); // Navigate to the correct path
      } else {
        console.error("userId is undefined in the response");
        alert("Login successful, but no userId returned");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error: ", error.response.data);
        alert(`Error: ${error.response.data.message || 'Login failed. Please try again.'}`); // Display the error message to the user
      } else {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`); // Display a generic error message
      }
    }
  };



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="registration-form-container">
          <h2 className="text-xl">Logga In</h2>
          <SignInForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

const SignInForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          className="border-solid border-black border-2 py-2 px-4 w-full"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="input-group">
        <label className="block mb-1" htmlFor="password">Password</label>
        <input
          className="border-solid border-black border-2 py-2 px-4 w-full"
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 my-5"
        type="submit"
      >
        Log In
      </button>
      <Link className="login-link" to="/signup">Do not have an Account?</Link>
    </form>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInPage;
