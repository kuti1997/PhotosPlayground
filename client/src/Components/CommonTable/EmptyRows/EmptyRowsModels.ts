import { v4 } from "uuid";

export const getNewEmptyRows = (numOfRows: number) => {
    return [...Array(numOfRows)].map(_ => v4())
}