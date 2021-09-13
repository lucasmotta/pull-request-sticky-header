import * as core from '@actions/core'
import * as github from '@actions/github'
import { addHeader } from './utils'

async function run(): Promise<void> {
  const pullNumber = github.context.payload.pull_request?.number || 0

  if (isNaN(pullNumber) || pullNumber < 1) {
    core.info('Not a pull request, skipping it...')
    return
  }

  try {
    const githubToken = core.getInput('github_token', { required: true })
    const header = core.getInput('header', { required: true })
    const octokit = github.getOctokit(githubToken)
    const repo = github.context.repo

    const pullRequest = await octokit.pulls.get({
      ...repo,
      pull_number: pullNumber,
    })

    console.log(pullRequest)

    core.debug(JSON.stringify(pullRequest))

    const params = {
      ...github.context.repo,
      pull_number: pullNumber,
      body: addHeader(header, pullRequest?.data?.body || ''),
    }

    await octokit.pulls.update(params)
  } catch ({ message }) {
    if (typeof message === 'string') core.setFailed(message)
  }
}

run()
