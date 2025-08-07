// app/api/notes/[id]/route.ts
import { note } from "@/db/schema";
import { getByIdHandler } from "@/lib/handlers/getByIdHandler";

export const GET = getByIdHandler(note, note.id);
