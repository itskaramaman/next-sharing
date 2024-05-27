"use client";

import Link from "next/link";
import { logIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import LoadingBall from "@/components/ui/Loading";
import { useToast } from "@/components/ui/use-toast";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [user, setUser] = useState({ email: "", password: "" });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.status === 200) {
        dispatch(logIn({ user: response.data.user.username }));
        toast({ title: "Login Success", description: "Let's Explore" });
        router.push("/");
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password",
        });
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  if (loading) {
    return <LoadingBall />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Do not have an account? Try{" "}
            <Link href="/signup" className="text-blue-400">
              Sign Up
            </Link>
            .
          </CardDescription>
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
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Password">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/forgotpassword"}>
            <CardDescription className="cursor-pointer text-blue-400 ">
              Forgot Password?
            </CardDescription>
          </Link>
          <Button onClick={onLogin} variant="outline" disabled={buttonDisabled}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
