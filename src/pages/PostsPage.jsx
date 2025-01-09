import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import MyForm from "../components/MyForm";

function PostsPage() {
    const [postsList, setPostsList] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [tagList, setTagList] = useState([]);

    // Recupero i posts dal mio server con la mia API
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                console.log("Posts ricevuti:", res.data.results);
                setPostsList(res.data.results);

                // gestione tags dei posts
                const tags = res.data.results.reduce((acc, post) => {
                    if (post.tags && Array.isArray(post.tags)) {
                        post.tags.forEach(tag => {
                            acc[tag] = true;
                        });
                    }
                    return acc;
                }, {});

                setTagList(Object.keys(tags));
            })
            .catch(console.error);
    }, []);

    /// Funzione per aggiungere un post
    const handleAddPost = (newPost) => {
        axios.post("http://localhost:3000/posts", newPost)
            .then((res) => {
                console.log("Risposta server per nuovo post:", res.data);
                if (res.data.success && res.data.item) {
                    axios.get("http://localhost:3000/posts")
                        .then((response) => {
                            setPostsList(response.data.results);
                        })
                        .catch(console.error);
                } else {
                    console.error("Errore nell'aggiunta del nuovo post", res.data);
                }
            })
            .catch(console.error);
    };

    // Funzione per eliminare un post tramite id
    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(() => {
                // Rimuovi il post localmente senza dover fare una nuova richiesta
                setPostsList((prevPosts) => prevPosts.filter((post) => post.id !== id));
            })
            .catch((err) => {
                console.error("Failed to delete post", err);
            });
    };

    // Funzione per gestire i tag selezionati
    const handleTags = (tag) => {
        setTagsSelected((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <main className="container d-flex flex-wrap justify-content-center p-4 mt-4">
            {/* Renderizza i post pubblicati */}
            {postsList
                .filter((post) => post.published)  // Filtro solo i post pubblicati
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
            {/* Componente MyForm per gestire il form */}
            <MyForm
                onAddPost={handleAddPost}
                posts={postsList}
                onTags={handleTags}
                tagsSelected={tagsSelected}
                setTagsSelected={setTagsSelected}
                tagList={tagList}
            />
        </main>
    );
}

export default PostsPage;