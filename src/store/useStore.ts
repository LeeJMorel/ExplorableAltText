/* eslint-disable @typescript-eslint/no-explicit-any */
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
  hasCSV: boolean; // Boolean flag to check if any CSVs are present
  projectTitle: string;
  setProjectTitle: (title: string) => void;
  dataTitle: string;
  setDataTitle: (title: string) => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  imageAltText: string;
  setImageAltText: (altText: string) => void;
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
  hasCSV: false, // Initialize the flag
  addCSV: (data, type) =>
    set((state) => {
      const newCsvData = [...state.csvData, { data, type }];
      return {
        csvData: newCsvData,
        hasCSV: newCsvData.length > 0, // Update flag based on data length
      };
    }),
  removeCSV: (type) =>
    set((state) => {
      const newCsvData = state.csvData.filter((csv) => csv.type !== type);
      return {
        csvData: newCsvData,
        hasCSV: newCsvData.length > 0, // Update flag based on data length
      };
    }),
  projectTitle: "",
  setProjectTitle: (title) =>
    set(() => ({
      projectTitle: title,
    })),
  dataTitle: "",
  setDataTitle: (title) =>
    set(() => ({
      dataTitle: title,
    })),
  uploadedImage: null,
  setUploadedImage: (image) =>
    set(() => ({
      uploadedImage: image,
    })),
  imageAltText: "",
  setImageAltText: (altText) =>
    set(() => ({
      imageAltText: altText,
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
