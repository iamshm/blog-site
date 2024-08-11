import { fetchAllPosts } from "@/apis/fetch-all-posts";
import ItemCard from "@/components/Item-card";
import Layout from "@/components/Layout";
import { Post } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetchAllPosts();

      setPosts(res.data);
    } catch (error) {
      toast.error("Fetching Blogs failed");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchPosts();

    setIsLoading(false);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          {posts.map((post) => (
            <ItemCard
              key={post.id}
              postId={post.id}
              title={post.title}
              content={post.content}
              authorName={post.author.name}
              imageUrl={post.imageUrl}
            />
          ))}
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
