// Publish only the intended repository. Git Credential Manager supplies an in-memory credential.
import { execFileSync } from 'node:child_process'
const credential = execFileSync('git', ['credential', 'fill'], { input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] })
const token = credential.split('\n').find(line => line.startsWith('password='))?.slice(9)
if (!token) throw new Error('No authenticated GitHub credential available')
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' }
const user = await fetch('https://api.github.com/user', { headers }).then(response => response.json())
if (user.login !== 'awaljanhematyar') throw new Error('Unexpected GitHub account; stopping')
const target = 'awaljanhematyar/elevate-performance-coaching'
const existing = await fetch(`https://api.github.com/repos/${target}`, { headers })
let repository
if (existing.status === 404) {
  const response = await fetch('https://api.github.com/user/repos', { method: 'POST', headers, body: JSON.stringify({ name: 'elevate-performance-coaching', description: 'Premium fictional Calgary fitness coaching website. React 19, Vite, Tailwind CSS, accessible demo consultation and responsive design.', private: false, auto_init: false, has_issues: true }) })
  if (!response.ok) throw new Error(`Repository creation failed: ${response.status}`)
  repository = await response.json()
} else {
  if (!existing.ok) throw new Error(`Repository read failed: ${existing.status}`)
  repository = await existing.json()
}
if (repository.full_name !== target) throw new Error('Unexpected target repository')
console.log(JSON.stringify({ repository: repository.html_url, owner: user.login, visibility: repository.visibility, noreplyEmail: `${user.id}+${user.login}@users.noreply.github.com` }))
