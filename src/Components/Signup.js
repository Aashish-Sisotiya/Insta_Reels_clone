import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../Context/AuthContext";

import "../Styles/Signup.css";
import InstagramImage from "../Assets/Instagram.JPG";
import styled from "@emotion/styled";
import { database, storage } from "../firebase";

const TextComp = styled(Typography)({
  color: "grey",
  textAlign: "center",
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signup } = React.useContext(AuthContext);
  const handleClick = async () => {
    if (file === null) {
      setError("Please upload profile image first");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    try {
      setError("");
      setLoading(true);
      const userObj = await signup(email, password);
      let uid = userObj.user.uid;
      // console.log(uid);
      const uploadTask = storage.ref(`users/${uid}/ProfileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);

      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress} done`);
      }

      function fn2(error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 2000);
        setLoading(false);
        return;
      }
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullname: name,
            profileImage: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={InstagramImage} alt="insta_img" />
          </div>
          <CardContent>
            <TextComp>
              <Typography component="span" variant="subtitle2">
                Sign up to see photos and videos from your friends
              </Typography>
            </TextComp>
            {error !== "" && <Alert severity="error">{error}</Alert>}
            <TextField
              fullWidth={true}
              size="small"
              margin="dense"
              required={true}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth={true}
              size="small"
              margin="dense"
              required={true}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth={true}
              size="small"
              margin="dense"
              required={true}
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              color="secondary"
              margin="dense"
              fullWidth={true}
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="label"
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleClick}
            >
              Sign up
            </Button>
          </CardActions>
          <TextComp marginTop="5%">
            <Typography component="span" variant="subtitle2">
              By signing up, you agree in our Terms , Data Policy and Cookies
              Policy
            </Typography>
          </TextComp>
        </Card>
        <Card variant="outlined" className="card2">
          <CardContent>
            <TextComp>
              <Typography component="span" variant="subtitle2">
                Have an account ?
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </Typography>
            </TextComp>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
