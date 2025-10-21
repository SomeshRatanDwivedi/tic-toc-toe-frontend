import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  return (
    <nav className="h-14 bg-gray-800 text-white flex items-center px-4">
      <button onClick={()=>navigate("/app")} className=" text-sm md:text-lg font-semibold ">Tic Tac Toe</button>
      <button onClick={() => navigate("/app/games")} className=" text-sm md:text-lg font-semibold ml-4 ">Game Played by me</button>
      <div className="ml-auto">
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm md:text-lg"
        >
          Logout ({user.username})
        </button>
      </div>
    </nav>
  );
}