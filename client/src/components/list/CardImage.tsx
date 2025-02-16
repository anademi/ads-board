import { CardMedia } from "@mui/material";
import { ImagePlaceholder } from "../common/ImagePlaceholder";

type Props = {
  src: string | undefined;
};

export const CardImage = ({ src }: Props) =>
  src ? (
    <CardMedia
      component="img"
      height="120"
      image={src}
      alt="Фотография объявления"
    />
  ) : (
    <ImagePlaceholder />
  );
