import Head from "next/head";
import Link from "next/link";
import PostQuest from "../components/PostQuest";
import QuestList from "../components/QuestList";
import useQuestions from "../hooks/useQuestions";
import { getUser, isLoggedIn } from "../utils/authUtils";

export default function Home() {
  const user = getUser();
  const { questions } = useQuestions();
  return (
    <div>
      <Head>
        <title>Quest Now</title>
        <meta
          name="description"
          content="Quest Now is a platform for people to share their quest for the world."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className="text-3xl">Welcome to Quest Now!</h1>
        {isLoggedIn() ? (
          <p>
            Hello,{" "}
            <Link href="/profile">
              <a className="font-semibold text-orange-500 cursor-pointer">
                {user ? user.username : "anonymous"}
              </a>
            </Link>
          </p>
        ) : (
          <p>
            You are not logged in!{" "}
            <span>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </span>
          </p>
        )}
        <QuestList questions={questions} />
      </main>

      <footer></footer>
    </div>
  );
}
