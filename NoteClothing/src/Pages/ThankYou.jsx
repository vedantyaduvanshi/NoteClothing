import React, { useRef, useState } from 'react'
import "./ThankYou.css"
import { useEffect } from 'react'

export default function ThankYou() {
  

  useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      localStorage.removeItem("UserInfo");
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);
  return (
    <div id='ThankYouPage'>
        <h1>THANK YOU</h1>
        <h1>YOUR ORDER</h1>
        <h1>IS CONFRIRMED!</h1>

        <p>Thank you for Shopping with us.</p>
        <span>We will send you a confirmation once your package is shipped.</span>

        <button>Continue Shopping</button>
    </div>
  )
}
