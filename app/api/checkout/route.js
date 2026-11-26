import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API de proceso de pago (checkout) pendiente",
  });
}
