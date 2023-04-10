import React, { useState } from "react";
 
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleClick = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("email sent to reset password");
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
    >
      <label for="email">Enter Email</label>
      <input
        type="email"
        placeholder="Enter email for reseting your password"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={handleClick}>Reset Password</button>
    </div>
  );
};

export default ForgotPassword;
