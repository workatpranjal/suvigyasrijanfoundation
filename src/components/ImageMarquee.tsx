import Marquee from "react-fast-marquee";

interface ImageMarqueeProps {
  images: string[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  altText?: string;
  imageHeight?: number;
  gap?: number;
}

const ImageMarquee = ({
  images,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  altText = "Gallery image",
  imageHeight = 120, // default ~h-28
  gap = 32, // default space-x-8
}: ImageMarqueeProps) => {
  return (
    <div
      className={`overflow-hidden bg-background/50 backdrop-blur-sm border-y ${className}`}
    >
      <Marquee
        pauseOnHover={pauseOnHover}
        speed={speed}
        gradient={false}
        direction={direction}
        className="py-6"
      >
        <div className={`flex`} style={{ gap }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${altText} ${index + 1}`}
              style={{
                height: imageHeight,
                width: "auto",
              }}
              className="object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default ImageMarquee;
