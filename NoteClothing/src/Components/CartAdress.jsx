import React, { useRef, useState } from 'react'
import "./CartAddress.css";
import { IconContext } from 'react-icons';
import { CiCirclePlus } from 'react-icons/ci';
import AddAddress from './AddAddress';
import { useNavigate } from 'react-router-dom';
import { number } from 'yup';

export default function CartAdress({setCheckOutSteps,InfoOfUser,Error,setNumber,Numbers,Error2 ,setError2}) {
  const navigate = useNavigate();

  const NumRef = useRef()

  const [NumSuccess, setNumSuccess] = useState("");


  const CheckNumber=()=>{
    if (NumRef.current.value.length === 10) {
      setNumber(NumRef.current.value)
      setNumSuccess("Number Saved")
      setError2("")
    }else{
      setNumSuccess("Input correct Number.")
    }
  }

  return (
    <div id='YourCartSection'>
        <div onClick={()=>setCheckOutSteps(1)}  id="BackInCartPage">
        Back
      </div>
      <h1>DELIVERY ADDRESS</h1>



      {
        InfoOfUser?.details && 
        <div className='InformationDivInCART'>
        <h4>{InfoOfUser?.details?.AddressLine1}</h4>
        <h5>{InfoOfUser?.details?.AddressLine2}</h5>
       <div> <span>{InfoOfUser?.details?.City}</span><span> , {InfoOfUser?.details?.Pincode}</span></div>
        <h5>{InfoOfUser?.details?.State}</h5>
      </div>
      }

      {
        !InfoOfUser?.details && 
        <>
        <div  onClick={() => navigate("/profile")} id="AddAddess">
          <IconContext.Provider
            value={{
              color: "black",
              size: "30 ",
              className: "global-class-name",
            }}
          >
            <CiCirclePlus />{" "}
          </IconContext.Provider>

          <h4>Add Address to <br /> your Profile</h4>
      </div>
      {Error && <span id='ErrorAddresCheckoUT'>{Error}</span>}
      </>
      }

       


      <div className='DeliveryInfoCart'>
        <h4>Standard Delivery</h4>
         <p>All pre-orders placed now will begin shipping on April 1st, 2024. As a thank you for your early support, we're offering a 20% off discount on all pre-orders.</p>
      </div>
      <div className='DeliveryUpdatesCart'>
         <p>You will receive delivery updates through email and your provided  <br /> phone number for seamless communication regarding your order status.</p>
      </div>

      <div id='PhoneNumberEnterOrdeer'>
       <h5>Please enter the phone number on which you want to receive delivery updates.</h5>
       <div id='PhoneNumberInputBoss'>
       <div>+91</div>
       <div>{Number}</div>
        {
           Number &&
           <>
            <input ref={NumRef} maxLength={10} type="text" />
           </>
        }
        {
         Number &&<button onClick={CheckNumber}>Save</button>
        }
       </div>
       <h6 style={{marginTop: "10px"}}>{NumSuccess}</h6>
       <h6 style={{marginTop: "10px"}}>{Error2}</h6>
      </div>

    </div>
  )
}
