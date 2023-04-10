import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActions, TextField } from "@mui/material";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

import "../Styles/Login.css";
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
import InstagramImage from "../Assets/Instagram.JPG";
import insta from "../Assets/insta.png";
import styled from "@emotion/styled";

const TextComp = styled(Typography)({
  color: "grey",
  textAlign: "center",
});

export default function Login() {
  const store = React.useContext(AuthContext);
  // console.log(store);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = React.useContext(AuthContext);

  const handleClick = async () => {
    if (password === "") {
      setError("Please Enter correct password");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await login(email, password);
      // let uid = userObj.user.uid;
      // console.log(uid);

      setLoading(false);
      navigate("/");
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="loginWrapper">
      <div
        className="imageCar"
        style={{ backgroundImage: `url(${insta})`, backgroundSize: "cover" }}
      >
        <div className="car">
          <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={2}>
                <Image src={img3} />
              </Slide>
              <Slide index={3}>
                <Image src={img4} />
              </Slide>
              <Slide index={4}>
                <Image src={img5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={InstagramImage} alt="insta_img" />
          </div>
          <CardContent>
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
            <Typography style={{ textAlign: "center" }} color="primary">
              <Link to="/forgotPasword">Forgot Password ?</Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleClick}
            >
              LOG IN
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className="card2">
          <CardContent>
            <TextComp>
              <Typography component="span" variant="subtitle2">
                Don't have an account ?
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </Typography>
            </TextComp>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
