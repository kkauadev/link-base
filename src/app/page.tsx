import Link from "next/link";
import { FormLogin } from "../components/forms/form-login";

export default function Home() {
  return (
    <>
      <main className="w-full h-[96vh] flex justify-center items-center">
        <FormLogin />
      </main>
      <footer className="flex justify-center items-center">
        <span>
          Feito com carinho por{" "}
          <Link
            className="text-secondary transition hover:underline"
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
