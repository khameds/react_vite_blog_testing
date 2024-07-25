/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "./CreateArticle.module.css";

const EditArticle = ({ show, onClose, categories, article, onUpdate }) => {
  const [formDataArticle, setFormDataArticle] = useState({
    title: "",
    description: "",
    category_id: "",
  });
  // Function to get id of the category in function of the name
  const getCategoryIdFromName = (name) => {
    const category = categories.find((cat) => cat.name === name);
    return category ? category.id : "";
  };
  useEffect(() => {
    if (article) {
      const category = categories.find(
        (cat) => console.log(cat) || cat.name === article.category_name
      );

      setFormDataArticle({
        title: article.title || "",
        description: article.description || "",
        category_id: category ? category.id : "",
      });
    }
  }, [article, categories]);

  const getToken = () => localStorage.getItem("token");

  // Function to edit an article
  const handleEditArticleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/articles/${
          article.article_id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataArticle),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'article");
      }

      toast.success("Modification de l'article réussie !");
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Erreur :>> ", err);
      toast.error("Erreur lors de la modification");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataArticle({
      ...formDataArticle,
      [name]: value,
    });
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2>Modifier un article</h2>
        <form className={styles.loginForm} onSubmit={handleEditArticleSubmit}>
          <div className={styles.formContainer}>
            <div className={styles.input}>
              <label htmlFor="title">Titre :</label>
              <input
                onChange={handleChange}
                type="text"
                id="title"
                name="title"
                value={formDataArticle.title}
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
                value={formDataArticle.description}
                required
              />
            </div>
            <br />
            <div className={styles.input}>
              <label htmlFor="category">Categorie :</label>
              <select
                onChange={(e) => {
                  const categoryName = e.target.value;
                  setFormDataArticle({
                    ...formDataArticle,
                    category_id: getCategoryIdFromName(categoryName),
                  });
                }}
                name="category"
                id="category"
                value={
                  categories.find(
                    (cat) => cat.id === formDataArticle.category_id
                  )?.name || ""
                }
                required
              >
                {categories.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className={styles.buttonAddArticle} type="submit">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

EditArticle.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  article: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditArticle;
