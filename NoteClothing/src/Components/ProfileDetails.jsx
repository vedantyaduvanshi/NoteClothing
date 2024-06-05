import React, { useRef, useState } from "react";
import { IconContext } from "react-icons";
import { CiCirclePlus } from "react-icons/ci";
import AddAddress from "./AddAddress";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ProfileDetails({ ProfileInfo }) {
  const user = useSelector((state) => state.user);
  const [EditProfile, setEditProfile] = useState(false);
  const [ShowAddressEdit, setShowAddressEdit] = useState(false);
  console.log(ProfileInfo);

  

  const [Error, setError] = useState("");

  const FirstName = useRef();
  const LastName = useRef()
  const Gender = useRef()


  const [Loading, setLoading] = useState(false)


  const NewInformation = () => {
    setLoading(true)
    const firstname = FirstName.current.value;
    const lastname = LastName.current.value;
    const gender = Gender.current.value;
   console.log(firstname,lastname,gender)
    if (firstname.length === 0 || lastname.length === 0 || gender.length === 0 ) {
        setError("Please input all the fields.");
        setLoading(false)
    } else {
      UpdateInformation(firstname,lastname,gender); 
    }
};

const UpdateInformation = async (firstname,lastname,gender) => {
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_NOTE_BACK}/udateinfo`,
        {
          firstname,lastname,gender
        },{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      console.log(data);
      setLoading(false)
      localStorage.removeItem('UserInfo');
      window.location.reload();
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setLoading(false)
    }
};


  return (
    <>
      <div className="MainDivInProfile">
        <h4>My Details</h4>

        {!EditProfile && (
          <div onClick={() => setEditProfile(true)} id="EditProfileButton">
            Edit
          </div>
        )}
        <div className="ProfileDivsInProfile">
          <h5>Email</h5>
          <h6>{ProfileInfo?.email}</h6>
        </div>
        <div className="ProfileDivsInProfile">
          <h5>First Name</h5>
          {EditProfile ? (
            <input ref={FirstName}
              defaultValue={ProfileInfo?.first_name}
              className="InputInsideProfile"
              type="text"
            />
          ) : (
            <h6>{ProfileInfo?.first_name}</h6>
          )}
        </div>
        <div className="ProfileDivsInProfile">
          <h5>Last Name</h5>
          {EditProfile ? (
            <input ref={LastName}
              defaultValue={ProfileInfo?.last_name}
              className="InputInsideProfile"
              type="text"
            />
          ) : (
            <h6>{ProfileInfo?.last_name}</h6>
          )}
        </div>
        <div className="ProfileDivsInProfile">
          <h5>Gender</h5>
          {EditProfile ? (
            <select ref={Gender} className="InputInsideProfile1" name="cars">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <h6>{ProfileInfo?.gender}</h6>
          )}
        </div>

        <div id="AddressInProfile">
          <h5>Address</h5>
          {ProfileInfo?.details && (
            <>
              <div className="AddressHai">
                <h5>{ProfileInfo?.details?.AddressLine1}</h5>
                <h5>{ProfileInfo?.details?.AddressLine2}</h5>
                <div>
                  {" "}
                  <span>{ProfileInfo?.details?.City}</span>
                  <span> , {ProfileInfo?.details?.Pincode}</span>
                </div>
                <h5>{ProfileInfo?.details?.State}</h5>
              </div>
              <div  onClick={() => setShowAddressEdit(true)} id="EditAdressInProfile">Edit Address</div>
            </>
          )}

          {!ProfileInfo?.details && (
            <div  onClick={() => setShowAddressEdit(true)} id="AddAddess">
              <>
                <IconContext.Provider
                  onClick={() => setShowAddressEdit(true)}
                  value={{
                    color: "black",
                    size: "30 ",
                    className: "global-class-name",
                  }}
                >
                  <CiCirclePlus />{" "}
                </IconContext.Provider>

                <h4 onClick={() => setShowAddressEdit(true)}>Add Address</h4>
              </>
            </div>
          )}
        </div>

        {EditProfile && (
          <div className="SaveButtonInProfile">
            <span onClick={() => setEditProfile(false)}>Cancel</span>
            <div onClick={NewInformation}>Save</div>
          </div>
        )}
      </div>
      {ShowAddressEdit && (
        <AddAddress setShowAddressEdit={setShowAddressEdit} />
      )}
    </>
  );
}
