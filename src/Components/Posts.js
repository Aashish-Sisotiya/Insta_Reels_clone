import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import {
  Avatar,
  Card,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import Video from "./Video";
import "../Styles/Posts.css";
import Like from "./Like";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Posts = ({ userData }) => {
  // console.log(props);
  // console.log(userData);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
      });

    return () => {
      unsub();
    };
  }, []);

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      // console.log(ele);
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause();
        }
      });
    });
  };
  let observer = new IntersectionObserver(callback, { threshold: 0.6 });
  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
    };
  }, [posts]);

  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      {posts === null || userData === null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {posts.map((post, index) => (
            <React.Fragment key={index}>
              {/* {console.log(post)} */}
              <div className="videos">
                <Video src={post.pUrl} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar alt="Remy Sharp" src={`${userData.profileImage}`} />
                  <h4>{userData.fullname}</h4>
                </div>
                <Like userData={userData} postData={post} />
                <ChatBubbleIcon
                  className="chatstyling"
                  onClick={() => handleClickOpen(post.pId)}
                />
                <Dialog
                  open={open === post.pId}
                  onClose={handleClose}
                  fullWidth={true}
                  maxWidth="md"
                >
                  <div className="model-container">
                    <div className="video-model">
                      <video muted="muted" controls autoPlay={true}>
                        <source src={post.pUrl} />
                      </video>
                    </div>
                    <div className="comment-model">
                      <Card
                        className="card1"
                        sx={{ maxWidth: 345 }}
                        style={{ padding: "1rem" }}
                      >
                        <Comments postData={post} />
                      </Card>
                      <Card
                        variant="outlined"
                        sx={{ maxWidth: 345 }}
                        className="card-comment-model"
                      >
                        <Typography style={{ padding: "0.3rem" }}>
                          {post.likes.length === 0
                            ? "Liked by nobody"
                            : ` Liked by ${post.likes.length} users`}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Like2 userData={userData} postData={post} />
                          </div>
                          <AddComment userData={userData} postData={post} />
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
