import { useRouter } from "next/router";
import { useState } from "react";
import { FacebookShareButton } from "react-share";
import { useSWRConfig } from "swr";
import useAnswer from "../hooks/useAnswer";
import useQuestion from "../hooks/useQuestion";
import deleteAnswerService from "../services/deleteAnswer.service";
import deleteQuestionService from "../services/deleteQuestion.service";
import updateAnswerService from "../services/updateAnswer.service";
import updateQuestionService from "../services/updateQuestion.service";
import API_URL from "../utils/constants/apiURL";
import URL from "../utils/constants/URL";
import MyModal from "./MyModal";

export default function ActionList({
  id = "", // question id
  questionId = "", // answer id
  edit, // boolean
  _delete, // boolean
  share, // boolean
  verify, // boolean
  object, // string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { question } = useQuestion(object === "question" ? id : null);
  const { answer } = useAnswer(object === "answer" ? id : null);
  const { mutate } = useSWRConfig();

  const onSubmit = (content) => {
    if (object === "answer") {
      updateAnswerService(id, content)
        .then(() => {
          mutate(`${API_URL}/questions/${questionId}/answers`);
        })
        .catch(() => {
          alert("Error updating answer!");
        });
    } else {
      updateQuestionService(id, content)
        .then((res) => {
          mutate(`${API_URL}/questions/${id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleVerify = () => {
    if (object === "answer") {
      postAnswerVerify(object.ID)
        .then(() => {
          alert("Answer verified!");
        })
        .catch(() => {
          alert("Error verifying answer!");
        });
    }
  };
  const handleEdit = () => {
    setIsOpen(true);
  };
  const handleDelete = () => {
    if (object === "answer") {
      if (confirm("Are you sure you want to delete this answer?")) {
        deleteAnswerService(id)
          .then(() => {
            mutate(`${API_URL}/questions/${questionId}/answers`);
          })
          .catch(() => {
            alert("Error deleting answer!");
          });
      }
    } else if (object === "question") {
      deleteQuestionService(id)
        .then(() => {
          router.push(`/`);
        })
        .catch(() => {
          alert("Error deleting question!");
        });
    }
  };
  return (
    <>
      <div className="flex gap-2 text-neutral-500 text-xs">
        {verify && <button onClick={() => handleVerify()}>Verify</button>}
        {edit && <button onClick={() => handleEdit()}>Edit</button>}
        {_delete && <button onClick={() => handleDelete()}>Delete</button>}
        {share && (
          <FacebookShareButton
            url={`${URL}${router.asPath}`}
            quote={"Check out this question!"}
            hashtag="#QuestNow"
          >
            {" "}
            Share on Facebook
          </FacebookShareButton>
        )}
      </div>
      <MyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit"
        content={object === "answer" ? answer?.content : question?.content}
        onSubmit={(content) => onSubmit(content)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
