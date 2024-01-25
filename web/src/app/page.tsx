import React from "react";
import NavButton from "@/components/NavButton";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">Cadastrar ou buscar candidato</h1>
        <div className="flex justify-between mt-4">
          <NavButton onClick={"pages/register"} text="Cadastrar" style="primary" />
          <NavButton onClick={"pages/search"} text="Buscar" />
        </div>
      </div>
    </main>
  );
}
