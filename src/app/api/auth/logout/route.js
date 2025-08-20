import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json(
      { success: true, message: "Déconnexion réussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur logout API:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
