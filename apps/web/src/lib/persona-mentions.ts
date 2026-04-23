import { personas } from "@/lib/personas";
import type { PersonaId } from "@/lib/types";

const DIRECTIVE_RE = /:([\w-]+)\[([^\]]+)\](?:\{name=([^}]+)\})?/g;

export function stripMentionDirectives(text: string) {
  return text.replace(DIRECTIVE_RE, (_, type: string, label: string) => {
    return type === "persona" ? `@${label}` : label;
  });
}

export function extractTaggedPersonaId(text: string): PersonaId | null {
  const matches = Array.from(text.matchAll(DIRECTIVE_RE));

  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const match = matches[index];
    const type = match?.[1];
    const label = match?.[2];
    const id = match?.[3] ?? label;

    if (type === "persona" && id && id in personas) {
      return id as PersonaId;
    }
  }

  return null;
}
