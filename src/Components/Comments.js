import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { Avatar, CircularProgress } from "@mui/material";

const Comments = ({ postData }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    const getComments = async () => {
      let arr = [];
      for (let i = 0; i < postData.comments.length; i++) {
        let data = await database.comments.doc(postData.comments[i]).get();
        arr.push(data.data());
      }
      setComments(arr);
    };
    getComments();
  }, [postData]);

  return (
    <div>
    {
        comments==null? <CircularProgress/> :
        <>
        {
            comments.map((comment,index)=>(
                <div style={{display:'flex',border:"1px solid black",marginTop:"1rem"}}>
                    <Avatar  src={comment.uProfileImage}/>
                    <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>
                </div>
            ))
           
        }
        </>
    }
</div>
  );
};

export default Comments;
