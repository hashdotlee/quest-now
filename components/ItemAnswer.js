import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import getDayFromNow from "../utils/getDateFromNow";
import ActionList from "./ActionList";

export default function ItemAnswer({ answer }) {
  return (
    <div className="flex gap-3 py-2">
      <div>
        <div className="flex flex-col items-center">
          <button>
            <ArrowSmUpIcon className="w-8 h-8 text-neutral-400" />
          </button>
          <span className="text-xl text-neutral-400">
            {answer?.vote
              ? answer.vote.filter((vote) => vote.type === 1) -
                answer.vote.filter((vote) => vote.type === 0)
              : 0}
          </span>
          <button>
            <ArrowSmDownIcon className="w-8 h-8 text-neutral-400" />
          </button>
        </div>
      </div>
      <div className="flex pr-4 flex-col w-full justify-between">
        <div> {answer?.content} </div>
        <div className="flex gap-3">
          <div>
            <ActionList edit _delete share />
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
