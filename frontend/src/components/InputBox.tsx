import { InputHTMLAttributes } from "react";

const InputBox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="h-[60px] bg-black rounded-xl border-white border-2 outline-none w-full py-2 px-4 mb-3 text-lg text-white"
    />
  );
};

export default InputBox;
