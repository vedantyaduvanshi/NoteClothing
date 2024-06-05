import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format } from "number-currency-format";
import SinglePageContext from "./SinglePageContext";
import { LikeItem } from "../functions/LikeItem";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function ProductBox({ item,token,InfoOfUser,setCartSYstem }) {
  console.log(item)
  const {ChangeItem} = useContext(SinglePageContext);
  const navigate = useNavigate();

  const [IsLike, setIsLike] = useState(false);

  const [LikeUpdate, setLikeUpdate] = useState(false);



  const openTheProduct =()=>{
   ChangeItem(item);
   navigate(`/product/${item._id}`)
  }
  


  const Likeitem =async()=>{
    const itemid = item._id
    console.log(item._id,token)
    //I want to add the liked item id to the Local storage userinfo.Likeditems

    if (InfoOfUser) {
      // Check if itemId exists in the likeItems array
      const index = InfoOfUser.likeItems.indexOf(itemid);
  
      if (index > -1) {
        // Item exists, remove it
        InfoOfUser.likeItems.splice(index, 1);
      } else {
        // Item does not exist, add it
        InfoOfUser.likeItems.push(itemid);
      }
  
      // Save updated userInfo back to local storage
      setCartSYstem((current) => !current);
      localStorage.setItem('UserInfo', JSON.stringify(InfoOfUser));
      setLikeUpdate((current) => !current);
    }
    await LikeItem(
      itemid,token
    );

  }


  useEffect(() => {

    if (InfoOfUser) {
      const itemid = item._id
      const index = InfoOfUser.likeItems.indexOf(itemid);
      if (index > -1) {
        setIsLike(true)
      }else{
        setIsLike(false)
      }
    }

  }, [LikeUpdate])
  


  return (
    <div  className="ProductBox">
      <div id="ImagePoductBox">
      <LazyLoadImage onClick={openTheProduct}
    alt={"Loading"}
    effect="blur"
    src={item.images[0].images[0]} />

        <div  id="Color-ProductFeed">
          {item?.availability.map((colorObj, index) => (
            <div key={index} style={{ backgroundColor: colorObj.color }}></div>
          ))}
        </div>
      </div>

      <div id="ProductDetailProductBox">
        <div  onClick={openTheProduct} id="Sub-Cat-ProductBox">{item?.category}</div>
        <div  onClick={openTheProduct} id="Name-ProductBox">{item?.name}</div>
        <div  onClick={openTheProduct} id="Price-StcokInfo-ProductBox">
          <span>{`₹. ${item ? format(item.price) : ""}`}</span>
          <span>New Arrival</span>
        </div>
        <div onClick={Likeitem} id="LikeProduct-ProductFeed">
{ IsLike &&         <IconContext.Provider
            value={{
              color: "black",
              size: "20",
              className: "global-class-name",
            }}
          >
            <FaHeart />{" "}
          </IconContext.Provider>}

          { !IsLike &&         <IconContext.Provider
            value={{
              color: "#636262",
              size: "20",
              className: "global-class-name",
            }}
          >
            <FaHeart />{" "}
          </IconContext.Provider>}
        </div>
      </div>
    </div>
  );
}
