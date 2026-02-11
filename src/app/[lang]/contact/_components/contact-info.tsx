import { Mail, Phone, Clock, MapPin } from "lucide-react";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface ContactInfoProps {
  dict: Dictionary;
}

export function ContactInfo({ dict }: ContactInfoProps) {
  const info = dict.contact.info;

  const items = [
    {
      icon: Mail,
      label: "Email",
      value: info.email,
      href: `mailto:${info.email}`,
    },
    {
      icon: Phone,
      label: info.scheduleLabel,
      value: info.phone,
      href: `tel:${info.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Clock,
      label: info.scheduleLabel,
      value: info.schedule,
    },
    {
      icon: MapPin,
      label: info.locationLabel,
      value: info.location,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{info.title}</h2>
      {items.map((item, idx) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
            <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={idx}
              href={item.href}
              className="block hover:shadow-md transition-shadow rounded-lg"
            >
              {content}
            </a>
          );
        }

        return <div key={idx}>{content}</div>;
      })}
    </div>
  );
}
