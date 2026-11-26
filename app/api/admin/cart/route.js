import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "API de gestión de carritos pendiente" });
}
