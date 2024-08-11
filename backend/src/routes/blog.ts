import {
  createBlogInput,
  deleteBlogInput,
  updateBlogInput,
} from "@iamshm/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { AppType } from "../type";

declare module "hono" {
  interface HonoRequest {
    userId?: string;
  }
}

const blogRouter = new Hono<AppType>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization")?.split(" ")?.[1] || "";

  try {
    const res = await verify(token, c.env.JWT_SECRET);
    c.set("userId", res.id as string);

    await next();
  } catch (error) {
    c.status(403);

    return c.json({
      message: "Unauthorized access",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Payload",
    });
  }

  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId,
      imageUrl: body.image,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Payload",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");

  const blog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: authorId,
    },
    data: {
      ...body,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/one/:id", async (c) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.findUnique({
    where: {
      id: blogId,
    },
  });

  return c.json({
    data: blog,
  });
});

blogRouter.get("/user", async (c) => {
  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    where: {
      authorId,
    },
  });

  return c.json({
    data: blogs,
  });
});

blogRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return c.json({
    data: blogs,
  });
});

blogRouter.delete("/", async (c) => {
  const authorId = c.get("userId");
  const body = await c.req.json();

  const { success } = deleteBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid Payload",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  await prisma.post.delete({
    where: {
      id: body.id,
      authorId,
    },
  });

  return c.json({
    msg: "Deleted",
  });
});

export default blogRouter;
