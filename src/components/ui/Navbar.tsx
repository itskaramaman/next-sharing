"use client";

import Link from "next/link";
import axios from "axios";
import { TaskDialog } from "./TaskDialog";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { Label } from "@/components/ui/label";
import { CardTitle } from "./card";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { toast } = useToast();
  const router = useRouter();

  const onLogout = async () => {
    const response = await axios.get("/api/users/logout");
    if (response.data.success) {
      router.push("/login");
      toast({ description: "Logout successful" });
    } else {
      toast({ description: "Something went wrong" });
    }
  };
  return (
    <main className="p-5 flex justify-between items-center shadow-md">
      <CardTitle>
        <Link href={"/"}>Next Sharing</Link>
      </CardTitle>
      <div className="flex gap-2 items-center">
        <TaskDialog />
        <Link href={"/profile"}>
          <Button variant="outline" className="border-none">
            Profile
          </Button>
        </Link>
        <Button variant="outline" className="border-none" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </main>
  );
}
