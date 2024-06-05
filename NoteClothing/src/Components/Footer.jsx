import React from 'react'
import { RiInstagramFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";
import { useNavigate } from 'react-router-dom';

export default function Footer() {

  const navigate = useNavigate();
  return (
<footer id="footer">
        <div id="footerfirst">
          <div id="EmailList">
            <h2>LETS BE PEN PALS</h2>
            <p>
              We'll cut the right to chase - sign up for exclusive access to new
              products, free sruff and more.
            </p>

            <div id="emailinFoooter">
              <input placeholder="Email Address" type="email" name="" id="" />
              <button>SUBMIT</button>
            </div>
            <span>Text us at +917266997771</span>
          </div>
          <div className='hide3' id="ShopFooter">
            <h2 onClick={()=>{navigate("/feed")}}>SHOP</h2>
            <div onClick={()=>{navigate("/feed")}}>Sweatshirts</div>
            <div onClick={()=>{navigate("/feed")}}>Tshirts</div>
            <div>Coming Soon</div>
          </div>
          <div id="CompanyFooter">
            <h2>COMPANY</h2>
            <div onClick={()=>{navigate("/policy")}}>Policy</div>
            <div onClick={()=>{navigate("/terms")}}>Terms and Conditions</div>
            <div onClick={()=>{navigate("/return")}}>Return Policy</div>
            <div onClick={()=>{navigate("/shippingPolicy")}}>Shipping Policy</div>
          </div>
          <div id="ContactFooter">
            <h2>CONNECT</h2>
            <div onClick={()=>{navigate("/contact")}}>Contact Us</div>
            <div id="SocialFooter">
              <div onClick={()=>{window.open('https://www.instagram.com/noteclothing_/', '_blank', 'noopener')}}>
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "25",
                    className: "global-class-name",
                  }}
                >
                  
                  <RiInstagramFill />{" "}
                </IconContext.Provider>
              </div>
              {/* <div>
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "25",
                    className: "global-class-name",
                  }}
                >
                  <FaFacebook />{" "}
                </IconContext.Provider>
              </div> */}
              <div onClick={()=>{window.open('https://twitter.com/Noteclothing_', '_blank', 'noopener')}}>
                <IconContext.Provider
                  value={{
                    color: "white",
                    size: "25",
                    className: "global-class-name",
                  }}
                >
                  <FaXTwitter />{" "}
                </IconContext.Provider>
              </div>
            </div>
          </div>
        </div>
        <div id="footersecond">
          <h1>NOTE.</h1>
          <span>2023-2025 Note © All right revered.</span>
        </div>
      </footer>
  )
}
