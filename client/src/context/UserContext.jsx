import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem("token");
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resUser) => resUser.json())
        .then((resUser) => {
          if (resUser.status === 401 || resUser.status === 500) {
            toast.error("Erreur lors de l'affichage du profil");
          } else {
            setUser(resUser.users[0]);
          }
        })
        .catch((err) => console.info("err :>> ", err))
        .finally(() => {
          setIsLoading(false);
        });
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, 
};

export const useUser = () => {
  return useContext(UserContext);
};
