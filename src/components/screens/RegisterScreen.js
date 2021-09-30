import { useState } from "react";
// import { useEffect } from "react";
import axios from "axios";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/");
  //   }
  // }, [history]);

  // handling register button
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // inserting registration data
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        username
      },
      config
    );

    localStorage.setItem("authToken", data.token);

    history.push("/");
  };

  return (
    <>
      <div className="screen">
        <div className="register-screen">
          <form onSubmit={registerHandler} className="register-form">
            <h3 className="register-title">Create Account</h3>
            <label className="input-label">Username</label>
            <input
              type="text"
              required
              className="input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;