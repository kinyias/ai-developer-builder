"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define the sidebar items structure
const sidebarItems = [
  {
    title: "Bắt đầu",
    items: [
      {
        title: "Giới thiệu & Cài đặt",
        href: "/docs",
        items: [],
      },
    ],
  },
  {
    title: "API",
    items: [
      {
        title: "API",
        href: "/docs/api",
        items: [],
      },
    ],
  },
  {
    title: "Database",
    items: [
      {
        title: "Database",
        href: "/docs/database",
        items: [],
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {sidebarItems.map((section, i) => (
        <div key={i} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
          <Accordion type="multiple" defaultValue={section.items.map((_, i) => `item-${i}`)} className="w-full">
            {section.items.map((item, j) => (
              <AccordionItem key={j} value={`item-${j}`} className="border-none">
                <AccordionTrigger className="py-1 text-sm hover:no-underline">
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full text-left hover:underline",
                      pathname === item.href ? "font-medium text-primary" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </AccordionTrigger>
                {item.items.length > 0 && (
                  <AccordionContent className="pb-1 pt-0">
                    <div className="flex flex-col space-y-1 pl-4">
                      {item.items.map((subItem, k) => (
                        <Link
                          key={k}
                          href={subItem.href}
                          className={cn(
                            "text-sm hover:underline",
                            pathname === subItem.href ? "font-medium text-primary" : "text-muted-foreground",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )
}

