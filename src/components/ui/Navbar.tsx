"use client";

import Link from "next/link";
import { Button } from "./button";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useToast } from "./use-toast";
import { Label } from "@/components/ui/label";
import { CardTitle } from "./card";

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
    <main className="p-5 flex justify-between shadow-md">
      <CardTitle>Next Sharing</CardTitle>
      <div>
        <Button variant="secondary" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </main>
  );
}
