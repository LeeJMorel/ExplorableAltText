import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Bar from "./Bar";
import styles from "./Draggable.module.scss";

export interface DraggableItem {
  id: string;
  title: string;
  content: React.ReactNode;
  children?: DraggableItem[];
}

interface DraggableComponentProps {
  initialData: DraggableItem[];
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  initialData,
}) => {
  const [data, setData] = useState<DraggableItem[]>(initialData);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (hoveredItemId) {
      const newData = reorderAndNest(data, source, destination, hoveredItemId);
      setData(newData);
      setHoveredItemId(null); // Reset after nesting
    } else {
      const newData = reorderAndNest(data, source, destination, null);
      setData(newData);
    }
  };

  const reorderAndNest = (
    list: DraggableItem[],
    source: { index: number; droppableId: string },
    destination: { index: number; droppableId: string },
    hoveredItemId: string | null
  ): DraggableItem[] => {
    const result = Array.from(list);
    const [removed] = result.splice(source.index, 1);

    if (destination.droppableId === "droppable") {
      result.splice(destination.index, 0, removed);
    } else {
      const parentItem = findItemById(result, destination.droppableId);
      if (parentItem) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children.splice(destination.index, 0, removed);
      }
    }

    if (hoveredItemId) {
      const parentItem = findItemById(result, hoveredItemId);
      if (parentItem) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children.push(removed);
      }
    }

    return result;
  };

  const findItemById = (
    list: DraggableItem[],
    id: string
  ): DraggableItem | undefined => {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleDragOver = (itemId: string) => {
    setHoveredItemId(itemId);
  };

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
                    <Bar
                      item={item}
                      index={index}
                      onDragOver={handleDragOver}
                    />
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
