export interface ColumnDefinition<T> {
    field: keyof T,
    text: string,
    isEditable?: boolean
}

export interface CommonTableProps<T> {
    minRows?: number,
    rows: T[],
    columnDefinitions: ColumnDefinition<T>[],
    getKeyFromRow(row: T): string,
    onDeleteRow?(id: string): void,
    onEditRow?(id: string, field: keyof T, value: string): void,
    onClickEdit?(row: T): void,
    onAddRow?(field: keyof T, value: string): void,
    addButton?: JSX.Element
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;