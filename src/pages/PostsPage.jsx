import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";


function PostsPage() {
    const [postsList, setPostsList] = useState([]);

    // Funzione per recuperare i dati dal server
    function getData() {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                console.log("Risposta completa:", res);
                console.log("Posts ricevuti:", res.data.results);
                setPostsList(res.data.results || []);
            })
            .catch((err) => {
                console.error("Errore nel recupero dei posts:", err);
                setPostsList([]);
            }).finally(() => {
                console.log("finally")
            })
    };

    // useEffect per caricare i dati al primo render
    useEffect(() => {
        getData();
    }, []);

    // Funzione per eliminare un post tramite id
    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                console.log(`Post con id ${id} eliminato con successo`);
                getData(); // richiamo getData per aggiornare la lista
            })
            .catch((err) => {
                console.error("Errore durante l'eliminazione del post:", err);
            });
    };

    return (
        <main className="container d-flex flex-wrap justify-content-center align-content-center p-4 mt-4">
            {/* Messaggio se non ci sono post */}
            {postsList.length === 0 && (
                <p className="text-center">Nessun post disponibile.</p>
            )}

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
                ))}

            {/* Pulsante per aggiungere un nuovo post */}
            <div>
                <Link to="add-post" className="btn btn-success">
                    Aggiungi un nuovo post
                </Link>
            </div>
        </main>
    );
}

export default PostsPage;