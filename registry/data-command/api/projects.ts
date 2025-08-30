const projects: Project[] = [
  {
    name: "Website",
    id: "project_1",
    files: ["index.html", "styles.css"],
  },
  {
    name: "Scraper",
    id: "project_2",
    files: ["script.go", ".env.example"],
  },
  {
    name: "Scraper 2",
    id: "project_3",
    files: ["script.py", ".env.example"],
  },
  {
    name: "Server",
    id: "project_4",
    files: ["app.py", "routes.py", ".env.example"],
  },
];

export const fetchProjects = async (search: string) => {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      resolve(
        projects.filter(
          (item) =>
            !search || item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, 500);
  });
};

export const fetchOneProject = async (project_id: string) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const project = projects.find((project) => project.id === project_id);
      if (project) resolve(project);
      else reject("project not found");
    }, 500);
  });
};

export interface Project {
  name: string;
  id: string;
  files: string[];
}
