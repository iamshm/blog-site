import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}
const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={
        variant === "primary"
          ? "w-full h-[50px] rounded-lg px-4 py-2 font-medium bg-white text-black text-xl"
          : "w-full h-[50px] rounded-lg px-4 py-2 font-medium bg-black text-white text-xl border-2 border-white opacity-90"
      }
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
