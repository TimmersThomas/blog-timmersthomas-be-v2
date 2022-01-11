export type ImageMeta = {
  size: {
    width: number;
    height: number;
  },
  credits: {
    serviceName: string;
    serviceLink: string;
    createdByName: string;
    createdByLink: string;
  }
};

export type Author = {
  name: string
  picture: string
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  coverImageMeta?: ImageMeta;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string
  };
  content: string;
};
