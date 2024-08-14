import deletePost from "@/apis/delete-blog";
import fetchUserData from "@/apis/fetch-user-data";
import ItemCard from "@/components/Item-card";
import Layout from "@/components/Layout";
import { Post } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetchUserData();

      setPosts(res.data);
      setUser(res.user.name);
    } catch (error) {
      toast.error("User data retrieval failed");
    }
  };

  const onDeletePost = async (id: string) => {
    try {
      await deletePost({ id });

      toast.success("Blog Deleted successfully");
      window.location.reload();
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchUser();

    setIsLoading(false);
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <>Loading</>
      ) : (
        <>
          <p className="text-white font-bold text-4xl mb-6 text-left w-full px-[60px] max-sm:pl-4 max-sm:mb-2">{`${user}'s blogs`}</p>

          {posts.map((post) => (
            <ItemCard
              key={post.id}
              postId={post.id}
              title={post.title}
              content={post.content}
              authorName={post.author.name}
              imageUrl={post.imageUrl}
              onDelete={() => onDeletePost(post.id)}
            />
          ))}
        </>
      )}
    </Layout>
  );
};

export default Profile;
