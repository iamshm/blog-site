import createPost from "@/apis/create-post";
import fetchImages from "@/apis/fetch-images";
import useAuthenticated from "@/hooks/use-authenticated";
import { CreateBlogInput } from "@iamshm/medium-common";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import InputBox from "./InputBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const initialValues = {
  title: "",
  content: "",
  image: "",
};

const CreateDialog = () => {
  const { hasToken } = useAuthenticated();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBlogInput>(initialValues);

  if (!hasToken) return <></>;

  const onUpdateFields = (fieldName: string, value: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [fieldName]: value,
      };
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      if (formData.content === "" || formData.title === "")
        throw new Error("Empty inputs");

      const image = await fetchImages(formData.title);

      await createPost({
        ...formData,
        image: image.src.original,
      });

      setFormData(initialValues);
      setIsOpen(false);
      toast.success("Blog added successfully");

      window.location.reload();
    } catch (error) {
      toast.error("Blog creation failed");
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create</Button>
      </DialogTrigger>
      <DialogContent className="bg-black min-w-[700px] max-sm:min-w-[200px]">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl text-center mb-4">
            Write a blog
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <InputBox
            placeholder="Title"
            value={formData.title}
            onChange={(e) => onUpdateFields("title", e.target.value)}
          />
          <textarea
            rows={6}
            placeholder="Lorem ipsum dolor .."
            value={formData.content}
            className="mt-4 bg-black rounded-xl border-white border-2 outline-none w-full py-2 px-4 mb-3 text-lg text-white"
            onChange={(e) => onUpdateFields("content", e.target.value)}
          />
        </DialogDescription>

        <DialogFooter className="max-sm:w-full flex-row gap-4">
          <Button
            variant="secondary"
            onClick={() => {
              setIsOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={onSubmit} disabled={isLoading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateDialog;
