"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { File, Folder } from "lucide-react";
import { CommandDataItem, DataCommand } from "../../components/data-command";

const parseProject = (project: Project): CommandDataItem => ({
  label: project.name,
  value: project.id,
  icon: <Folder />,
  loadItems: async () =>
    project.files.map((file) => ({
      label: file,
      value: file,
      icon: <File />,
      onSelect: () => alert("Selected file: " + file),
    })),
});

export default function DefaultChainExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Project 2</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Site Search</DialogTitle>
        <DataCommand
          items={[
            {
              icon: <Folder />,
              label: "Projects",
              value: "projects",
              loadItems: async ({ search }) => {
                const projects = await fetchProjects(search);
                return projects.map(parseProject);
              },
              loadOneItem: async (projectId) => {
                const project = await fetchOneProject(projectId);
                return parseProject(project);
              },
              onSelect: () => alert("Redirect to projects page"),
            },
          ]}
          defaultPath={["projects", "project_2"]}
        />
      </DialogContent>
    </Dialog>
  );
}

interface Project {
  name: string;
  id: string;
  files: string[];
}

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

// Simulated api call
const fetchProjects = async (search: string) => {
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

const fetchOneProject = async (project_id: string) => {
  return new Promise<Project>((resolve, reject) => {
    setTimeout(() => {
      const project = projects.find((project) => project.id === project_id);
      if (project) resolve(project);
      else reject("project not found");
    }, 500);
  });
};
