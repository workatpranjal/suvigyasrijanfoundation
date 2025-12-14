import Marquee from "react-fast-marquee";

interface TextMarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  highlighted?: boolean;
}

const TextMarquee = ({
  text,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  highlighted = true,
}: TextMarqueeProps) => {
  return (
    <div
      className={`overflow-hidden ${
        highlighted
          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
          : "bg-secondary"
      } border-y shadow-sm ${className}`}
    >
      <Marquee
        pauseOnHover={pauseOnHover}
        speed={speed}
        gradient={false}
        direction={direction}
        className="py-4 flex items-center whitespace-nowrap"
      >
        {/* Content inside marquee */}
        <span
          className={`text-lg md:text-xl font-semibold px-8 ${
            highlighted ? "text-white" : "text-foreground"
          }`}
        >
          {text}
        </span>
        <span
          className={`mx-4 ${
            highlighted ? "text-white/60" : "text-muted-foreground"
          }`}
        >
          •
        </span>

        {/* Duplicate manually for spacing (optional) */}
        <span
          className={`text-lg md:text-xl font-semibold px-8 ${
            highlighted ? "text-white" : "text-foreground"
          }`}
        >
          {text}
        </span>
        <span
          className={`mx-4 ${
            highlighted ? "text-white/60" : "text-muted-foreground"
          }`}
        >
          •
        </span>
      </Marquee>
    </div>
  );
};

export default TextMarquee;
