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

  const moveBar = (
    dragIndex: number,
    hoverIndex: number,
    targetId: string | null
  ) => {
    const draggedItem = data[dragIndex];
    if (!draggedItem) return; // Safety check

    // Remove the dragged item from its original position
    const updatedData = removeItemFromParent(data, draggedItem.id);

    if (targetId) {
      // Add to a target item
      const targetItem = findItemById(updatedData, targetId);
      if (!targetItem) return; // Safety check

      // Ensure targetItem has children
      if (!targetItem.children) targetItem.children = [];

      // Check if draggedItem already exists in the targetItem's children
      const isAlreadyChild = targetItem.children.some(
        (item) => item.id === draggedItem.id
      );
      if (!isAlreadyChild) {
        targetItem.children.push(draggedItem); // Add the dragged item as a child of the target item
      }
    } else {
      // Move to the top level
      updatedData.push(draggedItem); // Add dragged item to the top level
    }

    setData(updatedData); // Update the state with the modified data
  };

  const removeItemFromParent = (
    list: DraggableItem[],
    itemId: string
  ): DraggableItem[] => {
    return list.reduce((result, item) => {
      // Skip this item if it's the one being moved
      if (item.id === itemId) return result;

      // Recursively remove the item from its children's list
      if (item.children) {
        item.children = removeItemFromParent(item.children, itemId);
      }

      result.push(item); // Add the item to the result
      return result;
    }, [] as DraggableItem[]);
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
            parentId="" // Top-level bars have no parentId
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DraggableContainer;
