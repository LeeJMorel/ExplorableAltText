// store/useStore.ts
import create from "zustand";
import { DraggableItem } from "../components/draggable/Bar";

interface DraggableStore {
  items: DraggableItem[];
  setItems: (items: DraggableItem[]) => void;
  addItem: (item: DraggableItem) => void;
  removeItem: (itemId: string) => void;
}

export const useStore = create<DraggableStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (itemId) =>
    set((state) => ({
      items: removeItemById(state.items, itemId),
    })),
}));

const removeItemById = (
  list: DraggableItem[],
  itemId: string
): DraggableItem[] => {
  return list.reduce((result, item) => {
    if (item.id === itemId) return result;

    if (item.children) {
      item.children = removeItemById(item.children, itemId);
    }

    result.push(item);
    return result;
  }, [] as DraggableItem[]);
};

export default useStore;
