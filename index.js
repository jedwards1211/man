#!/usr/bin/env node

function getManpage(query) {
  if (typeof query === 'string') query = { packageName: query }
  const { cwd = process.cwd(), packageName } = query
  let packageJson
  try {
    packageJson = require(require.resolve(`${packageName}/package.json`, {
      paths: [cwd],
    }))
  } catch (error) {
    packageJson = JSON.parse(
      require('child_process')
        .execSync(`npm view --json ${packageName}`)
        .toString('utf8')
    )
  }
  const { homepage, repo } = packageJson

  let readme
  try {
    readme = require.resolve(`${packageName}/README.md`, {
      paths: [cwd],
    })
  } catch (error) {
    try {
      readme = require.resolve(`${packageName}/readme.md`, {
        paths: [cwd],
      })
    } catch (error) {
      if (repo && repo.url) {
        readme = repo.url.replace(/(\.git)?\/?$/, '#readme')
      }
    }
  }
  if (readme && (!homepage || /(#readme|readme.md)$/i.test(homepage))) {
    return readme
  }

  return homepage || readme || `https://npmjs.com/package/${packageName}`
}

exports.getManpage = getManpage

// istanbul ignore next
if (!module.parent) {
  if (!process.argv[2]) {
    console.error(`Usage: npmman <package>`) // eslint-disable-line no-console
    process.exit(1)
  }

  const manpage = getManpage({ packageName: process.argv[2] })
  require('opn')(manpage)
  process.exit(0)
}
