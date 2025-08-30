"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { File, Folder } from "lucide-react";
import { CommandDataItem, DataCommand } from "../../components/data-command";
import { fetchProjects, Project } from "../../api/projects";

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
              loadItems: async ({ search }) => {
                const projects = await fetchProjects(search);
                return projects.map(parseProject);
              },
              onSelect: () => alert("Redirect to projects page"),
            },
          ]}
          defaultPath={["projects"]}
        />
      </DialogContent>
    </Dialog>
  );
}
