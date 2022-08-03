import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useGetAnswerVotes(id) {
  const { data, error } = useSWR(`${API_URL}/answers/${id}/votes`);
  return {
    votes: data?.data,
    isError: error,
    isLoading: !data && !error,
  };
}
