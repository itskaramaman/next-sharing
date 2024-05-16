"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verify", { token });
          setVerified(true);
        } catch (error: any) {
          console.log(error.response.data);
          setError(true);
        }
      };
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>{token ? token : "no token"}.</CardDescription>
        </CardHeader>
        <CardContent>
          {verified && (
            <div>
              <Label>Email Verified</Label>
              <Link href={"/login"} className="text-blue-400">
                Login
              </Link>
            </div>
          )}
          {error && <Label>Error</Label>}
        </CardContent>
      </Card>
    </div>
  );
}
