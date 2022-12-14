import {
  ArrowLeftIcon,
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import Head from "next/head";
import Image from "next/image";
import { useSWRConfig } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActionList from "../../../components/ActionList";
import ItemAnswer from "../../../components/ItemAnswer";
import useAnswerByQuestion from "../../../hooks/useAnswerByQuestion";
import useGetQuestionVotes from "../../../hooks/useGetQuestionVotes";
import useQuestion from "../../../hooks/useQuestion";
import deleteVoteQuestion from "../../../services/deleteVoteQuestion.service";
import downvoteQuestionService from "../../../services/downvoteQuestion.service";
import postAnswer from "../../../services/postAnswer.service";
import upvoteQuestionService from "../../../services/upvoteQuestion.service";
import { getUser } from "../../../utils/authUtils";
import getDayFromNow from "../../../utils/getDateFromNow";
import API_URL from "../../../utils/constants/apiURL";
import URL from "../../../utils/constants/URL";

export default function QuestionDetail() {
  const router = useRouter();
  const query = router.query;
  const { id } = query;
  const { mutate } = useSWRConfig();
  const { question, user } = useQuestion(id ? String(id) : null);
  const [isOwner, setIsOwner] = useState(false);
  const { votes } = useGetQuestionVotes(id ? String(id) : null);
  const [userInfo, setUserInfo] = useState(null);
  const { answers } = useAnswerByQuestion(id ? String(id) : null);
  const [content, setContent] = useState("");
  useEffect(() => {
    let currentUser = getUser();
    if (currentUser) {
      setUserInfo(currentUser);
      if (currentUser.id === question?.user_id) {
        setIsOwner(true);
      }
    }
  }, [question]);
  const handleUpvote = async () => {
    try {
      if (!userInfo) {
        alert("You must login to downvote");
        return;
      } else if (
        votes?.filter((item) => item.user_id === userInfo.id && item.type === 1)
          .length > 0
      ) {
        await deleteVoteQuestion(id);
        mutate(`${API_URL}/questions/${id}/votes`);
        return;
      }
      await upvoteQuestionService(id);
      mutate(`${API_URL}/questions/${id}/votes`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    try {
      if (!userInfo) {
        alert("You must login to downvote");
        return;
      } else if (
        votes?.filter((item) => item.user_id === userInfo.id && item.type === 2)
          .length > 0
      ) {
        await deleteVoteQuestion(id);
        mutate(`${API_URL}/questions/${id}/votes`);
        return;
      }

      await downvoteQuestionService(id);
      mutate(`${API_URL}/questions/${id}/votes`);
    } catch (error) {
      console.log(error);
    }
  };

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
        <meta name="description" content={question?.title} />
        <meta name="keywords" content={question?.title} />
        <meta property="og:title" content={question?.title} />
        <meta property="og:description" content={question?.title} />
        <meta property="og:image" content={question?.image} />
        <meta property="og:url" content={`${URL}${router.asPath}`} />
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
                  <button
                    onClick={handleUpvote}
                    className={`${
                      userInfo &&
                      votes?.filter(
                        (item) =>
                          item.user_id === userInfo.id && item.type === 1
                      ).length > 0
                        ? "text-orange-400"
                        : "text-neutral-400"
                    }`}
                  >
                    <ArrowSmUpIcon className="w-8 h-8" />
                  </button>
                  <span className="text-xl text-neutral-400">
                    {votes?.length
                      ? votes.filter((vote) => vote.type === 1).length -
                        votes.filter((vote) => vote.type === 2).length
                      : 0}
                  </span>
                  <button
                    onClick={handleDownvote}
                    className={`${
                      userInfo &&
                      votes?.filter(
                        (item) =>
                          item.user_id === userInfo.id && item.type === 2
                      ).length > 0
                        ? "text-orange-400"
                        : "text-neutral-400"
                    }`}
                  >
                    <ArrowSmDownIcon className="w-8 h-8" />
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
                  {question?.topics && (
                    <div className="flex gap-2 ">
                      {question?.topics.map((topic) => (
                        <div key={topic.ID} className="p-1 bg-orange-100 text-sm">
                          <p>{topic.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <ActionList
                      edit={isOwner}
                      _delete={isOwner}
                      share
                      id={question?.ID}
                      object="question"
                    />
                  </div>
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
                  <p>No answers yet ????</p>
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
              <p className="text-base">This section is under construction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
