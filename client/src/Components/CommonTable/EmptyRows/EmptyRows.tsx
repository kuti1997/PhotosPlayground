import { TableCell, TableRow, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { usePrevious } from "../../../utils/hooks";
import { ChangeEvent, ColumnDefinition } from "../ICommonTable";
import { getNewEmptyRows } from "./EmptyRowsModels";
import { EmptyRowsProsp, FocusedEmptyRow } from "./IEmptyRows";
import { useEmptyRowsStyles } from "./styles";

export const EmptyRows = <T,>(props: EmptyRowsProsp<T>) => {
    const classes = useEmptyRowsStyles();

    const { getRowClassName, columnDefinitions, hasActionCell, onAddRow, tableCellStyle, numOfRows } = props;

    const [emptyRows, setEmptyRows] = useState(getNewEmptyRows(numOfRows));

    const prevNumOfRows = usePrevious(numOfRows);

    useEffect(() => {
        if (prevNumOfRows !== undefined && prevNumOfRows < numOfRows) {
            setEmptyRows([...emptyRows, v4()]);
        }
    }, [numOfRows]);

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

    const getTextFieldValue = (rowIndex: number, field: keyof T) => {
        return focusedEmptyRow.index === rowIndex && focusedEmptyRow.field === field
            ? focusedEmptyRow.value
            : '';
    }

    return <>
        {
            emptyRows.map((emptyRow: string, rowIndex: number) => {
                return <TableRow key={emptyRow} className={getRowClassName(rowIndex)}>
                    {
                        columnDefinitions.map((columnDefinition: ColumnDefinition<T>, columnIndex: number) =>
                            <TableCell key={columnIndex} className={tableCellStyle} >
                                {
                                    columnDefinition.isEditable &&
                                    <TextField className={classes.textField} value={getTextFieldValue(rowIndex, columnDefinition.field)}
                                        onChange={(event: ChangeEvent) => onChangeEmptyRowCell(event, rowIndex, columnDefinition.field)}
                                        onBlur={onBlur} />
                                }
                            </TableCell>
                        )
                    }
                    {
                        hasActionCell && <TableCell className={tableCellStyle} />
                    }
                </TableRow>
            })
        }
    </>
}