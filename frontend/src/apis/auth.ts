import { SigninInput, SignupInput } from "@iamshm/medium-common";
import BlogApiHandler from ".";

export const signup = async (payload: SignupInput) => {
  const res = await BlogApiHandler.post("/user/signup", payload);

  return res.data;
};

export const signin = async (payload: SigninInput) => {
  const res = await BlogApiHandler.post("/user/signin", payload);

  return res.data;
};
