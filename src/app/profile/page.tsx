"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  _id: string;
  email: string;
  username: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({ _id: "", username: "", email: "" });
  const getUserData = async () => {
    const response = await axios.get("/api/users/me");
    const userData = response.data?.data;
    setUser(userData);
    console.log(userData);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex justify-center mt-20">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={user.email}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={user.username}
                  disabled={true}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Update</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
