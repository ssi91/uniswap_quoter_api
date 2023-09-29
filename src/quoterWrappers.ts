import {Quoter, Quoter__factory, QuoterV2, QuoterV2__factory} from "../types/ethers-contracts";
import {AddressLike, BigNumberish, ContractRunner} from "ethers";
import {IQuoterV2} from "../types/ethers-contracts/QuoterV2";
import QuoteExactInputSingleParamsStruct = IQuoterV2.QuoteExactInputSingleParamsStruct;

export class QuoterWrapper {
    protected _contract: Quoter | QuoterV2

    constructor(address: string, rpcProvider: ContractRunner) {
        this._contract = Quoter__factory.connect(address, rpcProvider)
    }

    protected formatParams(
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

    quoteExactInputSingle(
        tokenIn: AddressLike,
        tokenOut: AddressLike,
        fee: BigNumberish,
        amountIn: BigNumberish,
        sqrtPriceLimitX96: BigNumberish
    ) {
        const params = this.formatParams(
            tokenIn,
            tokenOut,
            fee,
            amountIn,
            sqrtPriceLimitX96
        );
        return this._contract.quoteExactInputSingle.staticCall(...params);
    }
}

export class QuoterV2Wrapper extends QuoterWrapper {
    constructor(address: string, rpcProvider: ContractRunner) {
        super(address, rpcProvider);
        this._contract = QuoterV2__factory.connect(address, rpcProvider);
    }

    protected formatParams(
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
}
