import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../../src/context/UserContext";
import EditArticle from "../components/Modals/EditArticle";
import EditPassword from "../components/Modals/EditPassword";
import Navbar from "../components/Navbar";
import styles from "./ProfilePage.module.css";

const ProfilePage = ({ categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [articlesData, setArticlesData] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);

  const { user, isLoading } = useUser();

  // Function to get all article from the user who's login
  const getArticlesByUser = () => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resArticle) => resArticle.json())
      .then((resArticle) => {
        if (resArticle.status === 401 || resArticle.status === 500) {
          toast.error("Erreur lors de l'affichage du profile");
        } else {
          setArticlesData(resArticle.data[0].articles);
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };

  // Function to disable account
  const handleDisableAccount = () => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/disabled-user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401 || res.status === 500) {
          toast.error("Erreur lors de la désactivation du compte");
        } else {
          console.log("compte désactivé");
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };

  useEffect(() => {
    getArticlesByUser();
  }, []);
  //Function to delete an article
  const handleDeleteArticle = async (articleId) => {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/articles/${articleId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 500) {
          toast.error("Erreur lors de la suppression de l'article");
        }
        if (res.status === 404) {
          toast.error("Article non trouvé");
        } else {
          toast.success("Article supprimé ! ");
          setArticlesData((prevArticles) =>
            prevArticles.filter((article) => article.article_id !== articleId)
          );
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };
  // Function to update article
  const handleEditArticle = (article) => {
    setCurrentArticle(article);
    setShowEditModal(true);
  };

  // Function to refresh articles after editing
  const refreshArticles = () => {
    getArticlesByUser();
    setShowEditModal(false);
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Utilisateur non trouvé.</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.profilePage}>
        <div className={styles.profile}>
          <h3>Mon profile </h3>
          <br />
          <br />
          {user && (
            <>
              <p key={user.firstname}>
                <b>Nom : </b>
                {user.firstname} {user.lastname}
              </p>
              <br />
              <p>
                <b>Pseudo :</b> {user.pseudo}
              </p>
              <br />
              <p>
                <b>Mail :</b> {user.email}
              </p>
              <br />
            </>
          )}
          <div className={styles.buttonContainer}>
            <button
              className={styles.editPassword}
              onClick={() => setShowModal(true)}
            >
              Modifier mon mot de passe
            </button>
            <button
              onClick={handleDisableAccount}
              className={styles.desactiveAccount}
            >
              Désactiver mon compte
            </button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {" "}
          <h2>Mes articles</h2>
          <div className={styles.cards}>
            {articlesData.length > 0 ? (
              articlesData.map((article) => (
                <div className={styles.card} key={article.article_id}>
                  <h2>{article.title}</h2>
                  <p>
                    {" "}
                    <b>Description :</b> <br></br> {article.description}
                  </p>
                  <div className={styles.buttonContainerCard}>
                    {" "}
                    <button
                      className={styles.editPassword}
                      onClick={() => handleEditArticle(article)}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.article_id)}
                      className={styles.buttonDelete}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun article trouvé pour les catégories sélectionnées.</p>
            )}
          </div>
        </div>
      </div>
      <EditPassword show={showModal} onClose={() => setShowModal(false)} />
      {currentArticle && (
        <EditArticle
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          categories={categories}
          article={currentArticle}
          onUpdate={refreshArticles}
        />
      )}
    </>
  );
};
ProfilePage.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ProfilePage;
