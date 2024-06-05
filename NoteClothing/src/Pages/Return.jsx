import React, { useEffect } from "react";
import "./Privacy.css";
import Footer from "../Components/Footer";

export default function Return() {
  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [])
  return (
    <>
    <div id="Privacy">
      <h1>RETURN AND REFUND</h1>

      <p>Last updated March 08, 2024</p>

      <p>
        {" "}
        Thank you for your purchase. We hope you are happy with your purchase.
        However, if you are not completely satisfied with your purchase for any
        reason, you may return it to us for an exchange only. Please see below
        for more information on our return policy.
      </p>

      <p>RETURNS</p>

      <p>
        All returns must be postmarked within two (2) days of the purchase date.
        All returned items must be in new and unused condition, with all
        original tags and labels attached.
      </p>

      <p>RETURN PROCESS</p>

      <p>
        To return an item, please email customer service at
        note-clothing@outlook.com to obtain a Return Merchandise Authorization
        (RMA) number. After receiving a RMA number, place the item securely in
        its original packaging and include your proof of purchase, then mail
        your return to the following address:
      </p>

      <p>
        NOTE Attn: Returns RMA # Jaipur-Ajmer Express Highway, Dehmi Kalan, Near
        GVK Toll Plaza, Jaipur, Rajasthan, Manipal University Jaipur Jaipur,
        Rajasthan 303007 JAIPUR, RAJASTHAN 303007 India
      </p>

      <p>
        You may also use the prepaid shipping label enclosed with your package.
        Return shipping charges will be paid or reimbursed by us.
      </p>

      <p>REFUNDS</p>

      <p>
        After receiving your return and inspecting the condition of your item,
        we will process your exchange. Please allow at least ten (10) days from
        the receipt of your item to process your exchange. We will notify you by
        email when your return has been processed.
      </p>

      <p>EXCEPTIONS</p>

      <p>
        For defective or damaged products, please contact us at the contact
        details below to arrange a refund or exchange.
      </p>

      <p>
        Please Note &#9679; A 10% restocking fee will be charged for all returns
        in excess of 5000 rupees. &#9679; Items must be in an undamaged
        condition, and we will thoroughly inspect everything before processing
        any returns.
      </p>
      <p>
Users are only able to cancel their orders on the day they place them.</p>

      <p>QUESTIONS</p>

      <p>
        If you have any questions concerning our return policy, please contact
        us at:
      </p>

      <p>note-clothing@outlook.com</p>
    </div>
    <Footer/>
    </>
  );
}
