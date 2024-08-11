import { setAuthorizationToken } from "@/apis";
import { signin } from "@/apis/auth";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Layout from "@/components/Layout";
import { SigninInput } from "@iamshm/medium-common";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onUpdateFields = (fieldName: string, value: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await signin(formData);

      setAuthorizationToken(res.token);
      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      toast("Invalid inputs");
    }
  };

  const onSignupClick = () => {
    navigate("/signup");
    return;
  };

  return (
    <Layout>
      <div className="border-2 border-white text-white flex flex-col gap-4 rounded-[30px] p-10 min-w-[500px]">
        <p className="text-2xl font-bold text-center">Signin</p>

        <p className="text-md text-center mt-[-15px] mb-[15px]">
          Welcome back.
        </p>

        <InputBox
          onChange={(e) => onUpdateFields("email", e.target.value)}
          value={formData.email}
          placeholder="Enter email"
          type="email"
        />

        <InputBox
          onChange={(e) => onUpdateFields("password", e.target.value)}
          value={formData.password}
          placeholder="Create password"
          type="password"
        />

        <Button type="submit" onClick={onSubmit} disabled={isLoading}>
          Login
        </Button>

        <button onClick={onSignupClick} className="text-white">
          Don't have an account? <u>Signup</u>
        </button>
      </div>
    </Layout>
  );
};

export default Signin;
