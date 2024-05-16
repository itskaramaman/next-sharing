"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import LoadingBall from "@/components/ui/Loading";

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onUpdatePassword = async () => {
    if (password === confirmPassword) {
      try {
        setLoading(true);
        const response = await axios.put("/api/users/forgotpassword", {
          token,
          password,
        });
        if (response.data?.success) {
          router.push("/login");
          toast({
            title: "Password updated successfully",
            description: "Try login with your new password",
          });
        }
        setLoading(false);
      } catch (error: any) {
        toast({
          title: "Password update failed",
          description: error.message,
        });
      }
    } else {
      toast({
        title: "Password did not matched",
        description: "Make sure both password are same",
      });
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (password.length > 0 && confirmPassword.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  if (loading) return <LoadingBall />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Type your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="secondary"
            disabled={buttonDisabled}
            onClick={onUpdatePassword}
          >
            Update Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
