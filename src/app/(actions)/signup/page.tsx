import { FormSignup } from "@/components/forms/form-signup";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Link Base - Sign up",
};

export default function SignUp() {
  return (
    <>
      <main className="w-full h-[96vh] flex justify-center items-center">
        <FormSignup />
      </main>
      <footer className="flex justify-center items-center">
        <span>
          Feito com carinho por{" "}
          <Link
            className="text-secondary transition hover:underline"
            href={"/"}
            target="_blank"
          >
            Kauã
          </Link>
        </span>
      </footer>
    </>
  );
}
