import API_URL from "../utils/constants/apiURL";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function deleteVoteAnswer(id) {
  return fetchWrapper(`${API_URL}/answers/${id}/vote`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
