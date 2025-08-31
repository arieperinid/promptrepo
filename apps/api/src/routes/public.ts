import { Hono } from "hono";

export const publicRoutes = new Hono();

// Mock project endpoint
publicRoutes.get("/projects/:id", async (c) => {
  const id = c.req.param("id");
  
  // TODO: Replace with actual database query
  const mockProject = {
    id,
    name: "Sample Project",
    description: "This is a mock project response",
    is_public: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return c.json({ data: mockProject });
});
