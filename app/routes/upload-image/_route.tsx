import { getImageIdList } from "~/storage/image-storage.server";
import type { Route } from "./+types/_route";
import { href, Link, Outlet } from "react-router";
import { ImageGallery, ImageGalleryItem } from "~/lib/design-system/image-gallery/ImageGallery";

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
      <ImageGallery>
        {loaderData.imageIdList.map((id) => (
          <ImageGalleryItem key={id} src={href("/images/:id", { id })} alt="uploaded" />
        ))}
      </ImageGallery>
      <Outlet />
    </div>
  );
}
