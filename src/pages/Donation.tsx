import {
  Building2,
  CreditCard,
  QrCode,
  Heart,
  Copy,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import upiQR from "@/images/QR/UPI_QR.jpeg";

const Donation = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankDetails = [
    { label: "Account Name", value: "Suvigyasrijan Foundation" },
    { label: "Account Number", value: "10257579294" },
    { label: "Bank Name", value: "IDFC FIRST" },
    { label: "IFSC Code", value: "IDFB0021545" },
    { label: "Branch", value: "PRAYAGRAJ - GEORGE TOWN BRANCH" },
    { label: "SWIFT Code", value: "IDFBINBBMUM" },
  ];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="h-10 w-10 text-primary fill-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground">
                Support Our Mission
              </h1>
            </div>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Your generous donation helps us empower women & children through
              education, safety, health, and dignity. Every contribution makes a
              difference.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bank Details Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Bank Transfer</CardTitle>
                  </div>
                  <CardDescription>
                    Make a direct bank transfer using the details below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bankDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="font-semibold text-foreground">
                          {detail.value}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(detail.value, detail.label)
                        }
                        className="self-start sm:self-center"
                      >
                        {copiedField === detail.label ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CreditCard className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>
                        Please use your name or organization name as the
                        reference when making the transfer to help us
                        acknowledge your contribution.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* UPI QR Code Card */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">UPI Payment</CardTitle>
                  </div>
                  <CardDescription>
                    Scan the QR code to donate instantly via UPI
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {/* QR Code Container */}
                  <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center mb-6 p-8">
                    <div className="w-full h-full bg-white rounded-lg shadow-inner flex items-center justify-center border-4 border-primary/20">
                      {/* Placeholder for QR Code - Replace with actual QR code image */}
                      {/* <div className="text-center">
                        <QrCode className="h-32 w-32 mx-auto text-primary/40 mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Add your QR code image here
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          (Replace this placeholder)
                        </p>
                      </div> */}
                      {/* Uncomment and use this when you have the QR code image */}
                      <img
                        src={upiQR}
                        alt="UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="p-3 bg-secondary/50 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        UPI ID
                      </p>
                      <p className="font-semibold text-foreground">
                        suvigyasrijanfounda@idfcbank
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard("foundation@upi", "UPI ID")
                        }
                        className="mt-2"
                      >
                        {copiedField === "UPI ID" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy UPI ID
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground p-3 bg-accent/10 rounded-lg">
                      <Heart className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <p>
                        All UPI apps are supported: Google Pay, PhonePe, Paytm,
                        BHIM, and more.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tax Benefits Section */}
            <Card className="mt-8">
              <CardContent className="py-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3">Tax Benefits</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Donations to Suvigya Srijan Foundation are eligible for tax
                    deduction under Section 80G of the Income Tax Act. You will
                    receive a donation receipt for tax purposes via email.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                For queries regarding donations, please contact us at{" "}
                <a
                  href="mailto:contact@suvigyasrijanfoundation.org"
                  className="text-primary hover:underline font-medium"
                >
                  contact@suvigyasrijanfoundation.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donation;
