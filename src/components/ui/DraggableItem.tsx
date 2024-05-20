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
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="bg-white mb-2 p-2">
            <h2 className="font-semibold">{item.title}</h2>
            <CardDescription className="line-clamp-2">
              {item.description}
            </CardDescription>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
