import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./CreateArticle.module.css";

const CreateArticle = ({ show, onClose, categories, onArticleAdded }) => {
  const [formDataArticle, setFormDataArticle] = useState({
    title: "",
    description: "",
    category_id: "",
  });
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Function to create an article
  const handleCreateArticleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();

    if (
      !formDataArticle.title ||
      !formDataArticle.description ||
      !formDataArticle.category_id
    ) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataArticle),
        }
      );

      if (response.status === 500) {
        toast.error("Erreur lors de l'ajout");
      } else {
        toast.success("Ajout de l'article réussie !");
        onArticleAdded(); // Appeler la fonction de rappel pour ajouter le nouvel article
        onClose();
      }
    } catch (err) {
      console.error("Erreur :>> ", err);
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      const selectedCategory = categories.find((cat) => cat.name === value);
      setFormDataArticle({
        ...formDataArticle,
        [name]: selectedCategory.id,
      });
    } else {
      setFormDataArticle({
        ...formDataArticle,
        [name]: value,
      });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2>Ajouter un article</h2>
        <form
          className={styles.loginForm}
          id="loginForm"
          onSubmit={handleCreateArticleSubmit}
        >
          <div className={styles.formContainer}>
            <div className={styles.input}>
              <label htmlFor="titre">Titre :</label>
              <input
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                required
              />
            </div>
            <br />
            <div className={styles.input}>
              <label htmlFor="description">Description :</label>
              <textarea
                onChange={handleChange}
                cols={31}
                id="description"
                name="description"
                required
              />
            </div>
            <br />
            <div className={styles.input}>
              <label htmlFor="categorie">Categorie :</label>
              <select onChange={handleChange} name="category_id" id="categorie">
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {" "}
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.buttonAddArticle} type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

CreateArticle.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onArticleAdded: PropTypes.func.isRequired,
};

export default CreateArticle;
