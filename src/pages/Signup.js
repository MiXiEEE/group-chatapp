import React, { useState } from "react";
import bg1 from "../img/bg1.jpg";
import defaultavatar from "../img/defaultavatar.jpg";
export default function Signup() {
  const [selectImage, setSelectImage] = useState(defaultavatar);

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectImage(event.target.files[0]);
    }
  };

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
          <form>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
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
            <button>REGISTER</button>
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
