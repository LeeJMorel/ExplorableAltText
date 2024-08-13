import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaBars } from "react-icons/fa";
import styles from "./Draggable.module.scss";

export interface DraggableItem {
  id: string;
  title: string;
  content: React.ReactNode;
  children?: DraggableItem[];
}

interface BarProps {
  item: DraggableItem;
  index: number;
  moveBar: (dragIndex: number, hoverIndex: number) => void;
  addChild: (parentId: string, child: DraggableItem) => void;
}

const Bar: React.FC<BarProps> = ({ item, index, moveBar, addChild }) => {
  const [, ref] = useDrag({
    type: "BAR",
    item: { index, id: item.id },
  });

  const [, drop] = useDrop({
    accept: "BAR",
    hover: (draggedItem: { index: number; id: string }) => {
      if (draggedItem.index !== index) {
        moveBar(draggedItem.index, index);
        draggedItem.index = index; // Update drag index after move
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={styles.draggableBar}>
      <div className={styles.handle}>
        <FaBars className={styles.hamburgerIcon} />
      </div>
      <div className={styles.titleContainer}>{item.title}</div>
      {item.children && (
        <div className={styles.nestedContainer}>
          {item.children.map((child, childIndex) => (
            <Bar
              key={child.id}
              item={child}
              index={childIndex}
              moveBar={moveBar}
              addChild={addChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
