import API_URL from "../utils/constants/apiURL";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function upvoteQuestionService(id) {
  return fetchWrapper(`${API_URL}/questions/${id}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 1,
    }),
  });
}
