import { LocalFileStorage } from "@mjackson/file-storage/local";
export const imageStorage = new LocalFileStorage("./uploads/images");

export function getImageStorageKey(id: string) {
  return `image-${id}`;
}

export async function getNextImageStorageKey() {
  const list = await imageStorage.list();
  const id = list.files.length + 1;
  return getImageStorageKey(String(id));
}

export async function getImageIdList() {
  const list = await imageStorage.list();
  const idList = list.files.map((file) => file.key);
  return idList;
}
