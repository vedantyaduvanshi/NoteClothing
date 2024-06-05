import axios from "axios";

export const LikeItem = async(
    ItemId,token
        )=>{
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_NOTE_BACK}/likepost`,
            {ItemId},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            return data;
        } catch (error) {
            return  error.response.data.message
        }
       };


   
