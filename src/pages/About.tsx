import { Target, Heart, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide equal educational opportunities to deserving students through merit-based scholarships.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "Creating a society where financial constraints never limit access to quality education.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building a supportive network of students, educators, and volunteers committed to learning.",
    },
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description:
        "Promoting higher standards of education and recognizing outstanding academic achievement.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              About Our Organization
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              Empowering women & children through education, safety, health,
              values & rights, fostering dignity.
            </p>
          </div>
        </section>

        {/* Founders/Directors Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Leadership
              </h2>
              <p className="text-lg text-muted-foreground">
                Meet the visionaries behind our mission
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Founder/Director 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src="https://via.placeholder.com/300x300?text=Founder+1"
                    alt="Founder 1"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Mrs. Aastha Pandey
                </h3>
                <p className="text-primary font-medium mb-3">
                  Honorary Chairperson
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Experienced educator and dedicated social worker with 20+
                  years of service. She leads the foundation with a strong
                  commitment to quality education and community upliftment.
                </p>
              </div>

              {/* Founder/Director 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src="https://via.placeholder.com/300x300?text=Director+1"
                    alt="Director 1"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Mr. Pranjal Pandey
                </h3>
                <p className="text-primary font-medium mb-3">Director</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A young and dynamic leader focused on expanding educational
                  access and creating real opportunities for deserving students
                  through innovative scholarship initiatives.
                </p>
              </div>

              {/* Founder/Director 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src="https://via.placeholder.com/300x300?text=Director+2"
                    alt="Director 2"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Dr. Anand Shanker Pandey
                </h3>
                <p className="text-primary font-medium mb-3">Director</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Senior medical professional with 20+ years of experience,
                  committed to community welfare and strengthening the
                  foundation’s mission with his expertise and guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We are a dedicated non-profit organization committed to
                  breaking down financial barriers in education. For over a
                  decade, we have been supporting bright and motivated students
                  from diverse backgrounds achieve their academic dreams through
                  our comprehensive scholarship program.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our scholarship examination is designed to identify talented
                  individuals who demonstrate both academic excellence and a
                  genuine passion for learning. We believe that merit and
                  determination, not financial circumstances, should determine
                  access to quality education.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Our Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Scholarships Awarded
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      50+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Partner Institutions
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
