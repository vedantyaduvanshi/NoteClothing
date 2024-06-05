import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { ColorRing } from "react-loader-spinner";
import { chooserandom } from "../functions/randomline";
import { IconContext } from "react-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { format } from "number-currency-format";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import CartSection from "../Components/CartSection";
import CartAdress from "../Components/CartAdress";

export default function CartPage({ setCartSYstem }) {
  const InfoOfUser = JSON.parse(localStorage.getItem("UserInfo"));
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [currentLine, setCurrentLine] = useState("Reticulating splines...");
  const [shouldUpdate, setShouldUpdate] = useState(false); // new state variable
  const [loading, setloading] = useState(false); // new state variable
  const [DiscountWindow, setDiscountWindow] = useState(false); // new state variable
  const [CheckOutSteps, setCheckOutSteps] = useState(1);
  const [Error, setError] = useState("");
  const [Error2, setError2] = useState("");

  const [Bill, setBill] = useState();
  const [SubBill, setSubBill] = useState();
  const [Delivery, setDelivery] = useState();
  const [Number, setNumber] = useState("");

  useEffect(() => {
    if (shouldUpdate) {
      const timer = setTimeout(() => {
        setCurrentLine(chooserandom());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentLine,shouldUpdate]);

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    setloading(true);
    GetBillFinal();
  }, []);

  const GetBillFinal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_NOTE_BACK}/FinalBill`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data < 2000 && data !== 0) {
        setBill(data + 225);
        setSubBill(data);
        setDelivery(225);
        setloading(false);
      } else if (data > 2000) {
        setBill(data);
        setSubBill(data);
        setDelivery("FREE");
        setloading(false);
      } else if (data === 0) {
        setBill(data);
        setSubBill(data);
        setDelivery("FREE");
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const ContinuetoAddress=()=>{
    if (SubBill > 0) {
      setCheckOutSteps(2)
    }
  }

  const ContinuetoCheckout=()=>{
    if (!InfoOfUser?.details) {
      setError("Update Delivery Address in your Profile.")
    }else if(!Number){
      setError2("Enter your Mobile Number")
    }else{
      setError("")
      setError2("")
      setCheckOutSteps(3)
    }
  }


  //payment Intiate

  const ContinueToPay=()=>{
    setShouldUpdate(true)
    setloading(true)
    PaymentHandler();
  }

  let FinalOrderCart;
  let FinalBill;

  const PaymentHandler = async () => {

    FinalOrderCart = InfoOfUser?.Cart;
    FinalBill = Bill;


    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_NOTE_BACK}/order`,
        {Bill},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      var options = {
        "key": import.meta.env.VITE_RAZOR, // Enter the Key ID generated from the Dashboard
        "amount": data.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "NOTE", //your business name
        "description": "NOTE CLOTHING",
        "image": "https://note-content-private-limited.blr1.cdn.digitaloceanspaces.com/note.jpeg",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){

          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_signature = response.razorpay_signature;
          

          const { data } = await axios.post(
            `${import.meta.env.VITE_NOTE_BACK}/order/validate`,
            {razorpay_order_id,razorpay_payment_id,razorpay_signature,FinalOrderCart,FinalBill,Number},
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (data.message = "Success") {
             navigate("/thank")
          }else{
            localStorage.removeItem("UserInfo");
          }
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": InfoOfUser?.first_name,//your customer's name
            "email": InfoOfUser?.email, 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
           "name": InfoOfUser?.first_name,
            "User_id": InfoOfUser?._id,
            "email": InfoOfUser?.email, 
        },
        "theme": {
            "color": "#01ae8b"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
      alert("Payment Failed");
    });
        rzp1.open();
        e.preventDefault();
      
        
    } catch (error) {
      console.log(error);
    }


  };


  return (
    <div id="CartPage">
      {loading && <div id="LoadingInCart"></div>}
      {CheckOutSteps === 1 && (
        <CartSection
          InfoOfUser={InfoOfUser}
          setCartSYstem={setCartSYstem}
          user={user}
          setBill={setBill}
          setSubBill={setSubBill}
          setDelivery={setDelivery}
          setloading={setloading}
          loading={loading}
        />
      )}

{
  CheckOutSteps === 2 &&
  <CartAdress Error={Error} Number={Number} Error2={Error2} setNumber={setNumber} setError2={setError2} InfoOfUser={InfoOfUser} setCheckOutSteps={setCheckOutSteps} />
}

     <div id={CheckOutSteps === 3 ? "FullPagCheckout" : "CheckOutSection"}>
        {!loading && (
          <>
          <div id={CheckOutSteps === 3 ? "FullPagecheckoutBox" : ""} >
            <div id="BillCheckout">
              <div className="BillDiv">
                <div className="BILLtITLE" id="BoldinBill">
                  Subtotal
                </div>
                <div className="BillValue" id="BoldinBill">
                  {" "}
                  {`₹.  ${SubBill ? format(SubBill) : "0.00"}`}
                </div>
              </div>

              <div className="BillDiv">
                <div className="BILLtITLE" id="lightinBill">
                  Delivery Charge
                </div>
                <div className="BillValue" id="lightinBill">{`₹.  ${
                  Delivery ? format(Delivery) : ""
                }`}</div>
              </div>

              <hr id="hrAroundTotalBill" />
              <div className="BillDiv">
                <div className="BILLtITLE" id="BoldinBill">
                  Total
                </div>
                <div className="BillValue" id="BoldinBill">
                  {" "}
                  {`₹.  ${Bill ? format(Bill) : "0.00"}`}
                </div>
              </div>
            </div>

{   CheckOutSteps === 3 &&         <div id="ApplyDiscountsInCheckouts">
              {!DiscountWindow && (
                <>
                  <div>Discounts</div>
                  <div
                    onClick={()=>{setDiscountWindow(true)}}
                    style={{ textDecoration: "underline" ,cursor:"pointer"}}
                  >
                    {" "}
                    Apply Discounts
                  </div>
                </>
              )}

              {
                DiscountWindow &&
                <>
                <div id="InputForDiscountandSave">
                  <input placeholder="Discount Code" type="text" />
                  <button>Apply</button>
                  </div>
                </>
              }
            </div>
}
            <div id="GetFreeDeliverySection">
              {SubBill >= 2000 && (
                <h3>Free delivery, Your shipping cost is on us!</h3>
              )}
              {SubBill < 2000 && (
                <h3>Add ₹. {2000 - SubBill} to unlock free Delivery.</h3>
              )}
              <div id="DeliveryFreeProgress">
                {SubBill !== 0 && SubBill < 2000 && (
                  <div style={{ width: `${(SubBill / 2000) * 100}%` }}></div>
                )}
                {SubBill === 0 && <div style={{ width: "1%" }}></div>}

                {SubBill >= 2000 && <div style={{ width: "97.9%" }}></div>}
              </div>
            </div>

            <div id="CheckoutbuttonInCart">
              {CheckOutSteps === 1 && <button onClick={()=>ContinuetoAddress()}>Continue</button>}
              {CheckOutSteps === 2 && <button onClick={()=>ContinuetoCheckout()}>Continue To Checkout</button>}
              {CheckOutSteps === 3 && <button onClick={()=>ContinueToPay()}>Checkout</button>}
            </div>
            <div id="TransactionSafely">
              <IconContext.Provider
                value={{
                  color: "white",
                  size: "12",
                  className: "global-class-name",
                }}
              >
                <FaLock />{" "}
              </IconContext.Provider>
              <span>Transactions are safe and securely encrypted.</span>
            </div>
            <div id="TransactionSafely">
              <span>
                Transactions are powered by Razorpay ensuring your <br />{" "}
                transactions are secure.
              </span>
            </div>
            {
              CheckOutSteps !== 3 &&
              <div id="TransactionSafely1">
              <span>
                <b> Unlock exclusive deals: </b> We've moved the discount
                section to the checkout page for a more streamlined <br />
                shopping experience!
              </span>
            </div>
            }
</div>
          </>
        )}

        {loading && (
          <div id="BillLoader">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["white", "white", "white", "white", "white"]}
            />
            <h1>Just a second</h1>
            <h1>Your Order is being processed.</h1>

            { CheckOutSteps ===3 &&
              <p>{currentLine}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
