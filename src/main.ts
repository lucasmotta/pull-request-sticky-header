import * as core from '@actions/core'
import * as github from '@actions/github'
import { addHeader } from './utils'

async function run(): Promise<void> {
  const githubToken = core.getInput('github_token', { required: true })
  const header = core.getInput('header', { required: true })
  const base = core.getInput('destination_branch') || 'master'
  const octokit = github.getOctokit(githubToken)
  const source = github.context.ref.replace(/^refs\/heads\//, '')

  core.info(`Look up a pull request with source=${source} base=${base}`)
  const { data: pulls } = await octokit.pulls.list({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    base,
    head: `${github.context.repo.owner}:${source}`,
  })

  if (pulls.length === 0) {
    core.info(`No such pull request: source=${source} base=${base}`)
    return
  }

  const currentPr = pulls[0]

  core.info(`Found pull request #${currentPr.number}`)

  const params = {
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: currentPr.number,
    body: addHeader(header, currentPr.body),
  }

  core.info(`Updating with new header: ${header}`)

  await octokit.pulls.update(params)
}

run()
