"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import { DatePicker } from "./datepicker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LoadingBall from "./Loading";
import { useToast } from "./use-toast";

export function TaskDialog() {
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const onCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/tasks/task", {
        title,
        description,
        date,
      });
      setTitle("");
      setDescription("");
      setDate(new Date());
      toast({ title: "Task creation successfuly", description: "Keep going!" });
    } catch (error: any) {
      toast({ title: "Task creation failed", description: error.message });
    }
    setLoading(false);
  };

  if (loading) return <LoadingBall />;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none">
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>Lets get some work done!.</DialogDescription>
        </DialogHeader>

        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <DatePicker date={date} setDate={setDate} />
          <div className="flex items-center gap-2">
            <Label>Author:</Label>
            <Avatar>
              <AvatarFallback>KS</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" type="submit" onClick={onCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
