import {
  ArrowLeftIcon,
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ItemAnswer from "../../../components/ItemAnswer";
import useAnswerByQuestion from "../../../hooks/useAnswerByQuestion";
import useQuestion from "../../../hooks/useQuestion";
import postAnswer from "../../../services/postAnswer.service";
import getDayFromNow from "../../../utils/getDateFromNow";

export default function QuestionDetail() {
  const router = useRouter();
  const query = router.query;
  const { id } = query;
  const { question, user } = useQuestion(id ? String(id) : null);
  const { answers } = useAnswerByQuestion(id ? String(id) : null);
  const [content, setContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    postAnswer(content, question?.ID)
      .then(() => {
        alert("Answer posted!");
      })
      .then(() => {
        setContent("");
      })
      .catch(() => {
        alert("Error posting answer!");
      });
  };

  return (
    <div>
      <Head>
        <title>{question?.title}</title>
      </Head>
      <div className="container">
        <p className="flex gap-2 items-center h-10">
          <ArrowLeftIcon className="w-4 h-4" />
          <Link href="/">
            <a>Return to Quest list</a>
          </Link>{" "}
        </p>
        <div className=" flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h1>{question?.title}</h1>
              <div className="flex gap-2 text-sm">
                <span>{user?.username ? user.username : "Anonymous"}</span> -
                <span className="text-neutral-500 "> Asked</span>
                <span>{getDayFromNow(question?.CreatedAt)}</span> -
                <span className="text-neutral-500 "> Modified</span>
                <span>{getDayFromNow(question?.UpdatedAt)}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  router.push("/post-quest");
                }}
                className="bg-orange-200 px-2 py-1 rounded"
              >
                New Question{" "}
              </button>
            </div>
          </div>
          <hr />
          <div className="flex gap-8">
            <div className="w-3/4 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <button>
                    <ArrowSmUpIcon className="w-8 h-8 text-neutral-400" />
                  </button>
                  <span className="text-xl text-neutral-400">
                    {question?.vote
                      ? question.vote.filter((vote) => vote.type === 1) -
                        question.vote.filter((vote) => vote.type === 0)
                      : 0}
                  </span>
                  <button>
                    <ArrowSmDownIcon className="w-8 h-8 text-neutral-400" />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-base">{question?.content}</p>
                  {question?.image && (
                    <div>
                      <Image
                        src={question?.image}
                        alt="question-gif"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                  {question?.topic && (
                    <div>
                      {question?.topic.map((topic) => (
                        <div key={topic.ID}>
                          <p>{topic.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div>
                {answers?.length > 0 ? (
                  <div>
                    <div className="flex flex-col divide-y divide-1-black gap-3">
                      <h2>{answers?.length} Answers</h2>
                      {answers.map((answer) => (
                        <div key={answer.ID} className="">
                          <ItemAnswer answer={answer} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No answers yet 😕</p>
                )}
              </div>
              <hr />
              <div>
                <h2>Your answer</h2>
                <form onSubmit={onSubmit}>
                  {" "}
                  <textarea
                    name="answer"
                    placeholder="Write your answer here"
                    id="answer"
                    className="border w-full resize-none p-2 mt-1"
                    rows="4"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                  <button
                    className="border px-2 py-1 mt-2 bg-orange-500 font-semibold rounded"
                    type="submit"
                  >
                    Post your answer
                  </button>
                </form>
              </div>
            </div>
            <div className="bg-orange-100 text-neutral-500 h-[80vh] text-center rounded flex items-center justify-center gap-3 flex-col w-1/4">
              <ClockIcon className="w-8 h-8 mx-auto" />
              <p className="text-base">
                This section is under construction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
