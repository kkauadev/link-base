import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const MessageErrorLoad = () => {
  const { push } = useRouter();

  const handleClick = () => {
    Cookies.remove("id");
    Cookies.remove("token");

    push("/login");
  };

  return (
    <div>
      <p>Erro ao carregar dados</p>
      <button onClick={() => handleClick()}>Faça login</button>
    </div>
  );
};
