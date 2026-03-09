export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  linkedIn: string;
}

export const authors: Author[] = [
  {
    slug: "gabriel-ciuca-albu",
    name: "Gabriel Ciucă-Albu",
    jobTitle: "Fondator & CTO",
    bio: "Gabriel este fondatorul și CTO-ul Rammer Tech, cu peste 10 ani de experiență în dezvoltare software. A colaborat cu companii mari precum Creado Concept (grupul ERBAȘU) și PwC, și conduce echipa tehnică a Rammer Tech cu focus pe soluții custom pentru IMM-uri din România.",
    linkedIn: "https://www.linkedin.com/in/gabriel-octavian-ciuca-albu-33a717160/",
  },
];

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((a) => a.name === name);
}
