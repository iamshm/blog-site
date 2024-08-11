import axios from "axios";

const apikey = import.meta.env.VITE_PEXELS_API_KEY;

const fetchImages = async (query?: string) => {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`;

  const res = await axios.get(url, {
    headers: {
      Authorization: apikey,
    },
  });
  console.log(res.data.photos[0]);

  return res.data.photos[0];
};

export default fetchImages;
