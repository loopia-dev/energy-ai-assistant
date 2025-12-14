import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

// Esta rota pode ser chamada após o registo ou via webhook do Supabase
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Verificar se o perfil já existe
    const existingProfile = await prisma.userProfile.findUnique({
      where: { id: user.id },
    });

    if (existingProfile) {
      return NextResponse.json({ message: "Perfil já existe", profile: existingProfile });
    }

    // Criar perfil
    const profile = await prisma.userProfile.create({
      data: {
        id: user.id,
        email: user.email!,
        fullName: user.user_metadata?.full_name || null,
        role: "consultor",
      },
    });

    return NextResponse.json({ message: "Perfil criado", profile });
  } catch (error: any) {
    console.error("Erro ao criar perfil:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar perfil" },
      { status: 500 }
    );
  }
}

