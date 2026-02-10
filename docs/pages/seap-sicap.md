# SEAP/SICAP (Achizitii Publice)

## Obiectiv

Pagina dedicata pentru expertiza in achizitii publice -- una dintre cele mai mari diferentieri ale Rammer Tech. Targetata catre doua audiente: **autoritati contractante** (sector public) si **operatori economici** (firme care vor sa liciteze). Excelent pentru SEO pe cautari de nisa cu intentie comerciala puternica.

## Ruta

`/[lang]/seap-sicap`

## Sectiuni

### 1. Hero SEAP/SICAP

- **Titlu** (H1): _"Expertiza Completa in Achizitii Publice"_
- **Subtitlu**: _"Navigam complexitatea SEAP si SICAP pentru tine -- de la documentatie la castigarea licitatiilor."_
- **CTA**: "Solicita asistenta SEAP" -> `/contact?serviciu=seap`
- **Breadcrumb**: Acasa > SEAP/SICAP
- **Visual**: Icon sau ilustratie legata de documente / procurement / shield

### 2. Ce este SEAP/SICAP? (Educatie)

- Sectiune explicativa pentru vizitatorii care nu cunosc bine sistemul:
  - **SEAP** -- Sistemul Electronic de Achizitii Publice: platforma nationala unde se desfasoara licitatiile publice din Romania
  - **SICAP** -- Sistemul Informatic Colaborativ pentru Mediul de Achizitii Publice: componenta de conformitate si raportare
- De ce conteaza: valoarea anuala a achizitiilor publice, oportunitati, complexitate
- Ton: educativ, accesibil, fara jargon excesiv
- **Nota**: Aceasta sectiune atrage trafic SEO de la oameni care cauta informatii de baza despre SEAP

### 3. Servicii pentru Operatori Economici

- **Subtitlu**: _"Vrei sa castigi licitatii? Te ajutam."_
- Lista de servicii:
  - **Pregatire documentatie** -- Propunere tehnica si financiara conformea
  - **Depunere oferte** -- Asistenta la incarcarea ofertelor in SEAP
  - **Monitorizare oportunitati** -- Identificam licitatii relevante pentru profilul tau
  - **Strategie de ofertare** -- Consultanta pentru formularea ofertelor castigatoare
  - **Contestatii** -- Asistenta in cazul contestatiilor (in parteneriat cu avocati specialisti)
  - **Training** -- Formare profesionala pentru echipa ta
- Design: Lista cu checkmark icons, alternating background

### 4. Servicii pentru Autoritati Contractante

- **Subtitlu**: _"Simplificam procesul de achizitie publica"_
- Lista de servicii:
  - **Documentatie de atribuire** -- Caiet de sarcini, fisa de date
  - **Publicare proceduri** -- Asistenta in publicarea in SEAP
  - **Evaluare oferte** -- Suport tehnic in procesul de evaluare
  - **Conformitate SICAP** -- Raportari si conformitate legala
  - **Platforma online** -- Dezvoltare de instrumente digitale pentru gestionarea achizitiilor
- Design: Similar cu sectiunea anterioara, vizual diferentiat

### 5. Solutii Software pentru SEAP

- **Subtitlu**: _"Automatizam si optimizam procesul de achizitii"_
- Ce construim:
  - **Monitorizare automata** -- Software care scaneaza SEAP si alerta pentru licitatii relevante
  - **Generator documente** -- Automatizarea crearii documentatiei standard
  - **Dashboard SEAP** -- Vizualizare si tracking al licitatiilor active
  - **Integrare API SEAP** -- Conectare cu sisteme interne (ERP, CRM)
- Aceasta sectiune face legatura cu cealalta competenta a firmei: **dezvoltare software**
- Design: Mockup/screenshot al unui dashboard sau interfata

### 6. Cifre si rezultate

- **Licitatii castigate**: X+ (cifra reala)
- **Valoare totala contracte**: X mil. RON (daca se poate dezvalui)
- **Rata de succes**: X% (daca e impresionanta)
- **Clienti asistati**: X+
- Design: Numar mare + label, 4 coloane, animatie count-up

### 7. Intrebari frecvente (FAQ)

- Accordion cu Q&A-uri relevante:
  - "Cat costa serviciile de asistenta SEAP?"
  - "Cat dureaza pregatirea unei oferte?"
  - "Puteti garanta castigarea licitatiei?"
  - "Lucrati si cu microintreprinderi?"
  - "Ce platforme monitorizati in afara de SEAP?"
  - "Ce inseamna conformitatea SICAP?"
- Design: Accordion cu animatie expand/collapse
- **SEO bonus**: FAQ-urile sunt excelente pentru Featured Snippets in Google

### 8. CTA Banner

- Mesaj: _"Ai nevoie de asistenta SEAP/SICAP? Programeaza o consultatie gratuita."_
- Buton: "Contacteaza-ne" -> `/contact?serviciu=seap`

---

## Continut necesar de la client

- [ ] Cifre reale: licitatii castigate, clienti asistati, valoare contracte
- [ ] Lista completa de servicii SEAP/SICAP oferite
- [ ] Studii de caz anonimizate din licitatii (optional dar foarte valoroase)
- [ ] Intrebari frecvente reale primite de la clienti
- [ ] Pret-uri / pachete (daca se doreste afisarea pe site)
- [ ] Screenshoturi din produsele software proprii legate de SEAP (daca exista)

## Componente React necesare

| Componenta | Tip | Fisier |
|------------|-----|--------|
| `SeapHero` | Server | `src/app/[lang]/seap-sicap/_components/seap-hero.tsx` |
| `SeapExplainer` | Server | `src/app/[lang]/seap-sicap/_components/seap-explainer.tsx` |
| `OperatorServices` | Server | `src/app/[lang]/seap-sicap/_components/operator-services.tsx` |
| `AuthorityServices` | Server | `src/app/[lang]/seap-sicap/_components/authority-services.tsx` |
| `SeapSoftware` | Server | `src/app/[lang]/seap-sicap/_components/seap-software.tsx` |
| `StatsCounter` | Client (animatii) | `src/components/stats-counter.tsx` |
| `FaqAccordion` | Client | `src/components/faq-accordion.tsx` |
| `CtaBanner` | Server (shared) | `src/components/cta-banner.tsx` |

## SEO

- **Title**: `Achizitii Publice SEAP/SICAP -- Asistenta si Software | Rammer Tech`
- **Meta description**: `Servicii complete pentru achizitii publice: asistenta SEAP, conformitate SICAP, monitorizare licitatii si solutii software pentru operatori economici si autoritati contractante.`
- **Keywords tinta**: "asistenta SEAP", "licitatii SEAP", "SICAP conformitate", "software SEAP", "monitorizare licitatii publice"
- **Schema.org**: `Service` + `FAQPage` (pentru FAQ)

## CTA-uri principale

1. "Solicita asistenta SEAP" -> `/contact?serviciu=seap` (Hero)
2. "Contacteaza-ne" -> `/contact?serviciu=seap` (Banner final)

## Note

- Aceasta este probabil pagina cu cel mai mare potential SEO -- cautari de nisa cu competitie redusa
- FAQ-urile trebuie structurate cu schema FAQ pentru Google Featured Snippets
- Sectiunea educativa ("Ce este SEAP?") atrage trafic top-of-funnel
- Sectiunea de software face bridge-ul perfect intre cele doua competente ale firmei
- Pagina serveste doua audiente distincte (operatori + autoritati) -- navigatia trebuie sa le separe clar
- Daca exista un produs software propriu legat de SEAP, face trimitere catre pagina Produse
