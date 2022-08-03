import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useGetQuestionVotes(id) {
  const { data, error } = useSWR(
    id ? `${API_URL}/questions/${id}/votes` : null
  );
  return {
    votes: data?.data,
    isError: error,
    isLoading: !data && !error,
  };
}
