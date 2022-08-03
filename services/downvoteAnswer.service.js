import API_URL from "../utils/constants/apiURL";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function downvoteAnswerService(id) {
  return fetchWrapper(`${API_URL}/answers/${id}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 2,
    }),
  });
}
