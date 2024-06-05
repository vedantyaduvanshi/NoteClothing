import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { TbShoppingCartFilled } from "react-icons/tb";
import { IconContext } from "react-icons";
import SearchMenu from "./SearchMenu";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

export default function Navbar({Nanavbarcolorvbar,CartSYstem}) {
  const navigate = useNavigate();
  const [showSearchMenu, setShowSearchMenu] = useState(false);


  const [CurrentCartValue, setCurrentCartValue] = useState();

  useEffect(() => {
    const InfoOfUser = JSON.parse(localStorage.getItem('UserInfo')); 
    setCurrentCartValue(InfoOfUser?.Cart?.length);
  }, [CartSYstem])




  
  return (
    <>
    <nav style={{backgroundColor: Nanavbarcolorvbar ? "white"  : "transparent" , top: Nanavbarcolorvbar ? "0"  : "30px"}} id="NavBarHome">
      <div id="LeftOptionOfNavbar">
        <h3 onClick={()=> navigate("/feed")}>SHOP</h3>
        <h3 id="hide1">OUR STORY</h3>
        <h3 id="hide2">EARN</h3>
      </div>
      <div id="TitleNavbar" onClick={()=> navigate("/")}>NOTE.</div>
      <div id="RightOptionOfNavbar">
        {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}

        {!showSearchMenu && (
          <div id="hide1"
            onClick={() => {
              setShowSearchMenu(true);
            }}
          >
            <IconContext.Provider
              value={{
                color: "black",
                size: "20",
                className: "global-class-name",
              }}
            >
              <FaSearch />
            </IconContext.Provider>
          </div>
        )}
        <div onClick={()=> navigate("/profile")}>
          <IconContext.Provider
            value={{
              color: "black",
              size: "20",
              className: "global-class-name",
            }}
          >
            <FaUser />{" "}
          </IconContext.Provider>
        </div>
        <div id="hide2"  onClick={()=> navigate("/cart")}>
          <IconContext.Provider
            value={{
              color: "black",
              size: "20",
              className: "global-class-name",
            }}
          >
            <TbShoppingCartFilled />{" "} 
            <span id="CartAmountInNavbar" key={CurrentCartValue}>{CurrentCartValue}</span>
          </IconContext.Provider>
        </div>
      </div>
    </nav>

    <div id="FloatingCart">
    <div  onClick={()=> navigate("/cart")}>
          <IconContext.Provider
            value={{
              color: "white",
              size: "20",
              className: "global-class-name",
            }}
          >
            <TbShoppingCartFilled />{" "} 
            <span id="CartAmountInNavbar" key={CurrentCartValue}>{CurrentCartValue}</span>
          </IconContext.Provider>
        </div>
    </div>
    </>
  );
}
