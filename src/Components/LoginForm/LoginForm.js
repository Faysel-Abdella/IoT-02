import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Usernames } from "./DB_Username";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

// import PrivacyLogo from './PrivacyLogo.png';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    const isValid = Usernames.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      localStorage.setItem("username", username);
      navigate("/home", { state: { username } });
    } else {
      alert("Invalid Username or Password");
    }
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your user name here"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter your password here "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RiLockPasswordFill className="icon" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
