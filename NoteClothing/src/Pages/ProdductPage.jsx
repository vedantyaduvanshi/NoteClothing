import React, { useContext, useEffect, useState } from "react";
import "./ProductPage.css";
import { TbShoppingCartFilled } from "react-icons/tb";
import { IconContext } from "react-icons";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import SinglePageContext from "../Components/SinglePageContext";
import { useSelector } from "react-redux";
import { format } from "number-currency-format";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { AddToCartApi } from "../functions/AddToCart";
import { ColorRing } from "react-loader-spinner";
import NotificationRight from "../Components/NotificationRight";
import Footer from "../Components/Footer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function ProdductPage({ setCartSYstem }) {
  const [Loading, setLoading] = useState(false);
  const [LoadingForProduct, setLoadingForProduct] = useState(true);
  const [Notification, setNotification] = useState(false);
  const [Error, setError] = useState();

  const user = useSelector((state) => state.user);
  const [Product, setProduct] = useState();

  const [ColorSelection, setColorSelection] = useState("");

  const [SizeSelection, setSizeSelection] = useState("");

  const [AmountSelection, setAmountSelection] = useState(1);

  const { productid } = useParams();
  const { itemo } = useContext(SinglePageContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
    console.log(itemo);
     if(productid === undefined) {
      navigate("/feed");
    } else if (itemo === undefined) {
      // console.log("Iem Undefinedd");
      CertainItem();
    } else if (itemo._id !== productid) {
      // console.log("Iem Undefinedd");
      CertainItem();
    } else {
      setProduct(itemo);
      setColorSelection(itemo?.availability[0]);
      setLoadingForProduct(false);
    }
    // document.documentElement.scrollTo(0, 0);
    // console.log(itemo);
  }, []);

  useEffect(() => {
    setSizeSelection(" ");
    setAmountSelection(1);
  }, [ColorSelection]);

  useEffect(() => {
    if (Notification) {
      const timer = setTimeout(() => {
        setNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [Notification]);

  const Decrement = () => {
    if (AmountSelection !== 1) {
      setAmountSelection(AmountSelection - 1);
    }
  };

  const Increment = () => {
    if (AmountSelection !== 5) {
      setAmountSelection(AmountSelection + 1);
    }
  };

  const CertainItem = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_NOTE_BACK}/product/${productid}`,
        {}
      );
      if (data.ok === false) {
        console.log(data);
        navigate("/feed");
      } else {
        setProduct(data);
        setColorSelection(data?.availability[0]);
        setLoadingForProduct(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AddToCart = async () => {
    if (Loading !== true) {
      setLoading(true);
      if (user === null) {
        navigate("/login")
      }else if (productid !== Product._id) {
        console.log("Indefined Error");
      } else if (SizeSelection === " ") {
        setError("Select a size");
        setNotification(true);
      } else if (!AmountSelection) {
        setError("select a valid amount");
        setNotification(true);
      } else {
        var num = Math.floor(Math.random() * 90000) + 10000;
        await AddToCartApi(
          ColorSelection.color,
          productid,
          SizeSelection,
          AmountSelection,
          user.token,
          Product.name,
          Product.price,
          Product._id,
          DisplayImage,
          num
        );
        const item = {
          ColorSelection: ColorSelection.color,
          productId: productid,
          SizeSelection: SizeSelection,
          AmountSelection: AmountSelection,
          name: Product.name,
          price: Product.price,
          num: num,
          image:DisplayImage
        };
        const InfoOfUser = JSON.parse(localStorage.getItem("UserInfo"));
        InfoOfUser.Cart.push(item);
        localStorage.setItem("UserInfo", JSON.stringify(InfoOfUser));
        setCartSYstem((current) => !current);
        setNotification(true);
        setError("Added To Cart");
      }
      setLoading(false);
    }
  };


  const BuyNow = async () => {
    if (Loading !== true) {
      setLoading(true);
      if (user === null) {
        navigate("/login")
      }else if (productid !== Product._id) {
        console.log("Indefined Error");
      } else if (SizeSelection === " ") {
        setError("Select a size");
        setNotification(true);
      } else if (!AmountSelection) {
        setError("select a valid amount");
        setNotification(true);
      } else {
        var num = Math.floor(Math.random() * 90000) + 10000;
        await AddToCartApi(
          ColorSelection.color,
          productid,
          SizeSelection,
          AmountSelection,
          user.token,
          Product.name,
          Product.price,
          Product._id,
          DisplayImage,
          num
        );
        const item = {
          ColorSelection: ColorSelection.color,
          productId: productid,
          SizeSelection: SizeSelection,
          AmountSelection: AmountSelection,
          name: Product.name,
          price: Product.price,
          num: num,
          image:DisplayImage
        };
        const InfoOfUser = JSON.parse(localStorage.getItem("UserInfo"));
        InfoOfUser.Cart.push(item);
        localStorage.setItem("UserInfo", JSON.stringify(InfoOfUser));
        setCartSYstem((current) => !current);
        setNotification(true);
        setError("Added To Cart");
        navigate("/cart")
      }
      setLoading(false);
    }
  };


  const [CurrentImages, setCurrentImages] = useState([]);
  const [DisplayImage, setDisplayImage] = useState();

  useEffect(() => {
    const colorImages = Product?.images.find(
      (img) => img.color === ColorSelection.color
    )?.images;
    setCurrentImages(colorImages);
  }, [ColorSelection, Product?.images]);

  useEffect(() => {
    if (CurrentImages && CurrentImages.length > 0) {
      setDisplayImage(CurrentImages[0]);
    }
  }, [CurrentImages]);

  return (
    <>
      <div id="ProductPage">
        <div id="ProductLookSection">
          <div onClick={() => navigate(-1)} id="BackButtonInProduct">
            <IconContext.Provider
              value={{
                size: "22",
                className: "global-class-name",
              }}
            >
              <IoArrowBackOutline />{" "}
            </IconContext.Provider>
          </div>

          <div id="CurrentImage">
            {CurrentImages?.length > 0 &&
             <img src={DisplayImage} alt="" />}
          </div>

          <div id="restImage">
            {CurrentImages?.map((image, index) => (
                  <LazyLoadImage onClick={()=>{setDisplayImage(image)}}
                  effect="blur"
                  key={index} src={image} alt={`Product Image ${index + 1}`} />
            ))}
            <div id="Three3dModel">3D Coming Soon</div>
          </div>
        </div>

        <div id="ProductInfoSection">
          {!LoadingForProduct && (
            <>
              <div id="CategoryOfCloth">{Product?.category}</div>
              <div id="NameOfCloth">{Product?.name}</div>
              <div id="PriceOfCloth">
                <div id="PriceAccurate">{`₹. ${
                  Product ? format(Product.price) : ""
                }`}</div>
                <div id="SizeGuide">Size guide</div>
              </div>
              <div id="DescriptionOfCloth">{Product?.description}</div>
              <div id="ColorsOfCloth">
                {Product?.availability.map((colorObj, index) => (
                  <div
                    onClick={() => setColorSelection(colorObj)}
                    key={index}
                    style={{ backgroundColor: colorObj.color }}
                    className={
                      ColorSelection && ColorSelection.color === colorObj.color
                        ? "selectedColor"
                        : ""
                    }
                  ></div>
                ))}
              </div>

              {ColorSelection?.sizes?.xsSize <= 10 ||
              ColorSelection?.sizes?.sSize <= 10 ||
              ColorSelection?.sizes?.mSize <= 10 ||
              ColorSelection?.sizes?.lSize <= 10 ? (
                <div id="SizeAvailableInfo">
                  <span>•</span>
                  <p>Few pieces left</p>
                </div>
              ) : null}

              <div id="SizeOfClothes">
                {ColorSelection?.sizes?.xsSize === 0 && (
                  <div title="Out Of Stock" className="ZeroQuantity">
                    XS
                  </div>
                )}
                {ColorSelection?.sizes?.xsSize <= 10 &&
                  ColorSelection?.sizes?.xsSize !== 0 && (
                    <div
                      style={{
                        ...(SizeSelection === "XS"
                          ? { backgroundColor: "white", color: "black" }
                          : {}),
                      }}
                      onClick={() => setSizeSelection("XS")}
                      title="Only Few Stocks left"
                      className="LowQuantity"
                    >
                      {" "}
                      <span>•</span> XS
                    </div>
                  )}
                {ColorSelection?.sizes?.xsSize > 10 && (
                  <div
                    style={{
                      ...(SizeSelection === "XS"
                        ? { backgroundColor: "white", color: "black" }
                        : {}),
                    }}
                    onClick={() => setSizeSelection("XS")}
                    className="ColorDicInPRODUCT"
                  >
                    XS
                  </div>
                )}

                {ColorSelection?.sizes?.sSize === 0 && (
                  <div title="Out Of Stock" className="ZeroQuantity">
                    S
                  </div>
                )}
                {ColorSelection?.sizes?.sSize <= 10 &&
                  ColorSelection?.sizes?.sSize !== 0 && (
                    <div
                      style={{
                        ...(SizeSelection === "S"
                          ? { backgroundColor: "white", color: "black" }
                          : {}),
                      }}
                      onClick={() => setSizeSelection("S")}
                      title="Only Few Stocks left"
                      className="LowQuantity"
                    >
                      {" "}
                      <span>•</span>S
                    </div>
                  )}
                {ColorSelection?.sizes?.sSize > 10 && (
                  <div
                    style={{
                      ...(SizeSelection === "S"
                        ? { backgroundColor: "white", color: "black" }
                        : {}),
                    }}
                    onClick={() => setSizeSelection("S")}
                    className="ColorDicInPRODUCT"
                  >
                    S
                  </div>
                )}

                {ColorSelection?.sizes?.mSize === 0 && (
                  <>
                    <div title="Out Of Stock" className="ZeroQuantity">
                      M
                    </div>
                  </>
                )}
                {ColorSelection?.sizes?.mSize <= 10 &&
                  ColorSelection?.sizes?.mSize !== 0 && (
                    <div
                      style={{
                        ...(SizeSelection === "M"
                          ? { backgroundColor: "white", color: "black" }
                          : {}),
                      }}
                      onClick={() => setSizeSelection("M")}
                      title="Only Few Stocks left"
                      className="LowQuantity"
                    >
                      {" "}
                      <span>•</span>M
                    </div>
                  )}
                {ColorSelection?.sizes?.mSize > 10 && (
                  <div
                    style={{
                      ...(SizeSelection === "M"
                        ? { backgroundColor: "white", color: "black" }
                        : {}),
                    }}
                    onClick={() => setSizeSelection("M")}
                    className="ColorDicInPRODUCT"
                  >
                    M
                  </div>
                )}

                {ColorSelection?.sizes?.lSize === 0 && (
                  <div title="Out Of Stock" className="ZeroQuantity">
                    L
                  </div>
                )}
                {ColorSelection?.sizes?.lSize <= 10 &&
                  ColorSelection?.sizes?.lSize !== 0 && (
                    <div
                      style={{
                        ...(SizeSelection === "L"
                          ? { backgroundColor: "white", color: "black" }
                          : {}),
                      }}
                      onClick={() => setSizeSelection("L")}
                      title="Only Few Stocks left"
                      className="LowQuantity"
                    >
                      {" "}
                      <span>•</span>L
                    </div>
                  )}
                {ColorSelection?.sizes?.lSize > 10 && (
                  <div
                    style={{
                      ...(SizeSelection === "L"
                        ? { backgroundColor: "white", color: "black" }
                        : {}),
                    }}
                    onClick={() => setSizeSelection("L")}
                    className="ColorDicInPRODUCT"
                  >
                    L
                  </div>
                )}
              </div>

              <div id="BUYBOSS">
                <div id="QuantityOfCloth">
                  <div onClick={Decrement} className="Amountplusminus">
                    -
                  </div>
                  <div>{AmountSelection}</div>
                  <div onClick={Increment} className="Amountplusminus">
                    +
                  </div>
                </div>
                <div id="BuyButtonAndAddtoCart">
                  <div onClick={BuyNow} id="buyNowButton">BUY NOW</div>

                  <div onClick={AddToCart} id="AddtoCartProductPage">
                    {!Loading ? (
                      <>
                      <IconContext.Provider
                        value={{
                          color: "#01ae8b",
                          size: "20",
                          className: "global-class-name",
                        }}
                      >
                        <TbShoppingCartFilled />
                      </IconContext.Provider> 
                      Add
                      </>
                    ) : (
                      <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#01ae8b",
                          "#01ae8b",
                          "#01ae8b",
                          "#01ae8b",
                          "#01ae8b",
                        ]}
                      />
                    )}
                  </div>

                  <div id="LikeButtonInProductPage">
                    <IconContext.Provider
                      value={{
                        size: "20",
                        className: "global-class-name",
                      }}
                    >
                      <FaHeart />{" "}
                    </IconContext.Provider>
                  </div>
                </div>
              </div>
            </>
          )}
          {LoadingForProduct && (
            <div id="ProductLoading">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["white", "white", "white", "white", "white"]}
              />
            </div>
          )}
        </div>
      </div>
      <div id="RestProduts"></div>
      {Notification && <NotificationRight Error={Error} />}
      <Footer />
    </>
  );
}
