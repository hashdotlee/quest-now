import Head from "next/head";

export function getStaticProps() {
  const questions = fetch(`${process.env.API_URL}/questions`).then((res) =>
    res.json()
  );

  return {
    props: {
      questions: questions,
    },
  };
}

export default function Home({ questions = [] }) {
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

      <main>
        <h1>Welcome to Quest Now!</h1>
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              <h2>{question.title}</h2>
              <p>{question.content}</p>
              <p>{question.user_id}</p>
              <p>{question.vote}</p>
              <p>{question.answers}</p>
            </div>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
