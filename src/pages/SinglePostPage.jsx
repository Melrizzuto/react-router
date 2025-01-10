import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function SinglePostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    useEffect(getData, [id]) //è obbligatorio mettere id perchè lo richiede.


    function getData() {
        axios.get(apiUrl + '/posts/' + id).then((res) => {
            // console.log(res);
            setPost(res.data.item)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            console.log("finally")
        })
    }


    return (
        <section className="container" >
            <h1>Sono la pizza con id:{id}</h1>
            {/* aggiungere il post */}
            {post}

        </section>
    )
}

export default SinglePostPage;