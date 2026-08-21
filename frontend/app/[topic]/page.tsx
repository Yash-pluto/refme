import type { Metadata } from "next";
import { getAllTopics, getTopicBySlug } from "../../src/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import SkeletonTopic from "../components/SkeletonTopic";
import TopicLayout from "./TopicLayout";
import ClientCodeBlock from "../components/ClientCodeBlock";
import { MdxH2, MdxH3, MdxP, MdxUl } from "../components/MdxTypography";

const mdxComponents = {
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  ul: MdxUl,
  pre: (props: any) => {
    const codeChunk = props.children?.props?.children || "";
    const language =
      props.children?.props?.className?.replace("language-", "") ||
      "javascript";

    return <ClientCodeBlock code={codeChunk} language={language} />;
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const topicData = getTopicBySlug(resolvedParams.topic);

  if (!topicData || !topicData.frontmatter) {
    return {};
  }

  const { title, description } = topicData.frontmatter;
  const pageTitle = `${title} | RefMe_`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
    },
    alternates: {
      canonical: `https://refmev1.vercel.app/${resolvedParams.topic}`,
    },
  };
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  
  return topics.map((topic) => ({
    topic: topic.id,
  }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const resolvedParams = await params;
  const topicData = getTopicBySlug(resolvedParams.topic);
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex((topic) => topic.id === resolvedParams.topic);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < allTopics.length - 1
      ? allTopics[currentIndex + 1]
      : null;

  if (!topicData) {
    return (
      <TopicLayout
        frontmatter={undefined}
        topicKey={resolvedParams.topic}
        topics={allTopics}
        headings={[]}
        prevTopic={prevTopic}
        nextTopic={nextTopic}
      >
        <SkeletonTopic topicKey={resolvedParams.topic} />
      </TopicLayout>
    );
  }

  const { title, description, category } = topicData.frontmatter;
  const pageUrl = `https://refmev1.vercel.app/${resolvedParams.topic}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://refmev1.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category || "Category",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: "Yash Vardhan",
      url: "https://www.linkedin.com/in/vardhan-yash3105/",
    },
    url: pageUrl,
  };

  return (
    <TopicLayout
      frontmatter={topicData.frontmatter}
      topicKey={resolvedParams.topic}
      topics={allTopics}
      headings={topicData.headings}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <MDXRemote source={topicData.content} components={mdxComponents} />
    </TopicLayout>
  );
}