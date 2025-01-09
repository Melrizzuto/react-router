import { useState, useEffect } from "react";
import axios from "axios";

function MyFormPage() {
    // Stati del form
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
        tags: [],
        published: true,
    });

    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/tags")
            .then((res) => {
                console.log("Tags ricevuti:", res.data.results);
                setTagList(res.data.results);
            })
            .catch((err) => {
                console.error("Errore nel recupero dei tag:", err);
            });
    }, []);

    // fn per gestire i cambiamenti nei campi del form
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // selezione e deselezione dei tags
            setFormData((prevData) => ({
                ...prevData,
                tags: checked
                    ? [...prevData.tags, value]
                    : prevData.tags.filter((tag) => tag !== value),
            }));
        } else {
            // Gestisce altri campi del form
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Fn per gestire il submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Invio dati al backend
        axios
            .post("http://localhost:3000/posts", formData)
            .then((response) => {
                console.log("Post creato:", response.data);

                // Reset del form
                setFormData({
                    title: "",
                    content: "",
                    image: "",
                    category: "",
                    tags: [],
                    published: true,
                });
            })
            .catch((err) => {
                console.error("Errore durante il salvataggio del post:", err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-light m-auto my-2">
            <h4 className="mb-1 text-center text-secondary">Aggiungi un nuovo post</h4>

            {/* title */}
            <div className="mb-4">
                <label htmlFor="title" className="form-label fw-bold">
                    <small>Titolo</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Inserisci il titolo del post"
                    required
                />
            </div>

            {/* content */}
            <div className="mb-3">
                <label htmlFor="content" className="form-label fw-bold">
                    <small>Contenuto</small>
                </label>
                <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Inserisci il contenuto del post"
                ></textarea>
            </div>

            {/* url img */}
            <div className="mb-3">
                <label htmlFor="image" className="form-label fw-bold">
                    <small>Immagine (URL)</small>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Inserisci l'URL dell'immagine"
                />
            </div>

            {/* checkbox published */}
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            published: e.target.checked,
                        })
                    }
                />
                <label htmlFor="published" className="form-check-label">
                    Pubblica
                </label>
            </div>

            {/* check tags */}
            <div className="mb-3 ">
                <label htmlFor="tags" className="form-label fw-bold">
                    <small>Seleziona i tag</small>
                </label>
                <div className="d-flex">
                    {tagList.map((tag, index) => (
                        <div key={index} className="form-check mx-1">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`tag-${index}`}
                                name="tags"
                                value={tag}
                                checked={formData.tags.includes(tag)}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor={`tag-${index}`}>
                                {tag}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* btn submit */}
            <div className="d-grid">
                <button type="submit" className="btn btn-secondary">
                    Aggiungi
                </button>
            </div>
        </form>
    );
}

export default MyFormPage;