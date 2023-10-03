Self-hosted API to call Uniswap's Quoter Contract ([Quoter](https://docs.uniswap.org/contracts/v3/reference/periphery/lens/Quoter) and [QuoterV2](https://docs.uniswap.org/contracts/v3/reference/periphery/lens/QuoterV2) as well).  

## Installation and Run
### Before start
The first thing that must be done is to create config file:
```bash
cp ./config.json.example ./config.json
```
Then, set your RPC node end-point in the config file:
```json
{
  "rpc": "<set your end-point here>"
}
```
### `npm install`
1. Install dependencies:
```bash
npm install
```
2. Compile *.ts sources:
```bash
npx tsc
```
3. Run the server:
```bash
node ./js/src/app.js
```

### Docker
An alternative way to run the service is building and running docker container:
```bash
QUOTER_API_IMAGE=<set your image tag>
docker build . -t $QUOTER_API_IMAGE
docker run -ti -p 8080:8080 $QUOTER_API_IMAGE
```

## End-Points
### Quote exact input single
```
/quote/exact_input/:tokenIn/:tokenOut/:fee/:amountIn
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
To request how many tokens will be received the [pool](https://info.uniswap.org/#/pools/0x7379e81228514a1d2a6cf7559203998e20598346)
swapping [sETH2](https://info.uniswap.org/#/tokens/0xfe2e637202056d30016725477c5da089ab0a043a) for the [wrapped ETH](https://info.uniswap.org/#/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2):
```
/quote/exact_input/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
So, response will be:
```json
{
  "amountOut": "992"
}
```

### Quote exact input single from QuoterV2
```
/quotev2/exact_input/:tokenIn/:tokenOut/:fee/:amountIn
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
/quotev2/exact_input/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
```json
{
    "amountOut": "992",
    "sqrtPriceX96After": "79425280725702617941369357366",
    "initializedTicksCrossed": "1",
    "gasEstimate": "80299"
}
```
### Quote exact output single
```
/quote/exact_output/:tokenIn/:tokenOut/:fee/:amountOut
```
* `tokenIn` - address of token to sell
* `tokenOut` - address of token to buy
* `fee` - fee percentage scaled by `10^4`
* `amountOut` - amount of tokens `tokenOut` to buy

#### Response
```json
{
  "amountIn": <amountIn>
}
```
#### Example
To request how many tokens needed to be sent the [pool](https://info.uniswap.org/#/pools/0x7379e81228514a1d2a6cf7559203998e20598346)
swapping [sETH2](https://info.uniswap.org/#/tokens/0xfe2e637202056d30016725477c5da089ab0a043a) for the [wrapped ETH](https://info.uniswap.org/#/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2):
```
/quote/exact_output/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
So, response will be:
```json
{
  "amountIn": "1009"
}
```
### Quote exact output single from QuoterV2
```
/quotev2/exact_output/:tokenIn/:tokenOut/:fee/:amountOut
```
URL-parameters are the same as described above.
#### Response
```json
{
    "amountIn": <amountIn>,
    "sqrtPriceX96After":,
    "initializedTicksCrossed":,
    "gasEstimate":
}
```
#### Example
To request quote for the same pool as was presented above:
```
/quotev2/exact_output/0xfe2e637202056d30016725477c5da089ab0a043a/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/3000/1000
```
```json
{
  "amountIn": "1009",
  "sqrtPriceX96After": "79425355379809575002830464896",
  "initializedTicksCrossed": "1",
  "gasEstimate": "81475"
}
```

### Quote exact input multiple pools from Quoter
```
POST /quote/exact_input/path/
```
Body:
```json
{
    "path": [
        {
            "tokenIn":,
            "fee":,
            "tokenOut":
        },
        {
            "fee":,
            "tokenOut":
        }
    ],
    "amountIn":
}

```
#### Response
```json
{
    "amountOut":
}
```
#### Example
```
{
    "path": [
        {
            "tokenIn": "0xfe2e637202056d30016725477c5da089ab0a043a",
            "fee": 3000,
            "tokenOut": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        },
        {
            "fee": 100,
            "tokenOut": "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0"
        }
    ],
    "amountIn": 1000
}
```
#### Response
```json
{
  "amountOut": "868"
}
```

### Quote exact input multiple pools from QuoterV2
```
POST /quotev2/exact_input/path/
```
Body:
```json
{
    "path": [
        {
            "tokenIn":,
            "fee":,
            "tokenOut":
        },
        {
            "fee":,
            "tokenOut":
        }
    ],
    "amountIn":
}

```
#### Response
```json
{
    "amountOut":,
    "sqrtPriceX96AfterList": [
    ],
    "initializedTicksCrossed": [
    ],
    "gasEstimate":
}
```
#### Example
```
{
    "path": [
        {
            "tokenIn": "0xfe2e637202056d30016725477c5da089ab0a043a",
            "fee": 3000,
            "tokenOut": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        },
        {
            "fee": 100,
            "tokenOut": "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0"
        }
    ],
    "amountIn": 1000
}
```
#### Response
```json
{
  "amountOut": "868",
  "sqrtPriceX96AfterList": [
    "79425391438907057034580267277",
    "84632450067933843376332582064"
  ],
  "initializedTicksCrossed": [
    "1",
    "1"
  ],
  "gasEstimate": "154436"
}
```
