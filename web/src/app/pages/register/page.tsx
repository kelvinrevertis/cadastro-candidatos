"use client";

import React, { useState } from "react";
import api from "@/services/axios";
import toast from "react-hot-toast";
import NavButton from "@/components/NavButton";
import AddSkillButton from "@/components/PlusButton";

const Register = () => {
  const [nome, setNome] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([""]);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleRegister = async () => {
    setRegisterError(null);

    if (!nome.trim() || skills.every((skill) => !skill.trim())) {
      setRegisterError("Campos não podem ficar vazios!");
      return;
    }

    try {
      const filteredSkills = skills.filter((skill) => skill.trim());
      const response = await api.post("/candidates", {
        name: nome,
        skills: filteredSkills,
      });
      toast.success("Cadastro concluído!");
      setNome("");
      setSkills([""]);
    } catch (error) {
      console.error("Erro na chamada da API:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Cadastro</h1>

        <div className="mb-4">
          <label className="block mb-2">
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="border border-gray-300 p-2 rounded ml-2" required />
          </label>

          {skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <label className="block mb-2">
                Habilidade:
                <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} className="border border-gray-300 p-2 rounded ml-2" required />
              </label>
              {index === skills.length - 1 && <AddSkillButton onClick={handleAddSkill} className="bg-pink text-white p-2 rounded ml-2" />}
            </div>
          ))}
        </div>
        {registerError && <p className="text-red-500 text-sm mt-1">{registerError}</p>}
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-pink text-white rounded mr-4" onClick={handleRegister}>
            Cadastrar
          </button>
          <NavButton onClick={"/"} text="Retornar" style="secondary" />
        </div>
      </div>
    </main>
  );
};

export default Register;
