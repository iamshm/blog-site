export interface Post {
  authorId: string;
  content: string;
  title: string;
  id: string;
  published: boolean;
  author: Author;
  imageUrl: string | null;
}

export interface Author {
  name: string;
}
