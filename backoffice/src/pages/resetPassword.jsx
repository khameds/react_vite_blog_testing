import { useContext, useState } from "react";
import Notification from "../components/notification";
import { UserContext } from "../context/userContext";

export default function ResetPassword() {
  const { token, updateToken } = useContext(UserContext);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_URL_BACKEND}/users/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(password),
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
        setTimeout(() => {
          updateToken();
        }, 3000);
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
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <Notification
          open={open}
          setOpen={setOpen}
          error={error}
          message={message}
        />
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ancien Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={password.oldPassword}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Att11@tr"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={password.newPassword}
              onChange={handleChange}
              placeholder="Att11@tr"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Valider
          </button>
        </form>
      </div>
    </main>
  );
}
