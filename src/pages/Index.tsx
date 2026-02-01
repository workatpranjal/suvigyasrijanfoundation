import { Download, FileText, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ImageMarquee from "@/components/ImageMarquee";
import TextMarquee from "@/components/TextMarquee";
import { useExamStatus } from "@/hooks/useExamStatus";
import { Skeleton } from "@/components/ui/skeleton";
import { marqueeImages } from "@/images/imageData";
import { useLanguage } from "@/contexts/LanguageContext";
import { marqueeText } from "@/constants/MarqueeText";
import sponsorLogo from "@/images/sponsors/sponsor.jpeg";
import rawConstructions from "@/images/sponsors/rawConstructions.jpg";

const Index = () => {
  const { examStatus, loading } = useExamStatus();
  const { t } = useLanguage();

  // Platinum sponsors data
  const platinumSponsors = [
    {
      id: 1,
      name: "Janchhaya News - broadcasted from Lucknow and Jaunpur",
      logo: sponsorLogo,
      category: "Media",
      about: "Janchhaya News - broadcasted from Lucknow and Jaunpur",
    },
    {
      id: 2,
      name: "Raw Constructions",
      logo: rawConstructions,
      category: "Constructions",
      about:
        "Raw Constructions carries a four-generation legacy, now led by the fifth generation. Rooted in craftsmanship from the British era, we blend heritage techniques with modern luxury to create timeless spaces.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-64 w-full mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const phase = examStatus?.phase ?? 0;
  const phaseLabel = examStatus?.phaseLabel;
  const examDate = examStatus?.examDate ?? new Date().toISOString();
  const announcement = examStatus?.announcement ?? "";
  const instructionsHindiURL = examStatus?.instructionsHindiURL;
  const instructionsURL = examStatus?.instructionsURL;
  const howToParticipateURL = examStatus?.howToParticipateURL;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* <AnnouncementBanner
        announcement={announcement}
        className="sticky top-16 z-40"
      /> */}
      {/* Image Marquee Section */}
      <ImageMarquee
        images={marqueeImages}
        speed={30}
        direction="left"
        pauseOnHover={true}
        className="my-2"
        altText={t("home.marquee.alt")}
        imageHeight={180}
      />
      <TextMarquee
        text={marqueeText}
        // speed={25}
        direction="left"
        pauseOnHover={true}
        highlighted={true}
      />

      <main className="flex-1">
        <Hero phase={phase} phaseLabel={phaseLabel} examDate={examDate} />

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Exam Instructions (Hindi) Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle>{t("home.instructionsHindi.title")}</CardTitle>
                  </div>
                  <CardDescription>
                    {t("home.instructionsHindi.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {instructionsHindiURL ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full min-h-[44px] border-orange-200 hover:bg-orange-50"
                    >
                      <a
                        href={instructionsHindiURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        {t("home.instructionsHindi.download")}
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px]">
                      <FileText className="mr-2 h-5 w-5" />
                      {t("home.instructionsHindi.notAvailable")}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Exam Instructions Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{t("home.instructions.title")}</CardTitle>
                  </div>
                  <CardDescription>
                    {t("home.instructions.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {instructionsURL ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full min-h-[44px] border-blue-200 hover:bg-blue-50"
                    >
                      <a
                        href={instructionsURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        {t("home.instructions.download")}
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px]">
                      <BookOpen className="mr-2 h-5 w-5" />
                      {t("home.instructions.notAvailable")}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* How to Participate Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="flex flex-col items-start gap-2">
                      <span className="leading-tight">
                        {t("home.howToParticipate.title")}
                      </span>
                      {/* <span className="text-xs font-normal text-muted-foreground mt-1">
                        {t("home.howToParticipate.subtitle")}
                      </span> */}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {/* {t("home.howToParticipate.description")} */}
                    <span className=" font-normal text-muted-foreground mt-1">
                      {t("home.howToParticipate.subtitle")}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {howToParticipateURL ? (
                    <Button
                      asChild
                      variant="default"
                      className="w-full min-h-[44px] bg-purple-600 hover:bg-purple-700"
                    >
                      <a
                        href={howToParticipateURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        {t("home.howToParticipate.download")}
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px]">
                      <Award className="mr-2 h-5 w-5" />
                      {t("home.howToParticipate.notAvailable")}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Important Information */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>{t("home.importantInfo.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{t("home.importantInfo.connection")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{t("home.importantInfo.download")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{t("home.importantInfo.results")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{t("home.importantInfo.queries")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Sponsors
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  We are deeply grateful to our sponsors whose generous support
                  makes our scholarship programs possible.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {platinumSponsors.map((sponsor) => (
                  <Card
                    key={sponsor.id}
                    className="hover:shadow-lg transition-shadow w-full md:w-80"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-full h-32 flex items-center justify-center bg-white rounded-lg p-4">
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {sponsor.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {sponsor.category}
                          </Badge>
                          {/* <Badge className="text-xs bg-slate-200 text-slate-800">
                            Platinum Sponsor
                          </Badge> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center space-y-3">
                <Button asChild size="lg">
                  <a href="/sponsors">View All Sponsors</a>
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Interested in becoming a sponsor?</p>
                  <p className="mt-2">
                    Contact us at{" "}
                    <a
                      href="mailto:contact@suvigyasrijanfoundation.org"
                      className="text-primary hover:underline font-medium"
                    >
                      contact@suvigyasrijanfoundation.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
