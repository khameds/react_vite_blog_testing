import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../../src/context/UserContext";
import CreateComment from "../components/Modals/CreateComment";
import EditComment from "../components/Modals/EditComment";
import Navbar from "../components/Navbar";
import styles from "./ArticleDetails.module.css";

const ArticleDetails = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [articleById, setArticleById] = useState([]);
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [commentToEdit, setCommentToEdit] = useState(null); 
  
  // Function to get all comments for this article
  const getAllComments = (articleId) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
      method: "GET",
    })
      .then((resComments) => resComments.json())
      .then((resComments) => {
        if (resComments.status === 500) {
          toast.error("Erreur lors de l'affichage des commentaires");
        } else {
          const article = resComments.data.find(
            (art) => art.article_id === parseInt(articleId, 10)
          );

          if (article) {
            setComments(article.comments);
          } else {
            setComments([]);
          }
        }
      })
      .catch((err) =>
        console.info(
          "Erreur lors de la récupération des commentaires :>> ",
          err
        )
      );
  };
  // Function to get article by ID
  const getArticleById = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 500) {
          toast.error("Erreur lors de la suppression de l'article");
        }
        if (res.status === 404) {
          toast.error("Article non trouvé");
        } else {
          setArticleById(res.data);
        }
      })

      .catch((err) => console.info("err :>> ", err));
  };

  useEffect(() => {
    getAllComments(id);
    getArticleById(id);
  }, [id]);

  if (!articleById) {
    return <p>Article non trouvé.</p>;
  }
  if (isLoading || !user || !articleById) {
    return <p>Chargement...</p>;
  }

  // Function to handle the comment edit action
  const handleEditComment = (comment) => {
    setCommentToEdit(comment); 
    setIsEditModalOpen(true); 
  };

  // function to delete a comment
  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Commentaire supprimé !");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
      } else {
        const result = await response.json();
        if (result.status === 404) {
          toast.error("Commentaire non trouvé");
        } else if (result.status === 500) {
          toast.error("Erreur lors de la suppression du commentaire");
        }
      }
    } catch (err) {
      console.info("Erreur lors de la suppression du commentaire :>> ", err);
    }
  };

  const handleCommentAdded = () => {
    getAllComments(id);
  };

  const handleCommentUpdated = () => {
    getAllComments(id);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };
  return (
    <>
      <Navbar />
      <div className={styles.articleContainer}>
        <div className={styles.articleDetails}>
          <div className={styles.titleBlock}>
            <h2>{articleById.title}</h2>
            <p>Catégorie : {articleById.category_name}</p>
          </div>
          <p className={styles.description}>
            <b>A propos de cet article :</b> <br></br>
            <br></br> {articleById.description}
          </p>
          <p>
            <b>Ecrit par :</b> <br></br>
            <br /> {articleById.user_firstname} {articleById.user_lastname}
          </p>
          <p className={styles.comments}>
            <div className={styles.titleAndButtonComments}>
              <p>
                <b>Commentaires : </b>
              </p>
              {user.id !== articleById.user_id && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={styles.button}
                >
                  Ajouter un commentaire
                </button>
              )}
            </div>{" "}
            <br></br>
            <br></br>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className={styles.commentContainer} key={comment.id}>
                  <div className={styles.commentUnique}>
                    <p>{comment.comment_description}</p>
                    <p className={styles.writer}>
                      Ecrit par : {comment.user_info} <br></br> le{" "}
                      {formatDate(comment.comment_created_at)}
                      <img
                        className={styles.avatar}
                        src={comment.user_avatar}
                        alt="avatar"
                      />
                    </p>
                  </div>
                  {comment.user_id === user.id && (
                    <div className={styles.buttonContainer}>
                      <button
                        className={styles.button}
                        onClick={() => handleEditComment(comment)}
                      >
                        Editer
                      </button>
                      <button
                        className={styles.buttonDelete}
                        onClick={() => handleDeleteComment(comment.comment_id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Aucun commentaire pour le moment.</p>
            )}
          </p>
        </div>
        {isModalOpen && (
          <CreateComment
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            articleId={articleById.id}
            onCommentAdded={handleCommentAdded}
          />
        )}{" "}
        {isEditModalOpen && (
          <EditComment
            show={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            comment={commentToEdit}
            articleId={articleById.id}
            onCommentUpdated={handleCommentUpdated}
          />
        )}
      </div>
    </>
  );
};

export default ArticleDetails;
