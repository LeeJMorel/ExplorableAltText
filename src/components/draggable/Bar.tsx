import React from "react";
import { useDrag, useDrop } from "react-dnd";
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

export default Bar;
