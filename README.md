# eps-widget
React widget to be installed within other React applications for interacting with The Ethereum Postal Service.

```sh
    yarn add https://github.com/EthereumPostalService/eps-widget
```

## Usage
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

There are two optional parameters
- `contractAddress` – if not supplied, defaults to EPS (0x2156fcCff55637317D211B62318007309378fB95)
- `encryptedDestination` – if supplied, only displays message fields, sends all postage to the encrypted address

`TODO(sragss): how to run script for encryption of a destination`

# notes
- Wagmi should be installed by the repository owner (peer dependencies)
- Depends on ethers v5 rather than v6 due to Wagmi

# local dev
- `yarn start` will spin up [storybook](https://storybook.js.org/) at localhost:6060
- `yarn build` will package into `./dist`

# todo

- [x] Fix storyboard for local testing without install
- [x] Comments for hover on EPSWidget / EPSMailForm 
- [x] Good readme
- [x] Grid container issue
- [ ] Show default encrypted address in the widget
- [ ] Bundle strategy for images
- [ ] Still requires the downloader self host the `eps-logo.png` image. This is a problem.
- [ ] Fix nextjs consumer build errors cannot find (lokijs / encoding / pino-pretty)

# Credits

- From [KaiHotz template](https://github.com/KaiHotz/react-rollup-boilerplate)
- Used [this example](https://github.com/family/connectkit/blob/main/packages/connectkit/rollup.config.dev.js) heavily. Notably ran into an issue with the KaiHotz template where wagmi would not install due to cjs and ejs problems, swapped over to ESM in rollup.config.js and sorted it.
