import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import { format } from "number-currency-format";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CartProductBox({
  color,
  productId,
  sizeSelection,
  amountSelection,
  name,
  price,
  image,
  num,
  setCartSYstem,
  user,
  setBill,
  setSubBill,
  setDelivery,
  setloading,
  loading
}) {


  const [ItemFinalPrice, setItemFinalPrice] = useState(0);

  const navigate = useNavigate();
  // console.log(item);



  const openTheProduct =()=>{
    console.log(productId)
   navigate(`/product/${productId}`)
  }
  





  useEffect(() => {
    setItemFinalPrice(price * amountSelection)
  }, [price,amountSelection])



  const CartUpdate = (defineAction) => {
    if (loading === false) {
    setloading(true)
    const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    if (defineAction === "delete") {
      if (UserInfo) {
        UserInfo.Cart = UserInfo.Cart.filter(item => item.num !== num);
        localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
        setCartSYstem((current) => !current);
        ModifiedBill(defineAction, num); 
      }
    }
    if (defineAction === "add") {
      if (UserInfo) {
        UserInfo.Cart = UserInfo.Cart.map(item => {
          if (item.num === num) {
            if (item.AmountSelection >= 5) {
              setloading(false);
              return item;
            }
            ModifiedBill(defineAction, num);
            return {...item, AmountSelection: item.AmountSelection + 1};
          } else {
            return item;
          }
        });
        localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
        setCartSYstem((current) => !current); 
      }
    }

    if (defineAction === "minus") {
      if (UserInfo) {
        UserInfo.Cart = UserInfo.Cart.map(item => {
          if (item.num === num) {
            if (item.AmountSelection <= 1) {
              setloading(false);
              return item;
            }
            ModifiedBill(defineAction, num);
            return {...item, AmountSelection: item.AmountSelection - 1};
          } else {
            return item;
          }
        });
        localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
        setCartSYstem((current) => !current); 
      }
    }
  }
  }


  const ModifiedBill = async (
    defineAction,num
    ) => {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_NOTE_BACK}/ModifiedBill`,{defineAction,num},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (data < 2000) {
          console.log(loading)
          setBill(data + 225)
          setSubBill(data)
          setDelivery(225)
          setloading(false)
        }else if(data > 2000){
          console.log(loading)
          setBill(data)
          setSubBill(data)
          setDelivery("FREE")
          setloading(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  



  return (
    <div id="ProductBoxInCart">
      <img onClick={openTheProduct} src={image} alt="" />
      <div id="ProductDetailsInCart">
        <div id="NameInCart">{name}</div>
        <div id="ColorAndSizeInCart">
          <div style={{ backgroundColor: color }} id="ColorInCart"></div>•
          <div id="SizeInCart">{sizeSelection}</div>
        </div>

        <div id="QuantityInCart">
          <div onClick={() => CartUpdate("minus")}
            style={{ borderRight: "1px solid black" }}
            className="plusminusInCart"
          >
            -
          </div>
          <div>{amountSelection}</div>
          <div onClick={() => CartUpdate("add")}
            style={{ borderLeft: "1px solid black" }}
            className="plusminusInCart"
          >
            +
          </div>
        </div>

        <div id="PriceIncART">{`₹. ${
          price ? format(ItemFinalPrice) : ""
        }`}</div>
        <div onClick={() => CartUpdate("delete")} id="DeleteInCart">
          <IconContext.Provider
            value={{
              color: "black",
              size: "20",
              className: "global-class-name",
            }}
          >
            <MdDelete />{" "}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
