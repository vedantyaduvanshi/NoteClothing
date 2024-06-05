import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { chooseword } from "../functions/randomword";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [currentLine, setCurrentLine] = useState("LOVE");
  const [shouldUpdate, setShouldUpdate] = useState(true); // new state variable

  useEffect(() => {
    if (shouldUpdate) {
      const timer = setTimeout(() => {
        setCurrentLine(chooseword());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [currentLine]);


  return (
    <>
      <div id="HomePageBoss">

      <div id="HeadlineOfHomePage">
      <h1>NOTE THE</h1>
        <h2 className="marquee" key={currentLine}>
             {currentLine}.
        </h2>
      </div>
      <button onClick={()=>{navigate("/feed")}}>SHOP NOW</button>


      </div>

      <Footer />
    </>
  );
}
