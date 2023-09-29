Self-hosted API to call Uniswap's Quoter Contract ([Quoter](https://docs.uniswap.org/contracts/v3/reference/periphery/lens/Quoter) and [QuoterV2](https://docs.uniswap.org/contracts/v3/reference/periphery/lens/QuoterV2) as well).  

## End-Points
### Quote exact input single
```
/quote/:tokenIn/:tokenOut/:fee/:amountIn
```
* `tokenIn` - address of token to sell
* `tokenOut` - address of token to buy
* `fee` - fee percentage scaled by `10^4`
* `amountIn` - amount of tokens `tokenIn` to sell

#### Response
```json
{
  "amountOut": <amountOut>
}
```
#### Example
To request how much tokens well be received the [pool](https://info.uniswap.org/#/pools/0x7379e81228514a1d2a6cf7559203998e20598346)
swapping [sETH2](https://info.uniswap.org/#/tokens/0xfe2e637202056d30016725477c5da089ab0a043a) for the [wrapped ETH](https://info.uniswap.org/#/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2):
```
/quote/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
So, response will be:
```json
{
  "amountOut": "992"
}
```

### Quote exact input single from QuoterV2
```
/quotev2/:tokenIn/:tokenOut/:fee/:amountIn
```
URL-parameters are the same as described above.
#### Response
```json
{
    "amountOut": <amountOut>,
    "sqrtPriceX96After":,
    "initializedTicksCrossed":,
    "gasEstimate":
}
```
#### Example
To request quote for the same pool as was presented above:
```
/quotev2/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
```json
{
    "amountOut": "992",
    "sqrtPriceX96After": "79425280725702617941369357366",
    "initializedTicksCrossed": "1",
    "gasEstimate": "80299"
}
```
