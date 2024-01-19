import Link from "next/link";
import { X } from "lucide-react";

const ModalTopBar = () => {
  return (
    <nav className="sticky top-0 z-10 flex min-h-10 w-full max-w-2xl flex-row items-center justify-center bg-white p-4">
      <Link href="/dashboard">
        <X size={24} className="cursor-pointer" />
      </Link>
      <div className="flex-1"></div> {/* Spacer div */}
      <span className="text-sm font-bold uppercase">Add Nutrition</span>
      <div className="flex-1"></div> {/* Spacer div */}
      <div className="h-10 w-10 rounded-full"></div>
    </nav>
  );
};

export { ModalTopBar };
