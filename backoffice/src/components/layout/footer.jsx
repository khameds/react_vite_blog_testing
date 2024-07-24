export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="flex justify-center items-center bg-gray-800 h-[80px]">
      <p className=" text-white ">
        © {year} - Wild Code School - Projet final - Testeur Lyon
      </p>
    </footer>
  );
}
