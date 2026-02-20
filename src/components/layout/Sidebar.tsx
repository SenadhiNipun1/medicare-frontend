"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navigation } from "@/config/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-blue-600">
            PharmaCare
          </h2>
          <p className="text-xs text-gray-400">
            ERP System by FocalID
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                size={18}
                className={clsx(
                  isActive
                    ? "text-blue-600"
                    : "group-hover:text-gray-900"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}