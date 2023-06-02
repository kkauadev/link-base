import { FolderCard } from "@/components/cards/folder-card";
import { baseUrl } from "@/constants/base-url";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const id = cookieStore.get("id");
  const token = cookieStore.get("token");

  const getUserData = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/${id?.value}`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        next: {
          revalidate: 10,
        },
      });

      return res;
    } catch (error) {
      return null;
    }
  };

  const res = await getUserData();

  if (!res || !res.ok) {
    return <div>Erro ao carregar dados</div>;
  }

  const data: User = await res.json();

  return (
    <>
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
        Minhas pastas
      </h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div>
          <Link
            href={`/folder/create/${token?.value}`}
            className={`w-[10rem] px-4 py-2 items-center flex gap-4 text-white rounded transition hover:brightness-75 bg-green-600`}
          >
            <span>Criar nova pasta</span>
          </Link>
        </div>
        {data && (
          <div className="flex flex-wrap gap-4">
            {data.folders ? (
              data.folders.map(({ id: folderId, name, description, links }) => {
                const quantityOfLinks = links.length;
                return (
                  <FolderCard
                    key={folderId}
                    description={description}
                    id={folderId}
                    name={name}
                    quantityOfLinks={quantityOfLinks}
                  />
                );
              })
            ) : (
              <p>Ainda não existe nenhuma página</p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
