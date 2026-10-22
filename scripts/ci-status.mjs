// Compact read-only status for push-triggered GitHub Actions runs (the connector filters to PR runs).
const response = await fetch('https://api.github.com/repos/awaljanhematyar/elevate-performance-coaching/actions/runs?per_page=5', { headers: { Accept: 'application/vnd.github+json' } })
if (!response.ok) throw new Error(`Actions status ${response.status}`)
const data = await response.json()
console.log(JSON.stringify(data.workflow_runs.map(run => ({ id: run.id, sha: run.head_sha, status: run.status, conclusion: run.conclusion, url: run.html_url }))))
