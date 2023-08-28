import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface MessageErrorLoadProps {
  isOpen: boolean;
}

export const MessageErrorLoad = ({ isOpen }: MessageErrorLoadProps) => {
  const { push } = useRouter();

  const handleClick = () => {
    Cookies.remove("id");
    Cookies.remove("token");

    push("/login");
  };

  return (
    <>
      {isOpen && (
        <div>
          <p>Erro ao carregar dados</p>
          <button onClick={() => handleClick()}>Faça login</button>
        </div>
      )}
    </>
  );
};
