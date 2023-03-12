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

Two optional parameters

- `contractAddress` – if not supplied, defaults to EPS (`0x2156fcCff55637317D211B62318007309378fB95`)
- `encryptedDestination` – if supplied, only displays message fields, sends all postage to the encrypted address

`TODO(sragss): how to run script for encryption of a destination`

# Local dev

- `yarn start` spins up [storybook](https://storybook.js.org/) at localhost:6060
- `yarn build` packages into `./dist`

# Notes

- Wagmi should be installed by the repository owner (peer dependencies)
- Depends on ethers v5 rather than v6 due to Wagmi
- Node 18 can cause build failures: `export NODE_OPTIONS=--openssl-legacy-provider`
