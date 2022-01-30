export type ImageMeta = {
  size: {
    width: number;
    height: number;
  },
  credits?: ImageMetaCredits;
};

export type ImageMetaCredits = {
  serviceName?: string;
  serviceLink?: string;
  createdByName?: string;
  createdByLink?: string;
};

export type Author = {
  name: string
  picture: string
};


export type PostBase = {
  slug: string;
  title: string;
  date: string;

}
export type Post = PostBase & {
  coverImage: string;
  coverImageMeta?: ImageMeta;
  author?: Author;
  excerpt: string;
  ogImage: {
    url: string
  };
  content: string;
};

export type PostPreview = Omit<Post, "ogImage" | "content">;
