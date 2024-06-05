import React, { useEffect, useState } from "react";
import Marque from "../Components/Marque";
import Navbar from "../Components/Navbar";
import "./FeedPage.css";
import ProductBox from "../Components/ProductBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { ColorRing } from "react-loader-spinner";
import Footer from "../Components/Footer";


export default function FeedPage({ counter,setCartSYstem }) {
  const user = useSelector((state) => state.user);
  const [FeedData, setFeedData] = useAtom(counter);
  const [Loader, setLoader] = useState(true);

  const InfoOfUser = JSON.parse(localStorage.getItem('UserInfo')); 

  useEffect(() => {
    if (FeedData === undefined) {
      getItems();
    }
    setLoader(false)
  }, [FeedData]);

  const getItems = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_NOTE_BACK}/getAllItems`,
        {}
      );
      setFeedData(data);
      setLoader(false)
    } catch (error) {
      if (error?.response?.data === "Invalid Authentication")
        console.log("sahi hai bahai");
      // logout();
    }
  };


  return (
    <>
      <div id="FeedPage">
        <div id="BannerFeedPageTop">
          NOTE THE SUMMER
        </div>
        <div id="SummerLine"><h2>SUMMER LINE 01</h2></div>


        {
          Loader &&
          <div id="FeedLaoder">
          <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#01ae8b", "#01ae8b", "#01ae8b", "#01ae8b", "#01ae8b"]}
              />
          </div>
        }

        {
          !Loader && 
          <div id="ProductsTwoAtaTime">
          {FeedData?.map((item, index) => (
            <ProductBox key={index} item={item} token={user?.token} InfoOfUser={InfoOfUser} setCartSYstem={setCartSYstem} />
          ))}
        </div>
        }


      </div>
      <Footer/>
    </>
  );
}
