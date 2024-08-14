import { ReactNode } from "react";
import Header from "./Header";
import Ellipse1 from "../assets/ellipses/Ellipse1.svg";
import Ellipse2 from "../assets/ellipses/Ellipse2.svg";
import Ellipse3 from "../assets/ellipses/Ellipse3.svg";

interface ElementProps {
  children: ReactNode;
}

const Layout = ({ children }: ElementProps) => {
  return (
    <div className="min-w-full bg-black h-[100vh] relative">
      <div className="absolute top-[600px] max-sm:top-[400px]">
        <img
          src={Ellipse1}
          alt="ellipse-1"
          className="h-[400px] object-contain max-sm:h-[200px]"
        />
      </div>
      <div className="absolute right-[400px]">
        <img
          src={Ellipse2}
          alt="ellipse-1"
          className="h-[200px] object-contain"
        />
      </div>
      <div className="absolute top-[50px] right-[50px]">
        <img
          src={Ellipse3}
          alt="ellipse-1"
          className="h-[180px] object-contain"
        />
      </div>
      <div className="container py-10 h-[100vh] max-sm:p-0">
        <Header />

        <div className="pb-8 flex flex-col h-[calc(100vh-200px)] overflow-y-scroll scrollbar-hide items-center max-sm:p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
