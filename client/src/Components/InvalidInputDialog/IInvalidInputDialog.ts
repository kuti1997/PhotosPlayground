import { SimulationInputError } from "../../App/utils";

export interface InvalidInputDialogProps {
    error: SimulationInputError,
    onClose(): void
}