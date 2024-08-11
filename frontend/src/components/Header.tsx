import { useNavigate } from "react-router-dom";
import CreateDialog from "./Create-dialog";

const Header = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <div className="mb-12 w-full h-[100px] bg-headerGradient rounded-[30px] shadow-headerShadow backdrop-blur-sm z-10 p-8 text-white flex items-center justify-between">
      <div
        className="tracking-[1.44px] text-3xl font-medium cursor-pointer"
        onClick={onClick}
      >
        Gyan
      </div>

      <div className="flex items-center gap-4 text-xl">
        <CreateDialog />

        <button>My profile</button>
      </div>
    </div>
  );
};

export default Header;
