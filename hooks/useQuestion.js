import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useQuestion(id) {
  const { data, error } = useSWR(id ? `${API_URL}/questions/${id}` : null);
  return {
    question: data?.data?.question,
    user: data?.data?.user,
    isError: error,
    isLoading: !data && !error,
  };
}
