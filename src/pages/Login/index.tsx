import { POST } from "@src/services";
import isAuth from "@src/utils/auth";
import { setCookie } from "@src/utils/cookies";
import { SIGNING_URL } from "@src/utils/urls";
import { FC, FormEventHandler } from "react";
import { Navigate } from "react-router";

const LoginPage: FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    const { username, password } = formData;

    if (!username || !password) {
      throw new Error("fields are required");
    } else {
      try {
        const token = await POST(
          SIGNING_URL,
          { username, password },
          undefined,
          true
        );
        if (token && typeof token === "string") {
          setCookie("bo-tkn", token, 6);
          location.href = "/dashboard";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isAuth ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <div className="max-w-80 mx-auto py-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          id="username"
          name="username"
          required
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          required
        />
        <button
          type="submit"
          className="py-1.5 px-3 bg-green-500 rounded-xl text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
