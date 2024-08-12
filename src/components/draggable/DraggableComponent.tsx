import React from "react";
import Draggable from "react-draggable";
import * as Ariakit from "@ariakit/react";
import styles from "./Draggable.module.scss";
import { FaBars } from "react-icons/fa";

interface DraggableComponentProps {
  data: Array<{ title: string; content: React.ReactNode }>;
  bounds?: string;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  data,
  bounds = "parent", // Restrict dragging within the parent container by default
}) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <Draggable
          key={index}
          bounds={bounds}
          handle={`.handle-${index}`} // Unique handle for each draggable item
        >
          <div className={styles.draggableBar}>
            <div className={`handle-${index} ${styles.handle}`}>
              {/* Hamburger Icon as Handle */}
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
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableComponent;
