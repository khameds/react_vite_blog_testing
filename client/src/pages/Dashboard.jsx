import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Card from "../components/Card";
import CreateArticle from "../components/Modals/CreateArticle";
import Navbar from "../components/Navbar";
import styles from "./Dashboard.module.css";

const Dashboard = ({ categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState([]);

  // State to selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Fonction pour filtrer les articles en fonction des catégories sélectionnées
  const filteredArticles = articles.filter(
    (article) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(article.category_name)
  );

  // Fonction pour gérer la sélection des catégories
  const handleCategoryClick = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== categoryName)
      );
    } else {
      setSelectedCategories([categoryName]);
    }
  };
  const getAllArticles = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles`, {
      method: "GET",
    })
      .then((resArticle) => resArticle.json())
      .then((resArticle) => {
        if (resArticle.status === 401 || resArticle.status === 500) {
          toast.error("Erreur lors de l'affichage des articles");
        } else {
          setArticles(resArticle.data);
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };
  useEffect(() => {
 
    getAllArticles();
  }, []);

  const handleArticleAdded = async () => {
    getAllArticles();
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.categories}>
          <button
            className={styles.button}
            onClick={() => setSelectedCategories([])}
          >
            Tous les articles
          </button>
          {categories.map((category) => (
            <span
              key={category.id}
              className={
                selectedCategories.includes(category.name)
                  ? `${styles.selectedCategory} ${styles.categoryTag}`
                  : `${styles.category} ${styles.categoryTag}`
              }
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </span>
          ))}
        </div>
        <button
          className={styles.addArticle}
          onClick={() => setShowModal(true)}
        >
          Ajouter un article
        </button>

        <div className={styles.cards}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div className={styles.card} key={article.id}>
                <Card
                  title={article.title}
                  category={article.category_name}
                  user_firstname={article.user_firstname}
                  user_lastname={article.user_lastname}
                  id={article.id}
                />
              </div>
            ))
          ) : (
            <p>Aucun article trouvé.</p>
          )}
        </div>
      </div>

      <CreateArticle
        show={showModal}
        onClose={() => setShowModal(false)}
        categories={categories}
        onArticleAdded={handleArticleAdded}
      />
    </>
  );
};
Dashboard.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Dashboard;
