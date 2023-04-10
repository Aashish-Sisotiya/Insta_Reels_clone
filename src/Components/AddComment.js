import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { database } from "../firebase";

const AddComment = ({ userData, postData }) => {
  const [text, setText] = useState("");
   
  const handleClick = (e) => {
    let obj = {
      text: text,
      uProfileImage: userData.profileImage,
      uName: userData.fullname,
    };
    database.comments.add(obj).then((doc) => {
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id],
      });
    });
    setText("");
    
  };

  

  return (
    <div style={{ width: "100%" }}>
      <TextField
        id="filled-basic"
        label="Comment"
        variant="outlined"
        value={text}
        size="small"
        sx={{ width: "70%" }}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Post
      </Button>
    </div>
  );
};

export default AddComment;
