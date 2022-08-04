import { useRouter } from "next/router";
import { useState } from "react";
import { FacebookShareButton, FacebookShareCount } from "react-share";
import { useSWRConfig } from "swr";
import deleteAnswerService from "../services/deleteAnswer.service";
import deleteQuestionService from "../services/deleteQuestion.service";
import updateAnswerService from "../services/updateAnswer.service";
import updateQuestionService from "../services/updateQuestion.service";
import URL from "../utils/constants/URL";
import MyModal from "./MyModal";

export default function ActionList({
  id = "", // question id
  edit, // boolean
  _delete, // boolean
  share, // boolean
  verify, // boolean
  object, // string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const onSubmit = (content) => {
    if (object === "answer") {
      updateAnswerService(id, content)
        .then(() => {
          alert("Answer updated!");
        })
        .catch(() => {
          alert("Error updating answer!");
        });
    } else {
      updateQuestionService(id, content)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const { mutate } = useSWRConfig();
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
  const handleShare = () => {
    if (object === "answer") {
      postAnswerShare(object.ID)
        .then(() => {
          alert("Answer shared!");
        })
        .catch(() => {
          alert("Error sharing answer!");
        });
    } else if (object === "question") {
      postQuestionShare(object.ID)
        .then(() => {
          alert("Question shared!");
        })
        .catch(() => {
          alert("Error sharing question!");
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
            alert("Answer deleted!");
          })
          .catch(() => {
            alert("Error deleting answer!");
          });
      }
    } else if (object === "question") {
      deleteQuestionService(id)
        .then(() => {
          alert("Question deleted!");
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
            Share on Facebook (
            <FacebookShareCount url={`${URL}${router.asPath}`}>
              {(count) => <span>{count}</span>}
            </FacebookShareCount>
            )
          </FacebookShareButton>
        )}
      </div>
      <MyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit"
        onSubmit={(content) => onSubmit(content)}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
}
