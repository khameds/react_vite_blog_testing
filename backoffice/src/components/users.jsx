import { useEffect, useState } from "react";
import { extract } from "../utils/extract";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/comments`)
      .then((res) => res.json())
      .then((res) => {
        const formatData = extract(res.data);
        setUsers(formatData);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-center text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Informations utilisateurs
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Pseudo
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Nombre des articles
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Nombre des commentaires
            </th>
          </tr>
        </thead>
        <tbody className="divide-y test-center divide-gray-100 border-t border-gray-100 ">
          {users.map(
            ({
              user_id,
              user_info,
              user_email,
              user_status,
              user_pseudo,
              comment_count,
              article_count,
              user_avatar,
            }) => (
              <tr key={user_id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal justify-center text-gray-900">
                  <div className="relative h-10 w-10">
                    {user_avatar ? (
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={user_avatar}
                        alt={`avatar ${user_email}`}
                      />
                    ) : (
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src="https://gravatar.com/avatar/38c8bf3e021454ae22d3472412c1f397?s=400&d=monsterid&r=x"
                        alt={`avatar ${user_email}`}
                      />
                    )}

                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{user_info}</div>
                    <div className="text-gray-400">{user_email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    {!user_status ? "Active" : " Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">{user_pseudo}</td>
                <td className="px-6 py-4">{article_count}</td>
                <td className="px-6 py-4">{comment_count}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
