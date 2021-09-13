<p>
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/kyranjamie/pull-request-fixed-header/workflows/build/badge.svg"></a>
  <a href="http://www.wtfpl.net/about/"><img alt="License WTFPL" src="https://img.shields.io/badge/License-WTFPL-brightgreen.svg"></a>
</p>

# Pull Request fixed Header

> Keep a custom message on the top of your PR description

This Action is heavily inspired by [fixed-pull-request-comment](https://github.com/marocchino/fixed-pull-request-comment), but instead of having a separated comment, I wanted to update the PR's description instead.

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
      - uses: kyranjamie/pull-request-fixed-header@1.0.0
        with:
          header: '> 🚀 This message is automated and the run number is: **${{ github.run_number }}**'
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
