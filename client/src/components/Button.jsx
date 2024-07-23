import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;