import { setAuthorizationToken } from "@/apis";
import { signup } from "@/apis/auth";
import Button from "@/components/Button";
import InputBox from "@/components/InputBox";
import Layout from "@/components/Layout";
import { SignupInput } from "@iamshm/medium-common";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState<SignupInput>({
    name: "",
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

      const res = await signup(formData);

      setAuthorizationToken(res.token);
      setIsLoading(false);

      navigate("/dashboard");
    } catch (error) {
      toast("Invalid inputs");
    }
  };

  const onLoginClick = () => {
    navigate("/signin");
    return;
  };

  return (
    <Layout>
      <div className="border-2 border-white text-white flex flex-col gap-4 rounded-[30px] p-12 min-w-[500px]">
        <p className="text-2xl font-bold text-center">Signup</p>

        <p className="text-md text-center mt-[-15px] mb-[15px]">
          Let's create your account!
        </p>

        <InputBox
          onChange={(e) => onUpdateFields("name", e.target.value)}
          value={formData.name}
          placeholder="Name"
          type="text"
        />

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
          Create account
        </Button>

        <button onClick={onLoginClick} className="text-white">
          Already have an account? <u>Login</u>
        </button>
      </div>
    </Layout>
  );
};

export default Signup;
