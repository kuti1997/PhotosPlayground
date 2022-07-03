import { ColumnDefinition } from "../ICommonTable";

export interface EmptyRowsProsp<T> {
    getRowClassName(index: number): string,
    numOfRows: number,
    columnDefinitions: ColumnDefinition<T>[],
    hasActionCell: boolean,
    tableCellStyle: string
}

export interface FocusedEmptyRow<T> {
    index: number,
    field: keyof T | null,
    value: string
}