// Original short-form articles for a fictional coaching brand. Each stands on its own.
export const articles = [
  { slug: 'start-small-build-consistency', title: 'Start small. Build something that lasts.', category: 'Mindset', image: 'athlete', excerpt: 'A training routine should fit your life before it fills your calendar.', sections: [
    ['Choose a repeatable starting point', 'A useful routine begins with the week you actually have. Before choosing exercises, look at your available time and pick a small number of sessions that feel realistic. Two short appointments with yourself can be easier to repeat than a full calendar that leaves no room for change.'],
    ['Lower the friction', 'Prepare a comfortable space, set out the equipment you plan to use, or put your shoes near the door. These small choices do not replace effort, but they can reduce the number of decisions between an intention and an action. Keep the first session familiar and uncomplicated.'],
    ['Reflect without judging', 'At the end of the week, ask what fitted well and what became difficult. Adjust the plan instead of treating a missed day as a verdict. Consistency includes returning after interruptions. Your next small session is a perfectly reasonable place to begin again.'],
  ] },
  { slug: 'first-strength-session', title: 'Your first strength session, simplified.', category: 'Training', image: 'strength', excerpt: 'Less guesswork. More time to get comfortable with the basics.', sections: [
    ['Arrive with a simple plan', 'An unfamiliar gym can feel busy. A short list of movements gives you a starting point and leaves room to ask for help. Begin with equipment you can use comfortably. You do not need to try every machine or fill every minute.'],
    ['Practise before adding difficulty', 'Use a manageable level of effort while learning how an exercise feels. Rest between attempts and avoid rushing to match somebody else. An in-person coach can help explain equipment and observe technique in a way an article cannot.'],
    ['Leave room for the next visit', 'Write down the movements you tried and a few notes about the session. Aim to leave with a clearer sense of what you want to practise next. If an activity feels painful or concerning, stop and seek appropriate individual guidance.'],
  ] },
  { slug: 'recovery-is-part-of-training', title: 'Recovery belongs in your training plan.', category: 'Recovery', image: 'mobility', excerpt: 'A thoughtful week has space for effort and space to step back.', sections: [
    ['Plan the quieter days', 'An ambitious schedule often lists workouts and forgets the time between them. Make recovery visible in your calendar too. A quieter day can simply mean resting, taking an easy walk you enjoy, or spending time away from structured exercise.'],
    ['Notice the whole week', 'Work, travel and family commitments affect how a week feels. If your schedule changes, your training can change with it. A written plan is a guide, and adapting it can be more useful than completing every session out of obligation.'],
    ['Review your expectations', 'Avoid using another person’s routine as a required standard. Reflect on what is manageable for you and ask for qualified support when questions go beyond general fitness information. Recovery is part of making a routine practical to return to.'],
  ] },
  { slug: 'train-for-your-weekend', title: 'Train for the weekend you want.', category: 'Training', image: 'trail', excerpt: 'Let the activities you enjoy give your weekday sessions a purpose.', sections: [
    ['Start with what you enjoy', 'Think about the activities you would like to make room for: a local walk, recreational cycling, or a gentle trail with friends. Naming a meaningful activity can make a training routine feel more personal than an abstract target.'],
    ['Connect the week to the activity', 'A simple mix of resistance work and comfortable movement can give your week structure. Keep your outdoor plans appropriate to your experience and conditions. Preparation also includes checking the route, weather, equipment and local safety guidance.'],
    ['Keep the destination flexible', 'An enjoyable outing does not need to be your longest or hardest. Plans can change with energy, weather and available time. Let your routine support the way you want to spend your days rather than turn every weekend into a test.'],
  ] },
  { slug: 'progress-beyond-the-numbers', title: 'Progress is more than a number.', category: 'Mindset', image: 'coach', excerpt: 'Notice the quieter changes in how you approach your training.', sections: [
    ['Choose useful observations', 'A training log can hold more than sets and repetitions. You might note that you arrived with a plan, felt more comfortable adjusting a machine, or asked a question that had been on your mind. These observations describe your experience without promising an outcome.'],
    ['Compare less, reflect more', 'Other people have different starting points and circumstances. Looking back at your own notes can be a more useful conversation than comparing a single session with somebody else. Look for patterns over time and leave space for ordinary uneven weeks.'],
    ['Let your goals evolve', 'Your priorities may change as a routine becomes familiar. Revisit what matters to you and adjust the plan accordingly. There is no requirement to keep pursuing a target that no longer fits your life.'],
  ] },
  { slug: 'make-movement-fit', title: 'Make movement fit a busy day.', category: 'Lifestyle', image: 'weights', excerpt: 'Practical ways to make a little space without rebuilding your life.', sections: [
    ['Look for available moments', 'A busy day rarely contains a perfect empty hour. Look for a small window that already exists and choose a familiar activity you enjoy. Keep the plan modest enough that getting started does not require a complicated setup.'],
    ['Create an adaptable option', 'Have a shorter alternative for days when your original plan no longer fits. That might mean a comfortable walk or a few familiar movements. An alternative is a practical choice, not a punishment for missing the longer session.'],
    ['Protect flexibility', 'Some days will be full, and rest may be the sensible option. Try returning to the routine when time opens up instead of squeezing exercise into every spare moment. The aim is a sustainable relationship with movement.'],
  ] },
]

// Reading time follows the article's actual word count rather than a marketing estimate.
export const readingTime = article => Math.max(1, Math.ceil(article.sections.flat().join(' ').split(/\s+/).length / 200))
