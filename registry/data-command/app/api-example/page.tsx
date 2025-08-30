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
  fetchSubItems: async () =>
    project.files.map((file) => ({
      label: file,
      value: file,
      icon: <File />,
      onSelect: () => alert("Selected file: " + file),
    })),
});

export default function ApiExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Projects</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">View Projects</DialogTitle>
        <DataCommand
          items={[
            {
              icon: <Folder />,
              label: "Projects",
              value: "projects",
              fetchSubItems: async ({ search }) => {
                const projects = await fetchProjects(search);
                return projects.map(parseProject);
              },
              onSelect: () => alert("Redirect to projects page"),
            },
          ]}
          defaultCommandChain={["projects"]}
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
