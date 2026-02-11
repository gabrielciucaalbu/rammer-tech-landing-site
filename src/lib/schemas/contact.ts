import { z } from "zod";

/** Server-side contact form schema (static English messages). */
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  gdpr: z.literal(true, { message: "GDPR consent is required" }),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;
