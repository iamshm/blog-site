import BlogApiHandler from ".";

const fetchPost = async (blogId: string) => {
  const res = await BlogApiHandler.get(`/blog/one/${blogId}`);

  return res.data;
};

export default fetchPost;
