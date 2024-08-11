import { CreateBlogInput } from "@iamshm/medium-common";
import BlogApiHandler from ".";

const createPost = async (payload: CreateBlogInput) => {
  const url = `/blog`;

  const res = await BlogApiHandler.post(url, payload);

  return res.data;
};

export default createPost;
