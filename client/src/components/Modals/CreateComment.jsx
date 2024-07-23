import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./CreateArticle.module.css";

const CreateComment = ({ show, onClose, articleId, onCommentAdded }) => {
  const [formDataComment, setFormDataComment] = useState({
    description: "",
  });

  const getToken = () => {
    return localStorage.getItem("token"); 
  };
  // Function to create a comment
  const handleCreateCommentSubmit = async (event) => {
    event.preventDefault();
    const token = getToken(); 
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formDataComment,
            article_id: articleId,
          }),
        }
      );

      await response.json();
      if (response.status === 500) {
        toast.error("Erreur lors de l'ajout");
      } else {
        toast.success("Ajout du commentaire réussi !");
        onCommentAdded();
        onClose();
      }
    } catch (err) {
      console.error("Erreur :>> ", err);
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataComment({
      ...formDataComment,
      [name]: value,
    });
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
        <h2>Ajouter un commentaire</h2>
        <form
          className={styles.loginForm}
          id="loginForm"
          onSubmit={handleCreateCommentSubmit}
        >
          <div className={styles.formContainer}>
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
          </div>
          <button className={styles.buttonAddArticle} type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

CreateComment.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default CreateComment;
