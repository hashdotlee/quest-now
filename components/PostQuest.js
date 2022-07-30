import useTopics from "../hooks/useTopics";
import { useState } from "react";
import Image from "next/image";
import useGIF from "../hooks/useGIF";
import postQuest from "../services/postQuest.service";

export default function PostQuest() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState(0);
  const [topic, setTopic] = useState("");
  const [gifSearch, setGifSearch] = useState("happy");
  const [searchInput, setSearchInput] = useState("");
  const { gif, isLoading: isLoaddingGif } = useGIF(gifSearch);

  const onSubmit = (e) => {
    e.preventDefault();
    postQuest(title, content, gif, Number(type), topic)
      .then(() => {
        alert("Quest posted successfully");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const { topics = [] } = useTopics();
  return (
    <div>
      <h3>Post Quest</h3>
      <div className="flex gap-4">
        <div className="w-1/3">
          <form onSubmit={onSubmit}>
            <div>
              <label className="block" htmlFor="title">
                Title:
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                className="border w-full"
                value={title}
                name="title"
              />
            </div>
            <div>
              <label className="block" htmlFor="content">
                Content:
              </label>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                type="text"
                id="content"
                name="content"
                className="border w-full"
                rows={8}
              />
            </div>
            <div className="my-2">
              <select onChange={(e) => setTopic(e.target.value)} value={topic}>
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.ID}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                {" "}
                <input
                  type="radio"
                  onChange={(e) => setType(e.target.value)}
                  checked={type == 0}
                  name="type"
                  value={0}
                />{" "}
                Public
              </label>
              <label>
                {" "}
                <input
                  type="radio"
                  onChange={(e) => setType(e.target.value)}
                  checked={type == 1}
                  name="type"
                  value={1}
                />{" "}
                Private
              </label>
            </div>
            <button type="submit" className="bg-orange-300 my-3 px-2 py-1">
              Post Quest
            </button>
          </form>
        </div>
        <div>
          <div>
            {!isLoaddingGif ? (
              <Image width={200} height={200} src={gif} alt="quest" />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center">
                Loading GIF...
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              id="search"
              className="border px-2"
              placeholder="Search GIF"
            />

            <button
              type="button"
              className="bg-orange-300 my-3 px-2"
              onClick={() => {
                setGifSearch(searchInput);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
