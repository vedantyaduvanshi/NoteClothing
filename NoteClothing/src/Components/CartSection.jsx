import React from 'react'
import { FaFeatherPointed } from "react-icons/fa6"
import { IconContext } from "react-icons";
import CartProductBox from './CartProductBox';
import { useNavigate } from 'react-router-dom';

export default function CartSection({InfoOfUser
    ,setCartSYstem
    ,user,
    setBill,
    setSubBill,
    setDelivery,
    setloading,
    loading
}) {
    const navigate = useNavigate();
  return (
    <div id="YourCartSection">
      <div onClick={() => navigate(-1)} id="BackInCartPage">
        Back
      </div>
    <h1>YOUR BAG</h1>
    {InfoOfUser?.Cart?.map((item, index) => (
      <CartProductBox
        key={index}
        color={item.ColorSelection}
        productId={item.productId}
        sizeSelection={item.SizeSelection}
        amountSelection={item.AmountSelection}
        name={item.name}
        price={item.price}
        image={item.image}
        num={item.num}
        setCartSYstem={setCartSYstem}
        user={user}
        setBill={setBill}
        setSubBill={setSubBill}
        setDelivery={setDelivery}
        setloading={setloading}
        loading={loading}
      />
    ))}

    {InfoOfUser?.Cart?.length === 0 && (
      <div id="EmptyCart">
        <IconContext.Provider
          value={{
            color: "#1f1f1e",
            size: "52",
            className: "global-class-name",
          }}
        >
          <FaFeatherPointed />{" "}
        </IconContext.Provider>
        <h2>Your Shopping Bag is feeling light as a feather, empty.</h2>
      </div>
    )}
  </div>
  )
}
