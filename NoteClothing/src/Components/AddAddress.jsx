import axios from "axios";
import React, { useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function AddAddress({ setShowAddressEdit }) {
    const user = useSelector((state) => state.user);
  const [Error, setError] = useState("");

  const addresline1Ref = useRef();
  const addresline2Ref = useRef()
  const Pincode = useRef()
  const City = useRef()
  const State = useRef()

  const [Infos, setInfos] = useState()
  const [Loading, setLoading] = useState(false)


  const addressChekc = () => {
    setLoading(true)
    const Add1 = addresline1Ref.current.value;
    const Add2 = addresline2Ref.current.value;
    const Pin = Pincode.current.value;
    const Cit = City.current.value;
    const Stat = State.current.value;
    const newInfos = {AddressLine1: Add1, AddressLine2: Add2, City: Cit, Pincode: Pin, State: Stat}; // Create a local variable
    setInfos(newInfos); // Update the state
    if (Add1.length === 0 || Add2.length === 0 || Pin.length === 0 || Cit.length === 0 || Stat.length === 0) {
        setError("Please input all the fields.");
        setLoading(false)
    } else {
        updateDetails(newInfos); 
    }
};

const updateDetails = async (Infos) => {
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_NOTE_BACK}/updatedetails`,
        {
          Infos
        },{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      console.log(data);
      console.log(Infos); 
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
    <div id="AddressBAckground">
      <div id="AddAddress">
        <label htmlFor="">Address Line 1</label>
        <input ref={addresline1Ref} maxLength={70} type="text" />

        <label htmlFor="">Address Line 2</label>
        <input ref={addresline2Ref} maxLength={50} type="text" />

        <label htmlFor="">Pin code</label>
        <input ref={Pincode} maxLength={6} type="text" />

        <label htmlFor="">City</label>
        <input ref={City} maxLength={40} type="text" />

        <label htmlFor="">State</label>
        <input ref={State} maxLength={40} type="text" />

        <button onClick={addressChekc} id="SaveBtn">
        {!Loading ? (
             "Save"
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
        <button onClick={() => setShowAddressEdit(false)} id="CncBtn">
          Cancel
        </button>
         {
            Error && <span id="ErrorAddress">{Error}</span>
         }
      </div>
    </div>
  );
}
