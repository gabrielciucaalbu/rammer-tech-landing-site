import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface FooterProps {
  lang: string;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const { footer } = dict;
  const columns = footer.columns;
  const contact = footer.contact;

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4">
              <Image
                src="/Rammer Tech LOGO.png"
                alt="Rammer Tech"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-bold text-lg text-white">
                {footer.company}
              </span>
            </Link>
            <p className="text-brand-300 text-sm italic mb-6">
              {footer.tagline}
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-brand-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm text-brand-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {contact.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-brand-300">
                <MapPin className="h-4 w-4 shrink-0" />
                {contact.location}
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {(
            Object.keys(columns) as Array<keyof typeof columns>
          ).map((colKey) => {
            const col = columns[colKey];
            return (
              <div key={colKey}>
                <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={
                          link.href === "#"
                            ? "#"
                            : `/${lang}${link.href}`
                        }
                        className="text-sm text-brand-300 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.label}
                        {"badge" in link && link.badge && (
                          <span className="text-[10px] bg-brand-800 text-brand-200 px-1.5 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-900">
        <div className="container mx-auto px-6 py-6">
          <p className="text-sm text-brand-400 text-center">
            &copy; {new Date().getFullYear()} {footer.company}.{" "}
            {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
