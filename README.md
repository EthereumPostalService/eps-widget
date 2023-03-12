# eps-widget

![Logo](src/resources/eps-logo.png)

React widget to be installed within other React applications for interacting with The Ethereum Postal Service.

## Usage

```sh
    yarn add wagmi https://github.com/EthereumPostalService/eps-widget
```

```tsx
import { EPSWidget } from 'eps-widget';

export function someContainer() {
    return (
        <div>
            <EPSWidget></EPSWidget>
        <div>
    )
}
```

### Optional Parameters

- `contractAddress` – if not supplied, defaults to EPS (`0x2156fcCff55637317D211B62318007309378fB95`)
- `encryptedDestination` – if supplied, only displays message fields, sends all postage to the encrypted address

### Destination pre-encryption

The most common usecase of widget will be to allow website users to send postage to the website owner without knowing the owner's address. This can be enabled by pre-encrypting the address and passing the encrypted postal address into the widget.

To pre-encrypt a destination address:

```sh
    yarn add https://github.com/EthereumPostalService/eps-scripts --save-dev
    ts-node ./node_modules/eps-scripts/encrypt-interactive.ts -r <rpc url>
```

Then pass the value to the widget.

```tsx
import { EPSWidget } from 'eps-widget';

export function someContainer() {
    return (
        <div>
            <EPSWidget encryptedDestination={"<encrypted address>"}></EPSWidget>
        <div>
    )
}
```

# Local dev

- `yarn start` spins up [storybook](https://storybook.js.org/) at localhost:6060
- `yarn build` packages into `./dist`

# Notes

- Wagmi should be installed by the repository owner (peer dependencies)
- Depends on ethers v5 rather than v6 due to Wagmi
- Node 18 can cause build failures: `export NODE_OPTIONS=--openssl-legacy-provider`
