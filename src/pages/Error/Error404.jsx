import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import chillTime from "../../assets/Chill-Time.png";

export default function Error404() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 border-black border-20">
      <div className="w-full flex flex-col items-center gap-6">
        {/* Text */}
        <h1 className="text-5xl font-bold text-gray-900 text-center">
          Oops! Nothing to see here
        </h1>
        {/* 404 */}
        <p className="text-3xl font-semibold text-black">404</p>

        {/* Image */}
        <img
          src={chillTime}
          alt="Error Chill Time"
          className="w-120 h-120 -mt-10"
        />

        {/* Button */}
        <button
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
          className="bg-black text-white px-8 py-3 rounded-4xl font-medium hover:opacity-90 transition-opacity"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
