import React from "react";
import * as Ariakit from "@ariakit/react";
import { FaBars } from "react-icons/fa";
import styles from "./Draggable.module.scss";
import { DraggableItem } from "./DraggableComponent";

interface BarProps {
  item: DraggableItem;
  index: number;
}

const Bar: React.FC<BarProps> = ({ item }) => (
  <div className={styles.draggableBar}>
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
          <Bar key={child.id} item={child} index={childIndex} />
        ))}
      </div>
    )}
  </div>
);

export default Bar;
