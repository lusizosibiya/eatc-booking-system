import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/EATC logo.png";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
    return (
      <footer className="w-full border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-8 px-5 py-6 sm:px-8 lg:flex-row lg:px-10">
          <a href="#home" className="shrink-0">
            <img src={logo} alt="Emotional Assessment and Therapy Centre" className="h-auto w-44 sm:w-52 lg:w-60"/>
          </a>

          {/* Footer navigation links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-base font-medium text-gray-900 transition-colors hover:text-[#29B4E4]">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social media links */}
          <div className="flex items-center gap-4 text-slate-600">
            <FaInstagram size={23} aria-label="Instagram" />
            <FaFacebook size={23} aria-label="Facebook" />
            <FaLinkedin size={23} aria-label="LinkedIn" />
          </div>
        </div>
      </footer>
    );
}

export default Footer;
