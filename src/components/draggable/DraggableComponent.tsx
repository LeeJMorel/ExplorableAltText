/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./Bar";
import styles from "./Draggable.module.scss";

export interface DraggableItem {
  id: string;
  title: string;
  content: React.ReactNode;
  children?: DraggableItem[];
}
interface DraggableComponentProps {
  data: DraggableItem[];
  onDragEnd: (result: any) => void; // Handle the drag end event
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  data,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="COLUMN">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={styles.container}
          >
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Bar item={item} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableComponent;
