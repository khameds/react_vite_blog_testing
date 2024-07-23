import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import avatarRandom from "../assets/avatar.jpg";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 401 || res.status === 500) {
          toast.error("Erreur lors de la récupération du profil");
        } else {
          setUser(res.users[0]);
        }
      })
      .catch((err) => console.info("Erreur :>> ", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.rightContainer}>
          <ul>
            <li>
              <Link to="/dashboard">Accueil</Link>
            </li>
            <li onClick={handleLogout}>Déconnexion</li>
          </ul>

          <Link to={"/profile-page"}>
            {user.avatar ? (
              <img src={user.avatar} alt="logo" className={styles.avatar} />
            ) : (
              <img
                className={styles.avatar}
                src={avatarRandom}
                alt="random avatar"
              />
            )}{" "}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
