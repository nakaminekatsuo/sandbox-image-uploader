import { Button, Center, Modal, Space, Title } from "@mantine/core";
import { Form, redirect, useNavigate } from "react-router";
import type { Route } from "./+types/_route";
import { parseFormData, type FileUpload } from "@mjackson/form-data-parser";
import { getNextImageStorageKey, imageStorage } from "~/storage/image-storage.server";
import { ImageUpload } from "./ImageUpload";

export async function action({ request }: Route.ActionArgs) {
  const uploadHandler = async (fileUpload: FileUpload) => {
    console.log(fileUpload.fieldName);
    console.log(fileUpload.type);
    console.log(fileUpload.name);
    if (fileUpload.fieldName === "image" && fileUpload.type.startsWith("image/")) {
      const storageKey = await getNextImageStorageKey();
      await imageStorage.set(storageKey, fileUpload);
      return imageStorage.get(storageKey);
    }
  };
  await parseFormData(request, uploadHandler);
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 500);
  });
  return redirect("../");
}
export default function Component() {
  const navigate = useNavigate();
  return (
    <Modal.Root opened onClose={() => navigate("../", { replace: true })}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title component={Title}>Upload image</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Form method="post" encType="multipart/form-data">
            <ImageUpload name="image" />
            <Space h="md" />
            <Center>
              <Button type="submit">Upload</Button>
            </Center>
          </Form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
