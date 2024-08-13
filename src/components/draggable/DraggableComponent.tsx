import React, { useState, useRef } from "react";
import Bar, { DraggableItem } from "./Bar";
import { DraggableEvent, DraggableData } from "react-draggable";
import styles from "./Draggable.module.scss";

interface DraggableComponentProps {
  data: DraggableItem[];
  bounds?: string;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  data,
  bounds = "parent",
}) => {
  const [nestedData, setNestedData] = useState<DraggableItem[]>(data);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDragStart = (e: DraggableEvent, data: DraggableData) => {
    const targetElement = data.node as HTMLElement;
    setDraggingIndex(
      targetElement.dataset.index ? parseInt(targetElement.dataset.index) : null
    );
  };

  const handleDragStop = () => {
    setDraggingIndex(null);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    adjustBarPositions();
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    if (draggingIndex === null) return;

    const draggedElement = data.node as HTMLElement;
    const targetElements = document.querySelectorAll<HTMLElement>(
      `.${styles.draggableBar}`
    );

    targetElements.forEach((targetElement) => {
      if (targetElement === draggedElement) return;

      const targetRect = targetElement.getBoundingClientRect();
      const draggedRect = draggedElement.getBoundingClientRect();

      if (
        draggedRect.bottom > targetRect.top &&
        draggedRect.top < targetRect.bottom &&
        draggedRect.right > targetRect.left &&
        draggedRect.left < targetRect.right
      ) {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
          const targetIndex = parseInt(targetElement.dataset.index || "0");
          if (targetIndex !== draggingIndex) {
            nestBar(draggingIndex, targetIndex);
          }
        }, 1000);
      }
    });
  };

  const nestBar = (draggedIndex: number, targetIndex: number) => {
    const newData = [...nestedData];
    const draggedItem = newData.splice(draggedIndex, 1)[0];

    if (!newData[targetIndex].children) newData[targetIndex].children = [];
    newData[targetIndex].children!.push(draggedItem);

    setNestedData(newData);
  };

  const adjustBarPositions = () => {
    // Adjust the position of each bar to ensure they fall back into the grid
    const bars = document.querySelectorAll<HTMLElement>(
      `.${styles.draggableBar}`
    );
    bars.forEach((bar) => {
      bar.style.left = "";
      bar.style.top = "";
    });
  };

  return (
    <div className={styles.container}>
      {nestedData.map((item, index) => (
        <Bar
          key={index}
          item={item}
          index={index}
          bounds={bounds}
          onDragStart={handleDragStart}
          onDragStop={handleDragStop}
          onDrag={handleDrag}
        />
      ))}
    </div>
  );
};

export default DraggableComponent;
