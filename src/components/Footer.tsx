import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              About NGO
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Empowering women & children through education, safety, health,
              values & rights, fostering dignity.
            </p>
            <div className="flex gap-3">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61580042422981&mibextid=wwXIfr&rdid=Y45ihuufKIE2KEEg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14MkdBUyjrC%2F%3Fmibextid%3DwwXIfr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/suvigyasrijan_foundation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:contact@suvigyasrijanfoundation.org"
                  className="hover:text-primary transition-colors"
                >
                  contact@suvigyasrijanfoundation.org
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+91 7052710482"
                  className="hover:text-primary transition-colors"
                >
                  +91 7052710482
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  ADA colony, Naini, Prayagraj
                  <br /> Uttar Pradesh
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Suvigya Srijan Foundation. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
