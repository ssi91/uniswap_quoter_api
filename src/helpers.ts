import {Response} from "express-serve-static-core";

export const errorHandler = (resp: Response<any, Record<string, any>, number>) => {
    return (reason: any) => {
        console.error(reason)
        resp.status(500);
        resp.json({
            reason: reason.toString()
        });
    }
}
