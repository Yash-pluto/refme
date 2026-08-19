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

export default async function TopicPage({
  params,
}: {
  params: { topic: string };
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

  return (
    <TopicLayout
      frontmatter={topicData.frontmatter}
      topicKey={resolvedParams.topic}
      topics={allTopics}
      headings={topicData.headings}
      prevTopic={prevTopic}
      nextTopic={nextTopic}
    >
      <MDXRemote source={topicData.content} components={mdxComponents} />
    </TopicLayout>
  );
}
