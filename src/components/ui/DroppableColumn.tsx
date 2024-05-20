"use client";

import { Droppable } from "@hello-pangea/dnd";
import DraggableItem from "./DraggableItem";
import { TaskItem } from "@/app/page";
import { CardTitle, CardDescription, CardContent } from "./card";
import { TaskStatus } from "@/lib/constants";

interface DroppableColumnProps {
  droppableId: string;
  title: string;
  description: string;
  tasks?: TaskItem[];
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  droppableId,
  title,
  description,
  tasks,
}) => {
  return (
    <div className="md:w-[400px] sm:min-w-[200px] bg-slate-50 p-4 min-h-96">
      <CardTitle>{title}</CardTitle>
      <CardDescription className="my-1">{description}</CardDescription>
      <hr className="mb-2" />
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks?.map((task, index) => (
              <DraggableItem key={task._id} item={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DroppableColumn;
