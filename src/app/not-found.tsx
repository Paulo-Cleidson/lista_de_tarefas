"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound-container flex flex-col items-center justify-center h-screen text-center px-6">

      <div className="notfound-icon-wrapper">
        <Image
          src="/em_construcao.png"
          alt="Página em construção"
          width={260}
          height={260}
          className="notfound-icon"
        />
      </div>

      <h1 className="notfound-title mt-6">Página não encontrada</h1>
      <p className="notfound-text mt-2 max-w-md">
        Parece que você tentou acessar uma página que não existe ou foi removida.
      </p>

      <Link
        href="/"
        className="notfound-button mt-6 inline-block px-6 py-3 rounded-xl font-semibold"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
