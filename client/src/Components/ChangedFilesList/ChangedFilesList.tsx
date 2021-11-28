import { useEffect, useState } from "react";
import { ColumnDefinition, CommonTable } from "../CommonTable/CommonTable"
import { useAppSelector } from "../../Store/hooks";

export interface ChangedFile {
    oldFilePath: string,
    newFilePath: string
}

interface VisualChangedFile {
    changedFile: string
}

export const ChangedFilesList = () => {
    const changedFiles = useAppSelector((state) => state.changedFiles.changedFiles)

    const [changedFilesList, setChangedFilesList] = useState<VisualChangedFile[]>([]);

    useEffect(() => {
        setChangedFilesList(changedFiles.map(changedFile => { return { changedFile: `${changedFile.oldFilePath} => ${changedFile.newFilePath}` } }));
    }, changedFiles);

    const columnDefinitions: ColumnDefinition<VisualChangedFile>[] = [{
        field: "changedFile",
        text: "changed Files"
    }];

    const getKeyFromRow = (row: VisualChangedFile) => {
        return row.changedFile;
    }

    return <CommonTable columnDefinitions={columnDefinitions} rows={changedFilesList} getKeyFromRow={getKeyFromRow} />
}