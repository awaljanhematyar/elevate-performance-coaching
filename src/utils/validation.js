// Pure validation is shared by the demo form and unit tests. It never transmits data.
import { getProgram } from '../data/programs'

// ========================================
// CONSULTATION FORM VALIDATION
// ========================================
export function validateConsultation(values) {
  const errors = {}
  if (values.name.trim().length < 2 || values.name.trim().length > 80) errors.name = 'Enter a name between 2 and 80 characters.'
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (values.program && !getProgram(values.program)) errors.program = 'Select an available program or “Help me choose”.'
  if (values.goal.trim().length < 10 || values.goal.trim().length > 300) errors.goal = 'Describe a general goal in 10–300 characters.'
  if (values.message.length > 1000) errors.message = 'Keep your message to 1,000 characters or fewer.'
  if (!values.consent) errors.consent = 'Confirm that you understand this is a demo and nothing is sent.'
  return errors
}
