# Despre Noi (About Us)

## Obiectiv

Construieste incredere si conexiune umana. Vizitatorii vor sa stie **cine sunt oamenii** din spatele serviciilor, **ce valori** au si **de ce pot avea incredere** in Rammer Tech. Esential pentru conversie -- clientii lucreaza cu oameni, nu cu brand-uri.

## Ruta

`/[lang]/despre-noi`

## Sectiuni

### 1. Hero Despre Noi

- **Titlu** (H1): _"Echipa Ta de Tehnologie"_ sau _"Povestea Rammer Tech"_
- **Subtitlu**: Mesaj scurt despre misiune si ce ne motiveaza
- **Breadcrumb**: Acasa > Despre Noi
- Design curat, posibil cu o fotografie de echipa sau ilustratie

### 2. Povestea noastra (Story)

- **Cand si cum a aparut Rammer Tech** -- narativ scurt, autentic
- **Ce ne-a motivat** -- problema pe care am vrut sa o rezolvam
- **Unde suntem acum** -- stadiul actual, directia de dezvoltare
- Ton: profesional dar accesibil, usor personal
- Format: paragraf narativ (nu bullets) -- storytelling

### 3. Misiune, Viziune, Valori

- **Misiune**: Ce facem si pentru cine (1 propozitie clara)
  - Ex: _"Livram solutii software care transforma afaceri si simplifica procese complexe."_
- **Viziune**: Unde vrem sa ajungem (1 propozitie inspirationala)
  - Ex: _"Sa devenim partenerul de referinta pentru digitalizarea IMM-urilor din Romania."_
- **Valori** (3-5 valori cu icon + descriere scurta):
  1. **Calitate** -- Codul nostru reflecta standardele noastre
  2. **Transparenta** -- Comunicare deschisa, fara surprize
  3. **Orientare pe rezultat** -- Masuram succesul prin impactul real
  4. **Inovatie pragmatica** -- Tehnologie de varf cu picioarele pe pamant
  5. **Parteneriat** -- Succesul tau este succesul nostru
- Design: Carduri sau grid cu iconite

### 4. Echipa

- Prezentare membri cheie:
  - Fotografie profesionala (sau avatar stilizat daca nu sunt disponibile)
  - Nume si rol
  - Scurta descriere / expertiza (2-3 randuri)
  - Link-uri: LinkedIn (optional GitHub)
- Design: Grid responsive (2-3 coloane desktop, 1 coloana mobile)
- **Nota**: Pentru o echipa mica, fiecare membru conteaza -- prezentarea trebuie sa inspire incredere

### 5. Cifre cheie / Milestones

- Timeline sau grid cu realizari importante:
  - Anul infiintarii
  - Numar proiecte livrate
  - Numar clienti
  - Licitatii SEAP castigate
  - Alte milestone-uri relevante
- Design: Poate fi timeline vertical sau cards cu cifre mari

### 6. De ce sa lucrezi cu noi? (Diferentiatori)

- 3-4 motive concrete:
  - **Echipa dedicata** -- Nu subcontractam, fiecare proiect primeste atentia noastra completa
  - **Comunicare constanta** -- Update-uri regulate, fara ghosting
  - **Flexibilitate** -- Ne adaptam la nevoile si bugetul tau
  - **Expertiza de nisa** -- SEAP/SICAP + software custom = combinatie rara pe piata
- Format: Alternating layout (text + ilustratie/icon)

### 7. CTA Banner

- Componenta partajata `CtaBanner`
- Mesaj: _"Vrei sa ne cunosti mai bine? Programeaza o discutie."_
- Buton: "Contacteaza-ne" -> `/contact`

---

## Continut necesar de la client

- [ ] Povestea companiei (cand, cum, de ce s-a infiintat)
- [ ] Misiune si viziune validate
- [ ] Lista valorilor companiei (confirm sau revizuieste propunerile)
- [ ] Fotografii ale echipei (sau decizia de a folosi avataruri/ilustratii)
- [ ] Bio-uri scurte pentru fiecare membru
- [ ] Cifre reale (an infiintare, nr. proiecte, clienti, etc.)
- [ ] Link-uri LinkedIn/GitHub ale membrilor

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `AboutHero` | Server | `src/app/[lang]/despre-noi/_components/about-hero.tsx` |
| `CompanyStory` | Server | `src/app/[lang]/despre-noi/_components/company-story.tsx` |
| `MissionValues` | Server | `src/app/[lang]/despre-noi/_components/mission-values.tsx` |
| `TeamGrid` | Server | `src/app/[lang]/despre-noi/_components/team-grid.tsx` |
| `Milestones` | Client (animatii) | `src/app/[lang]/despre-noi/_components/milestones.tsx` |
| `CtaBanner` | Server (shared) | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `Despre Noi -- Echipa si Povestea Rammer Tech`
- **Meta description**: `Cunoaste echipa Rammer Tech -- dezvoltatori pasionati de software, specializati in solutii custom si achizitii publice SEAP/SICAP.`
- **Schema.org**: `Organization` cu `founders`, `foundingDate`, `numberOfEmployees`

## CTA-uri principale

1. "Contacteaza-ne" -> `/contact` (banner final)
2. Link-uri LinkedIn pe cardurile echipei (iesire din site)

## Note

- Aceasta pagina e CRITICA pentru conversie -- clientii vor sa vada oameni reali
- Daca echipa e foarte mica (2-3 persoane), e OK -- prezentarea onesta e mai buna decat inflarea perceptiei
- Fotografiile profesionale fac diferenta uriasa -- merita investitia
- Povestea trebuie sa fie autentica, nu corporatista
- Valorile trebuie sa fie reale, nu buzzwords -- fiecare valoare ar trebui sa aiba un exemplu concret in spate
