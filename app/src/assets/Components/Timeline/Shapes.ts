export interface IssueShape {
  id: string;
  name: string;
  status: string;
  description: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  children?: IssueShape[];
  vision: string;
}

export const sortTimelineItemsByStartDate = (items: IssueShape[]): IssueShape[] => {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export interface IssueGroup {
  groupTitle: string;
  groupItems: IssueShape[];
}


export interface SortedIssueShape {
  meta: {
    sortBy: string;
  };

  data: IssueGroup[];
}

/**
 * 将 IssueShape 数组按指定字段分组，转换为 SortedIssueShape 格式
 * @param issues - 原始的 IssueShape 数组
 * @param sortBy - 分组字段，可以是 "status"、"vision" 或 "name"
 * @returns 分组后的 SortedIssueShape 对象
 */
export function groupIssuesByField(
  issues: IssueShape[], 
  sortBy: "status" | "vision" | "name"
): SortedIssueShape {
  // 使用 Map 来收集每个分组的项目
  const groupMap = new Map<string, IssueShape[]>();
  
  // 遍历所有项目，按照指定字段进行分组
  issues.forEach(issue => {
    const groupKey = issue[sortBy];
    
    if (!groupMap.has(groupKey)) {
      groupMap.set(groupKey, []);
    }
    
    groupMap.get(groupKey)!.push(issue);
  });
  
  // 将 Map 转换为 IssueGroup 数组，并按组标题排序
  const data: IssueGroup[] = Array.from(groupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b)) // 按组标题字母顺序排序
    .map(([title, items]) => ({
      groupTitle: title,
      groupItems: sortTimelineItemsByStartDate(items) // 组内按开始时间排序
    }));
  
  return {
    meta: {
      sortBy
    },
    data
  };
}

// Example goes here
export const Example_Issues: IssueShape[] = [
  {
    id: "1",
    name: "Interactive Calculus Workshop",
    status: "In Progress",
    description: "Develop and implement an interactive workshop series for advanced calculus concepts using real-world applications",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 50,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "Planning",
    description: "Create a cross-platform mobile application for task management with real-time synchronization",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 15,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "3",
    name: "Machine Learning Model Training",
    status: "Completed",
    description: "Train and deploy a neural network for image recognition with 95% accuracy",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    progress: 100,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "4",
    name: "Website Redesign Project",
    status: "In Progress",
    description: "Complete overhaul of company website with modern UI/UX principles and responsive design",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-30"),
    progress: 75,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "5",
    name: "Data Migration Initiative",
    status: "On Hold",
    description: "Migrate legacy database systems to cloud-based infrastructure with zero downtime",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-31"),
    progress: 25,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "6",
    name: "Customer Support Automation",
    status: "In Progress",
    description: "Implement AI-powered chatbot to handle 80% of customer inquiries automatically",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    progress: 60,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "7",
    name: "Blockchain Integration",
    status: "Planning",
    description: "Integrate blockchain technology for secure transaction processing and data integrity",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 5,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "8",
    name: "IoT Sensor Network",
    status: "In Progress",
    description: "Deploy Internet of Things sensors for real-time environmental monitoring",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-08-31"),
    progress: 40,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "9",
    name: "Cybersecurity Audit",
    status: "Completed",
    description: "Comprehensive security assessment and vulnerability testing of all systems",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    progress: 100,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "10",
    name: "Virtual Reality Training Platform",
    status: "In Progress",
    description: "Develop immersive VR training modules for employee skill development",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-31"),
    progress: 35,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "11",
    name: "API Gateway Implementation",
    status: "Testing",
    description: "Build and deploy centralized API gateway for microservices architecture",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-30"),
    progress: 85,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "12",
    name: "Cloud Migration Strategy",
    status: "Planning",
    description: "Develop comprehensive strategy for migrating on-premise infrastructure to AWS",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-31"),
    progress: 10,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "13",
    name: "User Authentication System",
    status: "In Progress",
    description: "Implement multi-factor authentication with biometric support",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    progress: 65,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "14",
    name: "Analytics Dashboard",
    status: "Completed",
    description: "Create real-time analytics dashboard with interactive visualizations",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    progress: 100,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "15",
    name: "Automated Testing Framework",
    status: "In Progress",
    description: "Develop comprehensive automated testing suite for continuous integration",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
    progress: 70,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "16",
    name: "Digital Twin Development",
    status: "Research",
    description: "Create digital twin models for predictive maintenance and optimization",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
    progress: 5,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "17",
    name: "Supply Chain Optimization",
    status: "In Progress",
    description: "Implement AI-driven supply chain management for cost reduction and efficiency",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
    progress: 45,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "18",
    name: "Microservices Architecture",
    status: "Planning",
    description: "Decompose monolithic application into scalable microservices",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-31"),
    progress: 15,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "19",
    name: "Edge Computing Infrastructure",
    status: "In Progress",
    description: "Deploy edge computing nodes for reduced latency and improved performance",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-31"),
    progress: 30,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "20",
    name: "Quantum Computing Research",
    status: "Research",
    description: "Explore quantum computing applications for complex optimization problems",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-30"),
    progress: 8,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "21",
    name: "Green Energy Management",
    status: "In Progress",
    description: "Implement smart energy management system for renewable energy optimization",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-11-30"),
    progress: 55,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "22",
    name: "Healthcare Data Platform",
    status: "Testing",
    description: "Develop HIPAA-compliant healthcare data analytics platform",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2025-12-31"),
    progress: 90,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "23",
    name: "Augmented Reality Interface",
    status: "In Progress",
    description: "Create AR interface for industrial maintenance and training applications",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 25,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "24",
    name: "Natural Language Processing",
    status: "Completed",
    description: "Deploy NLP system for automated document processing and analysis",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    progress: 100,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "25",
    name: "Robotic Process Automation",
    status: "In Progress",
    description: "Automate repetitive business processes using RPA technologies",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    progress: 50,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "26",
    name: "5G Network Integration",
    status: "Planning",
    description: "Integrate 5G connectivity for ultra-low latency applications",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-30"),
    progress: 12,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "27",
    name: "Digital Identity Platform",
    status: "In Progress",
    description: "Build decentralized identity management system using blockchain",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-31"),
    progress: 40,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "28",
    name: "Computer Vision System",
    status: "Testing",
    description: "Implement computer vision for quality control in manufacturing",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    progress: 80,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "29",
    name: "Smart City Infrastructure",
    status: "Research",
    description: "Design IoT-enabled smart city infrastructure for traffic and utilities",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    progress: 3,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "30",
    name: "Predictive Analytics Engine",
    status: "In Progress",
    description: "Develop machine learning models for business forecasting and trend analysis",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-08-31"),
    progress: 60,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "31",
    name: "Voice Recognition System",
    status: "Completed",
    description: "Implement multi-language voice recognition for accessibility features",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    progress: 100,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "32",
    name: "Distributed Database System",
    status: "In Progress",
    description: "Deploy distributed database with automatic sharding and replication",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-31"),
    progress: 35,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "33",
    name: "Drone Delivery Network",
    status: "Planning",
    description: "Establish autonomous drone delivery system for last-mile logistics",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-30"),
    progress: 8,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "34",
    name: "Facial Recognition Security",
    status: "Testing",
    description: "Deploy facial recognition system for secure facility access control",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-31"),
    progress: 85,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "35",
    name: "Environmental Monitoring",
    status: "In Progress",
    description: "Create comprehensive environmental monitoring system using satellite data",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    progress: 45,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "36",
    name: "Automated Code Generation",
    status: "Research",
    description: "Develop AI system for automated code generation from natural language",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    progress: 15,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "37",
    name: "Smart Grid Integration",
    status: "In Progress",
    description: "Integrate renewable energy sources into intelligent power grid system",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    progress: 25,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "38",
    name: "Biometric Payment System",
    status: "Planning",
    description: "Implement biometric-based payment system for enhanced security",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-30"),
    progress: 10,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "39",
    name: "Real-time Translation",
    status: "In Progress",
    description: "Deploy real-time language translation system for global communication",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    progress: 70,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "40",
    name: "Autonomous Vehicle Platform",
    status: "Research",
    description: "Develop autonomous vehicle control system with advanced AI algorithms",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-31"),
    progress: 5,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "41",
    name: "Personalized Learning AI",
    status: "In Progress",
    description: "Create AI-powered personalized learning platform for adaptive education",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-31"),
    progress: 55,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "42",
    name: "Digital Wallet Integration",
    status: "Testing",
    description: "Integrate multiple digital payment methods into unified wallet system",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-30"),
    progress: 90,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "43",
    name: "Smart Manufacturing",
    status: "In Progress",
    description: "Implement Industry 4.0 technologies for intelligent manufacturing processes",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
    progress: 30,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "44",
    name: "Neural Interface Development",
    status: "Research",
    description: "Research brain-computer interfaces for assistive technologies",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-30"),
    progress: 2,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "45",
    name: "Climate Change Modeling",
    status: "In Progress",
    description: "Develop advanced climate models using supercomputing and AI",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2025-12-31"),
    progress: 65,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "46",
    name: "Holographic Display System",
    status: "Planning",
    description: "Create holographic display technology for immersive data visualization",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 7,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "47",
    name: "Space Communication Network",
    status: "Research",
    description: "Develop satellite-based communication network for global connectivity",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    progress: 1,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "48",
    name: "Gene Therapy Database",
    status: "In Progress",
    description: "Build secure database for gene therapy research and clinical trials",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    progress: 40,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "49",
    name: "Emotion Recognition AI",
    status: "Testing",
    description: "Develop AI system for real-time emotion recognition and response",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-30"),
    progress: 75,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "50",
    name: "Underwater Exploration Robot",
    status: "In Progress",
    description: "Design autonomous underwater vehicle for deep-sea exploration and research",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-31"),
    progress: 20,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "51",
    name: "Precision Agriculture Platform",
    status: "In Progress",
    description: "Implement IoT and AI for precision agriculture and crop optimization",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    progress: 50,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "52",
    name: "Quantum Encryption System",
    status: "Research",
    description: "Develop quantum-resistant encryption for future-proof security",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    progress: 5,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "53",
    name: "Virtual Collaboration Space",
    status: "Testing",
    description: "Create immersive virtual reality workspace for remote collaboration",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-08-31"),
    progress: 80,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "54",
    name: "AI Ethics Framework",
    status: "In Progress",
    description: "Develop comprehensive ethical guidelines and governance for AI systems",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    progress: 45,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "55",
    name: "Nano-medicine Platform",
    status: "Research",
    description: "Research nanotechnology applications for targeted drug delivery",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-31"),
    progress: 3,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "56",
    name: "Smart Home Ecosystem",
    status: "In Progress",
    description: "Integrate IoT devices into comprehensive smart home management system",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-30"),
    progress: 60,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "57",
    name: "Renewable Energy Storage",
    status: "Planning",
    description: "Develop advanced battery technology for renewable energy storage",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-31"),
    progress: 12,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "58",
    name: "Telepresence Robot Network",
    status: "In Progress",
    description: "Deploy telepresence robots for remote healthcare and education",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    progress: 35,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "59",
    name: "Synthetic Biology Lab",
    status: "Research",
    description: "Establish synthetic biology research facility for engineered organisms",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    progress: 8,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "60",
    name: "Haptic Feedback System",
    status: "Testing",
    description: "Develop advanced haptic feedback for virtual and augmented reality",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    progress: 85,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "61",
    name: "Digital Twin Factory",
    status: "In Progress",
    description: "Create digital twin of manufacturing facility for optimization",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-30"),
    progress: 25,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "62",
    name: "Brain Organoid Research",
    status: "Research",
    description: "Develop brain organoids for neurological disease research",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
    progress: 10,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "63",
    name: "Swarm Robotics Platform",
    status: "In Progress",
    description: "Develop coordinated swarm robotics for search and rescue operations",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
    progress: 40,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "64",
    name: "Atmospheric Processor",
    status: "Planning",
    description: "Design atmospheric processing system for carbon capture and conversion",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-31"),
    progress: 5,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "65",
    name: "Personalized Medicine AI",
    status: "In Progress",
    description: "Develop AI for personalized treatment recommendations based on genetics",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-31"),
    progress: 55,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "66",
    name: "Fusion Energy Reactor",
    status: "Research",
    description: "Research compact fusion reactor for clean energy generation",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-30"),
    progress: 2,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "67",
    name: "Memory Enhancement Device",
    status: "Research",
    description: "Develop neural interface for memory enhancement and cognitive support",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
    progress: 4,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "68",
    name: "Modular Space Station",
    status: "Planning",
    description: "Design modular space station for manufacturing and research",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-30"),
    progress: 1,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "69",
    name: "Automated Drug Discovery",
    status: "In Progress",
    description: "Implement AI-driven drug discovery platform for accelerated research",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2025-12-31"),
    progress: 65,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "70",
    name: "Vertical Farm Network",
    status: "In Progress",
    description: "Establish network of vertical farms for sustainable urban agriculture",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 30,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "71",
    name: "Gesture Control Interface",
    status: "Testing",
    description: "Develop gesture-based control interface for hands-free computing",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    progress: 90,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "72",
    name: "Biodegradable Electronics",
    status: "Research",
    description: "Research biodegradable electronic components for sustainable technology",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    progress: 6,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "73",
    name: "Virtual Patient Simulator",
    status: "In Progress",
    description: "Create AI-powered virtual patients for medical training and education",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-30"),
    progress: 50,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "74",
    name: "Magnetic Levitation Transport",
    status: "Planning",
    description: "Design magnetic levitation transportation system for urban mobility",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-31"),
    progress: 3,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "75",
    name: "AI Art Generation Platform",
    status: "Completed",
    description: "Deploy AI platform for generating original artwork and creative content",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    progress: 100,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "76",
    name: "Robotic Surgery System",
    status: "Testing",
    description: "Develop precision robotic surgery system with haptic feedback",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    progress: 75,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "77",
    name: "Programmable Matter Research",
    status: "Research",
    description: "Research programmable matter for self-assembling structures",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-08-31"),
    progress: 1,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "78",
    name: "Waste-to-Energy Converter",
    status: "In Progress",
    description: "Develop efficient waste-to-energy conversion system for cities",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-09-30"),
    progress: 35,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "79",
    name: "Digital Currency Exchange",
    status: "In Progress",
    description: "Build secure digital currency exchange with advanced trading features",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-31"),
    progress: 70,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "80",
    name: "Underwater Data Center",
    status: "Planning",
    description: "Design underwater data center for improved cooling and sustainability",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-11-30"),
    progress: 8,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "81",
    name: "AI Composer Platform",
    status: "Testing",
    description: "Create AI system for composing original music in various styles",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-31"),
    progress: 85,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "82",
    name: "Smart Contact Lenses",
    status: "Research",
    description: "Develop smart contact lenses with augmented reality displays",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    progress: 5,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "83",
    name: "Automated Recycling Plant",
    status: "In Progress",
    description: "Build fully automated recycling facility using AI and robotics",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    progress: 20,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "84",
    name: "Bioprinting Organ Factory",
    status: "Research",
    description: "Establish bioprinting facility for creating transplantable organs",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    progress: 2,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "85",
    name: "Anti-Gravity Research Lab",
    status: "Research",
    description: "Investigate anti-gravity technologies for transportation and construction",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-30"),
    progress: 1,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "86",
    name: "Mind-Reading Interface",
    status: "Research",
    description: "Develop non-invasive brain interface for thought-to-text communication",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-31"),
    progress: 12,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "87",
    name: "Solar Panel Efficiency Boost",
    status: "In Progress",
    description: "Improve solar panel efficiency using perovskite and quantum dot technology",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
    progress: 45,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "88",
    name: "Invisibility Cloak Development",
    status: "Research",
    description: "Research metamaterials for optical invisibility applications",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-31"),
    progress: 7,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "89",
    name: "Time Synchronization Network",
    status: "Testing",
    description: "Deploy ultra-precise time synchronization for global financial systems",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-08-31"),
    progress: 80,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "90",
    name: "Asteroid Mining Platform",
    status: "Planning",
    description: "Design autonomous platform for asteroid mining and resource extraction",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-30"),
    progress: 2,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "91",
    name: "Consciousness Transfer Research",
    status: "Research",
    description: "Investigate digital consciousness transfer and preservation technologies",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
    progress: 1,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "92",
    name: "Weather Control System",
    status: "Research",
    description: "Research atmospheric manipulation for weather modification and control",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-11-30"),
    progress: 3,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "93",
    name: "Liquid Metal Computing",
    status: "Research",
    description: "Develop programmable liquid metal for flexible computing applications",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2025-12-31"),
    progress: 4,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "94",
    name: "Teleportation Research Lab",
    status: "Research",
    description: "Investigate quantum teleportation for information and matter transfer",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    progress: 1,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "95",
    name: "Self-Healing Materials",
    status: "In Progress",
    description: "Develop self-repairing materials for construction and manufacturing",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-29"),
    progress: 25,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "96",
    name: "Planetary Defense System",
    status: "Planning",
    description: "Design planetary defense system against asteroid and comet impacts",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    progress: 5,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "97",
    name: "Artificial Photosynthesis",
    status: "Research",
    description: "Develop artificial photosynthesis for carbon dioxide conversion",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-30"),
    progress: 15,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "98",
    name: "Metamaterial Antenna Array",
    status: "In Progress",
    description: "Build metamaterial antenna array for advanced communication systems",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-31"),
    progress: 60,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "99",
    name: "Gravitational Wave Detector",
    status: "Testing",
    description: "Deploy next-generation gravitational wave detection equipment",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    progress: 88,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "100",
    name: "Universal Translator Device",
    status: "In Progress",
    description: "Create universal real-time translation device for all human languages",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-31"),
    progress: 72,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "101",
    name: "Quantum Computing Cloud Platform",
    status: "Planning",
    description: "Develop cloud-based quantum computing platform for research and commercial applications",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    progress: 10,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "102",
    name: "Smart City Traffic Management",
    status: "In Progress",
    description: "Implement AI-powered traffic management system for urban areas",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 45,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "103",
    name: "Medical Imaging AI",
    status: "Testing",
    description: "Develop AI system for automated medical image analysis and diagnosis",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    progress: 85,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "104",
    name: "Cybersecurity Framework",
    status: "In Progress",
    description: "Create comprehensive cybersecurity framework for enterprise protection",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    progress: 60,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "105",
    name: "Mobile Payment System",
    status: "Planning",
    description: "Develop secure mobile payment system with biometric authentication",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-30"),
    progress: 20,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "106",
    name: "Renewable Energy Grid",
    status: "In Progress",
    description: "Implement smart grid system for renewable energy distribution",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    progress: 55,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "107",
    name: "Virtual Reality Education",
    status: "Testing",
    description: "Create immersive VR learning platform for remote education",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 75,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "108",
    name: "Blockchain Supply Chain",
    status: "In Progress",
    description: "Implement blockchain-based supply chain tracking system",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-09-30"),
    progress: 40,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "109",
    name: "AI Healthcare Assistant",
    status: "Planning",
    description: "Develop AI-powered healthcare assistant for patient monitoring",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-10-31"),
    progress: 15,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "110",
    name: "Smart Home Security",
    status: "Testing",
    description: "Create comprehensive smart home security system",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-11-30"),
    progress: 80,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "111",
    name: "Autonomous Delivery Network",
    status: "In Progress",
    description: "Implement autonomous delivery system for urban areas",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    progress: 50,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "112",
    name: "Environmental Monitoring",
    status: "Planning",
    description: "Develop comprehensive environmental monitoring system",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-31"),
    progress: 25,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "113",
    name: "AI Content Generation",
    status: "Testing",
    description: "Create AI system for automated content generation",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    progress: 90,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "114",
    name: "Digital Identity System",
    status: "In Progress",
    description: "Implement secure digital identity management system",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    progress: 65,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "115",
    name: "Smart Agriculture Platform",
    status: "Planning",
    description: "Develop IoT-based smart agriculture monitoring system",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
    progress: 30,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "116",
    name: "Healthcare Analytics",
    status: "Testing",
    description: "Create healthcare data analytics platform",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-05-31"),
    progress: 85,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "117",
    name: "Mobile Banking App",
    status: "In Progress",
    description: "Develop secure mobile banking application",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    progress: 55,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "118",
    name: "Smart City Lighting",
    status: "Planning",
    description: "Implement energy-efficient smart city lighting system",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-31"),
    progress: 20,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "119",
    name: "AI Customer Service",
    status: "Testing",
    description: "Create AI-powered customer service platform",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-31"),
    progress: 75,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "120",
    name: "Cybersecurity Training",
    status: "In Progress",
    description: "Develop comprehensive cybersecurity training program",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-09-30"),
    progress: 45,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "121",
    name: "Smart Transportation System",
    status: "Planning",
    description: "Implement intelligent transportation management system",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    progress: 15,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "122",
    name: "Renewable Energy Storage",
    status: "In Progress",
    description: "Develop advanced energy storage solutions",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 50,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "123",
    name: "Medical Research Platform",
    status: "Testing",
    description: "Create collaborative medical research platform",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    progress: 80,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "124",
    name: "Digital Asset Security",
    status: "In Progress",
    description: "Implement secure digital asset management system",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    progress: 60,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "125",
    name: "Smart Office Platform",
    status: "Planning",
    description: "Develop intelligent office management system",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-30"),
    progress: 25,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "126",
    name: "Climate Monitoring System",
    status: "In Progress",
    description: "Create comprehensive climate monitoring platform",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    progress: 55,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "127",
    name: "AI Research Assistant",
    status: "Testing",
    description: "Develop AI-powered research assistance tool",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 85,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "128",
    name: "Secure Communication",
    status: "In Progress",
    description: "Implement encrypted communication platform",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-09-30"),
    progress: 40,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "129",
    name: "Smart Retail System",
    status: "Planning",
    description: "Create intelligent retail management platform",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-10-31"),
    progress: 20,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "130",
    name: "Waste Management System",
    status: "Testing",
    description: "Develop smart waste management solution",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-11-30"),
    progress: 75,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "131",
    name: "Healthcare Monitoring",
    status: "In Progress",
    description: "Create remote healthcare monitoring system",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    progress: 45,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "132",
    name: "Smart Manufacturing",
    status: "Planning",
    description: "Implement intelligent manufacturing system",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-31"),
    progress: 15,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "133",
    name: "Environmental Analytics",
    status: "Testing",
    description: "Develop environmental data analysis platform",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    progress: 80,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "134",
    name: "AI Security System",
    status: "In Progress",
    description: "Create AI-powered security monitoring system",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    progress: 50,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "135",
    name: "Smart Education Platform",
    status: "Planning",
    description: "Develop intelligent education management system",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
    progress: 25,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "136",
    name: "Renewable Energy Analytics",
    status: "Testing",
    description: "Create renewable energy data analysis platform",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-05-31"),
    progress: 85,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "137",
    name: "Medical AI Assistant",
    status: "In Progress",
    description: "Develop AI-powered medical assistance system",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    progress: 55,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "138",
    name: "Smart City Analytics",
    status: "Planning",
    description: "Create smart city data analysis platform",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-31"),
    progress: 20,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "139",
    name: "Cybersecurity Analytics",
    status: "Testing",
    description: "Develop cybersecurity data analysis system",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-31"),
    progress: 75,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "140",
    name: "Smart Home Analytics",
    status: "In Progress",
    description: "Create smart home data analysis platform",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-09-30"),
    progress: 40,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "141",
    name: "Environmental Protection",
    status: "Planning",
    description: "Develop environmental protection monitoring system",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    progress: 15,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "142",
    name: "AI Research Platform",
    status: "Testing",
    description: "Create AI research collaboration platform",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 80,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "143",
    name: "Healthcare Security",
    status: "In Progress",
    description: "Implement healthcare data security system",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    progress: 50,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "144",
    name: "Smart Transportation Analytics",
    status: "Planning",
    description: "Develop transportation data analysis platform",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    progress: 25,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "145",
    name: "Renewable Energy Monitoring",
    status: "Testing",
    description: "Create renewable energy monitoring system",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-30"),
    progress: 85,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "146",
    name: "Medical Research Security",
    status: "In Progress",
    description: "Implement medical research data security system",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    progress: 55,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "147",
    name: "Smart City Security",
    status: "Planning",
    description: "Develop smart city data analysis platform",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 20,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "148",
    name: "AI Healthcare Analytics",
    status: "Testing",
    description: "Create AI-powered healthcare analytics platform",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-09-30"),
    progress: 75,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "149",
    name: "Smart Home Security",
    status: "In Progress",
    description: "Create smart home security monitoring system",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-10-31"),
    progress: 40,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "150",
    name: "Environmental Analytics",
    status: "Planning",
    description: "Develop environmental data analysis platform",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-11-30"),
    progress: 15,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "151",
    name: "AI Research Analytics",
    status: "Testing",
    description: "Create AI research data analysis platform",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    progress: 80,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "152",
    name: "Smart Transportation Security",
    status: "In Progress",
    description: "Implement transportation security monitoring system",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-31"),
    progress: 50,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "153",
    name: "Renewable Energy Security",
    status: "Planning",
    description: "Develop renewable energy security system",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    progress: 25,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "154",
    name: "Medical AI Security",
    status: "Testing",
    description: "Create medical AI security monitoring system",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    progress: 85,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "155",
    name: "Smart City Analytics",
    status: "In Progress",
    description: "Develop smart city data analysis platform",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
    progress: 55,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "156",
    name: "Healthcare Analytics",
    status: "Planning",
    description: "Create healthcare data analysis platform",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-05-31"),
    progress: 20,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "157",
    name: "Smart Home Analytics",
    status: "Testing",
    description: "Develop smart home data analysis platform",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    progress: 75,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "158",
    name: "Environmental Security",
    status: "In Progress",
    description: "Implement environmental security monitoring system",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-31"),
    progress: 40,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "159",
    name: "AI Research Analytics",
    status: "Planning",
    description: "Create AI research security monitoring system",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-31"),
    progress: 15,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "160",
    name: "Smart Transportation Analytics",
    status: "Testing",
    description: "Develop transportation data analysis platform",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-09-30"),
    progress: 80,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "161",
    name: "Renewable Energy Analytics",
    status: "In Progress",
    description: "Create renewable energy data analysis platform",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-10-31"),
    progress: 50,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "162",
    name: "Medical Analytics",
    status: "Planning",
    description: "Develop medical data analysis platform",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-11-30"),
    progress: 25,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "163",
    name: "Smart City Security",
    status: "Testing",
    description: "Create smart city security monitoring system",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-12-31"),
    progress: 85,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "164",
    name: "Healthcare Security",
    status: "In Progress",
    description: "Implement healthcare security monitoring system",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    progress: 55,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "165",
    name: "Smart Home Analytics",
    status: "Planning",
    description: "Develop smart home data analysis platform",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 20,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "166",
    name: "Environmental Analytics",
    status: "Testing",
    description: "Create environmental data analysis platform",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    progress: 75,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "167",
    name: "AI Research Analytics",
    status: "In Progress",
    description: "Develop AI research data analysis platform",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    progress: 40,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "168",
    name: "Smart Transportation Security",
    status: "Planning",
    description: "Create transportation security monitoring system",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-30"),
    progress: 15,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "169",
    name: "Renewable Energy Security",
    status: "Testing",
    description: "Implement renewable energy security monitoring system",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    progress: 80,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "170",
    name: "Medical Security",
    status: "In Progress",
    description: "Develop medical security monitoring system",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 50,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "171",
    name: "Smart City Analytics",
    status: "Planning",
    description: "Create smart city data analysis platform",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-09-30"),
    progress: 25,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "172",
    name: "Healthcare Analytics",
    status: "Testing",
    description: "Develop healthcare data analysis platform",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-10-31"),
    progress: 85,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "173",
    name: "Smart Home Security",
    status: "In Progress",
    description: "Create smart home security monitoring system",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-11-30"),
    progress: 55,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "174",
    name: "Environmental Security",
    status: "Planning",
    description: "Implement environmental security monitoring system",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    progress: 20,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "175",
    name: "AI Research Security",
    status: "Testing",
    description: "Develop AI research security monitoring system",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-31"),
    progress: 75,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "176",
    name: "Smart Transportation Analytics",
    status: "In Progress",
    description: "Create transportation data analysis platform",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    progress: 40,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "177",
    name: "Renewable Energy Analytics",
    status: "Planning",
    description: "Develop renewable energy data analysis platform",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    progress: 15,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "178",
    name: "Medical Analytics",
    status: "Testing",
    description: "Create medical data analysis platform",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-30"),
    progress: 80,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "179",
    name: "Smart City Security",
    status: "In Progress",
    description: "Implement smart city security monitoring system",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-05-31"),
    progress: 50,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "180",
    name: "Healthcare Security",
    status: "Planning",
    description: "Develop healthcare security monitoring system",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-06-30"),
    progress: 25,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "181",
    name: "Smart Home Analytics",
    status: "Testing",
    description: "Create smart home data analysis platform",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-31"),
    progress: 85,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "182",
    name: "Environmental Analytics",
    status: "In Progress",
    description: "Develop environmental data analysis platform",
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-08-31"),
    progress: 55,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "183",
    name: "AI Research Analytics",
    status: "Planning",
    description: "Create AI research data analysis platform",
    startDate: new Date("2025-08-01"),
    endDate: new Date("2025-09-30"),
    progress: 20,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "184",
    name: "Smart Transportation Security",
    status: "Testing",
    description: "Implement transportation security monitoring system",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-10-31"),
    progress: 75,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "185",
    name: "Renewable Energy Security",
    status: "In Progress",
    description: "Develop renewable energy security monitoring system",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-11-30"),
    progress: 40,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "186",
    name: "Medical Security",
    status: "Planning",
    description: "Create medical security monitoring system",
    startDate: new Date("2025-11-01"),
    endDate: new Date("2025-12-31"),
    progress: 15,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "187",
    name: "Smart City Analytics",
    status: "Testing",
    description: "Develop smart city data analysis platform",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-02-29"),
    progress: 80,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "188",
    name: "Healthcare Analytics",
    status: "In Progress",
    description: "Create healthcare data analysis platform",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    progress: 50,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "189",
    name: "Smart Home Security",
    status: "Planning",
    description: "Implement smart home security monitoring system",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-04-30"),
    progress: 25,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "190",
    name: "Environmental Security",
    status: "Testing",
    description: "Develop environmental security monitoring system",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-31"),
    progress: 85,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "191",
    name: "AI Research Security",
    status: "In Progress",
    description: "Create AI research security monitoring system",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-06-30"),
    progress: 55,
    vision: "To ensure robust protection against evolving cyber threats."
  },
  {
    id: "192",
    name: "Smart Transportation Analytics",
    status: "Planning",
    description: "Develop transportation data analysis platform",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-07-31"),
    progress: 20,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "193",
    name: "Renewable Energy Analytics",
    status: "Testing",
    description: "Create renewable energy data analysis platform",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-08-31"),
    progress: 75,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "194",
    name: "Medical Analytics",
    status: "In Progress",
    description: "Implement medical data analysis platform",
    startDate: new Date("2024-08-01"),
    endDate: new Date("2024-09-30"),
    progress: 40,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "195",
    name: "Smart City Analytics",
    status: "Planning",
    description: "Develop smart city data analysis platform",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-10-31"),
    progress: 15,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "196",
    name: "Healthcare Analytics",
    status: "Testing",
    description: "Create healthcare data analysis platform",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-11-30"),
    progress: 80,
    vision: "To improve patient outcomes through secure and insightful data analysis."
  },
  {
    id: "197",
    name: "Smart Home Analytics",
    status: "In Progress",
    description: "Implement smart home data analysis platform",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2024-12-31"),
    progress: 50,
    vision: "To revolutionize personal productivity through intuitive mobile solutions."
  },
  {
    id: "198",
    name: "Environmental Analytics",
    status: "Planning",
    description: "Develop environmental data analysis platform",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2025-01-31"),
    progress: 25,
    vision: "To protect our planet through real-time environmental awareness and action."
  },
  {
    id: "199",
    name: "AI Research Analytics",
    status: "Testing",
    description: "Create AI research data analysis platform",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    progress: 85,
    vision: "To advance artificial intelligence capabilities in visual processing."
  },
  {
    id: "200",
    name: "Smart Transportation Security",
    status: "In Progress",
    description: "Implement transportation security monitoring system",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-31"),
    progress: 55,
    vision: "To ensure robust protection against evolving cyber threats."
  }
]