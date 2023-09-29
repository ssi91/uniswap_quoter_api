import express from 'express';
import {JsonRpcProvider} from "ethers";
import {QuoterV2Wrapper, QuoterWrapper} from "./quoterWrappers";
import {errorHandler} from "./helpers";

const config = require("../../config.json");

const provider = new JsonRpcProvider(config.rpc);

const api = express();

const UNISWAP_QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
const UNISWAP_QUOTER_V2_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e';

api.get('/quote/:tokenIn/:tokenOut/:fee/:amountIn', (req, resp) => {
    const quoterContract = new QuoterWrapper(UNISWAP_QUOTER_ADDRESS, provider);
    const quotePromise = quoterContract.quoteExactInputSingle(
        req.params.tokenIn,
        req.params.tokenOut,
        req.params.fee,
        req.params.amountIn,
        0
    );
    quotePromise.then((result) => {
        resp.json({
            amountOut: result.toString()
        });
    });
    quotePromise.catch(errorHandler(resp));
});

api.get('/quotev2/:tokenIn/:tokenOut/:fee/:amountIn', (req, resp) => {
    const params = {
        tokenIn: req.params.tokenIn,
        tokenOut: req.params.tokenOut,
        fee: req.params.fee,
        amountIn: req.params.amountIn,
        sqrtPriceLimitX96: 0
    };
    const quoterV2Contract = new QuoterV2Wrapper(UNISWAP_QUOTER_V2_ADDRESS, provider);

    const quoteV2Promise = quoterV2Contract.quoteExactInputSingle(
        req.params.tokenIn,
        req.params.tokenOut,
        req.params.fee,
        req.params.amountIn,
        0
    );
    quoteV2Promise.then((value) => {
        if (typeof value !== "bigint") {
            let result = {
                amountOut: value.amountOut.toString(),
                sqrtPriceX96After: value.sqrtPriceX96After.toString(),
                initializedTicksCrossed: value.initializedTicksCrossed.toString(),
                gasEstimate: value.gasEstimate.toString()
            };
            resp.json(result);
        }
    });
    quoteV2Promise.catch(errorHandler(resp));
});

const host = '0.0.0.0'
const port = "8080"

api.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})
