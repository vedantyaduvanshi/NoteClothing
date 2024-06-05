import axios from "axios";

export const AddToCartApi = async(
    ColorSelection,productid, SizeSelection,AmountSelection,token,name,price,ItemId,image,num
        )=>{
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_NOTE_BACK}/product/${productid}`,
            {ColorSelection,SizeSelection,AmountSelection,name,price,ItemId,image,num},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(data)
            return "ok";
        } catch (error) {
            return  error.response.data.message
        }
       };


   

