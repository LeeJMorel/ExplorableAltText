// components/TestRemoveItemButton.tsx
import React from "react";
import useStore from "../../store/useStore";

interface TestRemoveItemButtonProps {
  itemId: string;
}

const TestRemoveItemButton: React.FC<TestRemoveItemButtonProps> = ({
  itemId,
}) => {
  const removeItem = useStore((state) => state.removeItem);

  const handleRemoveItem = () => {
    removeItem(itemId);
  };

  return <button onClick={handleRemoveItem}>Remove Item</button>;
};

export default TestRemoveItemButton;
