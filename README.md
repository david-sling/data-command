# data-command

A **data-driven command palette** for React, built on top of [shadcn/ui](https://ui.shadcn.com).  
It lets you load items from APIs, handle nested selections, and build anything from simple dropdowns to complex command menus.

📖 **Docs:** [https://data-command.davidsling.in](https://data-command.davidsling.in)

---

## 🚀 Features

- ⚡ Data-driven: load items dynamically from an API or local JSON
- 📂 Nested selections: prefill and drill down into nested command items
- 🎨 Built with [shadcn/ui](https://ui.shadcn.com)
- 🔌 Easy to integrate into any React project

---

## 📦 Installation

Using [shadcn/ui CLI](https://ui.shadcn.com/docs/installation):

```bash
pnpm dlx shadcn@latest add https://data-command.davidsling.in/r/data-command.json
```

---

## 📖 Documentation

Full docs: [https://data-command.davidsling.in](https://data-command.davidsling.in)

👉 The docs include an **“Open with v0”** button so you can try it out interactively.

---

## ⚡ Quick Example

```tsx
import { DataCommand } from "@/components/data-command";

function Example() {
  <DataCommand
    items={[
      {
        icon: <User />,
        label: "Profile",
        value: "profile",
        loadItems: async () => [
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
  />;
}
```

More advanced examples available in the [documentation](https://data-command.davidsling.in)

---

## 🤝 Contributing

The code isn’t very polished right now — contributions are very welcome!  
If you’d like to help improve the component, feel free to open a PR or start a discussion.

---

## 📜 License

MIT
