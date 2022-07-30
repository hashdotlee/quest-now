import { ArrowRightIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import loginService from "../services/login.service";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    loginService(email, password)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="container px-4 mx-auto">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to Quest Now" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="border p-1"
          />
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="border p-1"
          />
        </div>
        <button type="submit" className="bg-orange-500 mt-3 font-semibold p-1">
          Login
          <ArrowRightIcon className="h-4 w-4 ml-2 inline-block" />
        </button>
      </form>
    </div>
  );
}
