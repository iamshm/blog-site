import { DeleteBlogInput } from "@iamshm/medium-common";
import BlogApiHandler from ".";

const deletePost = async (payload: DeleteBlogInput) => {
  const url = `/blog`;

  const res = await BlogApiHandler.delete(url, {
    data: payload,
  });

  return res.data;
};

export default deletePost;
