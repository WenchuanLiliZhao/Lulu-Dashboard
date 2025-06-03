import type { IssueShape, IssueSortShape } from "./Shapes";

export const Example_Math: IssueShape[] = [
  {
    id: "MATH001",
    name: "Interactive Calculus Workshop",
    status: "In Progress",
    description: "Develop and implement an interactive workshop series for advanced calculus concepts using real-world applications",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2029-06-30"),
    progress: 45
  },
  {
    id: "MATH002",
    name: "Algebra Fundamentals Program",
    status: "Planning",
    description: "Create a comprehensive program to strengthen basic algebra skills for high school students",
    startDate: new Date("2024-04-15"),
    endDate: new Date("2024-08-15"),
    progress: 20
  },
  {
    id: "MATH003",
    name: "Statistics for Data Science",
    status: "Not Started",
    description: "Design a specialized course bridging traditional statistics with modern data science applications",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-12-31"),
    progress: 0
  },
  {
    id: "MATH004",
    name: "Geometry Visualization Lab",
    status: "In Progress",
    description: "Establish a digital lab for 3D geometry visualization and interactive learning",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-07-31"),
    progress: 60
  },
  {
    id: "MATH005",
    name: "Math Olympiad Training",
    status: "Active",
    description: "Develop and implement an intensive training program for mathematics competition preparation",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    progress: 75
  },
  {
    id: "MATH006",
    name: "Applied Mathematics Workshop",
    status: "Planning",
    description: "Create workshops focusing on practical applications of mathematics in engineering and science",
    startDate: new Date("2029-06-01"),
    endDate: new Date("2024-11-30"),
    progress: 15
  },
  {
    id: "MATH007",
    name: "Mathematics Learning Center",
    status: "In Progress",
    description: "Establish a dedicated center for personalized mathematics tutoring and support",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-09-15"),
    progress: 40
  },
  {
    id: "MATH008",
    name: "Financial Mathematics Course",
    status: "Not Started",
    description: "Develop a specialized course covering financial mathematics and quantitative analysis",
    startDate: new Date("2024-08-02"),
    endDate: new Date("2024-12-31"),
    progress: 0
  },
  {
    id: "MATH009",
    name: "Mathematics Teaching Certification",
    status: "Active",
    description: "Create a certification program for mathematics educators focusing on modern teaching methodologies",
    startDate: new Date("2023-12-30"),
    endDate: new Date("2024-07-01"),
    progress: 55
  },
  {
    id: "MATH010",
    name: "Mathematics Research Symposium",
    status: "Planning",
    description: "Organize an annual symposium for mathematics educators to share research and best practices",
    startDate: new Date("2024-05-15"),
    endDate: new Date("2024-10-15"),
    progress: 25
  }
];

export const Example_Physics: IssueShape[] = [
  {
    id: "PHYS001",
    name: "Quantum Mechanics Laboratory",
    status: "In Progress",
    description: "Establish a modern quantum mechanics lab with advanced equipment for undergraduate experiments",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-08-30"),
    progress: 65
  },
  {
    id: "PHYS002",
    name: "Thermodynamics Simulation Platform",
    status: "Planning",
    description: "Develop interactive computer simulations for thermodynamics concepts and heat transfer analysis",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-10-31"),
    progress: 30
  },
  {
    id: "PHYS003",
    name: "Optics and Photonics Workshop",
    status: "Active",
    description: "Create hands-on workshops covering laser physics, fiber optics, and modern photonics applications",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-15"),
    progress: 80
  },
  {
    id: "PHYS004",
    name: "Electromagnetic Field Visualization",
    status: "Not Started",
    description: "Build interactive tools for visualizing electromagnetic fields and wave propagation",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-11-30"),
    progress: 0
  },
  {
    id: "PHYS005",
    name: "Solid State Physics Research",
    status: "In Progress",
    description: "Conduct research on semiconductor materials and their applications in modern electronics",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2025-03-01"),
    progress: 42
  },
  {
    id: "PHYS006",
    name: "Astrophysics Data Analysis Center",
    status: "Planning",
    description: "Establish a center for processing and analyzing astronomical data from space telescopes",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2025-01-15"),
    progress: 18
  },
  {
    id: "PHYS007",
    name: "Nuclear Physics Safety Training",
    status: "Active",
    description: "Develop comprehensive safety training programs for nuclear physics laboratory work",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-05-31"),
    progress: 90
  },
  {
    id: "PHYS008",
    name: "Particle Physics Detector Upgrade",
    status: "In Progress",
    description: "Upgrade existing particle detection equipment with modern sensor technology",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-09-30"),
    progress: 55
  },
  {
    id: "PHYS009",
    name: "Biophysics Collaboration Program",
    status: "Planning",
    description: "Establish interdisciplinary collaboration between physics and biology departments",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-12-31"),
    progress: 25
  },
  {
    id: "PHYS010",
    name: "Physics Outreach Initiative",
    status: "Active",
    description: "Create public outreach programs to promote physics education in local communities",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    progress: 70
  }
];

export const Example_TimelineItems: IssueSortShape = {
  meta: {
    sortBy: "startDate"
  },
  data: [
    {
      groupTitle: "Math",
      groupItems: Example_Math
    },
    {
      groupTitle: "Physics",
      groupItems: Example_Physics
    }
  ]
}