import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Notification from "./notification";

export default function Signup() {
  const { token } = useContext(UserContext);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [userForm, setFormUser] = useState({
    firstname: "",
    lastname: "",
    pseudo: "",
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser({
      ...userForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_URL_BACKEND}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userForm),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Une erreur est survenue");
        }
        return res.json();
      })
      .then((res) => {
        setOpen(true);
        setMessage(res.message);
        setFormUser({
          firstname: "",
          lastname: "",
          pseudo: "",
          email: "",
          password: "",
          role: "",
          avatar:
            "https://gravatar.com/avatar/653900e5e36836285fa0d3e8939ecad4?s=400&d=robohash&r=x",
        });
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
          setOpen(true);
        } else {
          setError(error.message);
          setOpen(true);
        }
      });
  };
  return (
    <main className="min-h-[calc(100vh-(64px+84px+80px))]">
      <section className="bg-gray-50 dark:bg-gray-900">
        <Notification
          open={open}
          setOpen={setOpen}
          error={error}
          message={message}
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src="blog.svg" alt="logo" />
            BLOG
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Créer un nouvel utilisateur
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={userForm.firstname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Votre prénom"
                    required
                  />
                </>
                <>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={userForm.lastname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Votre nom"
                    required
                  />
                </>
                <>
                  <label
                    htmlFor="pseudo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pseudo
                  </label>
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    value={userForm.pseudo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Votre pseudo"
                    required
                  />
                </>
                <>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userForm.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@domaine.com"
                    required
                  />
                </>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={userForm.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rôle
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    value={userForm.role}
                    onChange={handleChange}
                    placeholder="user | admin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Créer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
