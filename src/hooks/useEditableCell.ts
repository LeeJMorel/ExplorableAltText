import { useState, useEffect, ChangeEvent } from "react";

export interface EditableCellHook<T> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function useEditableCell<T>(
  initialValue: T,
  updateData: (value: T) => void
): EditableCellHook<T> {
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    updateData(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  };

  return {
    value,
    onChange,
    onBlur,
  };
}
