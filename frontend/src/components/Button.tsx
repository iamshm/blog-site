import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}
const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={
        variant === "primary"
          ? "w-fit h-[50px] rounded-lg px-4 py-2 font-medium bg-white text-black text-xl flex items-center disabled:opacity-40 max-sm:p-2 max-sm:text-sm"
          : "w-fit h-[50px] rounded-lg px-4 py-2 font-medium bg-black text-white text-xl border-2 border-white opacity-90 flex items-center disabled:opacity-40 max-sm:p-2 max-sm:text-sm"
      }
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
