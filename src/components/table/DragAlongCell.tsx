import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, Cell } from "@tanstack/react-table";
import styles from "./Table.module.scss";
import { Person } from "../../utilities";

const DragAlongCell = ({ cell }: { cell: Cell<Person, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const cellClass = isDragging ? styles.dragging : styles.cell;

  const style = {
    transform: CSS.Translate.toString(transform),
    width: cell.column.getSize(),
  };

  return (
    <td
      className={`${cellClass} ${styles.cell}`}
      style={style}
      ref={setNodeRef}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default DragAlongCell;
