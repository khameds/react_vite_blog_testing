import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
import styles from "./EditPassword.module.css";

export const EditPassword = ({ show, onClose }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const getToken = () => {
    return localStorage.getItem("token");
  };
  // Function to edit password
  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      await response.json();
      if (response.status === 401 || response.status === 500) {
        toast.error("Erreur lors de la modification du mot de passe");
      } else {
        toast.success("Mot de passe modifié!");
        onClose();
      }
    } catch (err) {
      console.error("Erreur :>> ", err);
      toast.error("Erreur lors de la modification");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
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
        <h2>Modifier mot de passe</h2>
        <form
          className={styles.passwordEditForm}
          id="passwordEditForm"
          onSubmit={handleChangePasswordSubmit}
        >
          <div className={styles.formContainer}>
            <div className={styles.input}>
              <label htmlFor="description">Mot de passe actuel :</label>
              <input
                onChange={handleChange}
                id="oldPassword"
                name="oldPassword"
                type="password"
                required
              />
            </div>
            <br />
            <div className={styles.input}>
              <label htmlFor="description">Nouveau mot de passe :</label>
              <input
                onChange={handleChange}
                id="newPassword"
                name="newPassword"
                required
                type="password"
              />
            </div>
            <br />
          </div>
          <button className={styles.buttonEditPassword} type="submit">
            Modifier mon mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

EditPassword.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPassword;
