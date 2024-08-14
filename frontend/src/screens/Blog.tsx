import fetchPost from "@/apis/fetch-post";
import Layout from "@/components/Layout";
import { Post } from "@/type";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { postId } = location.state || {};
  const [post, setPost] = useState<Post>();

  const getBlog = async () => {
    setIsLoading(true);

    try {
      const res = await fetchPost(postId);

      setPost(res.data);

      setIsLoading(false);
    } catch (error) {
      toast.error("Loading post failed");

      setIsLoading(false);

      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (!postId) return;

    getBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (isLoading || !post) return <></>;

  return (
    <Layout>
      <div className="flex flex-col gap-8 z-10 w-full max-sm:gap-4 max-sm: px-4">
        <div className="flex justify-between items-center">
          <p className="text-white text-4xl text-left font-bold max-sm:text-xl">
            {post.title}
          </p>

          <p className="text-white text-3xl text-left max-sm:text-xl opacity-60">
            - {post.author.name}
          </p>
        </div>
        {post.imageUrl && (
          <div className="h-[500px] w-full overflow-hidden flex items-center justify-center max-sm:h-[200px]">
            <img src={post.imageUrl} alt={post.title} height={500} />
          </div>
        )}

        <p className="text-white text-xl text-left leading-8 tracking-wider max-sm:text-sm">
          {post.content}
        </p>
      </div>
    </Layout>
  );
};

export default Blog;
