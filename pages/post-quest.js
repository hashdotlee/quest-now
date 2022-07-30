import { ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import PostQuest from "../components/PostQuest";

export default function PostQuestion() {
  return (
    <div className="container">
      <Head>
        <title>Post Question</title>
        <meta name="description" content="Post a question" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="flex gap-2 items-center h-10">
        <ArrowLeftIcon className="w-4 h-4" />
        <Link href="/">
          <a>Return to Quest list</a>
        </Link>{" "}
      </p>
      <PostQuest />
    </div>
  );
}
