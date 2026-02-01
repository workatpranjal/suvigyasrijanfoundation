import PhaseChip from "./PhaseChip";
import { Button } from "@/components/ui/button";

interface HeroProps {
  phase: number;
  phaseLabel?: string;
  examDate: string;
}

const Hero = ({ phase, phaseLabel, examDate }: HeroProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Date TBA";
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <img
              src="/Logo.png"
              alt="Suvigya Srijan Foundation"
              className="h-25 w-25"
            />
          </div>

          <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-4 text-destructive">
            SUVIGYA SCHOLARSHIP EXCELLENCE AWARDS 2026
          </h1>

          {/* <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Empowering women & children through education, safety, health,
            values & rights, fostering dignity.
          </p> */}

          {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <PhaseChip phase={phase} label={phaseLabel} className="text-base" />
            <div className="flex items-center gap-2 text-foreground">
              <span className="font-semibold">Exam Date:</span>
              <span className="text-muted-foreground">
                {formatDate(examDate)}
              </span>
            </div>
          </div> */}

          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="px-6 py-4 hover:scale-105 transition-transform bg-destructive hover:bg-destructive/90 text-white"
            >
              <a
                href="https://forms.gle/3zTdGxCZvzTXJZGA8"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-white">
                    Click Here to Register
                  </span>
                  <span className="text-xs mt-0.5 opacity-90 text-white">
                    पंजीकरण के लिए यहाँ क्लिक करें
                  </span>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
