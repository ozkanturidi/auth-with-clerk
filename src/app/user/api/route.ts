import { NextResponse } from "next/server";

export async function Post(req, res) {
  return NextResponse.json({ message: "Hello World!" });
}
