import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks/hooks";
import bg1 from "../img/bg1.jpg";
import defaultavatar from "../img/defaultavatar.jpg";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      password
      token
    }
  }
`;

export default function Signup() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const registerUserCallback = () => {
    registerUser();
  };

  const [selectImage, setSelectImage] = useState(defaultavatar);

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectImage(event.target.files[0]);
    }
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    password: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <div className="main-container">
      <div className="signup-login-container">
        <div className="signup-img">
          <img
            src={bg1}
            alt="dddd"
            style={{
              width: "96%",
              minWidth: "96%",
              borderRadius: "2rem",
              height: "250px",
            }}
          />
          <h1 className="text-glow">SIGN UP</h1>
        </div>

        <div className="signup-form">
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
            <input
              type="file"
              id="file"
              onChange={imageChange}
              accept="image/*"
            />
            <label htmlFor="file">
              {" "}
              <span className="material-icons">add_photo_alternate</span>
              Upload your avatar
            </label>
            {errors.map((error) => {
              return <p style={{ color: "white" }}>{error.message}</p>;
            })}
            <button onSubmit={onSubmit}>REGISTER</button>
          </form>
          <div className="preview">
            {selectImage === defaultavatar ? (
              <img
                className="avatar-preview"
                src={selectImage}
                alt="img preview"
              />
            ) : (
              <img
                className="avatar-preview"
                src={URL.createObjectURL(selectImage)}
                alt="img preview"
              />
            )}
            <p className="imgprev-text">Avatar preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}
