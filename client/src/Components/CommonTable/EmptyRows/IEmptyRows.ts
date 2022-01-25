import { ColumnDefinition } from "../CommonTable";

export interface EmptyRowsProsp<T> {
    getRowClassName(index: number): string,
    numOfRows: number,
    columnDefinitions: ColumnDefinition<T>[],
    hasActionCell: boolean,
    onAddRow?(field: keyof T, value: string): void,
    tableCellStyle: string
}

export interface FocusedEmptyRow<T> {
    index: number,
    field: keyof T | null,
    value: string
}