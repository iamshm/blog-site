import { useNavigate } from "react-router-dom";
import blogImage from "../assets/post/daniil-silantev-qw85f6MTX-o-unsplash 1.svg";

interface ElementProps {
  title: string;
  content: string;
  authorName: string;
  imageUrl: string | null;
  postId: string;
}

const ItemCard = ({
  title,
  content,
  authorName,
  imageUrl,
  postId,
}: ElementProps) => {
  const navigate = useNavigate();
  const onClickBlog = () => {
    navigate("/blog", {
      state: {
        postId,
      },
    });
  };

  return (
    <button
      onClick={onClickBlog}
      className="text-left px-[60px] py-[32px] w-full min-h-[260px] rounded-[30px] bg-cardGradient text-white flex justify-between items-center z-[1]"
    >
      <div className="h-[100%] pt-4">
        <p className="text-4xl font-bold mb-5">{title}</p>

        <p className="text-xl w-[80%]">{`${content.slice(0, 80)}..`}</p>

        <p className="text-xl mt-2 opacity-60">{authorName}</p>
      </div>

      <div className="rounded-[30px] overflow-hidden shadow-postImageShadow">
        <img
          src={imageUrl || blogImage}
          alt="blog-image"
          height={200}
          width={336}
        />
      </div>
    </button>
  );
};

export default ItemCard;
