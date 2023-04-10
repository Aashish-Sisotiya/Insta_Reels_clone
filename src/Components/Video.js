import React from "react";
import "../Styles/Video.css";
import ReactDOM from "react-dom";

function Video(props) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
    if (next) {
      next.scrollIntoView();
      e.target.muted = true;
    }
  };
  return (
    <video
      className="video-style"
      src={props.src}
      muted="muted"
      onEnded={handleScroll}
      onClick={handleClick}
    ></video>
  );
}

export default Video;
