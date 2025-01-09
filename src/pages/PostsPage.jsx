import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";

function PostsPage() {
    const [postsList, setPostsList] = useState([]);

    // Recupero i posts dal server
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                console.log("Risposta completa:", res);
                console.log("Posts ricevuti:", res.data.results);
                setPostsList(res.data.results || []);
            })
            .catch((err) => {
                console.error("Errore nel recupero dei posts:", err);
                setPostsList([]);
            });
    }, []);

    console.log("Lista dei post:", postsList)

    // Funzione per eliminare un post tramite id
    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                setPostsList((prevPosts) => prevPosts.filter((post) => post.id !== id));
            })
            .catch((err) => {
                console.error("Errore durante l'eliminazione del post:", err);
            });
    };

    return (
        <main className="container d-flex flex-wrap justify-content-center p-4 mt-4">

            {/* Renderizza i post pubblicati */}
            {postsList
                .filter((post) => post.published) // Filtro solo i post pubblicati
                .map((post) => (
                    <Card
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        image={post.image}
                        content={post.content}
                        tags={post.tags}
                        published={post.published}
                        onDelete={handleDeletePost}
                    />
                ))
            }
            <div>
                <Link to="add-post" className="btn btn-success">
                    Aggiungi un nuovo post
                </Link>
            </div>
        </main>
    );
}

export default PostsPage;