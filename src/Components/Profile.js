import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { Card, CircularProgress, Dialog, Typography } from "@mui/material";
import Navbar from "./Navbar";
import "../Styles/Profile.css";
import Like2 from "./Like2";
import AddComment from "./AddComment";
import Comments from "./Comments";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);

  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    database.users.doc(id).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
  }, [id]);

  useEffect(() => {
    const getPosts = async () => {
      if (userData !== null) {
        let pArr = [];
        for (let i = 0; i < userData.postIds.length; i++) {
          let postData = await database.posts.doc(userData.postIds[i]).get();
          pArr.push({ ...postData.data(), postId: postData.id });
        }
        setPosts(pArr);
      }
    };
    getPosts();
  });

  // console.log(posts);

  return (
    <>
      {posts === null || userData === null ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-image">
                <img src={userData.profileImage} alt="user_profile" />
              </div>
              <div className="info">
                {/* <Typography className="info-part" variant="h5">
                  Name : {userData.fullname}
                </Typography>

                <Typography className="info-part" variant="h5">
                  Email : {userData.email}
                </Typography>
                <Typography className="info-part" variant="h5">
                  Posts : {userData.postIds.length}
                </Typography> */}

                <p style={{ fontSize: "23px",fontWeight:"bold" }}> Name : {userData.fullname}</p>
                <p style={{ fontSize: "23px",fontWeight:"bold" }}> Email : {userData.email}</p>
                <p style={{ fontSize: "23px",fontWeight:"bold" }}>
                  Posts : {userData.postIds.length}
                </p>
              </div>
            </div>

            <hr style={{ marginTop: "" }} />

            <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video
                      muted="muted"
                      onClick={() => handleClickOpen(post.pId)}
                    >
                      <source src={post.pUrl} />
                    </video>
                    <Dialog
                      open={open === post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth="md"
                    >
                      <div className="profile-modal-container">
                        <div className="profile-video-modal">
                          <video autoPlay={true} muted="muted" controls>
                            <source src={post.pUrl} />
                          </video>
                        </div>
                        <div className="profile-comment-modal">
                          <Card
                            className="profile-card1"
                            style={{ padding: "1rem" }}
                          >
                            <Comments postData={post} />
                          </Card>
                          <Card variant="outlined" className="profile-card2">
                            <Typography style={{ padding: "0.4rem" }}>
                              {post.likes.length === 0
                                ? "Liked by nobody"
                                : `Liked by ${post.likes.length} users`}
                            </Typography>
                            <div style={{ display: "flex" }}>
                              <Like2
                                postData={post}
                                userData={userData}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                              <AddComment
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                userData={userData}
                                postData={post}
                              />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
