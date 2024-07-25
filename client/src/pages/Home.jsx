import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import background from "../assets/background.jpeg";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import styles from "./Home.module.css";
const Home = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    pseudo: "",
    avatar: "",
  });
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // function to check if url link to add an avatar is valid
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // function to ckeck the url avatar
    if (formData.avatar) {
      if (!isValidUrl(formData.avatar)) {
        toast.error("Veuillez fournir un lien valide pour l'avatar.");
        return;
      }
    }

    // function to register a new user
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 500) {
          toast.error("Erreur lors de l'inscription");
        }
        if (res.status === 400) {
          toast.error(
            "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
          );
        }
        if (res.status === 409) {
          toast.error("Email déjà utilisé");
        } else {
          toast.success("Inscription réussie ! Merci de vous connecter");
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            pseudo: "",
            avatar: "",
          });
          setTimeout(() => {
            setShowLogin(true);
          }, 2000);
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };

  // function to manage the login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401 || res.status === 400 || res.status === 500) {
          toast.error("Erreur lors de la connexion");
        } else {
          localStorage.setItem("token", res.token);
          toast.success("Bienvenue !");
          navigate("/dashboard");
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };

  return (
    <div className={styles.homeStyle}>
      <img
        className={styles.background}
        src={background}
        alt="background image cat with computer"
      />
      <div className={styles.rightContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.homePage}>
          {showLogin ? (
            <div className={styles.form}>
              <h2>Connexion</h2>
              <form
                className={styles.loginForm}
                onSubmit={handleLoginSubmit}
                id="loginForm"
              >
                <div className={styles.formContainer}>
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" name="email" required />
                  <br />
                  <label htmlFor="password">Mot de passe:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                  <br />
                </div>
                <Button type="submit">Se connecter</Button>
                <p className={styles.buttonStyle}>
                  Pas encore connu ?{" "}
                  <Button
                    className={styles.buttonRegister}
                    type="button"
                    onClick={() => setShowLogin(false)}
                  >
                    S&apos;enregistrer
                  </Button>
                </p>
              </form>
            </div>
          ) : (
            <div className={styles.form}>
              <h2>Inscription</h2>
              <form
                className={styles.registerForm}
                onSubmit={handleRegisterSubmit}
              >
                <div className={styles.formInputs}>
                  <div className={styles.topForm}>
                    <label htmlFor="firstname">Prénom</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className={styles.inputField}
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <label htmlFor="lastname">Nom</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className={styles.inputField}
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                      type="text"
                      id="pseudo"
                      name="pseudo"
                      className={styles.inputField}
                      value={formData.pseudo}
                      onChange={handleChange}
                      required
                    />
                    <br />
                  </div>
                  <div className={styles.bottomForm}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.inputField}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={styles.inputField}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <br />

                    <label htmlFor="avatar">Avatar</label>
                    <input
                      type="text"
                      id="avatar"
                      name="avatar"
                      className={styles.inputField}
                      value={formData.avatar}
                      onChange={handleChange}
                    />
                    <br />
                  </div>
                </div>
                <Button type="submit" className={styles.submitButton}>
                  Sinscrire
                </Button>
                <p className={styles.buttonStyle}>
                  Déjà inscrit ?{" "}
                  <Button
                    className={styles.submitButton}
                    type="button"
                    onClick={() => setShowLogin(true)}
                  >
                    Se connecter
                  </Button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
