import { FormLogin } from "@/components/forms/form-login";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Link Base - Login",
};

export default function Login() {
  return (
    <>
      <main className="bg-primary sm:bg-inherit w-full h-[96vh] flex justify-center items-center">
        <FormLogin />
      </main>
      <footer className="bg-primary sm:bg-inherit flex justify-center items-center">
        <span>
          Feito com carinho por{" "}
          <Link
            className="text-secondary hover:underline"
            href={"https://github.com/Kato2004"}
            target="_blank"
          >
            Kauã
          </Link>
        </span>
      </footer>
    </>
  );
}
