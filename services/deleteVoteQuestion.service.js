import API_URL from "../utils/constants/apiURL";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function deleteVoteQuestion(id) {
  return fetchWrapper(`${API_URL}/questions/${id}/vote`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
