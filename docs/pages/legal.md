# Pagini Legale

## Pagini acoperite

1. **Politica de Confidentialitate** (Privacy Policy)
2. **Termeni si Conditii** (Terms & Conditions)

---

## 1. Politica de Confidentialitate

### Obiectiv

Obligatie legala GDPR. Informeaza vizitatorii despre ce date colectam, cum le folosim si ce drepturi au. Esentiala pentru conformitate si incredere. **Obligatorie inainte de lansare.**

### Ruta

`/[lang]/politica-confidentialitate`

### Continut necesar

Documentul trebuie sa acopere:

1. **Identitatea operatorului de date**
   - Numele companiei, CUI, adresa, email DPO/contact

2. **Ce date colectam**
   - Date din formularul de contact (nume, email, telefon, companie, mesaj)
   - Cookies si date de navigare
   - Date analitice (Google Analytics, daca e cazul)

3. **Scopul colectarii**
   - Raspuns la cererile de contact
   - Imbunatatirea site-ului (analytics)
   - Marketing (doar cu consimtamant explicit)

4. **Baza legala**
   - Consimtamant (formular de contact)
   - Interes legitim (analytics, securitate)

5. **Durata pastrarii**
   - Cat timp pastram datele si cand le stergem

6. **Drepturile persoanei vizate**
   - Dreptul de acces
   - Dreptul de rectificare
   - Dreptul de stergere ("dreptul de a fi uitat")
   - Dreptul de portabilitate
   - Dreptul de opozitie
   - Cum se exercita (email catre DPO)

7. **Cookies**
   - Ce cookies folosim (necesare, analitice, marketing)
   - Cum pot fi dezactivate
   - Link catre setarile de cookies

8. **Transferuri internationale**
   - Daca datele sunt procesate in afara UE (ex: servicii cloud US)

9. **Securitatea datelor**
   - Masuri tehnice si organizatorice

10. **Modificari ale politicii**
    - Cum anuntam schimbarile

### Design

- Layout: Pagina de text cu headings clare (H2 per sectiune)
- Table of Contents in sidebar (desktop) sau top (mobile)
- Ultima actualizare afisata vizibil
- Ton: clar, accesibil, fara jargon juridic excesiv

---

## 2. Termeni si Conditii

### Obiectiv

Stabileste regulile de utilizare a site-ului. Protejeaza compania legal. Mai putin critica decat Privacy Policy dar recomandata.

### Ruta

`/[lang]/termeni-si-conditii`

### Continut necesar

1. **Definitii si termeni**
   - Compania, Site-ul, Utilizatorul, Serviciile

2. **Acceptarea termenilor**
   - Prin utilizarea site-ului, accepti termenii

3. **Descrierea serviciilor**
   - Ce ofera site-ul (informare, contact)
   - Ce NU este (nu e platforma de comert, nu ofera consultanta juridica)

4. **Proprietate intelectuala**
   - Continutul site-ului e protejat
   - Logo, brand, texte, imagini = proprietatea Rammer Tech

5. **Limitarea raspunderii**
   - Informatiile sunt oferite "as is"
   - Nu garantam disponibilitate 100%

6. **Link-uri externe**
   - Nu suntem responsabili pentru site-uri terte

7. **Comunicari electronice**
   - Formularul de contact, emailurile

8. **Legea aplicabila**
   - Legislatia romana
   - Jurisdictia competenta

9. **Modificari**
   - Dreptul de a modifica termenii
   - Cum anuntam schimbarile

### Design

- Identic cu Politica de Confidentialitate (layout consistent)

---

## Componente partajate legal

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `LegalPageLayout` | Server | `src/components/legal-page-layout.tsx` |
| `TableOfContents` | Client | `src/components/table-of-contents.tsx` |

Ambele pagini legale folosesc acelasi layout: hero simplu + continut structurat + TOC.

## SEO

- **Title (Privacy)**: `Politica de Confidentialitate | Rammer Tech`
- **Title (Terms)**: `Termeni si Conditii | Rammer Tech`
- **Meta robots**: `noindex, follow` (optional -- unele companii le indexeaza, altele nu)
- **Schema.org**: Nu e necesar

## Continut necesar de la client

- [ ] Date juridice ale companiei (denumire exacta, CUI, J-number, adresa sediu)
- [ ] Email pentru DPO / solicitari GDPR
- [ ] Lista de servicii third-party care proceseaza date (analytics, email service, hosting)
- [ ] Decizie: cookies de marketing? (Google Ads, Facebook Pixel, etc.)
- [ ] Decizie: indexare in Google sau nu?
- [ ] Validare finala de un avocat (RECOMANDAT)

## Note

- **IMPORTANT**: Aceste documente ar trebui validate de un avocat inainte de lansare
- Textele pot fi generate initial cu un template, dar trebuie personalizate
- Politica de Confidentialitate e OBLIGATORIE daca colectam orice date (chiar si analytics)
- Cookie banner e necesar si face parte din infrastructura, nu din aceste pagini
- Paginile legale sunt prioritate **Faza 1** -- trebuie sa existe la lansare
- Daca nu avem inca texte legale, o versiune placeholder cu "Coming soon" NU e acceptabila legal
