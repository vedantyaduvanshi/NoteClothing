import {createContext, useState} from "react"

const SinglePageContext = createContext();

export function ItemProvider({children}){
    const [itemo, setitemo] = useState()

    const ChangeItem = (item)=>{
        setitemo(item)
    }
    
    return(
        <SinglePageContext.Provider value={{itemo, ChangeItem}}>
            {children}
        </SinglePageContext.Provider>
    )
}

export default SinglePageContext;