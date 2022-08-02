import React from "react";

export default function Messages() {
  const messages = [
    {
      userid: 1,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 2,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 3,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 4,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 5,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 6,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 4,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
    {
      userid: 6,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,beatae!",
      userimg:
        "https://aniyuki.com/wp-content/uploads/2021/12/aniyuki-sad-anime-avatar-image-90.jpg",
    },
  ];

  const userid = 4;
  return (
    <>
      {messages.map((msg, index) => {
        if (msg.userid !== userid) {
          return (
            <div key={"received" + index} className="message-styles">
              <span>
                <img className="msg-avatar" src={msg.userimg} alt="img" />
              </span>
              <span className="msg-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, beatae!
              </span>
            </div>
          );
        } else {
          return (
            <div key={"sent" + index} className="message-styles-ownmsg">
              <span className="msg-text-owntext">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, beatae!
              </span>
              <span>
                <img className="msg-avatar" src={msg.userimg} alt="img" />
              </span>
            </div>
          );
        }
      })}
    </>
  );
}
