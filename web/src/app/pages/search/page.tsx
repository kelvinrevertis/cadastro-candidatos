"use client";

import React, { useState } from "react";
import NavButton from "@/components/NavButton";
import api from "@/services/axios";

const Search = () => {
  const [skills, setSkills] = useState<string[]>([""]);
  const [searchResults, setSearchResults] = useState<object | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleSearch = async () => {
    const sanitizedSkills = skills.map((skill) => skill.trim().toLowerCase());

    try {
      const response = await api.get(`/candidates/search?skills=${sanitizedSkills.join(",")}`);
      const data = await response.data;
      setSearchResults(data);
      setShowResults(true);
    } catch(error) {
      console.error("Erro ao buscar candidatos:", error);
      setShowResults(true);
      setSearchResults(null);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Buscar candidato</h1>

        <label className="block mb-4">
          Habilidades:
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e.target.value)}
              className="border border-gray-300 p-2 rounded mr-2" />
              {index === skills.length - 1 && (
                <button onClick={handleAddSkill} className="bg-pink text-white p-2 rounded">
                  +
                </button>
              )}
            </div>
          ))}
        </label>

        <div className="flex justify-center">
          <button className="px-4 py-2 bg-pink text-white rounded mr-4" onClick={handleSearch}>
            Buscar
          </button>
          <NavButton onClick={"/"} text="Retornar" style="secondary" />
        </div>

        {showResults && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Resultado:</h2>
            {searchResults ? (
              <ul>
                <li>
                  {searchResults.name} - {searchResults.skills.join(", ")}
                </li>
              </ul>
            ) : (
              <p>
                <p>Nenhum candidato encontrado.</p>
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
