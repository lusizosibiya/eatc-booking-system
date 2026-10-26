import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/EATC logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Individual Therapy",
  "Couples Therapy",
  "Family Support",
  "Professional Assessments",
];

function Footer() {
  return (
    <footer id="contact" className="w-full bg-white">
      {/* Main footer */}
      <div className="border-t border-gray-200 bg-[#F8FCFF]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-10">
          {/* Column 1: Logo and branding */}
          <div>
            <a href="#home">
              <img
                src={logo}
                alt="Emotional Assessment and Therapy Centre"
                className="h-auto w-64 max-w-full"
              />
            </a>
            <p className="mt-6 max-w-[300px] text-base leading-relaxed text-slate-600">
              Compassionate, professional psychological and counselling services
              for individuals, couples, families and children.
            </p>
            {/* Social media icons */}
            <div className="mt-6 flex items-center gap-4 text-slate-600">
              <FaInstagram
                size={24}
                aria-label="Instagram"
                className="transition-colors hover:text-[#A56A9F]"
              />
              <FaFacebook
                size={24}
                aria-label="Facebook"
                className="transition-colors hover:text-[#29B4E4]"
              />
              <FaLinkedin
                size={24}
                aria-label="LinkedIn"
                className="transition-colors hover:text-[#29B4E4]"
              />
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <h3 className="mb-6 text-xl font-bold text-[#171C2E]">
              {" "}
              Quick Links
            </h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-base text-slate-600 transition-colors hover:text-[#29B4E4]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          {/* Column 3: Services */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <h3 className="mb-6 text-xl font-bold text-[#171C2E]">
              Our Services
            </h3>
            <div className="flex flex-col gap-4">
              {services.map((service) => (
                <a
                  key={service}
                  href="#services"
                  className="w-fit text-base text-slate-600 transition-colors hover:text-[#29B4E4]"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Contact details */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-8">
            <h3 className="mb-6 text-xl font-bold text-[#171C2E]">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-7">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F5FD] text-[#29B4E4]">
                  <Phone size={23} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#171C2E]">Phone</h4>
                  <p className="mt-1 text-sm text-slate-600">+27 11 123 4567</p>
                  <p className="text-sm text-slate-500">Mon – Fri, 8am – 4pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3E8F8] text-[#A56A9F]">
                  <Mail size={23} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#171C2E]"> Email</h4>
                  <p className="mt-1 break-all text-sm text-slate-600">
                    info@eatc.co.za
                  </p>
                  <p className="text-sm text-slate-500">
                    We'll reply within 1–2 business days.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F5FD] text-[#29B4E4]">
                  <MapPin size={23} />
                </div>
                <div>
                  <h4 className="font-semibold text-[#171C2E]">
                    {" "}
                    Our Location
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    123 Imaginary Road
                    <br /> Parktown, Johannesburg, 1234
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This is the bottom copyright part */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-5 py-6 text-center text-sm text-slate-500 sm:px-8 lg:flex-row lg:px-10 lg:text-left">
          <p>
            {" "}
            © {new Date().getFullYear()} Emotional Assessmentand Therapy Centre.
            All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span>Privacy Policy</span>
            <span className="text-gray-300">|</span>
            <span>Terms of Use</span>
            <span className="text-gray-300">|</span>
            <span>Site Credits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
