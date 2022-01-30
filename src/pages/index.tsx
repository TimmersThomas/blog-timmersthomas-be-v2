import {Container} from "@/components/structure/container";
import {MoreStories} from "@/components/content-blocks/more-stories";
import {HeroPost} from "@/components/content-blocks/hero-post";
import {Intro} from "@/components/structure/intro";
import {Layout} from "@/components/structure/layout";
import { getAllPosts } from "@/lib/api";
import Head from "next/head";
import { CMS_TITLE } from "@/lib/constants";
import { PostPreview } from "@/@types/post";
import { FC } from "react";

type Props = {
  allPosts: PostPreview[];
};

const Index: FC<Props> = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];

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
  const allPosts = getAllPosts<PostPreview>([
    "author",
    "coverImage",
    "coverImageMeta",
    "date",
    "excerpt",
    "slug",
    "title",
  ]);

  return {
    props: { allPosts },
  };
};
