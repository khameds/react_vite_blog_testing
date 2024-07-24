/* eslint-disable react/prop-types */

export default function Notification({ open, setOpen, error, message }) {
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <>
      {open ? (
        error ? (
          <div className="w-auto h-[80px] flex justify-center items-center absolute bottom-0 border-2 rounded-md p-4 bg-white border-red-500">
            <p className="text-red-500">{error}</p>
            <button
              type="button"
              className="absolute top-0 right-0 pr-2 text-red-500"
              onClick={handleClick}
            >
              X
            </button>
          </div>
        ) : (
          <div className="w-auto h-[80px] flex justify-center items-center absolute bottom-0 border-2 rounded-md p-4 bg-white border-green-500">
            <p className="text-green-500">{message}</p>
            <button
              type="button"
              className="absolute top-0 right-0 pr-2  text-green-500"
              onClick={handleClick}
            >
              X
            </button>
          </div>
        )
      ) : null}
    </>
  );
}
