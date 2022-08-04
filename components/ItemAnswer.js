import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useGetAnswerVotes from "../hooks/useGetAnswerVotes";
import deleteVoteAnswer from "../services/deleteVoteAnswer.service";
import downvoteAnswerService from "../services/downvoteAnswer.service";
import upvoteAnswerService from "../services/upvoteAnswer.service";
import { getUser } from "../utils/authUtils";
import API_URL from "../utils/constants/apiURL";
import getDayFromNow from "../utils/getDateFromNow";
import ActionList from "./ActionList";

export default function ItemAnswer({ answer }) {
  const [isOwner, setIsOwner] = useState(false);
  const { mutate } = useSWRConfig();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    let currentUser = getUser();
    if (currentUser) {
      setUserInfo(currentUser);
      if (currentUser.id === answer?.user_id) {
        setIsOwner(true);
      }
    }
  }, [answer]);
  const { votes = [] } = useGetAnswerVotes(answer.ID);

  const handleUpvote = async () => {
    try {
      if (!userInfo) {
        alert("You must login to downvote");
        return;
      } else if (
        votes?.filter((item) => item.user_id === userInfo.id && item.type === 1)
          .length > 0
      ) {
        await deleteVoteAnswer(answer.ID);
        mutate(`${API_URL}/answers/${answer.ID}/votes`);
        mutate(`${API_URL}/questions/${answer.question_id}/answers`);
        return;
      }
      await upvoteAnswerService(answer.ID);
      mutate(`${API_URL}/answers/${answer.ID}/votes`);
      mutate(`${API_URL}/questions/${answer.question_id}/answers`);
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
        await deleteVoteAnswer(answer.ID);
        mutate(`${API_URL}/answers/${answer.ID}/votes`);
        mutate(`${API_URL}/questions/${answer.question_id}/answers`);
        return;
      }
      await downvoteAnswerService(answer.ID);
      mutate(`${API_URL}/answers/${answer.ID}/votes`);
      mutate(`${API_URL}/questions/${answer.question_id}/answers`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-3 py-2">
      <div>
        <div className="flex flex-col items-center">
          <button
            onClick={handleUpvote}
            className={`${
              userInfo &&
              votes?.filter(
                (item) => item.user_id === userInfo.id && item.type === 1
              ).length > 0
                ? "text-orange-400"
                : "text-neutral-400"
            }`}
          >
            <ArrowSmUpIcon className="w-8 h-8" />
          </button>
          <span className="text-xl text-neutral-400">
            {votes?.length > 0
              ? votes.filter((vote) => vote.type === 1).length -
                votes.filter((vote) => vote.type === 2).length
              : 0}
          </span>
          <button
            onClick={handleDownvote}
            className={`${
              userInfo &&
              votes?.filter(
                (item) => item.user_id === userInfo.id && item.type === 2
              ).length > 0
                ? "text-orange-400"
                : "text-neutral-400"
            }`}
          >
            <ArrowSmDownIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div className="flex pr-4 flex-col w-full justify-between">
        <div> {answer?.content} </div>
        <div className="flex gap-3">
          <div>
            <ActionList
              object="answer"
              id={answer?.ID}
              edit={isOwner}
              _delete={isOwner}
            />
          </div>
          <div className="ml-auto text-xs flex gap-2">
            <span className="text-neutral-500">Answer:</span>
            <span> {getDayFromNow(answer.CreatedAt)} </span> |
            <span className="text-neutral-500">By:</span>
            <span>{answer?.user?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
