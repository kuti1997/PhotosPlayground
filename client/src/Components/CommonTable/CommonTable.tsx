import { TableBody, TableHead } from "@material-ui/core";
import { Table, TableCell, TableRow } from "@material-ui/core";
import { useCommonTabletyles } from "./CommonTableStyles";
import { CommonTableRow } from "./CommonTableRow/CommonTableRow";
import { EmptyRows } from "./EmptyRows/EmptyRows";
import { DEFAULT_MIN_ROWS } from "./models";

export interface ColumnDefinition<T> {
    field: keyof T,
    text: string,
    isEditable?: boolean
}

interface CommonTableProps<T> {
    minRows?: number,
    rows: T[],
    columnDefinitions: ColumnDefinition<T>[],
    getKeyFromRow(row: T): string,
    onDeleteRow?(id: string): void,
    onEditRow?(id: string, field: keyof T, value: string): void,
    onClickEdit?(row: T): void,
    onAddRow?(field: keyof T, value: string): void
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const CommonTable = <T,>(props: CommonTableProps<T>) => {
    const classes = useCommonTabletyles();

    const getRowClassName = (rowIndex: number) => {
        const isOddIndex = rowIndex % 2 === 1;
        return isOddIndex ? classes.oddTableCellColor : classes.evenTableCellColor;
    }

    const onChangeField = (event: ChangeEvent, row: T, field: keyof T) => {
        props.onEditRow?.(props.getKeyFromRow(row), field, event.target.value);
    }

    const hasActionCell = Boolean(props.onClickEdit || props.onDeleteRow);

    const minRows = props.minRows ?? DEFAULT_MIN_ROWS;
    const numOfEmptyRows = Math.max(minRows - props.rows.length, 0);

    const getEmptyRowClassName = (rowIndex: number) => {
        const isOddIndex = (props.rows.length + rowIndex) % 2 === 1;
        return isOddIndex ? classes.oddTableCellColor : classes.evenTableCellColor;
    }

    return <Table>
        <TableHead>
            <TableRow className={classes.tableHeadRow}>
                <>
                    {
                        props.columnDefinitions.map(columnDefinition =>
                            <TableCell key={columnDefinition.field.toString()} className={classes.tableCell}>
                                {columnDefinition.text}
                            </TableCell>)
                    }
                    {
                        hasActionCell && <TableCell className={classes.tableCell} >
                            Actions
                        </TableCell>
                    }
                </>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                props.rows.map((row, rowIndex) =>
                    <CommonTableRow key={props.getKeyFromRow(row)} row={row}
                        rowClassName={getRowClassName(rowIndex)}
                        cellClassName={classes.tableCell}
                        columnDefinitions={props.columnDefinitions}
                        getKeyFromRow={props.getKeyFromRow}
                        onDeleteRow={props.onDeleteRow}
                        onChangeField={onChangeField}
                        onClickEdit={props.onClickEdit} />
                )
            }

            {
                numOfEmptyRows > 0 &&
                <EmptyRows getRowClassName={getEmptyRowClassName}
                    numOfRows={numOfEmptyRows}
                    columnDefinitions={props.columnDefinitions}
                    hasActionCell={hasActionCell}
                    onAddRow={props.onAddRow}
                    tableCellStyle={classes.tableCell} />
            }

        </TableBody>
    </Table>
}