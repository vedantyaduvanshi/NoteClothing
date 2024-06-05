import React from 'react'
import { GrLinkNext } from "react-icons/gr";
import { IconContext } from "react-icons";

export default function OrderDetailsInProfile() {
  return (
    <div className="MainDivInProfile">
    <h4>My Orders</h4>
    <div className="ProfileDivsInProfile">
      <h5>Order Shipping And Tracking Starts 1st April !</h5>
      <h6>In Progress</h6>
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











  </div>
  )
}
