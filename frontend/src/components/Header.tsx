import { Link, useNavigate } from "react-router-dom";
import CreateDialog from "./Create-dialog";

const Header = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <div className="mb-12 w-full h-[100px] rounded-[30px] shadow-headerShadow backdrop-blur-sm z-10 p-8 text-white flex items-center justify-between max-sm:px-4 py-2 max-sm:gap-4 max-sm:mb-4">
      <div
        className="tracking-[1.44px] text-5xl font-medium cursor-pointer flex items-center gap-4 max-sm:text-3xl"
        onClick={onClick}
      >
        <div className="flex items-center gap-1">
          <div className="h-10 w-4 rounded-[1rem] bg-white"></div>

          <div className="h-6 w-4 rounded-[1rem] bg-white"></div>

          <div className="h-3 w-4 rounded-[1rem] bg-white"></div>
        </div>
        Gyan
      </div>

      <div className="flex items-center gap-4 text-xl max-sm:gap-2">
        <CreateDialog />

        <Link to="/profile">
          <button className="ml-4 max-sm:m-0 max-sm:text-sm">My Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
