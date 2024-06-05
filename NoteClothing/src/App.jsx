import { useEffect, useState } from "react";
import "./App.css";
import Marque from "./Components/Marque";
import Navbar from "./Components/Navbar";
import FeedPage from "./Pages/FeedPage";
import HomePage from "./Pages/HomePage";
import EmailVerify from "./Pages/EmailVerify";
import LogIn from "./Pages/LogIn";
import ProdductPage from "./Pages/ProdductPage";
import SignUp from "./Pages/SignUp";
import CartPage from "./Pages/CartPage";
import ProfilePage from "./Pages/ProfilePage";
import ThankYou from "./Pages/ThankYou";
import { Route, Routes } from "react-router-dom";




//For Getting all items properly
import { atom } from 'jotai';
import { ItemProvider } from "./Components/SinglePageContext";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Reset from "./Pages/Reset";
import Refrelpage from "./Pages/Refrelpage";
import Policy from "./Pages/Policy";
import Terms from "./Pages/Terms";
import Return from "./Pages/Return";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import ConatactUs from "./Pages/ConatactUs";
import ShiipingPolicy from "./Pages/ShiipingPolicy";
import Story from "./Pages/Story";
const counter = atom();



function App() {

  const [CartSYstem, setCartSYstem] = useState(false);




  //Profile User SHit here
  const user = useSelector((state) => state.user);
  const [feedLoaded, setFeedLoaded] = useState(false);
  useEffect(() => {
    setFeedLoaded(true);
  }, []);
  
  useEffect(() => {
    const InfoOfUser = JSON.parse(localStorage.getItem('UserInfo')); 
    if (InfoOfUser === null && user !== null) {
      getProfile()
    }
  }, [user, feedLoaded]) 


  const getProfile = async()=>{
    try {
       const {data} = await axios.get(`${import.meta.env.VITE_NOTE_BACK}/getProfile`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         if(data.ok === false){
          navigate("/")
         }else{
          localStorage.setItem("UserInfo", JSON.stringify(data))
         }

    } catch (error) {
      console.log(error)
      if(error.response.data === "Invalid Authentication")
      
      logout()
    }
  }
  

  const logout =()=>{
    Cookies.set("user", "")
    dispatch({
    type:'LOGOUT',
    });
    navigate("/");
    }



    



  const [Nanavbarcolorvbar, setNavbarColor] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 20) {
      setNavbarColor(true)
    } else {
      setNavbarColor(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })




  
  return (
    <>
      <Marque  />
      <Navbar CartSYstem={CartSYstem} Nanavbarcolorvbar ={Nanavbarcolorvbar} />

      <ItemProvider>
      <Routes>
      <Route element={<NotLoggedInRoutes/>}>
      <Route exact path="/register" element={<SignUp />} />
      <Route exact path="/reset" element={<Reset/>} />
      </Route>


      <Route exact path="/login" element={<LogIn />} />
   {/* Finalezied */}
      <Route exact path="/feed" element={<FeedPage setCartSYstem={setCartSYstem} counter={counter} />} />
      <Route  exact path="/product/:productid" element={<ProdductPage setCartSYstem={setCartSYstem} counter={counter} />} />


      <Route exact path="/verify" element={<EmailVerify />} />
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/story" element={<Story />} />
      <Route exact path="/policy" element={<Policy />} />
      <Route exact path="/terms" element={<Terms />} />
      <Route exact path="/return" element={<Return />} />
      <Route exact path="/shippingPolicy" element={<ShiipingPolicy />} />
      <Route exact path="/refer" element={<Refrelpage />} />
      <Route exact path="/contact" element={<ConatactUs />} />
      

      <Route element={<LoggedInRoutes/>} >
      <Route exact path="/profile" element={<ProfilePage />} /> 
      <Route exact path="/thank" element={<ThankYou />} />
      <Route exact path="/cart" element={<CartPage setCartSYstem={setCartSYstem} />} />
      </Route>
    
  
      </Routes>
      </ItemProvider>
    </>
  );
}

export default App;
