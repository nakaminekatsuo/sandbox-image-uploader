import type { ReactNode } from "react";
import classes from "./ImageGallery.module.css";

type ImageGalleryProps = {
  children: ReactNode;
};
export const ImageGallery = ({ children }: ImageGalleryProps) => {
  return <div className={classes.container}>{children}</div>;
};

type ImageGalleryItemProps = {
  src: string;
  alt: string;
};
export const ImageGalleryItem = ({ src, alt }: ImageGalleryItemProps) => {
  return (
    <div className={classes.item}>
      <img className={classes.img} src={src} alt={alt} />
    </div>
  );
};
