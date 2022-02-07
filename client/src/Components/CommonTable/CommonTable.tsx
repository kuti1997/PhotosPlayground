import { TableBody, TableHead } from "@material-ui/core";
import { Table, TableCell, TableRow } from "@material-ui/core";
import { useCommonTabletyles } from "./styles";
import { CommonTableRow } from "./CommonTableRow/CommonTableRow";
import { EmptyRows } from "./EmptyRows/EmptyRows";
import { DEFAULT_MIN_ROWS } from "./models";
import Pagination from '@mui/material/Pagination';
import { ChangeEvent, CommonTableProps } from "./ICommonTable";
import { useState } from "react";

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

    const getEmptyRowClassName = (rowIndex: number) => {
        const isOddIndex = (props.rows.length + rowIndex) % 2 === 1;
        return isOddIndex ? classes.oddTableCellColor : classes.evenTableCellColor;
    }

    const numberOfPages = Math.max(1, Math.ceil(props.rows.length / minRows));

    const [pageNumber, setPageNumber] = useState(1);

    const onChangePageNumber = (_: any, pageNumber: number) => {
        setPageNumber(pageNumber);
    }

    const rowsToShow = props.rows.slice((pageNumber - 1) * minRows, (pageNumber - 1) * minRows + minRows);
    const numOfEmptyRows = Math.max(minRows - rowsToShow.length, 0);

    return <>
        <Table>
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
                            hasActionCell && <TableCell className={classes.tableCell} />
                        }
                    </>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rowsToShow.map((row, rowIndex) =>
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

        <div className={classes.paginationRow}>
            <Pagination count={numberOfPages} page={pageNumber} onChange={onChangePageNumber} className={classes.pagination} />
            {props.addButton}
        </div>
    </>
}