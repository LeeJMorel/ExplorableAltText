import React, { useState } from "react";
import * as Ariakit from "@ariakit/react";
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
  onDragOver: (itemId: string) => void;
}

const Bar: React.FC<BarProps> = ({ item, onDragOver }) => {
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeoutId = window.setTimeout(() => {
      onDragOver(item.id);
    }, 1000); // Adjust the delay time as needed
    setHoverTimeout(timeoutId);
  };

  const handleDragLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  return (
    <div
      className={styles.draggableBar}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className={styles.handle}>
        <FaBars className={styles.hamburgerIcon} />
      </div>
      <div className={styles.titleContainer}>
        <Ariakit.DisclosureProvider>
          <Ariakit.Disclosure className="disclosure-button">
            {item.title}
          </Ariakit.Disclosure>
          <Ariakit.DisclosureContent className="disclosure-content">
            {item.content}
          </Ariakit.DisclosureContent>
        </Ariakit.DisclosureProvider>
      </div>
      {item.children && (
        <div className={styles.nestedContainer}>
          {item.children.map((child, childIndex) => (
            <Bar
              key={child.id}
              item={child}
              index={childIndex}
              onDragOver={onDragOver}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bar;
