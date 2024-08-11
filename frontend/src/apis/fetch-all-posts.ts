import BlogApiHandler from ".";

export const fetchAllPosts = async () => {
  const res = await BlogApiHandler.get("/blog");

  return res.data;
};
