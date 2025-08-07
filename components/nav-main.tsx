"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: {
      title: string;
      url: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (url: string) => {
    setOpenMenus((prev) => ({ ...prev, [url]: !prev[url] }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isRoot = item.url === "/dashboard";
            const isActive = isRoot
              ? pathname === item.url
              : pathname.startsWith(item.url);
            const isOpen = openMenus[item.url];

            return (
              <SidebarMenuItem key={item.title} className="flex flex-col">
                {item.children ? (
                  <SidebarMenuButton
                    onClick={() => toggleMenu(item.url)}
                    className={clsx(
                      "flex items-center justify-between gap-2 rounded px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-primary",
                      isActive && "bg-primary font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.title}</span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    ) : (
                      <ChevronRight className="h-4 w-4 opacity-70" />
                    )}
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className={clsx(
                      "flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors",
                      "hover:bg-primary",
                      isActive && "bg-primary font-semibold"
                    )}
                  >
                    <Link href={item.url}>
                      <>
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </>
                    </Link>
                  </SidebarMenuButton>
                )}

                {item.children && isOpen && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const isChildActive = pathname.startsWith(child.url);
                      return (
                        <Link
                          key={child.title}
                          href={child.url}
                          className={clsx(
                            "flex items-center gap-2 rounded px-2 py-1 text-sm transition-colors",
                            "hover:bg-primary",
                            isChildActive && "bg-primary font-semibold"
                          )}
                        >
                          {child.icon && (
                            <child.icon className="h-4 w-4 opacity-70" />
                          )}
                          <span>{child.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
