import { getImageStorageKey, imageStorage } from "~/storage/image-storage.server";
import type { Route } from "./+types/_route";

export async function loader({ params }: Route.LoaderArgs) {
  const file = await imageStorage.get(params.id);

  if (!file) {
    throw new Response("Not Found", { status: 404 });
  }
  return new Response(file.stream(), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename=${file.name}`,
    },
  });
}
