"use client";

import { Draggable } from "@hello-pangea/dnd";
import { TaskItem } from "@/app/page";
import { CardDescription } from "./card";

interface DraggableItemProps {
  key: string;
  index: number;
  item: TaskItem;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="bg-white mb-2 p-2">
            <h2 className="font-semibold">Title</h2>
            <CardDescription>{item.content}</CardDescription>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
