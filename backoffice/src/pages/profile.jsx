import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../components/notification";
import { UserContext } from "../context/userContext";

export default function Profile() {
  const { user, token } = useContext(UserContext);
  const [disabled, setDisabled] = useState(true);
  const [userForm, setFormUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    pseudo: user.pseudo,
    status: user.status,
    avatar: user.avatar,
    role: user.role,
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_URL_BACKEND}/users`, {
      method: "PATCH",
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
        setDisabled(true);
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
      <Notification
        open={open}
        setOpen={setOpen}
        error={error}
        message={message}
      />
      <section className="flex flex-row flex-wrap justify-center gap-7 w-[800px] mx-auto my-7">
        <div className="flex flex-col gap-4">
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            name="firstname"
            disabled={disabled}
            className="text-xl w-[300px] h-10 pl-3"
            value={userForm.firstname}
            onChange={handleChange}
            id="firstname"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            disabled={disabled}
            className="text-xl w-[300px] h-10  pl-3"
            value={userForm.lastname}
            onChange={handleChange}
            id="lastname"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            name="pseudo"
            disabled={disabled}
            className="text-xl w-[300px] h-10  pl-3"
            value={userForm.pseudo}
            onChange={handleChange}
            id="pseudo"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            disabled
            className="text-xl w-[300px] h-10  pl-3"
            value={user.email}
            onChange={handleChange}
            id="email"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            disabled={disabled}
            className="text-xl w-[300px] h-10  pl-3"
            value={userForm.status}
            onChange={handleChange}
            id="status"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            name="avatar"
            disabled={disabled}
            className="text-xl w-[300px] h-10  pl-3"
            value={userForm.avatar}
            onChange={handleChange}
            id="avatar"
          />
        </div>
      </section>
      {disabled ? (
        <div className="flex justify-center gap-4">
          <Link
            to="/admin/initialisation-mot-de-passe"
            className="bg-gray-800 text-white border rounded-md p-2 mt-7 hover:opacity-85 cursor-pointer"
          >
            Mettre à jour mon mot de passe
          </Link>

          <button
            onClick={() => setDisabled(false)}
            className="bg-gray-800 text-white border rounded-md p-2 mt-7 hover:opacity-85 cursor-pointer"
          >
            Mettre à jour mes données
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className=" bg-gray-800 text-white border rounded-md p-2 mt-7 hover:opacity-85 cursor-pointer"
          >
            Valider
          </button>
        </div>
      )}
    </main>
  );
}
