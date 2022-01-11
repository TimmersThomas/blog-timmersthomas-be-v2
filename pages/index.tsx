import Container from "../components/structure/container";
import MoreStories from "../components/content-blocks/more-stories";
import HeroPost from "../components/content-blocks/hero-post";
import Intro from "../components/structure/intro";
import Layout from "../components/structure/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_TITLE } from "../lib/constants";
import { Post } from "../types/post";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  console.log(heroPost);
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>{CMS_TITLE}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              coverImageMeta={heroPost.coverImageMeta}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "coverImageMeta",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
