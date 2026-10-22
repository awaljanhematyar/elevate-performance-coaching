// The enquiry is an in-memory demonstration, with explicit consent and no network transport.
import { useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowUpRight, Check, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react'
import { programs, getProgram } from '../data/programs'
import { validateConsultation } from '../utils/validation'
import { Intro } from '../components/UI'

export default function Contact() {
  const [params] = useSearchParams()
  const initial = { name: '', email: '', program: getProgram(params.get('program'))?.slug || '', goal: '', message: '', consent: false }
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)
  const submitted = useRef(false)
  const form = useRef(null)
  const change = event => {
    const { name, value, type, checked } = event.target
    setValues(previous => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    setErrors(previous => ({ ...previous, [name]: undefined }))
  }
  const submit = event => {
    event.preventDefault()
    if (submitted.current) return
    const nextErrors = validateConsultation(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      form.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus()
      return
    }
    // Synchronous lock prevents rapid duplicate submissions; values are immediately discarded.
    submitted.current = true
    setValues(initial)
    setComplete(true)
    requestAnimationFrame(() => document.getElementById('demo-confirmation')?.focus())
  }
  const fieldProps = name => ({ name, id: name, value: values[name], onChange: change, 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined })
  const error = name => errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]}</p>

  return <><Intro label="LET’S FIND YOUR STARTING POINT" title="Your goals. Your next step.">A little context is all it takes to explore a more personal approach.</Intro><section className="container contact-grid section-bottom"><aside className="contact-aside"><p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p><h2>No pressure.<br />Just possibilities.</h2><p>Think about what you enjoy, what fits your week, and where you’d like to begin.</p><ul className="check-list"><li><Check aria-hidden="true" />Explore your general goals</li><li><Check aria-hidden="true" />Find a program that fits</li><li><Check aria-hidden="true" />Understand the next steps</li></ul><div className="aside-note"><ShieldCheck aria-hidden="true" /><div><strong>This is a demo consultation.</strong><p>No enquiry is sent or stored. Use sample details. Do not include medical history, diagnoses, payment details, or other sensitive information.</p><Link to="/privacy" className="text-link">Privacy & demo details<ArrowUpRight size={16} aria-hidden="true" /></Link></div></div><p className="location"><MapPin size={16} aria-hidden="true" />Calgary, Alberta · Fictional brand</p></aside><div className="form-card">{complete ? <div className="success-state" id="demo-confirmation" tabIndex={-1} role="status"><span className="success-icon"><Check size={30} aria-hidden="true" /></span><p className="eyebrow">DEMO COMPLETE</p><h2>You’ve explored the first step.</h2><p>Your sample form passed validation. <strong>Nothing was sent, saved, or booked.</strong> There will be no follow-up.</p><button className="button dark" onClick={() => { submitted.current = false; setComplete(false) }} type="button">Try the demo again<ArrowUpRight size={18} aria-hidden="true" /></button><Link className="text-link" to="/programs"><ArrowLeft size={16} aria-hidden="true" />Back to programs</Link></div> : <form ref={form} noValidate onSubmit={submit}><h2>Explore a consultation</h2><p className="form-note">Demo only. Fields marked * are required.</p>{Object.values(errors).some(Boolean) && <p className="error-summary" role="alert">Please review the marked fields. Nothing has been sent.</p>}<div className="form-row"><div><label htmlFor="name">Your name *</label><input {...fieldProps('name')} required minLength={2} maxLength={80} autoComplete="off" placeholder="e.g. Alex Sample" />{error('name')}</div><div><label htmlFor="email">Email address *</label><input {...fieldProps('email')} type="email" required maxLength={254} autoComplete="off" placeholder="alex@example.com" />{error('email')}</div></div><label htmlFor="program">Program you’re interested in</label><select {...fieldProps('program')}><option value="">Help me choose</option>{programs.map(program => <option key={program.slug} value={program.slug}>{program.title}</option>)}</select>{error('program')}<label htmlFor="goal">A general fitness goal *</label><textarea {...fieldProps('goal')} required minLength={10} maxLength={300} rows={3} placeholder="e.g. Build a consistent three-day training routine." />{error('goal')}<p className="field-hint">10–300 characters. General goals only; no private health details.</p><label htmlFor="message">Anything else? <span>(optional)</span></label><textarea {...fieldProps('message')} maxLength={1000} rows={3} placeholder="Your preferred schedule or the activities you enjoy." />{error('message')}<label className="consent" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required checked={values.consent} onChange={change} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>I understand this is a fictional portfolio demo. Nothing will be sent or booked, and I will not include sensitive information. *</span></label>{error('consent')}<button className="button dark submit-button" type="submit">Try the demo enquiry<ArrowUpRight size={19} aria-hidden="true" /></button><p className="form-note">No sales calls. No messages. No data leaves this form.</p></form>}</div></section></>
}
