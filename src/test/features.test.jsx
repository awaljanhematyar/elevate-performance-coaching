// User-facing checks cover the important state changes and privacy-sensitive demo flow.
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { programs, filterPrograms, getProgram } from '../data/programs'
import { articles } from '../data/articles'
import { validateConsultation } from '../utils/validation'
import { FAQ } from '../components/UI'
import { Programs, ProgramDetails } from '../pages/Programs'
import Contact from '../pages/Contact'
import { Header } from '../components/Layout'

const valid = { name: 'Alex Sample', email: 'alex@example.com', program: 'everyday-athlete', goal: 'Build a consistent training routine.', message: '', consent: true }
const wrap = (element, entry = '/') => render(<MemoryRouter initialEntries={[entry]}>{element}</MemoryRouter>)
describe('program content and filters', () => {
  it('provides six unique, complete programs and six distinct articles', () => { expect(programs).toHaveLength(6); expect(new Set(programs.map(p => p.slug)).size).toBe(6); expect(articles).toHaveLength(6); expect(new Set(articles.map(a => a.slug)).size).toBe(6); programs.forEach(p => { expect(p.structure.length).toBeGreaterThan(3); expect(p.price).toBeGreaterThan(0) }) })
  it.each(['Strength', 'Lifestyle', 'Performance'])('filters %s accurately', category => { expect(filterPrograms(category)).toHaveLength(2); expect(filterPrograms(category).every(p => p.category === category)).toBe(true) })
  it('handles an empty search and unknown slug', () => { expect(filterPrograms('All', 'impossible search')).toHaveLength(0); expect(getProgram('missing')).toBeUndefined() })
  it('shows an empty state and a working reset', () => { wrap(<Programs />, '/programs?q=impossible'); expect(screen.getByText('A different starting point?')).toBeVisible(); fireEvent.click(screen.getByRole('button', { name: 'Reset filters' })); expect(screen.getByRole('status')).toHaveTextContent('6 programs') })
  it('changes category through a real control', () => { wrap(<Programs />); fireEvent.click(screen.getByRole('button', { name: 'Strength', exact: true })); expect(screen.getByRole('status')).toHaveTextContent('2 programs'); expect(screen.queryByRole('heading', { name: 'Everyday Athlete' })).not.toBeInTheDocument() })
  it('recovers from an invalid program detail', () => { wrap(<ProgramDetails />); expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Let’s find your way back') })
})
describe('accessible interactions', () => {
  it('exposes FAQ expansion state and reveals its associated region', () => { wrap(<FAQ />); const button = screen.getByRole('button', { name: 'Do I need experience to get started?' }); expect(button).toHaveAttribute('aria-expanded', 'false'); fireEvent.click(button); expect(button).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByRole('region', { name: 'Do I need experience to get started?' })).toBeVisible(); fireEvent.click(button); expect(button).toHaveAttribute('aria-expanded', 'false') })
  it('closes the mobile menu on Escape and returns focus', () => { wrap(<Header />); const trigger = screen.getByRole('button', { name: 'Open navigation' }); fireEvent.click(trigger); expect(trigger).toHaveAttribute('aria-expanded', 'true'); fireEvent.keyDown(screen.getByRole('navigation'), { key: 'Escape' }); expect(trigger).toHaveAttribute('aria-expanded', 'false'); expect(trigger).toHaveFocus() })
})
describe('consultation validation and privacy', () => {
  it('accepts a complete example', () => expect(validateConsultation(valid)).toEqual({}))
  it.each(['name', 'email', 'goal', 'consent'])('rejects missing %s', field => { expect(validateConsultation({ ...valid, [field]: field === 'consent' ? false : '' })[field]).toBeTruthy() })
  it('rejects invalid emails, unknown programs and excessive lengths', () => { const errors = validateConsultation({ ...valid, name: 'x'.repeat(81), email: 'invalid@', program: 'unknown', goal: 'x'.repeat(301), message: 'x'.repeat(1001) }); expect(Object.keys(errors)).toHaveLength(5) })
  it('preselects a valid program, while keeping it editable', () => { wrap(<Contact />, '/contact?program=everyday-athlete'); const select = screen.getByLabelText('Program you’re interested in'); expect(select).toHaveValue('everyday-athlete'); fireEvent.change(select, { target: { value: 'strength-foundations' } }); expect(select).toHaveValue('strength-foundations') })
  it('safely ignores invalid query values', () => { wrap(<Contact />, '/contact?program=unknown'); expect(screen.getByLabelText('Program you’re interested in')).toHaveValue('') })
  it('focuses the first invalid field with associated error text', () => { wrap(<Contact />); fireEvent.click(screen.getByRole('button', { name: 'Try the demo enquiry' })); const input = screen.getByLabelText('Your name *'); expect(input).toHaveFocus(); expect(input).toHaveAttribute('aria-invalid', 'true'); expect(input).toHaveAccessibleDescription('Enter a name between 2 and 80 characters.') })
  it('completes once without sending or storing personal data', async () => { const transport = vi.spyOn(globalThis, 'fetch'); const storage = vi.spyOn(Storage.prototype, 'setItem'); wrap(<Contact />); fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: valid.name } }); fireEvent.change(screen.getByLabelText('Email address *'), { target: { value: valid.email } }); fireEvent.change(screen.getByLabelText('A general fitness goal *'), { target: { value: valid.goal } }); fireEvent.click(screen.getByRole('checkbox')); fireEvent.click(screen.getByRole('button', { name: 'Try the demo enquiry' })); await waitFor(() => expect(screen.getByText('Nothing was sent, saved, or booked.')).toBeVisible()); expect(screen.queryByRole('textbox')).not.toBeInTheDocument(); expect(transport).not.toHaveBeenCalled(); expect(storage).not.toHaveBeenCalled(); transport.mockRestore(); storage.mockRestore() })
})
