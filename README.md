# open-docs

[![Build Status](https://travis-ci.org/jedwards1211/open-docs.svg?branch=master)](https://travis-ci.org/jedwards1211/open-docs)
[![Coverage Status](https://codecov.io/gh/jedwards1211/open-docs/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/open-docs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm version](https://badge.fury.io/js/open-docs.svg)](https://badge.fury.io/js/open-docs)

Opens a package's homepage in your preferred browser, but if the package is
installed locally, and has no homepage or the homepage is just a README, opens
the local copy of its README.md in your preferred editor instead.

# Install

```sh
npm install --global open-docs
```

# CLI

```sh
open-docs react
# opens the homepage for react
open-docs p-timeout
# if p-timeout is installed locally, opens its README.md from the local copy.
# otherwise, opens the homepage for p-timeout (which is just README.md on GitHub)
```

# Node.js API

## `getManpage(query: string | {cwd: string, packageName: string}): string`

```js
const { getManpage } = require('open-docs')

const reactManpage = getManpage('react')
const pTimeoutLocal = getManpage({
  cwd: '/my-project',
  packageName: 'p-timeout',
})
```

### query: `string | {cwd: string, packageName: string}`

Either the package name as a string, or an object with the package name, and
the working directory (`cwd`) to search for a locally installed copy within

### Returns

A URL to the package's homepage, or otherwise a path to the package's
`README.md` if it is installed under `${cwd}/node_modules`. If the package is
not found, throws an `Error`.
