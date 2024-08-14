import { useNavigate } from "react-router-dom";
import blogImage from "../assets/post/daniil-silantev-qw85f6MTX-o-unsplash 1.svg";

interface ElementProps {
  title: string;
  content: string;
  authorName: string;
  imageUrl: string | null;
  postId: string;
  onDelete?: () => void;
}

const ItemCard = ({
  title,
  content,
  authorName,
  imageUrl,
  postId,
  onDelete,
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
      className="text-left px-[60px] py-[32px] w-full min-h-[260px] text-white flex justify-between items-center z-[1] border-dashed border-b-[1px] border-[#252525] max-sm:p-4"
    >
      <div className="h-[100%] pt-4 max-sm:h-[unset]">
        <p className="text-4xl font-bold mb-5 max-sm:text-xl">{title}</p>

        <p className="text-xl w-[80%] max-sm:text-sm">{`${content.slice(0, 80)}..`}</p>

        <p className="text-xl mt-2 opacity-60">{authorName}</p>
      </div>

      <div className="flex items-center">
        <div className="rounded-[30px] overflow-hidden shadow-postImageShadow max-sm:rounded-sm max-sm:w-[120px]">
          <img
            src={imageUrl || blogImage}
            alt="blog-image"
            height={200}
            width={336}
          />
        </div>

        {!!onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              onDelete();
            }}
            className="border-2 border-red-300 rounded-sm p-2 ml-4 text-red-300"
          >
            Delete
          </button>
        )}
      </div>
    </button>
  );
};

export default ItemCard;
