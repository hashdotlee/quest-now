import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useAnswer(id) {
  const { data, error } = useSWR(id ? `${API_URL}/answers/${id}` : null);
  return {
    answer: data?.data,
    isError: error,
    isLoading: !data && !error,
  };
}
