"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { User, BanknoteIcon, SettingsIcon } from "lucide-react";
import { DataCommand } from "../../components/data-command";

export default function SimpleExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Search Site</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Site Search</DialogTitle>
        <DataCommand
          items={[
            {
              icon: <User />,
              label: "Profile",
              value: "profile",
              fetchSubItems: async () => [
                {
                  label: "Settings",
                  value: "settings",
                  icon: <SettingsIcon />,
                  onSelect: () => alert("You have selected: profile/settings"),
                },
              ],
            },
            {
              icon: <BanknoteIcon />,
              label: "Billing",
              value: "billing",
              onSelect: () => alert("You have selected: billing"),
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
