import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { title, questions } = await req.json();
  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((q) => ({
          text: q.text,
          options: JSON.stringify(q.options),
          answer: q.answer,
        })),
      },
    },
  });
  return NextResponse.json({ quiz });
}
