import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: "Tópicos",
      template:
        `Seu papel é gerar tópicos sobre os assuntos mais importantes tratados em um vídeo.

Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar os tópicos.

Os tópicos devem ter no máximo 60 caracteres.

Retorne os tópicos em formato de lista enumerada.

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Resumo",
      template: `Seu papel é gerar um resumo de um vídeo.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar o resumo.

O resumo deve possuir no máximo 300 palavras em primeira pessoa contendo os pontos principais do vídeo.

Use palavras chamativas e que cativam a atenção de quem está lendo.

Além disso, no final do resumo inclua uma lista de alguns livros ou sites que contenham palavras-chave do vídeo.

O retorno deve seguir o seguinte formato:
'''
Resumo.

Lista de livros ou site.
'''

Transcrição:
'''
{transcription}
'''`.trim(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
