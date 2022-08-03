import API_URL from "../utils/constants/apiURL";
import { fetchWrapper } from "../utils/fetchWrapper";

export default function deleteQuestionService(id) {
  return fetchWrapper(`${API_URL}/questions/${id}`, {
    method: "DELETE",
  });
}
