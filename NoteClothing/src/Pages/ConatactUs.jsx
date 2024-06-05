import React, { useEffect } from 'react'
import "./Contactus.css";
import Footer from '../Components/Footer';


export default function ConatactUs() {
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
      }, [])
  return (
    <>
    <div id='ContactUs'>
        <h2>CONTACT US</h2>
        <h4>We encourage you to contact us if you experience any issues with our website, delivered clothing, or have questions.  Our contact information is provided below.</h4>
        <div id='ContactInformation'>
            <h5>Jaipur-Ajmer Express Highway, Dehmi Kalan, Near GVK Toll Plaza, Jaipur, Rajasthan,303007</h5>
            <h5>+917266997771</h5>
            <h5>note-clothing@outlook.com</h5>
        </div>
      
    </div>
    <Footer/>
    </>
  )
}
