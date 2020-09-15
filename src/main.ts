import * as core from '@actions/core'
import github from '@actions/github'
import { addHeader } from './utils'

async function run(): Promise<void> {
  const inputs = {
    githubToken: core.getInput('github_token', { required: true }),
    header: core.getInput('header', { required: true }),
    destinationBranch: core.getInput('destination_branch') || 'master',
  }

  const octokit = github.getOctokit(inputs.githubToken)
  const base = inputs.destinationBranch
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
    body: addHeader(inputs.header, currentPr.body),
  }

  core.info(`Updating with new header: ${inputs.header}`)

  await octokit.pulls.update(params)
}

run()
