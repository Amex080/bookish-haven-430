export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  cover: string; // gradient/color for spine
  description: string;
};

export const CATEGORIES = [
  "Accounting",
  "E-commerce",
  "Public Administration",
  "Economics",
  "Building Technology",
  "Statistics",
  "Materials",
  "General",
  "Sociology",
] as const;

export const BOOKS: Book[] = [
  { id: "b1", title: "Principles of Financial Accounting", author: "O. Adeyemi", category: "Accounting", price: 4500, cover: "from-amber-800 to-amber-950", description: "A comprehensive introduction to double-entry bookkeeping, ledgers and financial statement preparation." },
  { id: "b2", title: "Cost & Management Accounting", author: "C. Nwosu", category: "Accounting", price: 5200, cover: "from-stone-700 to-stone-950", description: "Costing methods, budgeting, and decision-making tools for modern managers." },
  { id: "b3", title: "Foundations of E-Commerce", author: "K. Saheed", category: "E-commerce", price: 6100, cover: "from-indigo-800 to-indigo-950", description: "From storefronts to secure payment gateways — the architecture of online trade." },
  { id: "b4", title: "Digital Marketplaces", author: "R. Okafor", category: "E-commerce", price: 5800, cover: "from-blue-800 to-blue-950", description: "Case studies in platform economics, marketplace design and consumer behaviour." },
  { id: "b5", title: "Public Administration in Nigeria", author: "A. Bello", category: "Public Administration", price: 4800, cover: "from-emerald-800 to-emerald-950", description: "Structures, ethics and reform of the Nigerian civil service." },
  { id: "b6", title: "Policy Analysis & Governance", author: "M. Adekunle", category: "Public Administration", price: 5300, cover: "from-teal-800 to-teal-950", description: "Frameworks for evaluating public policy in developing economies." },
  { id: "b7", title: "Principles of Economics", author: "F. Ojo", category: "Economics", price: 4700, cover: "from-red-800 to-red-950", description: "Micro and macroeconomic fundamentals with African case illustrations." },
  { id: "b8", title: "Development Economics", author: "P. Eze", category: "Economics", price: 5600, cover: "from-rose-800 to-rose-950", description: "Growth, inequality and industrial policy across emerging markets." },
  { id: "b9", title: "Introduction to Building Technology", author: "S. Umar", category: "Building Technology", price: 6200, cover: "from-orange-800 to-orange-950", description: "Materials, structures and construction methods for civil works." },
  { id: "b10", title: "Statistical Methods for Science", author: "T. Balogun", category: "Statistics", price: 5000, cover: "from-violet-800 to-violet-950", description: "Descriptive and inferential statistics with worked examples." },
  { id: "b11", title: "Engineering Materials", author: "H. Yusuf", category: "Materials", price: 5900, cover: "from-slate-700 to-slate-950", description: "Properties, selection and testing of metals, polymers and composites." },
  { id: "b12", title: "General Studies Companion", author: "Editorial Board", category: "General", price: 3200, cover: "from-neutral-700 to-neutral-950", description: "Use of English, logic and Nigerian peoples & culture — one volume." },
  { id: "b13", title: "Introductory Sociology", author: "L. Anyanwu", category: "Sociology", price: 4400, cover: "from-fuchsia-800 to-fuchsia-950", description: "Society, culture and institutions — a first course." },
  { id: "b14", title: "Sociology of Development", author: "J. Ikenna", category: "Sociology", price: 4900, cover: "from-purple-800 to-purple-950", description: "Modernization, dependency and post-colonial perspectives." },
  { id: "b15", title: "Auditing & Assurance", author: "V. Onuoha", category: "Accounting", price: 5400, cover: "from-yellow-800 to-yellow-950", description: "Standards, ethics and the audit process end-to-end." },
  { id: "b16", title: "Data-Driven Economics", author: "N. Adaora", category: "Economics", price: 6000, cover: "from-pink-800 to-pink-950", description: "Applied econometrics with real datasets." },
];

export const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
