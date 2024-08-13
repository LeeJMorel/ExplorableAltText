/* eslint-disable @typescript-eslint/no-explicit-any */
// store/useStore.ts
import create from "zustand";
import { DraggableItem } from "../components/draggable/Bar";

interface DraggableStore {
  items: DraggableItem[];
  setItems: (items: DraggableItem[]) => void;
  addItem: (item: DraggableItem) => void;
  removeItem: (itemId: string) => void;
  csvData: { data: any[]; type: string }[]; // Array of CSV data and type
  addCSV: (data: any[], type: string) => void;
  removeCSV: (type: string) => void;
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
  csvData: [],
  addCSV: (data, type) =>
    set((state) => ({
      csvData: [...state.csvData, { data, type }],
    })),
  removeCSV: (type) =>
    set((state) => ({
      csvData: state.csvData.filter((csv) => csv.type !== type),
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
