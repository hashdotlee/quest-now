import { ArrowRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ItemQuest from "./ItemQuest";
import useQuestions from "../hooks/useQuestions";

export default function QuestList() {
  const router = useRouter();
  const { questions, isLoading, isError } = useQuestions();
  return (
    <div>
      <div className="flex items-center gap-8 mt-4">
        <h1>Quest List</h1>
        <button
          onClick={() => {
            router.push("/post-quest");
          }}
          className="bg-neutral-200 flex items-center font-semibold p-1"
        >
          Want to post Quest?
          <ArrowRightIcon className="h-4 w-4 ml-2 inline-block" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-4 text-sm">
        <div className="flex items-center gap-1 border pl-1">
          <input
            type="text"
            className="px-1 focus:outline-none py-1"
            placeholder="Search"
          />
          <button className="px-1 py-1 bg-neutral-100">Search</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-orange-500">&#12300;All&#12301;</button>
          <button className="text-neutral-500">&#12300;Solved&#12301;</button>
          <button className="text-neutral-500">&#12300;Unsolved&#12301;</button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-neutral-600">Loading question list...</div>
      ) : isError ? (
        <details className="text-neutral-600">
          <summary>Error loading question list.</summary>
          <p>{String(isError)}</p>
        </details>
      ) : (
        <ul className="mt-3">
          {questions.map((question, index) => (
            <ItemQuest key={question.ID} index={index} question={question} />
          ))}
        </ul>
      )}
    </div>
  );
}
