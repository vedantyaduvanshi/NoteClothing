import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginInputs from "./LogInInputs";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { ColorRing } from "react-loader-spinner";

const loginInfos = {
  email: "",
  password: "",
};

export default function LogInComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const [loading, setLoading] = useState(false);
  const { email, password } = login;
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email Address is required")
      .email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_NOTE_BACK}/login`,
          {
            email,
            password,
          });
          dispatch({type:"LOGIN", payload:data});
          Cookies.set("user", JSON.stringify(data));
          navigate("/feed")
          setLoading(false)
        } catch (error) {
          setError(error.response.data.message);
          setLoading(false)
        }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValidation}
        onSubmit={() => {
          loginSubmit();
          setLoading(true);
        }}
      >
        {(formik) => (
          <Form id="LoginForm" action="#">
            <LoginInputs
              type="text"
              name="email"
              placeholder="Email"
              id="EmailInputSignUp"
              onChange={handleLoginChange}
            />
            <LoginInputs
              type="password"
              id="PasswordSignUp"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
            />
            <p id="termsSignp">
              <Link to="/reset">Forgot your password?</Link>{" "}
            </p>

            <div id="ButtonAndError">
              <div id="errorText">{error && <div>{error}</div>}</div>
              {/* {success && <div id='SuccesText'>{success}</div>} */}
              <button type="submit" id="SignUpButton">
              {!loading ? (
             "LOG IN"
                ) : (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                    ]}
                  />
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
