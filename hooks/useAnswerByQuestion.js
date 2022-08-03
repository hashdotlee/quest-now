import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useAnswerByQuestion(id) {
  const { data, error } = useSWR(id ? `${API_URL}/questions/${id}/answers` : null);
  return {
    answers: data?.data,
    isError: error,
    isLoading: !data && !error,
  };
}
