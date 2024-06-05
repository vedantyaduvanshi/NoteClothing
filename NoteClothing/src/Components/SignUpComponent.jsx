import {Formik,Form} from "formik";
import React, { useState } from 'react'
import * as Yup from "yup"
import SignUpInput from './SignUpInput';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { ColorRing } from "react-loader-spinner";

export default function SignUpComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const userInfos={
    first_name:"",
    last_name:"",
    email:"",
    password:""
  }

  const [user, setUser] = useState(userInfos);
  const {first_name,last_name,email,password} = user
  const handleRegisterChange = (e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }

  const registerValidation = Yup.object({
    first_name:Yup.string().required("Wait! You don't have a name ?")
    .min(2,"Name must be at least 2 characters")
    .max(22,"Name must be at most 22 characters")
    .matches(/^[aA-zZ]+$/, "Spaces, Numbers and Special characters not allowed!"),
    last_name:Yup.string().required("Wait! You don't have a last name ?")
    .min(2,"Last Name must be at least 2 characters")
    .max(22,"Last Name must be at most 22 characters")
    .matches(/^[aA-zZ]+$/, "Spaces, Numbers and Special characters not allowed!"),
    email: Yup.string()
    .required("Email is required.")
    .email("Enter a valid email address."),
    password:Yup.string()
    .required("Take your time, set a strong password.")
    .min(9,"Weak , password must be at least 9 characters")
    .max(45, "Password must be at most 45 characters")
   })

   const [error,setError] = useState("")
   const [success,setSuccess] = useState("")




   const registerSubmit = async()=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_NOTE_BACK}/register`,
        {
        first_name,
        last_name,
        email,
        password
      });
      setError("");
      setSuccess(data.message);
      const {message, ...rest} = data;
      dispatch({type:"LOGIN", payload:rest});
      Cookies.set("user", JSON.stringify(rest));
      setLoading(false)
      navigate("/verify")
    } catch (error) {   
      setSuccess("");
      setError(error.response.data.message)
      setLoading(false)
    }
   }




  return (
<>
    <Formik
    enableReinitialize
    initialValues={{
      first_name,
      last_name,
      email,
      password,
    }}
    validationSchema={registerValidation}
    onSubmit={()=>{
      registerSubmit();
      setLoading(true);
    }}
    >

          {
            (formik)=>(
              <Form id="signUpForm" action="#" >

           <div id="FirstNameLastName">
        
         <SignUpInput onChange={handleRegisterChange}  type="text" placeholder="First Name" name="first_name" className="nameSectionSignp"/>

          <SignUpInput onChange={handleRegisterChange} type="text" placeholder="Last Name" name="last_name" className="nameSectionSignp"/>
           
          </div>



          <SignUpInput id="EmailInputSignUp" onChange={handleRegisterChange} type="text" placeholder="Email" name="email"/>


          <SignUpInput id="PasswordSignUp"  onChange={handleRegisterChange}  type="password" placeholder="Set a Strong Password" name="password"/>


          {/* <SignUpInput id="PasswordSignUp"  type="password" placeholder="Confirm Password" name="password2"/> */}

         <p id="termsSignp">By creating an account you agree to our <Link  to="/terms">Terms & Privacy</Link>.</p>
         <div id="ButtonAndError">
          <div id="errorText">
          {error && <div>{error}</div>}
          </div>
         {/* {success && <div id='SuccesText'>{success}</div>} */}
         <button type="submit" id="SignUpButton">
         {!loading ? (
             "SIGN UP"
                ) : (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                    ]}
                  />
                )}
         </button>
         </div>
        
              </Form>
            )
          }


    </Formik>
</>
  )
}
