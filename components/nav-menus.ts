// nav-main.ts
import {
  IconHome2,
  IconUser,
  IconBuilding,
  IconNote,
  IconUserCircle,
  IconUserScan,
  IconCalendar,
  IconStatusChange,
  IconView360,
  IconFileExport,
} from "@tabler/icons-react";

export const data = {
  user: {
    name: "Luther",
    email: "lutero.chipenhe@cmc.ao",
    avatar: "/avatars/lp.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome2,
    },

    {
      title: "Notes",
      url: "/dashboard/note",
      icon: IconNote,
    },
    {
      title: "Departamentos",
      url: "/dashboard/department",
      icon: IconBuilding,
    },
    {
      title: "Users",
      url: "/dashboard/user",
      icon: IconUser,
    },
    {
      title: "Exemplos",
      url: "#",
      icon: IconView360,
      children: [
        {
          title: "Ausência",
          url: "/exemplos/ausencia",
          icon: IconStatusChange,
        },
        {
          title: "Calendário",
          url: "/exemplos/calendario",
          icon: IconCalendar,
        },
        {
          title: "Detalhes Colaborador",
          url: "/exemplos/detalhes-colaborador",
          icon: IconUserScan,
        },
        {
          title: "Detalhes User Azure",
          url: "/exemplos/user-azure",
          icon: IconUserCircle,
        },
        {
          title: "Exportar PDF/XLS",
          url: "/exemplos/export",
          icon: IconFileExport,
        },
        {
          title: "Exportar Button",
          url: "/exemplos/export-button",
          icon: IconFileExport,
        },
      ],
    } /*
    {
      title: "Links",
      url: "/dashboard/links",
      icon: IconLink,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: IconUser,
    } 
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },*/,
    ,
    ,
  ] /*
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        { title: "Active Proposals", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],*/,
};
