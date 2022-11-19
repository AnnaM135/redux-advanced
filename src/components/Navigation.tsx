import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <nav className="h-[50px] flex justify-between items-center px-5 bg-gray-500 text-white">
      <span className="font-bold">Redux/Typescript 2022</span>
      <span>
        <Link to="/" className="mr-2">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </span>
        
    </nav>
  );
}
