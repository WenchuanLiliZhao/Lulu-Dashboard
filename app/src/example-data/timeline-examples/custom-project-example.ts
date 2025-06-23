import { type TimelineItem } from "../../data-layer/types/timeline";

// 完全自定义的项目数据结构 - 除了BaseTimelineItem基础字段外，其他字段完全不同
interface CustomProjectData {
  // 预算相关
  budget: {
    allocated: number;
    spent: number;
    currency: 'USD' | 'EUR' | 'CNY';
  };
  
  // 开发团队信息
  developers: {
    lead: string;
    frontend: string[];
    backend: string[];
    qa: string[];
  };
  
  // 技术栈
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    cloud: string[];
  };
  
  // 客户信息
  clientInfo: {
    company: string;
    contactPerson: string;
    industry: string;
    region: 'NA' | 'EU' | 'APAC' | 'LATAM';
  };
  
  // 项目管理
  milestones: {
    kickoff: Date;
    designComplete: Date;
    developmentComplete: Date;
    testing: Date;
    deployment: Date;
  };
  
  // 风险评估
  riskAssessment: {
    technical: 'LOW' | 'MEDIUM' | 'HIGH';
    timeline: 'LOW' | 'MEDIUM' | 'HIGH';
    budget: 'LOW' | 'MEDIUM' | 'HIGH';
    overall: 'GREEN' | 'YELLOW' | 'RED';
  };
  
  // 工时估算
  estimatedHours: {
    design: number;
    development: number;
    testing: number;
    deployment: number;
    total: number;
  };
  
  // 项目类型和特性
  projectType: 'WEB_APP' | 'MOBILE_APP' | 'API' | 'DESKTOP' | 'MICROSERVICE';
  features: string[];
  
  // 质量指标
  qualityMetrics: {
    codeCoverage: number; // 0-100
    performanceScore: number; // 0-100
    securityScore: number; // 0-100
    maintainabilityIndex: number; // 0-100
  };
}

// 自定义项目时间线示例数据
export const CustomProjectTimelineExample: TimelineItem<CustomProjectData>[] = [
  {
    // BaseTimelineItem 必需字段
    id: "proj-2024-001",
    name: "E-commerce Platform Redesign",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-06-30"),
    
    // 完全自定义的字段
    budget: {
      allocated: 250000,
      spent: 120000,
      currency: 'USD'
    },
    developers: {
      lead: "Sarah Chen",
      frontend: ["Alex Rodriguez", "Emma Watson", "David Kim"],
      backend: ["Michael Johnson", "Lisa Zhang"],
      qa: ["Robert Taylor", "Jessica Brown"]
    },
    technologies: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      backend: ["Node.js", "Express", "PostgreSQL", "Redis"],
      database: ["PostgreSQL", "Redis", "Elasticsearch"],
      cloud: ["AWS EC2", "AWS RDS", "AWS S3", "CloudFront"]
    },
    clientInfo: {
      company: "Fashion Forward Inc.",
      contactPerson: "Jennifer Martinez",
      industry: "Retail",
      region: 'NA'
    },
    milestones: {
      kickoff: new Date("2024-01-15"),
      designComplete: new Date("2024-02-28"),
      developmentComplete: new Date("2024-05-15"),
      testing: new Date("2024-06-15"),
      deployment: new Date("2024-06-30")
    },
    riskAssessment: {
      technical: 'MEDIUM',
      timeline: 'HIGH',
      budget: 'MEDIUM',
      overall: 'YELLOW'
    },
    estimatedHours: {
      design: 320,
      development: 1200,
      testing: 280,
      deployment: 120,
      total: 1920
    },
    projectType: 'WEB_APP',
    features: [
      "User Authentication",
      "Product Catalog",
      "Shopping Cart",
      "Payment Integration",
      "Order Management",
      "Admin Dashboard",
      "Analytics",
      "Mobile Responsive"
    ],
         qualityMetrics: {
       codeCoverage: 85,
       performanceScore: 78,
       securityScore: 92,
       maintainabilityIndex: 73
     }
  },
  
  {
    id: "proj-2024-002",
    name: "Mobile Banking App",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-15"),
    
    budget: {
      allocated: 400000,
      spent: 180000,
      currency: 'USD'
    },
    developers: {
      lead: "Marcus Thompson",
      frontend: ["Rachel Green", "Kevin O'Connor", "Priya Patel", "James Wilson"],
      backend: ["Andrew Lee", "Sofia Rodriguez", "Daniel Park"],
      qa: ["Michelle Carter", "Steven Adams", "Linda Davis"]
    },
    technologies: {
      frontend: ["React Native", "TypeScript", "Expo", "Redux Toolkit"],
      backend: ["Java", "Spring Boot", "MySQL", "Apache Kafka"],
      database: ["MySQL", "MongoDB", "Apache Cassandra"],
      cloud: ["Azure App Service", "Azure SQL", "Azure Key Vault", "Azure API Management"]
    },
    clientInfo: {
      company: "SecureBank Global",
      contactPerson: "Thomas Anderson",
      industry: "Financial Services",
      region: 'EU'
    },
    milestones: {
      kickoff: new Date("2024-02-01"),
      designComplete: new Date("2024-03-20"),
      developmentComplete: new Date("2024-07-10"),
      testing: new Date("2024-08-05"),
      deployment: new Date("2024-08-15")
    },
    riskAssessment: {
      technical: 'HIGH',
      timeline: 'MEDIUM',
      budget: 'LOW',
      overall: 'YELLOW'
    },
    estimatedHours: {
      design: 480,
      development: 2400,
      testing: 600,
      deployment: 200,
      total: 3680
    },
    projectType: 'MOBILE_APP',
    features: [
      "Biometric Authentication",
      "Account Management",
      "Fund Transfers",
      "Bill Payments",
      "Investment Portfolio",
      "Credit Score Monitoring",
      "Expense Tracking",
      "Customer Support Chat",
      "Push Notifications"
    ],
         qualityMetrics: {
       codeCoverage: 95,
       performanceScore: 88,
       securityScore: 98,
       maintainabilityIndex: 82
     }
  },
  
  {
    id: "proj-2024-003",
    name: "IoT Data Analytics Platform",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    
    budget: {
      allocated: 600000,
      spent: 220000,
      currency: 'EUR'
    },
    developers: {
      lead: "Dr. Elena Kowalski",
      frontend: ["Hans Mueller", "Francesca Rossi", "Yuki Tanaka"],
      backend: ["Ivan Petrov", "Maria Santos", "Ahmed Hassan", "Claire Dubois"],
      qa: ["Lars Eriksson", "Isabella Garcia"]
    },
    technologies: {
      frontend: ["Vue.js", "D3.js", "WebGL", "Chart.js"],
      backend: ["Python", "FastAPI", "Apache Spark", "TensorFlow"],
      database: ["InfluxDB", "Apache Cassandra", "Neo4j"],
      cloud: ["Google Cloud Platform", "BigQuery", "Cloud Functions", "Pub/Sub"]
    },
    clientInfo: {
      company: "IndustrialTech Solutions",
      contactPerson: "Klaus Richter",
      industry: "Manufacturing",
      region: 'EU'
    },
    milestones: {
      kickoff: new Date("2024-03-01"),
      designComplete: new Date("2024-04-15"),
      developmentComplete: new Date("2024-08-30"),
      testing: new Date("2024-09-20"),
      deployment: new Date("2024-09-30")
    },
    riskAssessment: {
      technical: 'HIGH',
      timeline: 'HIGH',
      budget: 'MEDIUM',
      overall: 'RED'
    },
    estimatedHours: {
      design: 600,
      development: 3200,
      testing: 800,
      deployment: 300,
      total: 4900
    },
    projectType: 'WEB_APP',
    features: [
      "Real-time Data Ingestion",
      "Machine Learning Analytics",
      "Predictive Maintenance",
      "Interactive Dashboards",
      "Alert System",
      "Historical Data Analysis",
      "API Gateway",
      "Multi-tenant Architecture",
      "Edge Computing Integration"
    ],
         qualityMetrics: {
       codeCoverage: 88,
       performanceScore: 92,
       securityScore: 85,
       maintainabilityIndex: 79
     }
  },
  
  {
    id: "proj-2024-004",
    name: "Healthcare Management System",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-11-15"),
    
    budget: {
      allocated: 800000,
      spent: 150000,
      currency: 'USD'
    },
    developers: {
      lead: "Dr. Samantha Kim",
      frontend: ["Brandon Lee", "Nicole Thompson", "Antonio Silva", "Grace Wang"],
      backend: ["Jacob Martinez", "Olivia Johnson", "Mohammed Al-Rashid", "Chloe Anderson"],
      qa: ["Ryan Murphy", "Zoe Chen", "Lucas Rodriguez"]
    },
    technologies: {
      frontend: ["Angular", "TypeScript", "PrimeNG", "NgRx"],
      backend: ["C#", ".NET Core", "SQL Server", "Entity Framework"],
      database: ["SQL Server", "Redis", "Azure Cosmos DB"],
      cloud: ["Microsoft Azure", "Azure Functions", "Azure Service Bus", "Azure DevOps"]
    },
    clientInfo: {
      company: "MedCare Healthcare Network",
      contactPerson: "Dr. Patricia Williams",
      industry: "Healthcare",
      region: 'NA'
    },
    milestones: {
      kickoff: new Date("2024-04-01"),
      designComplete: new Date("2024-05-30"),
      developmentComplete: new Date("2024-10-15"),
      testing: new Date("2024-11-05"),
      deployment: new Date("2024-11-15")
    },
    riskAssessment: {
      technical: 'MEDIUM',
      timeline: 'MEDIUM',
      budget: 'LOW',
      overall: 'GREEN'
    },
    estimatedHours: {
      design: 720,
      development: 4800,
      testing: 1200,
      deployment: 480,
      total: 7200
    },
    projectType: 'WEB_APP',
    features: [
      "Patient Records Management",
      "Appointment Scheduling",
      "Electronic Health Records",
      "Prescription Management",
      "Insurance Processing",
      "Billing System",
      "Telemedicine Integration",
      "Compliance Reporting",
      "Emergency Alerts",
      "Medical Image Viewer"
    ],
         qualityMetrics: {
       codeCoverage: 92,
       performanceScore: 85,
       securityScore: 96,
       maintainabilityIndex: 88
     }
   },
   
   {
     id: "proj-2024-005",
     name: "Blockchain Supply Chain Tracker",
     startDate: new Date("2024-05-15"),
     endDate: new Date("2024-12-20"),
     
     budget: {
       allocated: 500000,
       spent: 75000,
       currency: 'USD'
     },
     developers: {
       lead: "Alex Chen",
       frontend: ["Maya Patel", "Carlos Mendoza", "Aya Nakamura"],
       backend: ["Dmitri Volkov", "Fatima Al-Zahra", "Johan Svensson"],
       qa: ["Isabella Romano", "Wei Zhang"]
     },
     technologies: {
       frontend: ["Svelte", "Web3.js", "Ethers.js", "TailwindCSS"],
       backend: ["Rust", "Actix-web", "Solidity", "IPFS"],
       database: ["PostgreSQL", "IPFS", "OrbitDB"],
       cloud: ["AWS", "Ethereum", "Polygon", "Chainlink"]
     },
     clientInfo: {
       company: "GlobalTrade Solutions",
       contactPerson: "Roberto Silva",
       industry: "Logistics",
       region: 'LATAM'
     },
     milestones: {
       kickoff: new Date("2024-05-15"),
       designComplete: new Date("2024-07-01"),
       developmentComplete: new Date("2024-11-15"),
       testing: new Date("2024-12-10"),
       deployment: new Date("2024-12-20")
     },
     riskAssessment: {
       technical: 'HIGH',
       timeline: 'MEDIUM',
       budget: 'HIGH',
       overall: 'YELLOW'
     },
     estimatedHours: {
       design: 400,
       development: 2800,
       testing: 700,
       deployment: 250,
       total: 4150
     },
     projectType: 'WEB_APP',
     features: [
       "Smart Contract Integration",
       "Product Provenance Tracking",
       "Digital Certificates",
       "Multi-party Verification",
       "QR Code Scanner",
       "Decentralized Storage",
       "Automated Compliance",
       "Real-time Notifications",
       "Analytics Dashboard"
     ],
     qualityMetrics: {
       codeCoverage: 83,
       performanceScore: 75,
       securityScore: 94,
       maintainabilityIndex: 71
     }
   },
   
   {
     id: "proj-2024-006",
     name: "AI-Powered Learning Platform",
     startDate: new Date("2024-06-01"),
     endDate: new Date("2025-01-31"),
     
     budget: {
       allocated: 350000,
       spent: 45000,
       currency: 'EUR'
     },
     developers: {
       lead: "Dr. Ananya Sharma",
       frontend: ["Liam O'Brien", "Yuki Sato", "Leila Mansouri"],
       backend: ["Gustav Larsson", "Chiara Benedetti", "Raj Gupta"],
       qa: ["Fatou Diallo", "Tomasz Kowalski"]
     },
     technologies: {
       frontend: ["Next.js", "React", "Framer Motion", "Chakra UI"],
       backend: ["Python", "Django", "TensorFlow", "scikit-learn"],
       database: ["PostgreSQL", "Elasticsearch", "Neo4j"],
       cloud: ["Google Cloud", "Cloud AI Platform", "Firebase", "Cloud Storage"]
     },
     clientInfo: {
       company: "EduTech Innovations",
       contactPerson: "Marie Dubois",
       industry: "Education",
       region: 'EU'
     },
     milestones: {
       kickoff: new Date("2024-06-01"),
       designComplete: new Date("2024-07-31"),
       developmentComplete: new Date("2024-12-31"),
       testing: new Date("2025-01-20"),
       deployment: new Date("2025-01-31")
     },
     riskAssessment: {
       technical: 'MEDIUM',
       timeline: 'LOW',
       budget: 'LOW',
       overall: 'GREEN'
     },
     estimatedHours: {
       design: 520,
       development: 2600,
       testing: 650,
       deployment: 180,
       total: 3950
     },
     projectType: 'WEB_APP',
     features: [
       "Adaptive Learning Algorithms",
       "Progress Tracking",
       "Interactive Assessments",
       "Personalized Content",
       "Virtual Classroom",
       "AI Tutoring System",
       "Learning Analytics",
       "Gamification Elements",
       "Multi-language Support",
       "Accessibility Features"
     ],
     qualityMetrics: {
       codeCoverage: 89,
       performanceScore: 82,
       securityScore: 87,
       maintainabilityIndex: 85
     }
  }
];

// 按不同字段分组的示例用法
export const CustomProjectExamples = {
  // 按客户地区分组
  byRegion: () => CustomProjectTimelineExample,
  
  // 按项目类型分组  
  byProjectType: () => CustomProjectTimelineExample,
  
  // 按风险等级分组
  byRiskLevel: () => CustomProjectTimelineExample,
  
  // 按客户行业分组
  byIndustry: () => CustomProjectTimelineExample,
  
  // 按开发团队负责人分组
  byTeamLead: () => CustomProjectTimelineExample
}; 