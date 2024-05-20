"use client";

import axios from "axios";
import { Draggable } from "@hello-pangea/dnd";
import { TaskItem } from "@/app/page";
import { CardDescription } from "./card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";

interface DraggableItemProps {
  key: string;
  index: number;
  item: TaskItem;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  const deleteTask = async (taskId: string) => {
    const response = await axios.delete(`/api/tasks/task/${taskId}`);
    console.log(response);
  };
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-center bg-white mb-2 p-2">
            <section>
              <h2 className="font-semibold">{item.title}</h2>
              <CardDescription className="line-clamp-2">
                {item.description}
              </CardDescription>
            </section>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical width={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="flex gap-1 items-center">
                  <FilePenLine width={16} /> <p>Edit</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteTask(item._id)}
                  className="flex gap-1 items-center"
                >
                  <Trash2 width={16} /> <p>Delete</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
