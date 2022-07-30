import Link from "next/link";
import { ArrowSmUpIcon, ArrowSmDownIcon } from "@heroicons/react/solid";

export default function ItemQuest({ question, index }) {
  return (
    <li key={question.id} className="flex gap-3 items-start">
      <div>
        <span>{index + 1}. </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex flex-col justify-between">
          <ArrowSmUpIcon className="h-4 w-4" />
          <ArrowSmDownIcon className="h-4 w-4" />
        </div>
        <div>
          <Link href={`/questions/${question.ID}`}>
            <a>{question.title}</a>
          </Link>
          <div className="flex items-center text-xs gap-2">
            <span>{question.vote ? question.vote.length : 0} votes</span>-
            <span>
              {question.answers ? question.answers.length : 0} answers
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
