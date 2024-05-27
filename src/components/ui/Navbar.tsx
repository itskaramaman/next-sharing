"use client";

import Link from "next/link";
import axios from "axios";
import { TaskDialog } from "./TaskDialog";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "@/redux/features/authSlice";
import { CardTitle } from "./card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingBall from "./Loading";
import { RootState } from "@/redux/store";

export default function Navbar() {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((store: RootState) => store.authReducer);

  const onLogout = async () => {
    setLoading(true);
    const response = await axios.get("/api/users/logout");
    if (response.data.success) {
      dispatch(logOut());
      router.push("/login");
      toast({ description: "Logout successful" });
    } else {
      toast({ description: "Something went wrong" });
    }
    setLoading(false);
  };

  if (loading) return <LoadingBall />;

  return (
    <main className="p-5 flex justify-between items-center shadow-md">
      <CardTitle>
        <Link href={"/"}>Next Sharing</Link>
      </CardTitle>
      <div className="flex gap-2 items-center">
        {user ? (
          <>
            <TaskDialog
              dialogTitle="Create New Task"
              buttonText="Create Task"
              submitButtonText="Create"
            />
            <Link href={"/profile"}>
              <Button variant="outline" className="border-none">
                Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-none"
              onClick={onLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href={"/login"}>
            <Button variant="outline" className="border-none">
              Login
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
}
