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
              data.folders.map(({ id, name, description, links }) => {
                const quantityOfLinks = links.length;

                // const toggleMenuId = `toggle-menu-${id}`;

                return (
                  <>
                    <article
                      key={id}
                      className="max-h-[9rem] flex flex-col justify-between relative break-words w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] py-4 px-5 rounded border-2 border-primary"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Link
                            href={`/folder/${id}`}
                            className="text-xl font-bold text-secondary hover:underline line-clamp-1 mr-2"
                          >
                            {name}
                          </Link>
                          {
                            // <label
                            //   htmlFor={toggleMenuId}
                            //   className="label-menu"
                            // >
                            //   <IconEllipsis className="text-2xl" />
                            // </label>
                          }
                        </div>
                        {
                          // <input
                          //   className="toggle-menu"
                          //   type="checkbox"
                          //   name="visually-folder-menu"
                          //   id={toggleMenuId}
                          // />
                          // <nav className="menu p-3 rounded bg-tertiary">
                          //   <ul>
                          //     <li>
                          //       <Link href={`/folder/edit/${id}`}>Editar</Link>
                          //     </li>
                          //     <li>
                          //       <button></button>
                          //     </li>
                          //   </ul>
                          // </nav>
                        }
                        <p className="line-clamp-2">{description}</p>
                      </div>
                      <div className="text-sm sm:text-base mt-1 cursor-default">
                        {quantityOfLinks ? (
                          <span className="text-zinc-400">
                            Quantidade de links: {quantityOfLinks}
                          </span>
                        ) : (
                          <span className="text-zinc-400">
                            Nenhum link adicionado
                          </span>
                        )}
                      </div>
                    </article>
                  </>
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
