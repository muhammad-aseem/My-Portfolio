export const assetUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const profile = {
  name: "Muhammad Aseem",
  role: "Aspiring Python Backend & AI Developer",
  email: "aseem.cod.dev@gmail.com",
  phone: "+923284964700",
  github: "https://github.com/muhammad-aseem",
  linkedin: "https://www.linkedin.com/in/muhammad-aseem-498582328",
  x: "https://x.com/aseem_fs",
  cv: {
    view: assetUrl("Muhammad-Aseem-CV-Updated-Skills.pdf"),
    download: assetUrl("Muhammad-Aseem-CV-Updated-Skills.pdf"),
    filename: "Muhammad_Aseem_CV.pdf",
  },
};
export type Project = {
  id: string;
  number: string;
  name: string;
  category: "Commercial" | "Python";
  label: string;
  description: string;
  detail: string;
  tech: string[];
  repo: string;
  live?: string;
  private?: boolean;
  outcomes: string[];
  example?: { command: string; lines: string[] };
};
export const projects: Project[] = [
  {
    id: "catalyst",
    number: "01",
    name: "Click Catalyst",
    category: "Commercial",
    label: "Frontend development",
    description: "The first step. A real commercial website.",
    detail:
      "My first frontend project: contributing to a digital marketing website. The source includes home, about and contact pages, custom SCSS styling and carousel interactions. My contribution was frontend development; the current live website has evolved beyond this repository.",
    tech: ["HTML", "SCSS", "JavaScript", "jQuery"],
    repo: "https://github.com/muhammad-aseem/click-catalyst",
    live: "https://clickcatalyst.uk/",
    private: true,
    outcomes: [
      "Frontend page layouts and styling",
      "Responsive sections and reusable SCSS",
      "Carousel interactions using Slick",
    ],
  },
  {
    id: "tip",
    number: "02",
    name: "Tip Calculator",
    category: "Python",
    label: "Python · Command line",
    description: "A little Python. A fair split.",
    detail:
      "A Python command-line program that takes a bill amount, tip percentage and number of people, then calculates each person’s share, rounded to two decimal places.",
    tech: ["Python", "Arithmetic", "User input"],
    repo: "https://github.com/muhammad-aseem/Tip-Calculator",
    outcomes: [
      "Numeric input and type conversion",
      "Tip percentage calculations",
      "Bill splitting and rounding",
    ],
    example: {
      command: "python Main.py",
      lines: [
        "Welcome to the tip calculator",
        "What was the total bill? $100",
        "How much tip? 10, 12, or 15? 12",
        "How many people to split the bill? 4",
        "Each person should pay: $28.0",
      ],
    },
  },
  {
    id: "pizza",
    number: "03",
    name: "Pizza Delivery Program",
    category: "Python",
    label: "Python · Command line",
    description: "Size. Toppings. A total that adds up.",
    detail:
      "A Python ordering exercise that calculates a pizza price using size, pepperoni and extra cheese choices. It demonstrates conditional logic and input handling in the terminal.",
    tech: ["Python", "Conditionals", "User input"],
    repo: "https://github.com/muhammad-aseem/pizza-delivery-program",
    outcomes: [
      "Size-based pricing",
      "Conditional topping charges",
      "Invalid pizza-size handling",
    ],
    example: {
      command: "python main.py",
      lines: [
        "Welcome to Python Pizza Deliveries!",
        "What size pizza do you want? S, M or L: M",
        "Do you want pepperoni? Y or N: Y",
        "Do you want extra cheese? Y or N: Y",
        "Your final bill is $24",
      ],
    },
  },
  {
    id: "coaster",
    number: "04",
    name: "Rollercoaster Ticket",
    category: "Python",
    label: "Python · Command line",
    description: "Small decisions. Different possibilities.",
    detail:
      "A Python ticket-price calculator that checks height eligibility, applies age-based fares and adds an optional photo charge. A practical exercise in branching logic.",
    tech: ["Python", "Conditionals", "Arithmetic"],
    repo: "https://github.com/muhammad-aseem/Rollercoaster-Ticket",
    outcomes: [
      "Minimum height eligibility check",
      "Age-based ticket prices",
      "Optional photo surcharge",
    ],
    example: {
      command: "python main.py",
      lines: [
        "Welcome to the rollercoaster!",
        "What is your height in cm? 170",
        "What is your age? 22",
        "Adult tickets are $12.",
        "Do you want a photo? Y or N: Y",
        "Your final bill is $15",
      ],
    },
  },
];
export const skills = [
  {
    number: "01",
    title: "Programming",
    note: "My foundation",
    items: ["Python", "JavaScript"],
    description:
      "Python is my main programming interest. I’m building practical fundamentals through small programs, and continuing to learn JavaScript.",
  },
  {
    number: "02",
    title: "Frontend background",
    note: "Technologies I’ve used",
    items: ["HTML", "CSS", "SCSS / Sass", "Tailwind CSS", "Bootstrap"],
    description:
      "Experience with page layouts, styling and frontend bug fixes. This background supports my growing interest in the systems behind an interface.",
  },
  {
    number: "03",
    title: "AI-assisted workflow",
    note: "Tools I work with",
    items: ["ChatGPT", "Claude Code", "GitHub Copilot"],
    description:
      "I use AI tools to explore ideas, understand code and support development, while continuing to strengthen my own programming knowledge.",
  },
];
export const learning = [
  {
    number: "01",
    title: "Python backend development",
    text: "Building toward server-side programming: application structure, request handling and the fundamentals behind reliable backend systems.",
    tags: ["Python", "Backend foundations"],
  },
  {
    number: "02",
    title: "Databases & APIs",
    text: "Learning how applications store information, communicate through APIs and connect the pieces of a backend.",
    tags: ["Databases", "API fundamentals"],
  },
  {
    number: "03",
    title: "Machine learning fundamentals",
    text: "Exploring supervised and unsupervised learning, including regression. These are active learning topics, not claims of advanced professional expertise.",
    tags: ["Supervised learning", "Unsupervised learning", "Regression"],
  },
];
export const certification = {
  title: "Prompt Engineering Mastery: From Basics to Advanced",
  issuer: "Udemy",
  date: "August 28, 2026",
  credential: "https://ude.my/UC-5a7fd4f5-18a9-4896-acaa-1bb3883ddc24",
  file: assetUrl("prompt-engineering.pdf"),
  id: "UC-5a7fd4f5-18a9-4896-acaa-1bb3883ddc24",
};
