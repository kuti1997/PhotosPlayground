import { TableCell, TableRow, TextField } from "@material-ui/core";
import { useState } from "react";
import { v4 } from "uuid";
import { ChangeEvent, ColumnDefinition } from "../CommonTable";

interface EmptyRowsProsp<T> {
    getRowClassName(index: number): string,
    numOfRows: number,
    columnDefinitions: ColumnDefinition<T>[],
    hasActionCell: boolean,
    onAddRow?(field: keyof T, value: string): void,
    tableCellStyle: string
}

interface FocusedEmptyRow<T> {
    index: number,
    field: keyof T | null,
    value: string
}

export const getNewEmptyRows = (numOfRows: number) => {
    return [...Array(numOfRows)].map(_ => v4())
}

export const EmptyRows = <T,>(props: EmptyRowsProsp<T>) => {
    const { getRowClassName, columnDefinitions, hasActionCell, onAddRow, tableCellStyle, numOfRows } = props;

    const [emptyRows, setEmptyRows] = useState(getNewEmptyRows(numOfRows));

    const [focusedEmptyRow, setFocusedEmptyRow] = useState<FocusedEmptyRow<T>>({
        index: -1,
        field: null,
        value: ''
    });

    const onChangeEmptyRowCell = (event: ChangeEvent, rowIndex: number, field: keyof T) => {
        setFocusedEmptyRow({ index: rowIndex, field, value: event.target.value });
    }

    const onBlur = () => {
        if (focusedEmptyRow.value.trim() !== "") {
            setEmptyRows(emptyRows.filter((_: any, index: number) => index !== focusedEmptyRow.index));
            onAddRow?.(focusedEmptyRow.field as keyof T, focusedEmptyRow.value);
        }
        setFocusedEmptyRow({
            index: -1,
            field: null,
            value: ''
        });
    }

    return <>
        {
            emptyRows.map((emptyRow: string, rowIndex: number) => {
                return <TableRow key={emptyRow} className={getRowClassName(rowIndex)}>
                    <>
                        {
                            columnDefinitions.map((columnDefinition, columnIndex: number) =>
                                <TableCell key={columnIndex} className={tableCellStyle} >
                                    {
                                        columnDefinition.isEditable &&
                                        <TextField value={focusedEmptyRow.index === rowIndex && focusedEmptyRow.field === columnDefinition.field
                                            ? focusedEmptyRow.value
                                            : ''}
                                            onChange={(event: ChangeEvent) => onChangeEmptyRowCell(event, rowIndex, columnDefinition.field)}
                                            onBlur={onBlur} />
                                    }
                                </TableCell>
                            )
                        }
                        {
                            hasActionCell && <TableCell className={tableCellStyle} />
                        }
                    </>
                </TableRow>
            })
        }
    </>
}