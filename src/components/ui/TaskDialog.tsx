"use client";

import React, { useState } from "react";
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

export function TaskDialog() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const onCreate = () => {
    console.log(title, description, date);
  };
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
          <Button variant="secondary" onClick={onCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
