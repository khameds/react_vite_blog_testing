import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ title, category, user_firstname,user_lastname, id }) => {
  return (
    <Link className={styles.link} to={`/article-details/${id}`}>
      <div className={styles.card}>
        <span className={styles.tag}>
          {category}
        </span>

        <h3>{title}</h3>
        <p>Ecrit par : {user_firstname} {user_lastname}</p>

      </div>
    </Link>
  );
};
Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  user_firstname: PropTypes.string.isRequired,
  user_lastname: PropTypes.string.isRequired,
};
export default Card;
