import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const TagContext = createContext();
const initialData = { type: "", message: "" };


function TagProvider({ children }) {
    const [alertData, setAlertData] = useState(initialData);
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        getTags();
    }, [])

    function getTags() {
        axios
            .get("http://localhost:3000/tags")
            .then((res) => {
                setTagList(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {

            });
    }
    return (
        <TagContext.Provider value={{ alertData, setAlertData, tagList }}>
            {children}
        </TagContext.Provider>
    );
};

function useTagContext() {
    const context = useContext(TagContext);
    return context;
}

export { TagProvider, useTagContext };