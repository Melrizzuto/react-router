import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SinglePostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((response) => {
                console.log(response);
                setPost(response.data.item);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                console.log("finally");
            });
    }, [id]); //dipendenza

    //se non ci sono i dati non renderizzo nulla
    if (!post) {
        return null;
    }

    return (
        <section className="d-flex justify-content-center align-self-center">
            <div className="jumbotron container-sm vh-100">
                <img src={post.image || 'https://placehold.co/600x400'} alt={post.title} className="img-fluid rounded mb-4 small-img" />
                <h1 className="display-4">{post.title}</h1>
                <p className="lead">{post.content}</p>
                {post.published ? (
                    <p className="text-muted">Published: {new Date(post.published).toLocaleDateString()}</p>
                ) : (
                    <p className="text-muted">Not yet published</p>
                )}
            </div>
        </section>
    );
}

export default SinglePostPage;