import React, { useEffect, useRef, useState } from 'react'
import "./EmailVerify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';



export default function EmailVerify() {
  const navigate = useNavigate();
  const [error,seterror] = useState("")
  const [Loading,setLoading] = useState(false)

  const inputRef = useRef(); // Corrected ref name

    const InfoOfUser = JSON.parse(localStorage.getItem('UserInfo')); 
    const email = InfoOfUser?.email

    useEffect(() => {
      if (!InfoOfUser) {
         window.location.reload()
      }
      if (InfoOfUser && InfoOfUser?.verified === true) {
        navigate("/feed"); // Assuming '/feed' is the path to redirect after verification
      }
  
    }, [InfoOfUser ])

    const ChecktheCode=async()=>{
      const code = inputRef.current.value; 
  
      if (code.length === 5) {
        setLoading(true)
        try {
          const {data} = await axios.post(`${import.meta.env.VITE_NOTE_BACK}/validateCode`,
            {
            email,
            code
          });
          if (data.message === "You have successfully verified your account.") {
            // Update the verified status in local storage
            const updatedInfoOfUser = { ...InfoOfUser, verified: true };
            localStorage.setItem('UserInfo', JSON.stringify(updatedInfoOfUser));
          }
          console.log(data)
          navigate("/feed")
          setLoading(false)
        } catch (error) {   
          console.log(error)
          setLoading(false)
          seterror("Invalid VerificationCode")
        }

      }

      seterror("Invalid VerificationCode")
      }
    
  return (
    <div id='EmailVerify'>
        <h2>Email verification</h2>
        <p>An email verification code was just sent to <b>{InfoOfUser?.email}</b></p>
        <span>If you dont see the email in your inbox, be sure to check your <u>spam</u> folder as well.</span>
        <input ref={inputRef} placeholder='Verification Code' type="number" />
         <h4>Resend Verification</h4>
         <button onClick={ChecktheCode}>         {!Loading ? (
             "Verify"
                ) : (
                  <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "black",
                      "black",
                      "black",
                      "black",
                      "black",
                    ]}
                  />
                )}</button>

                <span>{error}</span>
    </div>
  )
}
