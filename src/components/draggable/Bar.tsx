// components/draggable/Bar.tsx
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaBars } from "react-icons/fa";
import * as Ariakit from "@ariakit/react";
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
  moveBar: (
    dragIndex: number,
    hoverIndex: number,
    targetId: string | null
  ) => void;
  addChild: (parentId: string, child: DraggableItem) => void;
  parentId: string;
}

const Bar: React.FC<BarProps> = ({
  item,
  index,
  moveBar,
  addChild,
  parentId,
}) => {
  const [, ref] = useDrag({
    type: "BAR",
    item: { index, id: item.id, parentId },
  });

  const [, drop] = useDrop({
    accept: "BAR",
    hover: (draggedItem: { index: number; id: string; parentId: string }) => {
      if (draggedItem.id !== item.id) {
        // Handle nesting or denesting
        moveBar(draggedItem.index, index, item.id);
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className={styles.draggableBar}>
      <div className={styles.handle}>
        <FaBars className={styles.hamburgerIcon} />
      </div>
      <div className={styles.titleContainer}>
        <Ariakit.DisclosureProvider>
          <Ariakit.Disclosure className={styles.disclosureButton}>
            {item.title}
          </Ariakit.Disclosure>
          <Ariakit.DisclosureContent className={styles.disclosureContent}>
            <div>
              {item.content}
              {item.children && (
                <div className={styles.nestedContainer}>
                  {item.children.map((child, childIndex) => (
                    <Bar
                      key={child.id}
                      item={child}
                      index={childIndex}
                      moveBar={moveBar}
                      addChild={addChild}
                      parentId={item.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </Ariakit.DisclosureContent>
        </Ariakit.DisclosureProvider>
      </div>
    </div>
  );
};

export default Bar;
