import React, { useRef } from 'react'
import useClickOutside from '../helpers/ClickOutside';
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";



export default function SearchMenu({setShowSearchMenu}) {
    const menu = useRef(null);
    useClickOutside(menu,()=>{
        setShowSearchMenu(false);
    })
  return (
        <div id='SearchStuff' ref={menu}>
        <input type="text" />
        <div>
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
       </div>
  )
}
