// components/TestAddItemButton.tsx
import React from "react";
import useStore from "../../store/useStore";
import { DraggableItem } from "./Bar";

const TestAddItemButton: React.FC = () => {
  const addItem = useStore((state) => state.addItem);

  const handleAddItem = () => {
    const newItem: DraggableItem = {
      id: "new-id",
      title: "New Item",
      content: "This is a new item.",
      children: [],
    };

    addItem(newItem);
  };

  return <button onClick={handleAddItem}>Add Item</button>;
};

export default TestAddItemButton;
