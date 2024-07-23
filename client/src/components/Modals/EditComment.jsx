import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "./CreateArticle.module.css";

const EditComment = ({ show, onClose, comment, articleId, onCommentUpdated }) => {
  const [formDataComment, setFormDataComment] = useState({
    description: "",
    article_id: articleId,
  });

  useEffect(() => {
    if (comment) {
      setFormDataComment({
        description: comment.comment_description,
        article_id: articleId,
      });
    }
  }, [comment, articleId]);

  const getToken = () => localStorage.getItem("token");

  //function to edit a comment 
  const handleEditCommentSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/${
          comment.comment_id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description: formDataComment.description,
            article_id: articleId,
          }),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        console.error("Erreur de réponse : ", result);
        throw new Error("Erreur lors de la modification du commentaire");
      }
      toast.success("Commentaire modifié avec succès !");
      onCommentUpdated(); 
      onClose();
    } catch (err) {
      console.error("Erreur :>> ", err);
      toast.error("Erreur lors de la modification");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataComment({
      ...formDataComment,
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
        <h2>Modifier un commentaire</h2>
        <form className={styles.loginForm} onSubmit={handleEditCommentSubmit}>
          <div className={styles.formContainer}>
            <div className={styles.input}>
              <label htmlFor="description">Description :</label>
              <textarea
                onChange={handleChange}
                cols={31}
                id="description"
                name="description"
                value={formDataComment.description}
                required
              />
            </div>
            <br />
          </div>
          <button className={styles.buttonAddArticle} type="submit">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

EditComment.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  articleId: PropTypes.number.isRequired,
  onCommentUpdated: PropTypes.func.isRequired, 

};

export default EditComment;
