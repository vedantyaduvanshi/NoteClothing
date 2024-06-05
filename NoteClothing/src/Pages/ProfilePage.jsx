import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { MdNavigateNext, MdSupportAgent } from "react-icons/md";
import { IconContext } from "react-icons";
import ProfileDetails from "../Components/ProfileDetails";
import OrderDetailsInProfile from "../Components/OrderDetailsInProfile";
import SettingInProfile from "../Components/SettingInProfile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";


export default function ProfilePage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [ProfileMenuNum, setProfileMenuNum] = useState(1);
  
  const [ProfileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    const InfoOfUser = JSON.parse(localStorage.getItem('UserInfo')); 
    if (InfoOfUser === null) {
      getProfile()
    }
    setProfileInfo(InfoOfUser)
    console.log("hi")
  }, [])




  const getProfile = async()=>{
    try {
     
      
       const {data} = await axios.get(`${import.meta.env.VITE_NOTE_BACK}/getProfile`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         if(data.ok === false){
          navigate("/")
         }else{
          setProfileInfo(data)
          localStorage.setItem("UserInfo", JSON.stringify(data))
         }

    } catch (error) {
      if(error.response.data === "Invalid Authentication")
      console.log("sahi hai bahai")
      logout()
    }
  }
  

  const logout =()=>{
    Cookies.set("user", "")
    dispatch({
    type:'LOGOUT',
    });
    localStorage.clear();
    navigate("/");
    }
    

  return (
    <div id="ProfilePage">



      <div id="ProfileOption">

      <div onClick={() => navigate(-1)} id="BackOptionProfile">
       Back
      </div>





        <div className="AcountOption" onClick={()=> setProfileMenuNum(1)}>
          <div className="NameOption">Profile</div>{" "}
          <div className={ProfileMenuNum === 1 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div className="AcountOption" onClick={()=> setProfileMenuNum(2)}>
          <div className="NameOption">My purchases</div>{" "}
          <div className={ProfileMenuNum === 2 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div className="AcountOption" onClick={()=> setProfileMenuNum(3)}>
          <div className="NameOption">Account settings</div>{" "}
          <div className={ProfileMenuNum === 3 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={() => navigate("/contact")} className="AcountOption">
          <div className="NameOption">Contact us</div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={()=>{logout();}} className="AcountOption">
          <div className="NameOption">Sign out</div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={() => navigate("/contact")} className="AcountOption">
          <div className="NameOption">Help us improve</div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>
      </div>




      















       <div className="ProfileOptionIconMode" >

      <div onClick={() => navigate(-1)} id="BackOptionProfile">
       Back
      </div>





        <div className="AcountOption" onClick={()=> setProfileMenuNum(1)}>
          <div className="NameOption">
          <IconContext.Provider
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <FaUser />{" "}
            </IconContext.Provider></div>{" "}
          <div className={ProfileMenuNum === 1 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div className="AcountOption" onClick={()=> setProfileMenuNum(2)}>
          <div className="NameOption">
          <IconContext.Provider
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <FaCartShopping />{" "}
            </IconContext.Provider>
            </div>{" "}
          <div className={ProfileMenuNum === 2 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>
        
        <div className="AcountOption" onClick={()=> setProfileMenuNum(3)}>
          <div className="NameOption">
          <IconContext.Provider 
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <IoMdSettings />{" "}
            </IconContext.Provider>
            </div>{" "}
          <div className={ProfileMenuNum === 3 ? 'IconOption1': "IconOption"}>
            <IconContext.Provider
              value={{
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={() => navigate("/contact")} className="AcountOption">
          <div className="NameOption">
          <IconContext.Provider 
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <MdSupportAgent />
            </IconContext.Provider></div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={()=> logout()} className="AcountOption">
          <div className="NameOption">
             <IconContext.Provider 
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <FaSignOutAlt />
            </IconContext.Provider></div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>

        <div onClick={() => navigate("/contact")} className="AcountOption">
          <div className="NameOption">
          <IconContext.Provider 
              value={{
                size: "15",
                className: "global-class-name",
              }}
            >
              <VscFeedback />
            </IconContext.Provider></div>{" "}
          <div className="IconOption">
            <IconContext.Provider
              value={{
                color: "black",
                size: "25",
                className: "global-class-name",
              }}
            >
              <MdNavigateNext />{" "}
            </IconContext.Provider>
          </div>
        </div>
      </div>











      <div id="DetailsProfile">

        {
          ProfileMenuNum === 1 && (
            <ProfileDetails ProfileInfo={ProfileInfo}/>
          )
        }

        {
          ProfileMenuNum === 2 && (
            <OrderDetailsInProfile/>
          )
        }


        {
          ProfileMenuNum === 3 && (
            <SettingInProfile/>
          )
        }

      </div>
    </div>
    
  );
}
