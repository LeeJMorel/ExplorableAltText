/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useEditableCell } from "../hooks/useEditableCell";
import { Person } from "../types";

interface EditableCellProps {
  getValue: () => any;
  columnId: string;
  rowIndex: number;
  setData: React.Dispatch<React.SetStateAction<Person[]>>; // Add setData prop
}

const EditableCell: React.FC<EditableCellProps> = ({
  getValue,
  columnId,
  rowIndex,
  setData,
}) => {
  const initialValue = getValue();
  const { value, onChange, onBlur } = useEditableCell(
    initialValue,
    (updatedValue) => {
      setData((oldData) =>
        oldData.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...oldData[rowIndex],
              [columnId]: updatedValue,
            };
          }
          return row;
        })
      );
    }
  );

  return <input value={value as string} onChange={onChange} onBlur={onBlur} />;
};

export default EditableCell;
