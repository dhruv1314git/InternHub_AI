/* InternHub AI - Enterprise Mock Dataset */

const InternHubData = {
  currentUser: {
    name: "Sophia Chen",
    email: "sophia.chen@internhub.ai",
    role: "student",
    track: "Full-Stack Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    mentor: "Dr. Sarah Jenkins",
    streakDays: 14,
    points: 2450,
    progress: 78,
    tasksCompleted: 12,
    totalTasks: 15,
    aiScore: 94,
    grade: "A+"
  },

  mentorUser: {
    name: "Dr. Sarah Jenkins",
    title: "Senior Staff Engineer & Mentor Lead",
    company: "Stripe / InternHub",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    activeInterns: 32,
    pendingReviews: 7,
    avgBatchScore: 88.4,
    atRiskCount: 2
  },

  interns: [
    {
      id: "INT-101",
      name: "Sophia Chen",
      email: "sophia.chen@university.edu",
      track: "Backend Engineering",
      status: "Active",
      riskLevel: "Low",
      completedTasks: 12,
      totalTasks: 15,
      aiScore: 94,
      lastActive: "10 mins ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      topStrength: "Async Operations",
      weakness: "API Documentation"
    },
    {
      id: "INT-102",
      name: "Marcus Vance",
      email: "marcus.v@tech.edu",
      track: "AI & ML Systems",
      status: "Active",
      riskLevel: "Low",
      completedTasks: 14,
      totalTasks: 15,
      aiScore: 96,
      lastActive: "1 hour ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      topStrength: "Model Optimization",
      weakness: "Unit Test Coverage"
    },
    {
      id: "INT-103",
      name: "Elena Rostova",
      email: "elena.r@stanford.edu",
      track: "Frontend & Design",
      status: "Struggling",
      riskLevel: "High",
      completedTasks: 7,
      totalTasks: 15,
      aiScore: 71,
      lastActive: "2 days ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      topStrength: "UI Component Styling",
      weakness: "State Management Bugs"
    },
    {
      id: "INT-104",
      name: "David Kim",
      email: "david.kim@mit.edu",
      track: "Cloud & DevOps",
      status: "Active",
      riskLevel: "Low",
      completedTasks: 11,
      totalTasks: 15,
      aiScore: 89,
      lastActive: "3 hours ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      topStrength: "Kubernetes Deployments",
      weakness: "Bash Script Error Handling"
    },
    {
      id: "INT-105",
      name: "Aaliyah Patel",
      email: "aaliyah.p@berkeley.edu",
      track: "Backend Engineering",
      status: "Struggling",
      riskLevel: "Medium",
      completedTasks: 8,
      totalTasks: 15,
      aiScore: 76,
      lastActive: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
      topStrength: "SQL Schema Design",
      weakness: "Database Connection Pooling"
    }
  ],

  tasks: [
    {
      id: "TASK-001",
      title: "Build High-Throughput Redis Cache Engine",
      track: "Backend Engineering",
      difficulty: "Advanced",
      deadline: "Today, 11:59 PM",
      dueDate: "2026-08-07",
      status: "In Progress",
      points: 250,
      description: "Implement a fault-tolerant in-memory caching module using Redis with LRU eviction strategy and concurrent connection handling.",
      requirements: [
        "Support get, set, delete, and flush operations with O(1) time complexity.",
        "Implement thread-safe connection pooling with a maximum of 50 active clients.",
        "Provide full unit test coverage exceeding 90%.",
        "Add automatic fallback to database reads on cache misses."
      ]
    },
    {
      id: "TASK-002",
      title: "JWT Authentication & OAuth2 Middleware",
      track: "Backend Engineering",
      difficulty: "Intermediate",
      deadline: "Aug 10, 2026",
      dueDate: "2026-08-10",
      status: "Completed",
      points: 200,
      description: "Create secure authentication middleware with refresh tokens, rate limiting, and RBAC permissions."
    },
    {
      id: "TASK-003",
      title: "Vector Search Pipeline for Embedding Storage",
      track: "AI & ML Systems",
      difficulty: "Advanced",
      deadline: "Aug 14, 2026",
      dueDate: "2026-08-14",
      status: "Upcoming",
      points: 300,
      description: "Integrate Pinecone / Qdrant vector database for fast similarity queries over 100k+ embeddings."
    }
  ],

  aiAuditReport: {
    overallScore: 92,
    grade: "A (Exceptional Code Quality)",
    metrics: {
      architecture: 95,
      security: 88,
      performance: 94,
      testCoverage: 91,
      documentation: 90
    },
    strengths: [
      "Outstanding use of asynchronous connection pooling to handle high throughput.",
      "Clean adherence to SOLID design principles and interface segregation.",
      "Comprehensive error logging with structured JSON metadata."
    ],
    weaknesses: [
      "Unsafe SQL parameterization detected in query builder fallback (line 42).",
      "Missing expiration TTL validation on multi-key bulk retrieval."
    ],
    detectedBugs: [
      { line: 42, file: "cache_manager.py", type: "Security Vulnerability", desc: "Potential SQL Injection risk due to string concatenation in raw fallback query." },
      { line: 88, file: "redis_pool.py", type: "Resource Leak", desc: "Connection socket is not closed inside exception catch block." }
    ]
  },

  notifications: [
    { id: 1, title: "AI Code Review Ready", message: "Task #12 code analysis completed. Score: 94/100.", time: "5m ago", unread: true },
    { id: 2, title: "Mentor Feedback Posted", message: "Dr. Sarah Jenkins approved your Redis Cache submission.", time: "2h ago", unread: true },
    { id: 3, title: "Streak Achievement!", message: "Congratulations! You reached a 14-day coding streak 🔥", time: "1d ago", unread: false }
  ]
};

if (typeof window !== 'undefined') {
  window.InternHubData = InternHubData;
}
