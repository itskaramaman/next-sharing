"use client";

import { useEffect, useState } from "react";

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
import LoadingBall from "@/components/ui/Loading";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const onSendLink = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setLoading(false);
      toast({ title: "Email sent", description: "Please check your inbox" });
    } catch (error) {
      toast({
        title: "Email not sent",
        description: "Becuase of some technical issue email could not be sent",
      });
    }
  };

  if (loading) return <LoadingBall />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Please enter your email to recieve password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="secondary"
            disabled={buttonDisabled}
            onClick={onSendLink}
          >
            Send Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
