// DOM cleanup prevents test state and mocked browser state leaking between examples.
import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
afterEach(cleanup)
window.scrollTo = vi.fn()
