"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DataCommand } from "../../components/data-command";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

export default function SimpleExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Search Site</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DataCommand
          items={[
            { label: "Item 1", value: "item_1", fetchSubItems: async () => [] },
            { label: "Item 2", value: "item_2" },
            { label: "Item 3", value: "item_3" },
            { label: "Item 4", value: "item_4" },
            { label: "Item 5", value: "item_5" },
            { label: "Item 6", value: "item_6" },
            { label: "Item 7", value: "item_7" },
            { label: "Item 8", value: "item_8" },
          ]}
          onClose={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
}
