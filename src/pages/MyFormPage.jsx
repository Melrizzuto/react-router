import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useTagContext } from "../context/TagContext"; //importo il contesto di tag
import axios from "axios";

const newPost = {
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: true,
};

function MyFormPage() {
    const [formData, setFormData] = useState(newPost);
    const [isLoading, setIsLoading] = useState(false);
    const { tagList } = useTagContext();
    const navigate = useNavigate();

    function handleChange(e) {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        axios
            .post("http://localhost:3000/posts", formData)
            .then((response) => {
                console.log("Post creato:", response.data);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/posts");
                }, 1000);
                setFormData(newPost);
            })
            .catch((err) => {
                console.error("Errore durante il salvataggio del post:", err);
                setIsLoading(false);
            });
    }

    function handleTags(e) {
        setFormData((formData) => {
            let { tags, ...others } = formData;
            if (tags.includes(e.target.value)) {
                tags = tags.filter((val) => val !== e.target.value);
            } else {
                tags = [...tags, e.target.value];
            }
            return {
                tags,
                ...others,
            };
        });
    }

    return (
        <section>
            {isLoading && <Loader />}

            <form
                onSubmit={handleSubmit}
                className="p-4 rounded shadow-lg bg-light m-auto my-2"
            >
                <h4 className="mb-1 text-center text-secondary">
                    Aggiungi un nuovo post
                </h4>

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
                        onChange={handleChange}
                    />
                    <label htmlFor="published" className="form-check-label">
                        Pubblica
                    </label>
                </div>

                {/* check tags */}
                <div className="mb-3">
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
                                    onChange={handleTags}
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
        </section>
    );
}

export default MyFormPage;