"use client";

import { useGetData } from "@/hooks/get-data";
import { User } from "@/types/user";
import { baseUrl } from "@/utils/constants/base-url";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";

export default function UserPage() {
  const refTextArea = useRef<HTMLTextAreaElement>(null);

  const [showSwithImage, setShoSwithImage] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const cookieId = Cookies.get("id");
  const cookieToken = Cookies.get("token");

  const { data, isError, isLoading } = useGetData<User>(
    `${baseUrl}/user/${cookieId}`,
    cookieToken ?? ""
  );

  const handleEdit = (content: string) => {
    if (refTextArea.current) {
      refTextArea.current.value = content;
    }
    setShowEdit((prev) => !prev);
  };

  const handleSave = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <>
      {data && (
        <div className="">
          <div className="rounded-t-lg w-full h-[200px] bg-blue-900"></div>
          <div className="flex gap-10 px-20">
            <div className="-mt-16">
              <div
                onMouseEnter={() => setShoSwithImage((prev) => !prev)}
                onMouseLeave={() => setShoSwithImage((prev) => !prev)}
                className="bg-blue-700 w-[250px] h-[250px] rounded-full relative hover:brightness-75"
              >
                {showSwithImage && (
                  <label className="rounded-full absolute w-full h-full bg-blue-700 flex items-center justify-center">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/png, image/jpeg"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <AiOutlineCamera className="text-5xl" />
                      <span className="text-md">Mudar foto</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-10 p-8">
              <div>
                <h1 className="text-6xl">{data.name}</h1>
                <h1 className="brightness-50">@{data.username}</h1>
                <h1 className="text-lg">{data.email}</h1>
              </div>
              <div>
                <div className="border-b-white border-b mb-2 flex justify-between">
                  <h1 className="text-2xl">Bio</h1>
                  <button onClick={(e) => handleEdit(data.bio)}>Editar</button>
                </div>
                {showEdit ? (
                  <div className="flex flex-col items-end">
                    <textarea
                      ref={refTextArea}
                      className="w-full h-20 text-black bg-tertiary border-b-white border-b"
                    />
                    <button onClick={handleSave}>Salvar</button>
                  </div>
                ) : (
                  <p className="text-lg">
                    {data.bio ?? "Esse usuário não possui uma bio"}
                  </p>
                )}
              </div>
              <div>Quantidade de pastas: {data.folders.length}</div>
              <div>
                <h1 className="text-2xl border-b-white border-b mb-2">Temas</h1>
                <div className="flex gap-2">
                  <Link href={"#"} className="flex">
                    <span className="bg-blue-900 text-sm rounded-2xl py-1 px-5 transition hover:brightness-75">
                      Estudos
                    </span>
                  </Link>
                  <Link href={"#"} className="flex">
                    <span className="bg-blue-900 text-sm rounded-2xl py-1 px-5 transition hover:brightness-75">
                      Estudos
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
