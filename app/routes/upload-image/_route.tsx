import { getImageIdList } from "~/storage/image-storage.server";
import type { Route } from "./+types/_route";
import { href, Link, Outlet } from "react-router";
import { SimpleGrid } from "@mantine/core";

export async function loader() {
  const imageIdList = await getImageIdList();
  return {
    imageIdList,
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div>
        <Link to={href("/upload-image/upload")}>upload</Link>
      </div>
      <div>
        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          {loaderData.imageIdList.map((id) => (
            <img key={id} src={href("/images/:id", { id })} alt="uploaded" />
          ))}
        </SimpleGrid>
      </div>
      <Outlet />
    </div>
  );
}
