export const personalInfo = {
  name: "Abdelrhman Tarek Mohamed Mostafa",
  title: "Junior AI Engineer",
  email: "abdelrhmantarek2002@gmail.com",
  phone: "+201094012587",
  location: "Cairo, Egypt",
  dateOfBirth: "10-May-2002",
  specialization: "AI Systems",
  linkedin: "abdelrhman-tarek-mohamed",
  github: "Abdelrhman-T",
  kaggle: "abdelrhman-ai",
  summary:
    "Junior AI Engineer specializing in Arabic NLP, LLM-powered systems, RAG pipelines, and production-grade APIs. Hands-on experience building end-to-end AI applications using FastAPI, LangGraph, Docker, vector databases, and multi-provider LLM integrations. Strong background in machine learning, conversational AI, Arabic text processing, prompt engineering, and evaluation workflows, with award-winning academic and DEPI AI projects.",
};

export const technicalSkills = {
  ai_ml: [
    "NLP",
    "LLMs",
    "RAG",
    "Conversational AI",
    "Prompt Engineering",
    "LLM Agents",
    "Agentic Workflows",
    "Semantic Search",
    "Embeddings",
    "NER",
    "Text Classification",
    "Arabic Text Processing",
  ],
  frameworks: [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Hugging Face Transformers",
    "LangChain",
    "LangGraph",
    "NLTK",
  ],
  backend_apis: ["Python", "FastAPI", "REST APIs", "Pydantic", "SQL", "C++"],
  vector_db_data: [
    "Qdrant",
    "pgvector",
    "FAISS",
    "ChromaDB",
    "PostgreSQL",
    "MS SQL Server",
    "Oracle",
  ],
  deployment_mlops: [
    "Docker",
    "Nginx",
    "Prometheus",
    "Grafana",
    "API Integration",
    "Git",
    "GitHub",
  ],
  cloud: ["Microsoft Azure", "Groq", "OpenRouter", "OpenAI", "Cohere"],
  exposure: ["Flask", "Django", "Java", "C#"],
};

export const projects = [
  {
    id: "soukai",
    name: "SoukAI",
    subtitle: "Arabic E-commerce Customer Support Triage Agent",
    date: "06/2026",
    url: "https://github.com/Abdelrhman-T/SoukAI",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Arabic NLP",
      "NLTK",
      "LLM APIs",
      "Groq",
      "OpenRouter",
      "Meta",
      "Webhooks",
      "Facebook Graph API",
    ],
    description:
      "Implemented a controlled FastAPI/LangGraph workflow for input validation, Arabic normalization, safety filtering, intent classification, entity extraction, order lookup, KB retrieval, routing, escalation, and Arabic response generation.",
    highlights: [
      "Added safety checks for profanity, abusive content, spam, and prompt injection before LLM response generation.",
      "Integrated Facebook Page webhooks to process new comments through the agent flow and reply automatically.",
      "Created an evaluation pipeline with classification metrics, routing metrics, latency/cost tracking, trajectory logs, and rubric-based LLM-as-judge evaluation.",
      "Tested on 71 labeled examples, achieving a 73.24% response pass rate.",
    ],
    image: "/projects/soukai.jpg",
  },
  {
    id: "baseer",
    name: "Baseer",
    subtitle: "RAG-based LLM System with Vector Search & OCR Pipeline",
    date: "04/2026",
    url: "https://www.linkedin.com/posts/abdelrhman-tarek-mohamed_aepaesaeyaeraepaejabraepaesaepaedaefaeuaepaehaey-ugcPost-7442549864707670016-W0n-/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADvtCqsBvRUf7415I2MR95L8yIiGENYtO5I",
    tech: [
      "OCR",
      "Embeddings",
      "Vector Search",
      "LLMs",
      "OpenAI",
      "Cohere",
      "Hugging Face",
      "Groq",
      "pgvector",
      "Qdrant",
      "Docker",
      "Nginx",
      "Prometheus",
      "Grafana",
    ],
    description:
      "Designed and deployed an end-to-end RAG pipeline for document intelligence using OCR, embeddings, vector search, and LLMs.",
    highlights: [
      "Integrated multiple LLM providers, including OpenAI, Cohere, Hugging Face, and Groq.",
      "Used pgvector and Qdrant for semantic search and retrieval over Arabic documents.",
      "Fine-tuned Qwen2-VL using LoRA for OCR accuracy improvement and structured output extraction.",
      "Deployed the system using Docker, Nginx, Prometheus, and Grafana.",
    ],
    image: "/projects/baseer.jpg",
  },
  {
    id: "aian",
    name: "AIan",
    subtitle: "Arabic Virtual Patient for Medical Training",
    date: "06/2025",
    url: "https://drive.google.com/drive/folders/1mprTKsBpn5y1REn9_ysW7Sj5VaLzphdy",
    tech: [
      "Whisper STT",
      "LLM Dialogue",
      "Arabic TTS",
      "Flutter",
      "FastAPI",
      "PostgreSQL",
    ],
    description:
      "Led development of an AI-powered medical simulation system for Arabic-language clinical training.",
    highlights: [
      "Integrated Whisper STT, LLM-based dialogue generation, and Arabic TTS pipelines.",
      "Developed a full-stack system using Flutter, FastAPI, and PostgreSQL.",
      "Ranked 1st at the Faculty of Computer Science and Artificial Intelligence and 3rd overall at Cairo University.",
    ],
    image: "/projects/aian.jpg",
  },
];

export const workExperience = [
  {
    company: "GB Corp | Ghabbour Foundation",
    role: "Programming and AI Instructor",
    period: "07/2025 – Present",
    location: "Giza, Egypt",
    description: [
      "Deliver hands-on training in IT Systems, Python, DB Design, Data Structures, Algorithms, web application development, and AI/ML, emphasizing real-world applications.",
      "Mentor students in applying programming, AI, and database knowledge to real-world projects.",
    ],
  },
  {
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    role: "Microsoft Machine Learning Engineer Intern",
    period: "04/2024 – 10/2024",
    location: "Cairo, Egypt",
    description: [
      "Specialized in Machine Learning, Data Science, Deep Learning and Azure Cloud solutions.",
      "Completed advanced tracks in teamwork, freelancing, and leadership.",
      "Achieved 2nd place award in AI innovation competition.",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. in Computer Science & Artificial Intelligence",
    institution: "Cairo University",
    specialization: "Artificial Intelligence",
    period: "2021 – 2025",
    location: "Cairo, Egypt",
  },
];

export const certificates = [
  {
    id: "azure-ai-102",
    title: "Azure AI Engineer Associate AI-102",
    issuer: "Microsoft",
    date: "07/2025",
    image: "/certificates/azure-ai-102.jpg",
  },
  {
    id: "depi-ml",
    title: "Microsoft Machine Learning Engineer Graduation",
    issuer: "Digital Egypt Pioneers Initiative (DEPI)",
    date: "07/2025",
    image: "/certificates/depi-ml.jpg",
  },
  {
    id: "stanford-algorithms",
    title: "Advanced Learning Algorithms",
    issuer: "Stanford University",
    date: "11/2024",
    image: "/certificates/stanford-algorithms.jpg",
  },
  {
    id: "stanford-supervised",
    title: "Supervised Machine Learning",
    issuer: "Stanford University",
    date: "11/2024",
    image: "/certificates/stanford-supervised.jpg",
  },
  {
    id: "stanford-unsupervised",
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "Stanford University",
    date: "11/2024",
    image: "/certificates/stanford-unsupervised.jpg",
  },
  {
    id: "depi-leadership",
    title: "Leadership",
    issuer: "Digital Egypt Pioneers Initiative (DEPI)",
    date: "07/2025",
    image: "/certificates/depi-leadership.jpg",
  },
  {
    id: "depi-best-project.jpg",
    title: "Best Project",
    issuer: "Digital Egypt Pioneers Initiative (DEPI)",
    date: "11/2024",
    image: "/certificates/depi-best-project.jpg",
  },
  {
    id: "git-github",
    title: "Git and GitHub",
    issuer: "Git",
    date: "11/2024",
    image: "/certificates/git-github.jpg",
  },
  {
    id: "mentorness",
    title: "ML Engineer Internship",
    issuer: "MENTORNESS",
    date: "11/2024",
    image: "/certificates/mentorness.jpg",
  },
];

export const awards = [
  {
    title: "1st Place, Best Graduation Project",
    organization: "Faculty of Computers and Artificial Intelligence",
    description:
      "Awarded 1st place for the AIan Arabic Virtual Patient project at the faculty level.",
  },
  {
    title: "3rd Place, Best Graduation Project",
    organization: "Cairo University",
    description:
      "Awarded 3rd place at the university-wide graduation project competition.",
  },
  {
    title: "2nd Place, Best Graduation Project",
    organization: "DEPI and CLS (AI Track)",
    description:
      "Achieved 2nd place in the AI track at the DEPI graduation project competition.",
  },
];

export const softSkills = [
  "Leadership",
  "Teamwork",
  "Problem-Solving",
  "Creativity",
  "Adaptability",
  "Communication",
];

export const languages = ["Arabic", "English"];
