"use client";

import { Draggable } from "react-beautiful-dnd";
import { TaskItem } from "@/app/page";
import { CardDescription } from "./card";

interface DraggableItemProps {
  key: string;
  item: TaskItem;
}

const DraggableItem = ({ item }) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={item.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="bg-white mb-2 p-2">
            <h2 className="font-semibold">Title</h2>
            <p>{item.content}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
