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
export const encodePath = (jsonPath: [{ tokenIn: string, fee: number, tokenOut: string }]) => {
    let contractPath: string = "";

    for (let i = 0; i < jsonPath.length; ++i) {
        if (i === 0) {
            contractPath += jsonPath[i].tokenIn;
        }
        contractPath += jsonPath[i].fee.toString(16).padStart(6, '0');
        contractPath += jsonPath[i].tokenOut.slice(2);
    }

    console.log(contractPath);
    return contractPath
}
