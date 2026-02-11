# Contact

## Obiectiv

Pagina de conversie finala -- aici ajung vizitatorii cand sunt gata sa ia legatura. Trebuie sa fie **simpla, rapida, fara frictiuni**. Ofera multiple canale de contact si un formular clar. E o pagina critica -- orice bariera = lead-uri pierdute.

## Ruta

`/[lang]/contact`

## Sectiuni

### 1. Hero Contact

- **Titlu** (H1): _"Hai sa Vorbim"_ sau _"Contacteaza-ne"_
- **Subtitlu**: _"Avem un raspuns pentru fiecare intrebare. Scrie-ne si te contactam in cel mai scurt timp."_
- **Breadcrumb**: Acasa > Contact
- Design simplu, fara distractii

### 2. Formular de contact (Main)

Formularul este centrul paginii. Campuri:

- **Nume complet** (text, obligatoriu)
- **Email** (email, obligatoriu)
- **Telefon** (tel, optional)
- **Companie** (text, optional)
- **Serviciu de interes** (select dropdown, optional):
  - Dezvoltare Web & Mobile
  - Solutii Enterprise
  - Consultanta IT
  - Achizitii Publice SEAP/SICAP -- REMOVED
  - Produs [Nume Produs]
  - Altceva
- **Buget estimat** (select dropdown, optional):
  - Sub 5.000 EUR
  - 5.000 - 15.000 EUR
  - 15.000 - 50.000 EUR
  - Peste 50.000 EUR
  - Nu stiu inca
- **Mesaj** (textarea, obligatoriu)
- **Checkbox GDPR**: "Sunt de acord cu [Politica de Confidentialitate]" (obligatoriu)
- **Buton submit**: "Trimite Mesajul"

**Comportament:**
- Validare in timp real (client-side)
- Stare de loading pe buton in timpul trimiterii
- Mesaj de succes dupa trimitere (toast sau inline)
- Mesaj de eroare daca ceva nu merge
- **Pre-populare**: Parametrul `?serviciu=` din URL selecteaza automat serviciul in dropdown

**Trimitere:**
- Optiunea 1: Email via API extern (Resend, SendGrid, Formspree)
- Optiunea 2: Integrare cu un tool de CRM / lead management
- Nota: Site-ul nu are backend propriu, deci trebuie un serviciu extern

### 3. Informatii de contact directe

Alaturi de formular (pe desktop) sau sub formular (pe mobile):

- **Email**: contact@rammer.tech (sau ce adresa e)
- **Telefon**: +40 XXX XXX XXX
- **Program**: Luni - Vineri, 09:00 - 18:00
- **Locatie**: Oras, Romania (fara adresa exacta daca nu e nevoie)
- **Social media**: LinkedIn, GitHub (daca exista)

Design: Carduri mici cu iconite Lucide

### 4. Harta (Optional)

- Google Maps embed cu locatia firmei
- Sau o simpla mentiune a orasului fara harta (pentru privacy)
- **Nota**: Harta adauga credibilitate dar nu e obligatorie pentru o firma mica

### 5. FAQ rapid (Optional)

- 3-4 intrebari frecvente despre procesul de lucru:
  - "Cat dureaza pana primesc o oferta?"
  - "Aveti un minim de proiect?"
  - "Cum functioneaza colaborarea la distanta?"
- Design: Accordion compact

---

## Continut necesar de la client

- [ ] Adresa de email oficiala de contact
- [ ] Numar de telefon (daca se doreste afisat)
- [ ] Program de lucru
- [ ] Locatie / oras
- [ ] Conturi social media (LinkedIn, GitHub, etc.)
- [ ] Decizie: harta sau fara harta?
- [ ] Decizie: unde ajung emailurile? (serviciu de email, CRM?)
- [ ] Intervalele de buget (validare / ajustare)
- [ ] Timp de raspuns promis (ex: "in 24 de ore")

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `ContactHero` | Server | `src/app/[lang]/contact/_components/contact-hero.tsx` |
| `ContactForm` | Client | `src/app/[lang]/contact/_components/contact-form.tsx` |
| `ContactInfo` | Server | `src/app/[lang]/contact/_components/contact-info.tsx` |
| `ContactMap` | Client (optional) | `src/app/[lang]/contact/_components/contact-map.tsx` |
| `FaqAccordion` | Client (shared) | `src/components/faq-accordion.tsx` |

## SEO

- **Title**: `Contact -- Rammer Tech | Solutii Software si SEAP`
- **Meta description**: `Contacteaza Rammer Tech pentru solutii software personalizate si asistenta achizitii publice SEAP/SICAP. Raspundem in maximum 24 de ore.`
- **Schema.org**: `ContactPage` + `LocalBusiness` cu `contactPoint`

## CTA-uri principale

1. "Trimite Mesajul" (butonul formularului -- singurul CTA important)
2. Email clickabil (mailto:)
3. Telefon clickabil (tel:)

## Note

- **Regula de aur**: Cu cat mai putine campuri obligatorii, cu atat mai multi vor completa formularul
- Campul de buget poate intimida -- sa fie explicit optional
- Pre-popularea serviciului din URL e o micro-optimizare cu impact mare pe UX
- Trebuie neaparat o solutie de backend/third-party pentru procesarea formularului (Formspree, Resend API, etc.)
- Mesajul de succes dupa trimitere trebuie sa inspire incredere: "Multumim! Te contactam in maximum 24 de ore."
- GDPR checkbox e OBLIGATORIU conform legislatiei UE
- Consideram honeypot field sau reCAPTCHA pentru protectie anti-spam
- Pe mobile, formularul trebuie sa fie usor de completat (input types corecte, autocomplete)
