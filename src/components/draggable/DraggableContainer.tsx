import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Bar, { DraggableItem } from "./Bar"; // Import Bar component
import styles from "./Draggable.module.scss";

interface DraggableContainerProps {
  initialData: DraggableItem[];
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  initialData,
}) => {
  const [data, setData] = useState<DraggableItem[]>(initialData);

  const moveBar = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = data[dragIndex];
    const updatedData = [...data];
    updatedData.splice(dragIndex, 1);
    updatedData.splice(hoverIndex, 0, draggedItem);
    setData(updatedData);
  };

  const addChild = (parentId: string, child: DraggableItem) => {
    const updatedData = [...data];
    const parent = findItemById(updatedData, parentId);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(child);
      setData(updatedData);
    }
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {data.map((item, index) => (
          <Bar
            key={item.id}
            item={item}
            index={index}
            moveBar={moveBar}
            addChild={addChild}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableContainer;
