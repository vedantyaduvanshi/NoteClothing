import React from "react";

import "./Login.css";

import LogInComponent from "../Components/LogInComponent";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  return (
    <>
      <div id="LogInSection">
        <h1>WELCOME BACK</h1>


        

        <LogInComponent/>




        <p id="NotAlreadyAccount">
          Not a member? <span onClick={()=>{navigate("/register")}}>Sign Up</span>
        </p>
      </div>
    </>
  );
}
