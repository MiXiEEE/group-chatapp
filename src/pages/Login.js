import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/hooks";
import bg from "../img/bg.jpg";

const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      password
      token
    }
  }
`;

export default function Login() {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/main");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div className="main-container">
      <div className="signup-login-container">
        <div className="signup-img">
          <img
            src={bg}
            alt="dddd"
            style={{
              width: "96%",
              minWidth: "96%",
              borderRadius: "2rem",
              height: "250px",
            }}
          />
          <h1 className="text-glow">SIGN IN</h1>
        </div>
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              onChange={onChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              onChange={onChange}
            />
            {errors.map((error) => {
              return (
                <p style={{ color: "white" }} key={error.message}>
                  {error.message}
                </p>
              );
            })}
            <button onSubmit={onSubmit}>LOGIN</button>
          </form>
          <div className="signup-panel">
            <h2 className="title">Sign Up</h2>
            <p className="signup-subtext">
              Sign up here if you don't have account
            </p>
            <Link to="/signup" className="signup-btn">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
