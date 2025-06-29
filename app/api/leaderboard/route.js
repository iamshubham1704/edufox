import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { name, avatar, score } = await req.json();
  const student = await prisma.student.create({
    data: { name, avatar, score },
  });
  return NextResponse.json(student);
}

export async function GET() {
  const students = await prisma.student.findMany({
    orderBy: { score: "desc" },
    take: 10,
  });
  return NextResponse.json(students);
}
