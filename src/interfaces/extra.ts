import type { SnackbarType } from "./types";

export interface ISnackbarSettings{
    open: boolean;
    msg: string;
    type: SnackbarType;
}