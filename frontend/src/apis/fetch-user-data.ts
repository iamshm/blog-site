import BlogApiHandler from ".";

const fetchUserData = async () => {
  const res = await BlogApiHandler.get("/blog/user");

  return res.data;
};

export default fetchUserData;
