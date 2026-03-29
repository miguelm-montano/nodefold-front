import Masonry from "react-masonry-css";
import ImageCard from "./resources/ImageCard";
import ColorPaletteCard from "./resources/ColorPaletteCard";
import FontCard from "./resources/FontCard";
import WebCard from "./resources/WebCard";
import IconCard from "./resources/IconCard";

const breakpointColumns = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};

const CARD_MAP = {
  image: ImageCard,
  color_palette: ColorPaletteCard,
  font: FontCard,
  web: WebCard,
  icon: IconCard,
};

export default function ResourceGrid({ resources, onResourceClick }) {
  if (!resources.length) return null;

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4 w-full"
      columnClassName="flex flex-col"
    >
      {resources.map((resource) => {
        const Card = CARD_MAP[resource.type];
        if (!Card) return null;
        return (
          <Card
            key={resource.id}
            resource={resource}
            onClick={onResourceClick}
          />
        );
      })}
    </Masonry>
  );
}
