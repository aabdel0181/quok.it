export interface Question {
  id: number;
  question: string;
  type: 'intro' | 'choice' | 'multiselect' | 'text' | 'email';
  subtext?: string;
  options?: string[];
  placeholder?: string;
  showIf?: (answers: Record<number, any>) => boolean;
}

export const questions: Question[] = [
  {
    id: 0,
    question: "Welcome to the Quok.it Waitlist Survey!",
    subtext: "We're excited to learn more about your interest in our decentralized GPU trust layer and DCIM software. This survey helps us tailor our services to you. Let's get started!",
    type: "intro",
  },
  {
    id: 1,
    question: "Which of the following best describes you?",
    type: "choice",
    options: ["Developer", "Decentralized Compute Network", "Compute Provider", "Investor", "Other"],
  },
  // Other path follow-up
  {
    id: 1.1,
    question: "Could you describe your role or interest in Quok.it?",
    type: "text",
    placeholder: "I'm a...",
    showIf: (answers) => answers[1] === "Other",
  },
  // (Optional) Collect name/email early
  {
    id: 11,
    question: "What should we call you?",
    type: "text",
    placeholder: "Enter your name or alias",
  },
  {
    id: 12,
    question: "What's your email?",
    type: "email",
    placeholder: "name@company.com",
  },
  // Developer Path
  {
    id: 2,
    question: "What's your project name?",
    type: "text",
    placeholder: "Enter project name",
    showIf: (answers) => answers[1] === "Developer",
  },
  {
    id: 3,
    question: "Link to what you're building (optional)",
    type: "text",
    placeholder: "https://github.com/my-awesome-project",
    showIf: (answers) => answers[1] === "Developer",
  },
  // (Optional) Additional question for dev timeline
  {
    id: 2.1,
    question: "When do you plan to integrate a decentralized compute solution?",
    type: "choice",
    options: ["Immediately", "Within 3–6 months", "6–12 months", "No set timeline yet"],
    showIf: (answers) => answers[1] === "Developer",
  },
  // Network Path
  {
    id: 4,
    question: "What's your network name?",
    type: "text",
    placeholder: "Enter network name",
    showIf: (answers) => answers[1] === "Decentralized Compute Network",
  },
  {
    id: 5,
    question: "What's your network size (# of GPUs)?",
    type: "text",
    placeholder: "Enter number of GPUs",
    showIf: (answers) => answers[1] === "Decentralized Compute Network",
  },
  {
    id: 6,
    question: "What interests you most about Quok.it?",
    type: "multiselect",
    options: [
      "Validating GPU hardware on my network",
      "Remotely managing pledged GPUs",
      "Promoting the most reliable nodes",
      "Predicting GPU failures",
      "Penalizing underperforming nodes",
    ],
    showIf: (answers) => answers[1] === "Decentralized Compute Network",
  },
  {
    id: 2.2,
    question: "When do you plan to integrate a decentralized compute solution?",
    type: "choice",
    options: ["Immediately", "Within 3–6 months", "6–12 months", "No set timeline yet"],
    showIf: (answers) => answers[1] === "Decentralized Compute Network",
  },
  // Provider Path
  {
    id: 7,
    question: "What types of hardware do you supply?",
    type: "multiselect",
    options: ["HPC/Datacenter-grade GPUs (e.g., A100)", "Consumer GPUs (e.g., NVIDIA GeForce, AMD Radeon)", "CPU"],
    showIf: (answers) => answers[1] === "Compute Provider",
  },
  {
    id: 8,
    question: "Current network(s) you supply to (if any):",
    type: "text",
    placeholder: "Enter network names",
    showIf: (answers) => answers[1] === "Compute Provider",
  },
  {
    id: 2.3,
    question: "When do you plan to integrate a decentralized compute solution?",
    type: "choice",
    options: ["Immediately", "Within 3–6 months", "6–12 months", "No set timeline yet"],
    showIf: (answers) => answers[1] === "Compute Provider",
  },
  // Investor Path
  {
    id: 9,
    question: "What stage of companies do you typically invest in?",
    type: "choice",
    options: ["Angel", "Pre-seed/Seed", "Series A", "Series B and beyond", "All stages"],
    showIf: (answers) => answers[1] === "Investor",
  },
  // Beta interest
  {
    id: 10,
    question: "Would you be interested in participating in a beta test?",
    type: "choice",
    options: ["Yes", "No", "Maybe"],
  },
  // Additional optional socials
  {
    id: 13,
    question: "Your Twitter/X handle",
    type: "text",
    placeholder: "@username",
  },
  {
    id: 14,
    question: "Your Telegram username",
    type: "text",
    placeholder: "@username",
  },
];
