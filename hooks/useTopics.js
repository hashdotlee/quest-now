import useSWR from "swr";
import API_URL from "../utils/constants/apiURL";

export default function useTopics() {
  const { data, error } = useSWR(`${API_URL}/topics`);
  return {
    topics: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
