import { IconButton } from "@material-ui/core";
import { TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ColumnDefinition } from "../ICommonTable";
import { useCommonTableRowStyles } from "./styles";

interface CommonTableRowProps<T> {
    row: T,
    rowClassName: string,
    cellClassName: string,
    columnDefinitions: ColumnDefinition<T>[],
    getKeyFromRow(row: T): string,
    onDeleteRow?(id: string): void,
    onClickEdit?(row: T): void
}

export const CommonTableRow = <T,>(props: CommonTableRowProps<T>) => {
    const { row, rowClassName, cellClassName } = props;
    const renderActionCell = props.onDeleteRow || props.onClickEdit;

    const classes = useCommonTableRowStyles();

    const onClickDelete = () => {
        props.onDeleteRow?.(props.getKeyFromRow(row));
    }

    const onClickEdit = () => {
        props.onClickEdit?.(row);
    }

    return <TableRow key={props.getKeyFromRow(row)} className={`${rowClassName} ${classes.row}`} >
        <>
            {
                props.columnDefinitions.map(columnDefinition =>
                    <TableCell className={cellClassName} key={columnDefinition.field.toString()}>
                        {
                           row[columnDefinition.field]
                        }
                    </TableCell>
                )
            }
            {
                renderActionCell &&
                <TableCell>
                    {
                        props.onDeleteRow &&
                        <IconButton onClick={onClickDelete} className="hidden-button">
                            <DeleteIcon />
                        </IconButton>
                    }
                    {
                        props.onClickEdit &&
                        <IconButton onClick={onClickEdit} className="hidden-button">
                            <EditIcon />
                        </IconButton>

                    }

                </TableCell>
            }
        </>
    </TableRow >
}