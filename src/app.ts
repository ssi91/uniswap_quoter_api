import express from 'express';
import {ethers, JsonRpcProvider} from "ethers";
import {Quoter__factory} from "../types/ethers-contracts";

const config = require("../../config.js");

const provider = new JsonRpcProvider(config.rpc);

const quoterABI = require("./../../abi/Quoter.json");

const api = express();

const UNISWAP_QUOTER_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

api.get('/quote/:tokenIn/:tokenOut/:fee/:amountIn', (req, resp) => {
    const quoterContract = Quoter__factory.connect(UNISWAP_QUOTER_ADDRESS, provider);
    const quotePromise = quoterContract.quoteExactInputSingle.staticCall(
        req.params.tokenIn,
        req.params.tokenOut,
        req.params.fee,
        req.params.amountIn,
        0
    );
    quotePromise.then((result) => {
        console.log(result);
        resp.json(result.toString());
    });
});


const host = '0.0.0.0'
const port = "8080"

api.listen(port, () => {
    console.log(`Server listens http://${host}:${port}`)
})
