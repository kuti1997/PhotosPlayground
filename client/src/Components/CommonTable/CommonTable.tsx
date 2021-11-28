import { IconButton, TableBody, TableHead } from "@material-ui/core";
import { Table, TableCell, TableRow, TextField } from "@material-ui/core";
import { useCommonTabletyles } from "./CommonTableStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export interface ColumnDefinition<T> {
    field: keyof T,
    text: string
}

interface CommonTableProps<T> {
    minRows?: number,
    rows: T[],
    columnDefinitions: ColumnDefinition<T>[],
    getKeyFromRow(row: T): string,
    onDeleteRow?(row: T): void,
    onEditRow?(row: T): void,
    fieldChanged?(row: T, field: keyof T, value: string): void
}

const DEFAULT_MIN_ROWS = 5;

export const CommonTable = <T,>(props: CommonTableProps<T>) => {
    const classes = useCommonTabletyles();

    const getRowClassName = (rowIndex: number) => {
        const isOddIndex = rowIndex % 2 === 1;
        return isOddIndex ? classes.oddTableCellColor : classes.evenTableCellColor;
    }

    const getEmptyRows = () => {
        const minRows = props.minRows ?? DEFAULT_MIN_ROWS;
        const emptyRowsCount = Math.max(0, minRows - props.rows.length);

        let emptyRows = [];
        for (let rowIndex = props.rows.length; rowIndex < minRows; rowIndex++) {
            emptyRows.push(<TableRow key={rowIndex} className={getRowClassName(rowIndex)}>
                <>
                    {
                        props.columnDefinitions.map((_, index: number) =>
                            <TableCell key={index} className={classes.tableCell} />
                        )
                    }
                    {
                        props.onDeleteRow
                        && <TableCell className={classes.tableCell} />
                    }
                    {
                        props.onEditRow
                        && <TableCell className={classes.tableCell} />
                    }
                </>
            </TableRow>);
        }
        return emptyRows;
    }

    const onChangeField = (event: React.ChangeEvent<HTMLInputElement>, row: T, field: keyof T) => {
        props.fieldChanged?.(row, field, event.target.value);
    }

    return <Table>
        <TableHead>
            <TableRow className={classes.tableHeadRow}>
                <>
                    {
                        props.onDeleteRow
                        && <TableCell className={classes.tableCell} >
                            Delete Item
                        </TableCell>
                    }
                    {
                        props.onEditRow
                        && <TableCell className={classes.tableCell} >
                            Edit Item
                        </TableCell>
                    }
                    {
                        props.columnDefinitions.map(columnDefinition =>
                            <TableCell key={columnDefinition.field.toString()} className={classes.tableCell}>
                                {columnDefinition.text}
                            </TableCell>)
                    }
                </>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                props.rows.map((row, rowIndex) =>
                    <TableRow key={props.getKeyFromRow(row)} className={getRowClassName(rowIndex)}>
                        {
                            <>
                                {
                                    props.onDeleteRow
                                    && <TableCell>
                                        <IconButton onClick={() => props.onDeleteRow?.(row)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                }
                                {
                                    props.onEditRow
                                    && <TableCell>
                                        <IconButton onClick={() => props.onEditRow?.(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                }
                                {
                                    props.columnDefinitions.map(columnDefinition =>
                                        <TableCell className={classes.tableCell} key={columnDefinition.field.toString()}>
                                            {
                                                !props.fieldChanged
                                                    ? row[columnDefinition.field]
                                                    : <TextField value={row[columnDefinition.field]}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(event, row, columnDefinition.field)} />

                                            }
                                        </TableCell>
                                    )
                                }
                            </>
                        }
                    </TableRow>)
            }
            {
                getEmptyRows()
            }
        </TableBody>
    </Table>
}