import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import "./Signup.css";
import SignUpComponent from "../Components/SignUpComponent";
import { useNavigate } from "react-router-dom";
export default function SignUp() {

  const navigate = useNavigate();



  
  return (
    <>

      <div id="SignUpSection">
        <h1>WELCOME</h1>

<SignUpComponent/>
            <p id="AlreadyACCOUNTlINE">Already have an Account ? <span onClick={()=>{navigate("/login")}}>Sign In</span></p>
      </div>
    </>
  );
}
