import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { navLinks, socialLinks } from "@/lib/constants";

const socialItems = [
  {
    label: "Visit our Facebook page",
    href: socialLinks.facebook || "#",
    icon: IconBrandFacebook,
  },
  {
    label: "Visit our GitHub",
    href: socialLinks.github || "#",
    icon: IconBrandGithub,
  },
  {
    label: "Visit our LinkedIn",
    href: socialLinks.linkedin || "#",
    icon: IconBrandLinkedin,
  },
  {
    label: "Visit our Instagram",
    href: socialLinks.instagram || "#",
    icon: IconBrandInstagram,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t bg-zone-runway"
      style={{
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Runway strip gradient at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FF9900 20%, #FBBF24 50%, #FF9900 80%, transparent 100%)',
          opacity: 0.9,
        }}
      />
      {/* Tiger mascot watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[400px] h-[400px] rounded-full"
          style={{
            opacity: 0.06,
            background:
              "radial-gradient(circle, rgba(255, 153, 0, 0.4) 0%, rgba(168, 164, 155, 0.2) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-site relative z-10 py-12 md:py-16">
        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1: Club identity */}
          <div>
            <h2 className="font-display text-lg font-semibold mb-2 text-white">
              AWS Cloud Club — Global City
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              A special-interest student organization empowering cloud builders
              at STI Academic Center, Bonifacio Global City.
            </p>
          </div>

          {/* Column 2: Quick navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-label mb-4 text-slate-500">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-250 hover:text-accent-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Social icons */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-label mb-4 text-slate-500">
              Connect
            </h3>
            <div className="flex items-center gap-2">
              {socialItems
                .filter((item) => item.href && item.href !== '#')
                .map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="p-2 rounded-md text-slate-400 transition-colors duration-300 hover:text-accent-orange"
                  style={{ minWidth: "44px", minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <item.icon size={24} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="font-mono text-xs text-slate-500">
            {currentYear} AWS Cloud Club — Global City. All rights reserved.
          </p>
          <p className="font-mono text-xs text-accent-orange">
            Built by Cloud Pilots. Powered by AWS.
          </p>
        </div>
      </div>
    </footer>
  );
}
