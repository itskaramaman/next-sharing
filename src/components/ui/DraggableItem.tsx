"use client";

import axios from "axios";
import { Draggable } from "@hello-pangea/dnd";
import { TaskItem } from "@/app/page";
import { useDispatch } from "react-redux";
import { CardDescription } from "./card";
import { TaskDialog } from "./TaskDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, FilePenLine, Trash2 } from "lucide-react";
import { Button } from "./button";
import {
  removeTaskFromTodo,
  removeTaskFromInProgress,
  removeTaskFromCompleted,
} from "@/redux/features/taskSlice";
import { toast } from "./use-toast";

interface DraggableItemProps {
  key: string;
  index: number;
  item: TaskItem;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  const dispatch = useDispatch();
  const deleteTask = async (taskId: string) => {
    try {
      const response = await axios.delete(`/api/tasks/task/${taskId}`);
      if (response.data.success) {
        const { task } = response.data;
        if (task.status === "todo") {
          dispatch(removeTaskFromTodo(task));
        } else if (task.status === "inprogress") {
          dispatch(removeTaskFromInProgress(task));
        } else if (task.status === "completed") {
          dispatch(removeTaskFromCompleted(task));
        }
      }
      toast({
        title: "Task deleted successfuly",
        description: "Lets get it done!",
      });
    } catch (error: any) {
      toast({ title: "Task deletion failed", description: error.message });
    }
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
                <div className="flex items-center hover:bg-slate-100 px-2">
                  <FilePenLine width={16}></FilePenLine>
                  <TaskDialog
                    dialogTitle="Edit Task"
                    buttonText="Edit Task"
                    submitButtonText="Edit"
                    item={item}
                  />
                </div>
                <div
                  className="flex items-center hover:bg-slate-100 px-2"
                  onClick={() => deleteTask(item._id)}
                >
                  <Trash2 width={16} />{" "}
                  <Button variant="outline" className="border-none">
                    Delete
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
