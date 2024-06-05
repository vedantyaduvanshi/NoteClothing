import React from 'react'
import "./Notification.css";
import { IconContext } from 'react-icons';
import { TbShoppingCartFilled } from 'react-icons/tb';

export default function 
({Error}) {
  return (
    <div id='NotificationRight'>
        <div id='LogoOfNoti'>
        <IconContext.Provider
                    value={{
                      color: "white",
                      size: "20",
                      className: "global-class-name",
                    }}
                  >
                    <TbShoppingCartFilled />
                  </IconContext.Provider>
        </div>
        <div id='TextOfNoti'>{Error}</div>
    </div>
  )
}
