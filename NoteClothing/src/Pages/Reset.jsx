import React, { useState } from 'react'

import "./Reset.css";

export default function Reset() {


  const [reset, setreset] = useState(1);


  return (
    <>
      <div id="ResetSecion">
        <h1>Reset password</h1>

{  reset === 1 &&       <>
        <h4 id='SubPasswordReset'>Enter your registered email to reset your password.</h4>
      
       <input placeholder='Email' type="email" name="" id="mailReset" />

        <button id='SendOtpEmailPassReset'>Send Reset Code</button>
        </>}

{   reset === 2 &&   <>   <h4 id='SubPasswordReset'>Enter the Reset Code that was sent to your mail.</h4>
      
      <input placeholder='Code' type="text" name="" id="mailReset" />

       <button id='SendOtpEmailPassReset'>Verify</button>
       </>}


{  reset === 3 &&   <>
      <h4 id='SubPasswordReset'>Set New Password for your account.</h4>
      
      <input placeholder='Set new Password' type="password" name="" id="mailReset" />

       <button id='SendOtpEmailPassReset'>Done</button>
       </>
}

      </div>

    </>
  )
}
