import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import registerService from "../services/register.service";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    registerService(email, password, username)
      .then(() => {
        alert("Registered successfully!");
        router.push("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="container px-4 mx-auto">
      <Head>
        <title>Register</title>
        <meta name="description" content="Register to Quest Now" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="flex gap-2 items-center h-10">
        <ArrowLeftIcon className="w-4 h-4" />
        <Link href="/">
          <a>Return to Login</a>
        </Link>{" "}
      </p>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label className="block" htmlFor="password">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            className="border p-1"
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
}
