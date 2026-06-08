import { createEnvRevalidateHandler } from "@autoblogwriter/sdk/next";

export const runtime = "nodejs";
export const POST = createEnvRevalidateHandler();
