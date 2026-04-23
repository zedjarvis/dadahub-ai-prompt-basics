import { retrieveRelevantChunks } from "@/lib/rag";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: string };
    const query = body.query?.trim();

    if (!query) {
      return Response.json(
        { message: "A search query is required." },
        { status: 400 },
      );
    }

    const retrieval = await retrieveRelevantChunks(query, 5);

    return Response.json(retrieval);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return Response.json({ message }, { status: 500 });
  }
}
