import { Group, Text } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, type DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRef } from "react";
import { useNavigation } from "react-router";

export function ImageUpload(props: Partial<DropzoneProps>) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const handleFileDrop = (files: File[]) => {
    // Note: Mantineがfileをdropしたときにinputにfileを追加しないため、手動で追加する
    const dropzoneRootElm = dropzoneRef.current?.parentElement;
    const fileInput = dropzoneRootElm?.querySelector(`input[name="${props.name}"]`) as HTMLInputElement | null;
    if (fileInput) {
      const newFileList = new DataTransfer();
      for (const file of files) {
        newFileList.items.add(file);
      }
      fileInput.files = newFileList.files;
    }
  };
  return (
    <Dropzone
      ref={dropzoneRef}
      onDrop={handleFileDrop}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      loading={submitting}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
