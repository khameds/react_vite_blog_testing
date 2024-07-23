import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const ArticlesContext = createContext();

const commentPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  article_id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
});

const articlePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(commentPropTypes).isRequired,
});

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

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

  return (
    <ArticlesContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

ArticlesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  articles: PropTypes.arrayOf(articlePropTypes),
};

export const useArticles = () => {
  return useContext(ArticlesContext);
};
