import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/candidates", async (request: Request, response: Response) => {
  try {
    const { name, skills } = request.body;

    if(name.length === 0 || skills.length===0){
      return response.status(400).json({ error: "Solicitação inválida - parâmetro de nomes e habilidades são necessários" });
    }

    const createCandidate = await prisma.candidate.create({
      data: {
        name,
        skills: {
          create: skills.map((skill: string) => ({
            name: skill
          }))
        }
      },
      include: {
        skills: true
      }
    });

    response.status(201).json(createCandidate);
  } catch (error) {
    console.error("Erro ao criar candidatos:", error);
    response.status(500).json({ error: "Erro do Servidor Interno" });
  }
})

router.get("/candidates", async (request, response) => {
  try {
    const candidatesWithSkills = await prisma.candidate.findMany({
      include: {
        skills: true,
      },
    });

    return response.status(200).json(candidatesWithSkills);
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error);
    return response.status(500).json({ error: "Erro do Servidor Interno" });
  }
});

router.get("/candidates/search", async (request: Request, response: Response) => {
  try {
    const requestedSkills = request.query.skills as string;

    if (!requestedSkills) {
      return response.status(400).json("Solicitação inválida - parâmetro de habilidades ausentes");
    }

    const skillsArray = requestedSkills.split(',');

    const candidatesWithSkills = await prisma.candidate.findMany({
      where: {
        skills: {
          some: {
            name: {
              in: skillsArray,
            },
          },
        },
      },
      include: {
        skills: true,
      },
    });

    if (candidatesWithSkills.length === 0) {
      return response.status(404).json({ error: "Nenhum candidato encontrado com as habilidades especificadas" });
    }

    const bestCandidate = candidatesWithSkills.reduce((prev, current) => {
      const currentSkills = current.skills.map((skill) => skill.name.toLowerCase());
      const coverage = skillsArray.filter((skill) => currentSkills.includes(skill)).length;

      return coverage > prev.coverage ? { candidate: current, coverage } : prev;
    }, { candidate: null, coverage: 0 });

    if (bestCandidate.candidate) {
      const formattedResponse = {
        id: bestCandidate.candidate.id,
        name: bestCandidate.candidate.name,
        skills: bestCandidate.candidate.skills.map((skill) => skill.name),
      };
      return response.status(200).json(formattedResponse);
    } else {
      return response.status(404).json({ error: "Nenhum candidato adequado encontrado" });
    }
  } catch (error) {
    console.error("Erro ao pesquisar candidatos:", error);
    return response.status(500).json({ error: "Erro do Servidor Interno" });
  }
});


router.get("/", (request, response) => {
  response.json({
    message: "It's alive!",
  });
});

export default router;
