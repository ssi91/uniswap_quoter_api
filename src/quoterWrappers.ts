import {Quoter, Quoter__factory, QuoterV2, QuoterV2__factory} from "../types/ethers-contracts";
import {AddressLike, BigNumberish, ContractRunner} from "ethers";
import {IQuoterV2} from "../types/ethers-contracts/QuoterV2";
import QuoteExactInputSingleParamsStruct = IQuoterV2.QuoteExactInputSingleParamsStruct;
import QuoteExactOutputSingleParamsStruct = IQuoterV2.QuoteExactOutputSingleParamsStruct;

export class QuoterWrapper {
    protected _contract: Quoter | QuoterV2

    constructor(address: string, rpcProvider: ContractRunner) {
        this._contract = Quoter__factory.connect(address, rpcProvider)
    }

    protected formatInputParams(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amountIn: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ): any[] {
        return [
            tokenIn,
            tokenOut,
            fee,
            amountIn,
            sqrtPriceLimitX96
        ];
    }

    protected formatOutputParams(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amount: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ): any[] {
        return this.formatInputParams(tokenIn, tokenOut, fee, amount, sqrtPriceLimitX96);
    }

    quoteExactInputSingle(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amountIn: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ) {
        const params = this.formatInputParams(
            tokenIn,
            tokenOut,
            fee,
            amountIn,
            sqrtPriceLimitX96
        );
        return this._contract.quoteExactInputSingle.staticCall(...params);
    }

    quoteExactOutputSingle(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amountOut: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ) {
        const params = this.formatOutputParams(
            tokenIn,
            tokenOut,
            fee,
            amountOut,
            sqrtPriceLimitX96
        );
        return this._contract.quoteExactOutputSingle.staticCall(...params);
    }
}

export class QuoterV2Wrapper extends QuoterWrapper {
    constructor(address: string, rpcProvider: ContractRunner) {
        super(address, rpcProvider);
        this._contract = QuoterV2__factory.connect(address, rpcProvider);
    }

    protected formatInputParams(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amountIn: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ) {
        const wrappedParams: QuoteExactInputSingleParamsStruct = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            amountIn: amountIn,
            sqrtPriceLimitX96: sqrtPriceLimitX96
        };
        return [wrappedParams];
    }

    protected formatOutputParams(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amount: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ) {
        const wrappedParams: QuoteExactOutputSingleParamsStruct = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            amount: amount,
            sqrtPriceLimitX96: sqrtPriceLimitX96
        };
        return [wrappedParams];
    }
}
