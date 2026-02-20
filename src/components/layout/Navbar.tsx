"use client";

import { Bell, Search, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <Menu size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="hidden md:flex items-center relative w-80">
          <Search
            size={16}
            className="absolute left-3 text-gray-400"
          />
          <Input
            placeholder="Search medicines, suppliers..."
            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell size={18} />
          </Button>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <p className="text-sm font-semibold text-gray-900">
            Admin User
          </p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>

        <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
