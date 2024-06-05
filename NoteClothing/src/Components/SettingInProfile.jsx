import React from 'react'
import { GrLinkNext } from "react-icons/gr";
import { IconContext } from "react-icons";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

export default function SettingInProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logout =()=>{
    Cookies.set("user", "")
    dispatch({
    type:'LOGOUT',
    });
    localStorage.clear();
    navigate("/reset");
    }
    
  return (
    <div className="MainDivInProfile">
    <h4>Settings And Security</h4>
    <div onClick={() => logout()} className="ProfileDivsInProfile">
      <h5>Change Password</h5>
      <h6>Change your current Note Account Password.</h6>
      <div id="EnterInPROFILEpAGE">
        <IconContext.Provider
          value={{
            color: "black",
            size: "15",
            className: "global-class-name",
          }}
        >
          <GrLinkNext />{" "}
        </IconContext.Provider>
      </div>
    </div>
    <div onClick={() => navigate("/contact")} className="ProfileDivsInProfile">
      <h5>My Personal Data</h5>
      <h6>
        Request a copy of your data or choose to delete your information.
      </h6>
      <div id="EnterInPROFILEpAGE">
        <IconContext.Provider
          value={{
            color: "black",
            size: "15",
            className: "global-class-name",
          }}
        >
          <GrLinkNext />{" "}
        </IconContext.Provider>
      </div>
    </div>
    <div className="ProfileDivsInProfile">
      <h5>Dark Mode</h5>
      <h6>Coming Soon</h6>
    </div>
  </div>
  )
}
