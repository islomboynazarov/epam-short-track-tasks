import { NextRequest, NextResponse } from "next/server";
import { explainPokemon } from "../../../lib/gemini";
import type { PokemonContext } from "../../../lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { pokemon: PokemonContext; locale: string };
    const { pokemon, locale } = body;

    if (!pokemon || !pokemon.name || !pokemon.id) {
      return NextResponse.json(
        { error: "Invalid pokemon data" },
        { status: 400 }
      );
    }

    const allowlisted: PokemonContext = {
      name: pokemon.name,
      id: pokemon.id,
      types: pokemon.types?.slice(0, 5) ?? [],
      abilities: pokemon.abilities?.slice(0, 5) ?? [],
      height: pokemon.height,
      weight: pokemon.weight,
    };

    const explanation = await explainPokemon(allowlisted, locale);
    return NextResponse.json({ explanation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json(
        { error: "AI service is not configured" },
        { status: 503 }
      );
    }

    if (message.includes("429")) {
      return NextResponse.json(
        { error: "AI service rate limit reached. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}