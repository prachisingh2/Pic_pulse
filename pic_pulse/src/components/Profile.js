import React, { useEffect, useState } from "react";
import "./Profile.css";
import PostDetail from "./PostDetail";

export default function Profile() {
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/myposts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(res => res.json())
        .then((result) => {
          setPic(result)
        })

    }, [])

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/photo-1531804055935-76f44d7c3621?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pic ? pic.length : "0"} posts</p>
            <p>0 followers</p>
            <p>0 following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      <div className="gallery">
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo} alt="Post"
            onClick={() => {
              toggleDetails(pics)
            }}
            className="item"></img>;
        })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
    </div>
  );
}