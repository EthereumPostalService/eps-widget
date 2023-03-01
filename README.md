# eps-widget

- Note: Storybook is not working due to "Field 'browser' doesn't contain a valid alias configuration" and some other strange errors where Etheres is exporting BigNumber.

# todo

- [ ] Still requires the downloader self host the `eps-logo.png` image. This is a problem.

# Credits

- From [KaiHotz template](https://github.com/KaiHotz/react-rollup-boilerplate)
- Used [this example](https://github.com/family/connectkit/blob/main/packages/connectkit/rollup.config.dev.js) heavily. Notably ran into an issue with the KaiHotz template where wagmi would not install due to cjs and ejs problems, swapped over to ESM in rollup.config.js and sorted it.
