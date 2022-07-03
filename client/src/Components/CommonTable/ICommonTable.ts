export interface ColumnDefinition<T> {
    field: keyof T,
    text: string
}

export interface CommonTableProps<T> {
    minRows?: number,
    rows: T[],
    columnDefinitions: ColumnDefinition<T>[],
    getKeyFromRow(row: T): string,
    onDeleteRow?(id: string): void,
    onClickEdit?(row: T): void,
    addButton?: JSX.Element
}

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;