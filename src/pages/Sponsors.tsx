import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import sponsorLogo from "@/images/sponsors/sponsor.jpeg";
import rawConstructions from "@/images/sponsors/rawConstructions.jpg";
import { Globe, Phone, Instagram } from "lucide-react";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  category: string;
  about: string;
  website?: string;
  tier?: "platinum" | "gold" | "silver" | "bronze";
  phoneNumber?: string[] | undefined;
  instagram?: string | undefined;
}

const sponsorsData: Sponsor[] = [
  {
    id: 1,
    name: "Janchhaya News - broadcasted from Lucknow and Jaunpur",
    logo: sponsorLogo,
    category: "Media",
    about: "Janchhaya News - broadcasted from Lucknow and Jaunpur",
    website: "https://techinnovations.com",
    tier: "platinum",
    phoneNumber: undefined,
    instagram: undefined,
  },
  {
    id: 2,
    name: "Raw Constructions",
    logo: rawConstructions,
    category: "Constructions",
    about:
      "Raw Constructions carries a four-generation legacy, now led by the fifth generation. Rooted in craftsmanship from the British era, we blend heritage techniques with modern luxury to create timeless spaces.",
    website: "https://rawconstructions.in",
    tier: "platinum",
    phoneNumber: [
      "9935284040 (Ar. Anushk Sharma) ",
      "9935870160 (Ar. Sanjay kr. Sharma)",
    ],
    instagram: "https://www.instagram.com/rawconstructions_rc",
  },
];

const Sponsors = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSponsorClick = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-slate-200 text-slate-800";
      case "gold":
        return "bg-yellow-200 text-yellow-800";
      case "silver":
        return "bg-gray-200 text-gray-800";
      case "bronze":
        return "bg-orange-200 text-orange-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              Our Sponsors
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              We are grateful to our generous sponsors who make our scholarship
              programs possible. Their support helps us provide educational
              opportunities to deserving students.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorsData.map((sponsor) => (
              <Card
                key={sponsor.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleSponsorClick(sponsor)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-lg">
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
                      {/* <Badge
                        className={`text-xs ${getTierColor(sponsor.tier)}`}
                      >
                        {sponsor.tier.charAt(0).toUpperCase() +
                          sponsor.tier.slice(1)}{" "}
                        Sponsor
                      </Badge> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sponsor Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            {selectedSponsor && (
              <>
                <DialogHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-24 flex items-center justify-center bg-gray-50 rounded-lg">
                      <img
                        src={selectedSponsor.logo}
                        alt={selectedSponsor.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-center">
                      {selectedSponsor.name}
                    </DialogTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {selectedSponsor.category}
                      </Badge>
                      <Badge className={getTierColor(selectedSponsor.tier)}>
                        {selectedSponsor.tier.charAt(0).toUpperCase() +
                          selectedSponsor.tier.slice(1)}{" "}
                        Sponsor
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">
                    About {selectedSponsor.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSponsor.about}
                  </p>
                  {selectedSponsor.phoneNumber &&
                    selectedSponsor.phoneNumber.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                        {selectedSponsor.phoneNumber.map((phone, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-primary"
                          >
                            <Phone className="h-4 w-4 text-primary" />
                            <a
                              href={`tel:${phone}`}
                              className="hover:text-primary transition-colors"
                            >
                              {phone}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  {selectedSponsor.instagram &&
                    selectedSponsor.instagram.length > 0 && (
                      <div className="flex items-center gap-3">
                        <a
                          href={selectedSponsor.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          // className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                          className="inline-flex items-center gap-2 text-primary"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-5 w-5" />
                          <span className="text-sm font-medium hover:underline">
                            {selectedSponsor.name}
                          </span>
                        </a>
                      </div>
                    )}
                  {selectedSponsor.website && (
                    <div className="mt-4">
                      <a
                        href={selectedSponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline font-medium"
                      >
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="text-sm text-primary">
                          Visit Website →
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Sponsors;
