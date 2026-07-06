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
      className="zone-night relative overflow-hidden border-t-[4px] border-[#FFD54F]"
    >
      {/* Cartoon runway dashed lines */}
      <div
        className="absolute top-6 left-[10%] right-[10%] h-[4px]"
        aria-hidden="true"
        style={{
          background: 'repeating-linear-gradient(90deg, #FFD54F 0px, #FFD54F 30px, transparent 30px, transparent 50px)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute bottom-6 left-[15%] right-[15%] h-[4px]"
        aria-hidden="true"
        style={{
          background: 'repeating-linear-gradient(90deg, #FFD54F 0px, #FFD54F 20px, transparent 20px, transparent 40px)',
          opacity: 0.25,
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
            <h2 className="font-display text-lg font-bold mb-2 text-[#FFD54F]">
              AWS Cloud Club — Global City
            </h2>
            <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-on-dark)' }}>
              A special-interest student organization empowering cloud builders
              at STI Academic Center, Bonifacio Global City.
            </p>
          </div>

          {/* Column 2: Quick navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-label mb-4" style={{ color: 'var(--text-on-dark)', opacity: 0.7 }}>
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-250 hover:text-[#FF8C00]"
                      style={{ color: 'var(--text-on-dark)' }}
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
            <h3 className="font-mono text-xs uppercase tracking-label mb-4" style={{ color: 'var(--text-on-dark)', opacity: 0.7 }}>
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
                  className="p-2 rounded-xl border-2 border-slate-600 transition-all duration-300 hover:text-[#FFD54F] hover:border-[#FFD54F] hover:shadow-[2px_2px_0px_#FFD54F] hover:-translate-y-1"
                  style={{ color: 'var(--text-on-dark)', minWidth: "44px", minHeight: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <item.icon size={24} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 border-t-2 border-dashed border-slate-600 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <p className="font-mono text-xs font-semibold" style={{ color: 'var(--text-on-dark)' }}>
            {currentYear} AWS Cloud Club — Global City. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[#FFD54F] font-bold">
            ✈ Built by Cloud Pilots. Powered by AWS. ✈
          </p>
        </div>
      </div>
    </footer>
  );
}
