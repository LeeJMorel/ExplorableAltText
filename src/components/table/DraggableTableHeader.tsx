import { Header, flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import styles from "./TableHeader.module.scss";
import { Person } from "../../utilities";

interface TableHeaderProps {
  header: Header<Person, unknown>;
}

const DraggableTableHeader: React.FC<TableHeaderProps> = ({ header }) => {
  const { isDragging, setNodeRef, attributes, listeners } = useSortable({
    id: header.column.id,
  });

  const headerClasses = [
    styles.header,
    isDragging && styles.dragging,
    styles.transformed,
    isDragging && styles.zIndex,
  ].join(" ");

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} className={headerClasses}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners} className={styles.button}>
        🟰
      </button>
    </th>
  );
};

export default DraggableTableHeader;
