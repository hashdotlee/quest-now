import useSWR from "swr";

export default function useGIF(tag = "") {
  const { data, error } = useSWR(
    `https://api.giphy.com/v1/gifs/search?api_key=n2RgbSnQDwAGEBtg1xfkiECVSBtbG8J8&q=${tag}&limit=1&offset=0&rating=g&lang=en`
  );
  return {
    gif: data?.data?.length ? data.data[0].images.original.webp : undefined,
    isLoading: !error && !data,
    isError: error,
  };
}
