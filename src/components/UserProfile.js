import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.posts);
        const loggedInUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        if (
          result.user.followers &&
          loggedInUser &&
          result.user.followers.includes(loggedInUser._id)
        ) {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userid, isFollow]);
  

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/photo-1531804055935-76f44d7c3621?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
        </div>
        <div className="pofile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="followBtn"
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{posts.length} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
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
        {posts.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              className="item"
              alt="posts"
            ></img>
          );
        })}
      </div>
    </div>
  );
}