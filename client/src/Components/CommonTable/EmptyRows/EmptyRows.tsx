import { TableCell, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { usePrevious } from "../../../utils/hooks";
import {  ColumnDefinition } from "../ICommonTable";
import { getNewEmptyRows } from "./EmptyRowsModels";
import { EmptyRowsProsp } from "./IEmptyRows";

export const EmptyRows = <T,>(props: EmptyRowsProsp<T>) => {
    const { getRowClassName, columnDefinitions, hasActionCell, tableCellStyle, numOfRows } = props;

    const [emptyRows, setEmptyRows] = useState(getNewEmptyRows(numOfRows));

    const prevNumOfRows = usePrevious(numOfRows);

    useEffect(() => {
        if (prevNumOfRows !== undefined) {
            prevNumOfRows < numOfRows
                ? setEmptyRows([...emptyRows, v4()])
                : setEmptyRows(emptyRows.slice(1, emptyRows.length))

        }
    }, [numOfRows]);

    return <>
        {
            emptyRows.map((emptyRow: string, rowIndex: number) => {
                return <TableRow key={emptyRow} className={getRowClassName(rowIndex)}>
                    {
                        columnDefinitions.map((_columnDefinition: ColumnDefinition<T>, columnIndex: number) =>
                            <TableCell key={columnIndex} className={tableCellStyle} />
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