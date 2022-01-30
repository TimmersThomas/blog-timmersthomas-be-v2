import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Container } from "@/components/structure/container";
import { PostBody } from "@/components/post/post-body";
import { Header } from "@/components/structure/header";
import { PostHeader } from "@/components/post/post-header";
import { Layout } from "@/components/structure/layout";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { PostTitle } from "@/components/post/post-title";
import Head from "next/head";
import { CMS_TITLE } from "@/lib/constants";
import { Post } from "@/@types/post";
import { parseMarkdownToHtml } from "@/lib/markdownToHtml";
import { serialize, deserialize } from "@/lib/react-serialize";
import { getCustomReactComponents } from "@/lib/customMarkdownComponents";
import { FC } from "react";

type Props = {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
};

const Post: FC<Props> = ({ post, preview }: Props) => {
  const router = useRouter();
  const content = deserialize(post.content, {
    components: getCustomReactComponents(),
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | {CMS_TITLE}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                coverImageMeta={post.coverImageMeta}
                date={post.date}
                author={post.author}
              />
              <PostBody content={content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug<Post>(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "coverImageMeta",
  ]);

  const parsedContent = (await parseMarkdownToHtml(post.content)).result;

  return {
    props: {
      post: {
        ...post,
        content: serialize(parsedContent as unknown as JSX.Element),
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts<Post>(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
