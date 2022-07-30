import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useQuestions() {
  const { data, error } = useSWR(`${API_URL}/questions`);
  return {
    questions: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
