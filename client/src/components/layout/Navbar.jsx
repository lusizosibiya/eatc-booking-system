import { useState } from "react";
// This imports the hamburger (Menu) and close (X) icons for mobile navigation.
import { Menu, X } from "lucide-react";
import logo from "../../assets/EATC logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const [activeSection, setActiveSection] = useState("home");

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="mx-auto flex min-h-24 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
                {/* Logo */}
                <a href="#home" onClick={closeMenu} className="shrink-0">
                    <img src={logo} alt="Emotional Assessment and Therapy Centre" className="w-44 sm:w-52 lg:w-68 h-auto"/>
                </a>

                {/* Desktop navigation */}
                <div className="hidden lg:flex items-center gap-7 xl:gap-9">
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href} onClick={() => setActiveSection (link.href.slice(1))} className={`border-b-2 py-2 text-base font-medium transition-colors ${
                        activeSection === link.href.slice(1)    
                            ? "border-[#29B4E4] text-[#29B4E4]"
                            : "border-transparent text-gray-900 hover:text-[#29B4E4]"
                        }`}> {link.label}
                    </a>
                ))}
                </div>

                {/* Desktop booking button */}
                <a href="#booking" className="hidden shrink-0 rounded-full bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-90 lg:inline-flex">Book an Appointment</a>

                {/* Mobile hamburger */}
                <button type="button" className="inline-flex items-center justify-center rounded-lg p-2 text-gray-900 hover:bg-sky-50 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile navigation */}
            {menuOpen && (
                <div id="mobile-navigation" className="border-t border-gray-100 bg-white px-5 pb-6 pt-3 shadow-md lg:hidden">
                    <div className="mx-auto flex max-w-[1200px] flex-col gap-1">
                        {navLinks.map((link) => (
                        <a key={link.label} href={link.href} onClick={closeMenu} className="rounded-lg px-4 py-3 text-sm font-medium text-gray-800 hover:bg-sky-50 hover:text-[#29B4E4]">{link.label}</a>
                        ))}
                        <a href="#booking" onClick={closeMenu} className="mt-4 rounded-full bg-gradient-to-r from-[#29B4E4] to-[#A56A9F] px-6 py-3 text-center text-sm font-medium text-white"> Book an Appointment</a>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;