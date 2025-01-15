export interface Question {
    id: number;
    question: string;
    type: 'intro' | 'choice' | 'multiselect' | 'text' | 'email';
    options?: string[];
    placeholder?: string;
    subtext?: string;
    showIf?: (answers: Record<number, any>) => boolean;
  }
  const waitlistQuestions: Question[] = [
    {
      id: 0,
      question: "Welcome to the Quok.it Waitlist Survey!",
      subtext: "We're excited to learn more about your interest in our decentralized GPU trust layer and DCIM software. This survey will help us tailor our services to your needs. Let's get started!",
      type: "intro",
    },
    {
      id: 1,
      question: "What best describes your role?",
      type: "choice",
      options: ["Developer", "Decentralized Compute Network", "Compute Provider", "Investor", "Other"],
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
      question: "Link to what you're building!",
      type: "text",
      placeholder: "Share your project link",
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
        "Remotely managing GPUs pledged to my network",
        "Promoting the most reliable nodes",
        "Predicting GPU failures",
        "Slashing underperforming nodes"
      ],
      showIf: (answers) => answers[1] === "Decentralized Compute Network",
    },
    // Provider Path
    {
      id: 7,
      question: "What types of hardware do you supply?",
      type: "multiselect",
      options: ["HPC", "Consumer-grade (NVIDIA GeForce)", "CPU"],
      showIf: (answers) => answers[1] === "Compute Provider",
    },
    {
      id: 8,
      question: "Current network(s) supplied:",
      type: "text",
      placeholder: "Enter networks",
      showIf: (answers) => answers[1] === "Compute Provider",
    },
    // Investor Path
    {
      id: 9,
      question: "What stage of companies do you typically invest in?",
      type: "choice",
      options: ["Seed", "Series A", "Series B and beyond", "All stages"],
      showIf: (answers) => answers[1] === "Investor",
    },
    // Common Questions for All
    {
      id: 10,
      question: "Would you be interested in participating in a beta test?",
      type: "choice",
      options: ["Yes", "No", "Maybe"],
    },
    {
      id: 11,
      question: "What should we call you?",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      id: 12,
      question: "What's your email?",
      type: "email",
      placeholder: "name@company.com",
    },
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
  
  export default waitlistQuestions;