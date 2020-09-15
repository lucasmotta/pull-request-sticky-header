<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/lucasmotta/pull-request-sticky-header/workflows/build/badge.svg"></a>
  <a href="http://www.wtfpl.net/about/"><img alt="License WTFPL" src="https://img.shields.io/badge/License-WTFPL-brightgreen.svg"></a>
</p>

# Pull Request Sticky Header

> Keep a custom message on the top of your PR description

This Action is heavily inspired by [sticky-pull-request-comment](https://github.com/marocchino/sticky-pull-request-comment) and [update-pr-description](https://github.com/kt3k/update-pr-description).

```yml
name: PRSH example
on:
  pull_request:
    branches:
      - master
jobs:
  pull-request:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: lucasmotta/pull-request-sticky-header@1.0.0
        with:
          header: '> 🚀 This message is automated and the run number is: **${{ github.run_number }}**'
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

My use case was that I wanted to keep the latest download links or our apps for testers and reviewers.

If you are new, there's also a simpler introduction. See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)
