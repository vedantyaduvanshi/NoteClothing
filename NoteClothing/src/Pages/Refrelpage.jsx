import React from "react";
import "./ReferPage.css";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";

export default function Refrelpage() {
  return (
    <div id="ReferPage">
      <div id="RefrelHeadSection">
        <h1 id="referheading">
          Invite your loved ones and receive a lifelong 6.7% commission on every
          purchase made by them .
        </h1>
        <div id="BoxrEFERbOSS">
          <div className="BoxRefrr">
            {" "}
            <IconContext.Provider
              value={{
                size: "100",
                className: "global-class-name",
              }}
            >
              <FaPeopleCarryBox />{" "}
            </IconContext.Provider>
          </div>
          <div className="BoxRefrr">
          <IconContext.Provider
              value={{
                size: "100",
                className: "global-class-name",
              }}
            >
              <FaCircleDollarToSlot />{" "}
            </IconContext.Provider>
          </div>
          <div className="BoxRefrr">
          <IconContext.Provider
              value={{
                size: "100",
                className: "global-class-name",
              }}
            >
              <FaUserClock />{" "}
            </IconContext.Provider>
          </div>
        </div>
        <div id="bOXTEXTrEFER">
          <div style={{left:"30%"}}>REFER</div>
          <div style={{ }}>EARN</div>
          <div style={{right:"28%"}}>LIFETIME</div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
