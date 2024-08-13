import React from "react";
import Draggable from "react-draggable";
import * as Ariakit from "@ariakit/react";
import { FaBars } from "react-icons/fa";
import styles from "./Draggable.module.scss";
import { DraggableEvent, DraggableData } from "react-draggable";

export interface DraggableItem {
  title: string;
  content: React.ReactNode;
  children?: DraggableItem[];
}

interface BarProps {
  item: DraggableItem;
  index: number;
  bounds?: string;
  onDragStart: (e: DraggableEvent, data: DraggableData) => void;
  onDragStop: () => void;
  onDrag: (e: DraggableEvent, data: DraggableData) => void;
}

const Bar: React.FC<BarProps> = ({
  item,
  index,
  bounds,
  onDragStart,
  onDragStop,
  onDrag,
}) => (
  <Draggable
    bounds={bounds}
    handle={`.handle-${index}`}
    onStart={onDragStart}
    onStop={onDragStop}
    onDrag={onDrag}
    axis="y"
  >
    <div className={styles.draggableBar} data-index={index.toString()}>
      <div className={`handle-${index} ${styles.handle}`}>
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
              key={childIndex}
              item={child}
              index={childIndex}
              bounds={bounds}
              onDragStart={onDragStart}
              onDragStop={onDragStop}
              onDrag={onDrag}
            />
          ))}
        </div>
      )}
    </div>
  </Draggable>
);

export default Bar;
