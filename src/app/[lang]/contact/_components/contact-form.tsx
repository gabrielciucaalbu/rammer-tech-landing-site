"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface ContactFormProps {
  dict: Dictionary;
  lang: string;
}

export function ContactForm({ dict, lang }: ContactFormProps) {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("serviciu") || "";
  const [sending, setSending] = useState(false);

  const formDict = dict.contact.form;

  const schema = z.object({
    name: z.string().min(1, formDict.required),
    email: z.string().min(1, formDict.required).email(formDict.invalidEmail),
    phone: z.string().optional(),
    company: z.string().optional(),
    service: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(1, formDict.required),
    gdpr: z.literal(true, { message: formDict.required }),
    // Honeypot
    website: z.string().max(0).optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: preselectedService,
      budget: "",
      message: "",
      gdpr: undefined,
      website: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot check
    if (data.website) return;

    setSending(true);
    try {
      const { sendMessage } = await import("../_actions/send-message");
      const result = await sendMessage({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        budget: data.budget,
        message: data.message,
        gdpr: data.gdpr,
        website: data.website,
      });

      if (result.success) {
        toast.success(formDict.success);
        reset();
      } else {
        toast.error(result.error || formDict.error);
      }
    } catch {
      toast.error(formDict.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" tabIndex={-1} {...register("website")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{formDict.name} *</Label>
          <Input
            id="name"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{formDict.email} *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">{formDict.phone}</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">{formDict.company}</Label>
          <Input id="company" {...register("company")} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{formDict.service}</Label>
          <Select
            defaultValue={preselectedService}
            onValueChange={(val) => setValue("service", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={formDict.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {formDict.serviceOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{formDict.budget}</Label>
          <Select onValueChange={(val) => setValue("budget", val)}>
            <SelectTrigger>
              <SelectValue placeholder={formDict.budgetPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {formDict.budgetOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{formDict.message} *</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="gdpr"
          onCheckedChange={(checked) =>
            setValue("gdpr", checked === true ? true : (undefined as unknown as true))
          }
        />
        <Label htmlFor="gdpr" className="text-sm leading-relaxed">
          {formDict.gdpr}{" "}
          <Link
            href={`/${lang}/politica-confidentialitate`}
            className="text-primary underline hover:no-underline"
          >
            {formDict.gdprLink}
          </Link>{" "}
          *
        </Label>
      </div>
      {errors.gdpr && (
        <p className="text-sm text-destructive">{errors.gdpr.message}</p>
      )}

      <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
        {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {sending ? formDict.sending : formDict.submit}
      </Button>
    </form>
  );
}
