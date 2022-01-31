import { Dialog } from "@material-ui/core"
import { getSimulationErrorText } from "../../App/utils";
import { InvalidInputDialogProps } from "./IInvalidInputDialog"

export const InvalidInputDialog = (props: InvalidInputDialogProps) => {
    const errorMessage = getSimulationErrorText(props.error);
    return <Dialog open onClose={props.onClose}>
        {errorMessage}
    </Dialog>
}