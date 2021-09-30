import { useState } from "react";
// import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/");
  //   }
  // }, [history]);

  // handling login
  const loginHandler = async (e) => {
    e.preventDefault();


    // Giving configurations for input
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Inserting login data
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { username }, config);

      localStorage.setItem("authToken", data.token);

      history.push("/");

    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }

  };

  return (
    <>
      <div className="screen">
        <div className="login-screen">
          <form onSubmit={loginHandler} className="login-form">
            <h3 className="form-title">Login</h3>

            {/* Validation error */}
            {error && <p className="login-error-message">{error}</p>}

            <label className="input-label">Username</label>
            <input
              type="text"
              className="input"
              required
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <br /><br />
            <button className="login-button" type="submit">Login</button>

            <br /><br />
            <span className="subtext">Don't have an account? <Link className="register-link" to="/register">Register</Link></span>

          </form><br />
        </div>
      </div>
    </>
  );
};

export default LoginScreen;