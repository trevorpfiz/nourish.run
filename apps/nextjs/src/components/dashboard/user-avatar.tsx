import { FaUser } from "react-icons/fa";

import { auth } from "@nourish/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@nourish/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@nourish/ui/dropdown-menu";

const UserAvatar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <Avatar>
      <AvatarImage src={user?.image ?? ""} />
      <AvatarFallback className="bg-sky-500">
        <FaUser className="text-white" />
      </AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
