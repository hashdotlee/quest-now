import Link from "next/link";
import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/solid";
import slug from "slug";
import { useEffect, useState } from "react";
import upvoteQuestionService from "../services/upvoteQuestion.service";
import downvoteQuestionService from "../services/downvoteQuestion.service";
import { getUser } from "../utils/authUtils";
import deleteVoteQuestion from "../services/deleteVoteQuestion.service";
import { useSWRConfig } from "swr";
import API_URL from "../utils/constants/apiURL";

export default function ItemQuest({ question, index }) {
  const { mutate } = useSWRConfig();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    let currentUser = getUser();
    if (currentUser) {
      setUserInfo(currentUser);
    }
  }, []);
  const handleUpvote = async () => {
    try {
      if (!userInfo) {
        alert("You must login to downvote");
        return;
      } else if (
        question?.vote?.filter(
          (item) => item.user_id === userInfo.id && item.type === 1
        ).length > 0
      ) {
        await deleteVoteQuestion(question?.ID);
        mutate(`${API_URL}/questions`);
        return;
      }
      await upvoteQuestionService(question?.ID);
      mutate(`${API_URL}/questions`);
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
        question?.vote?.filter(
          (item) => item.user_id === userInfo.id && item.type === 2
        ).length > 0
      ) {
        await deleteVoteQuestion(question?.ID);
        mutate(`${API_URL}/questions`);
        return;
      }
      await downvoteQuestionService(question?.ID);
      mutate(`${API_URL}/questions`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li key={question.id} className="flex gap-3 items-start">
      <div>
        <span>{index + 1}. </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex flex-col justify-between">
          <div
            role="button"
            onClick={handleUpvote}
            className={`cursor-pointer ${
              userInfo &&
              question?.vote?.filter(
                (item) => item.user_id === userInfo.id && item.type === 1
              ).length > 0
                ? "text-orange-400"
                : "text-neutral-400"
            }`}
          >
            <ArrowSmUpIcon className="h-4 w-4" />
          </div>
          <div
            role="button"
            onClick={handleDownvote}
            className={`cursor-pointer ${
              userInfo &&
              question?.vote?.filter(
                (item) => item.user_id === userInfo.id && item.type === 2
              ).length > 0
                ? "text-orange-400"
                : "text-neutral-400"
            }`}
          >
            <ArrowSmDownIcon className="h-4 w-4" />
          </div>
        </div>
        <div>
          <Link href={`/questions/${question.ID}/${slug(question.title)}`}>
            <a>{question.title}</a>
          </Link>
          <div className="flex items-center text-xs gap-2">
            <span>
              {question.stats ? question.stats.num_of_vote : 0} points
            </span>
            -
            <span>
              {question.stats ? question.stats.num_of_answer : 0} answers
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
