const temp=[
  {
    "user": {
      "id": "user_1",
      "clerkId": "clerk_123",
      "email": "alice@example.com",
      "name": "Alice Johnson",
      "image": "https://i.pravatar.cc/150?u=alice",
      "createdAt": "2025-09-01T10:00:00Z",
      "updatedAt": "2025-09-01T10:00:00Z"
    },
    "company": {
      "id": "company_1",
      "name": "TechNova Solutions",
      "ownerId": "user_1",
      "createdAt": "2025-09-01T10:05:00Z",
      "updatedAt": "2025-09-01T10:05:00Z"
    },
    "department": {
      "id": "dept_1",
      "name": "Engineering",
      "companyId": "company_1",
      "createdAt": "2025-09-01T10:10:00Z",
      "updatedAt": "2025-09-01T10:10:00Z"
    },
    "project": {
      "id": "proj_1",
      "name": "AI Chatbot",
      "description": "Build an AI assistant for customer support",
      "companyId": "company_1",
      "departmentId": "dept_1",
      "createdAt": "2025-09-01T10:15:00Z",
      "updatedAt": "2025-09-01T10:15:00Z"
    },
    "task": {
      "id": "task_1",
      "title": "Design conversation flow",
      "description": "Create intents and response mapping",
      "status": "IN_PROGRESS",
      "dueAt": "2025-09-15T00:00:00Z",
      "projectId": "proj_1",
      "assigneeId": "user_1",
      "createdAt": "2025-09-01T10:20:00Z",
      "updatedAt": "2025-09-01T10:20:00Z"
    },
    "membership": {
      "id": "memb_1",
      "userId": "user_1",
      "companyId": "company_1",
      "role": "OWNER",
      "createdAt": "2025-09-01T10:05:00Z"
    }
  },
//   --------------------------------
  {
    "user": {
      "id": "user_2",
      "clerkId": "clerk_456",
      "email": "bob@example.com",
      "name": "Bob Smith",
      "image": "https://i.pravatar.cc/150?u=bob",
      "createdAt": "2025-09-02T11:00:00Z",
      "updatedAt": "2025-09-02T11:00:00Z"
    },
    "company": {
      "id": "company_2",
      "name": "GreenFuture Ltd",
      "ownerId": "user_2",
      "createdAt": "2025-09-02T11:05:00Z",
      "updatedAt": "2025-09-02T11:05:00Z"
    },
    "department": {
      "id": "dept_2",
      "name": "Sustainability R&D",
      "companyId": "company_2",
      "createdAt": "2025-09-02T11:10:00Z",
      "updatedAt": "2025-09-02T11:10:00Z"
    },
    "project": {
      "id": "proj_2",
      "name": "Solar Panel Optimization",
      "description": "Enhance efficiency of solar cells",
      "companyId": "company_2",
      "departmentId": "dept_2",
      "createdAt": "2025-09-02T11:15:00Z",
      "updatedAt": "2025-09-02T11:15:00Z"
    },
    "task": {
      "id": "task_2",
      "title": "Prototype testing",
      "description": "Run simulations on new solar materials",
      "status": "TODO",
      "dueAt": "2025-09-20T00:00:00Z",
      "projectId": "proj_2",
      "assigneeId": "user_2",
      "createdAt": "2025-09-02T11:20:00Z",
      "updatedAt": "2025-09-02T11:20:00Z"
    },
    "membership": {
      "id": "memb_2",
      "userId": "user_2",
      "companyId": "company_2",
      "role": "OWNER",
      "createdAt": "2025-09-02T11:05:00Z"
    }
  },
//   --------------------------------------
  {
    "user": {
      "id": "user_3",
      "clerkId": "clerk_789",
      "email": "carol@example.com",
      "name": "Carol Lee",
      "image": "https://i.pravatar.cc/150?u=carol",
      "createdAt": "2025-09-03T12:00:00Z",
      "updatedAt": "2025-09-03T12:00:00Z"
    },
    "company": {
      "id": "company_3",
      "name": "HealthTrack Inc",
      "ownerId": "user_3",
      "createdAt": "2025-09-03T12:05:00Z",
      "updatedAt": "2025-09-03T12:05:00Z"
    },
    "department": {
      "id": "dept_3",
      "name": "Product Development",
      "companyId": "company_3",
      "createdAt": "2025-09-03T12:10:00Z",
      "updatedAt": "2025-09-03T12:10:00Z"
    },
    "project": {
      "id": "proj_3",
      "name": "Fitness Tracker App",
      "description": "Mobile app for health monitoring",
      "companyId": "company_3",
      "departmentId": "dept_3",
      "createdAt": "2025-09-03T12:15:00Z",
      "updatedAt": "2025-09-03T12:15:00Z"
    },
    "task": {
      "id": "task_3",
      "title": "UI/UX Design",
      "description": "Create wireframes and prototypes",
      "status": "DONE",
      "dueAt": "2025-09-10T00:00:00Z",
      "projectId": "proj_3",
      "assigneeId": "user_3",
      "createdAt": "2025-09-03T12:20:00Z",
      "updatedAt": "2025-09-03T12:20:00Z"
    },
    "membership": {
      "id": "memb_3",
      "userId": "user_3",
      "companyId": "company_3",
      "role": "OWNER",
      "createdAt": "2025-09-03T12:05:00Z"
    }
  }
]
