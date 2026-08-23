import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson) as {
    name: string;
    description: string;
    id: number;
  }[];

  const headers = ["name", "description", "url"];
  const rows = items.map((p) => [
    p.name,
    p.description,
    `https://pokeapi.co/api/v2/pokemon/${p.id}`,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${items.length}_items.csv"`,
    },
  });
}