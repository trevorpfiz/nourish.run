import { DaySelector } from "~/components/dashboard/day-selector";
import { UserAvatar } from "~/components/dashboard/user-avatar";

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex min-h-10 w-full max-w-2xl flex-row items-center justify-center bg-white p-4">
      <UserAvatar />
      <div className="flex-1"></div> {/* Spacer div */}
      <DaySelector />
      <div className="flex-1"></div> {/* Spacer div */}
      <div className="h-10 w-10 rounded-full"></div>
    </nav>
  );
};

export { TopNavbar };
