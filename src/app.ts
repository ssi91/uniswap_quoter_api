import express from 'express';
import {ethers, JsonRpcProvider} from "ethers";
import {Quoter__factory, QuoterV2__factory} from "../types/ethers-contracts";

const config = require("../../config.json");

const provider = new JsonRpcProvider(config.rpc);

const api = express();

const UNISWAP_QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
const UNISWAP_QUOTER_V2_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e';

api.get('/quote/:tokenIn/:tokenOut/:fee/:amountIn', (req, resp) => {
    const quoterContract = Quoter__factory.connect(UNISWAP_QUOTER_ADDRESS, provider);
    const quotePromise = quoterContract.quoteExactInputSingle.staticCall(
        req.params.tokenIn,
        req.params.tokenOut,
        req.params.fee,
        req.params.amountIn,
        0
    );
    quotePromise.then((result: bigint) => {
        console.log(result);
        resp.json(result.toString());
    });
});

api.get('/quotev2/:tokenIn/:tokenOut/:fee/:amountIn', (req, resp) => {
    const params = {
        tokenIn: req.params.tokenIn,
        tokenOut: req.params.tokenOut,
        fee: req.params.fee,
        amountIn: req.params.amountIn,
        sqrtPriceLimitX96: 0
    };
    const quoterV2Contract = QuoterV2__factory.connect(UNISWAP_QUOTER_V2_ADDRESS, provider);

    const quoteV2Promise = quoterV2Contract.quoteExactInputSingle.staticCall(params);
    quoteV2Promise.then((value) => {
        let result = {
            amountOut: value.amountOut.toString(),
            sqrtPriceX96After: value.sqrtPriceX96After.toString(),
            initializedTicksCrossed: value.initializedTicksCrossed.toString(),
            gasEstimate: value.gasEstimate.toString()
        };
        resp.json(result)
    });
});

const host = '0.0.0.0'
const port = "8080"

api.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})
