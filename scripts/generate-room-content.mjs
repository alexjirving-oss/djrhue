/**
 * Generates the Room content library (FAQ, tips, guides, Q&A).
 * Run: node scripts/generate-room-content.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '..', 'src', 'data', 'room', 'posts.generated.ts')

const categories = [
  'booking',
  'gear',
  'mixing',
  'sound',
  'genres',
  'events',
  'software',
  'production',
  'career',
  'room-tips',
]

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72)
}

function roomAnswer(text, helpful = 12) {
  return {
    author: 'room',
    name: 'DJ RHUE',
    text,
    helpful,
  }
}

function communityAnswer(name, text, helpful = 4) {
  return {
    author: 'community',
    name,
    text,
    helpful,
  }
}

/** @type {Array<{slug?: string, category: string, kind: string, title: string, summary: string, tags: string[], published: string, body: string[], answers?: object[]}>} */
const posts = []

function add(post) {
  const slug = post.slug ?? slugify(post.title)
  posts.push({ ...post, slug })
}

// ─── BOOKING ─────────────────────────────────────────────────────────────────
const bookingFaqs = [
  [
    'How much does a DJ cost in Bristol?',
    'Performance fees start from £50/hr for extended multi-hour bookings, from £70 for warm-up/guest sets (up to 1 hour), and from £100 for headline peak-time sets. Equipment hire, PA and travel are quoted separately.',
    'Rates depend on set length, peak vs warm-up slot, and whether PA/booth hire is needed. Always ask for a written quote that separates performance fee from kit.',
  ],
  [
    'What is included in a DJ RHUE booking fee?',
    'The booking fee secures your date (£50 standard / £70 guest / £100 headline). The performance fee covers the DJ set itself. Kit, travel and extras are itemised separately so you know exactly what you are paying for.',
    'A clear fee structure avoids surprises. Confirm deposit, balance due date, overtime rates and cancellation terms in writing before you advertise the night.',
  ],
  [
    'How far in advance should I book a DJ?',
    'Peak summer weekends, carnival season and Malta dates fill quickly — 4–8 weeks ahead is ideal. Last-minute enquiries are welcome when the calendar allows.',
    'Festival and wedding dates often lock 2–6 months out. Club residencies and midweek gigs can sometimes be confirmed closer to the date.',
  ],
  [
    'Do you DJ weddings with Caribbean music?',
    'Yes. Wedding sets blend Afrobeats, Dancehall and Caribbean favourites with R&B and Hip Hop so every generation stays on the floor. Share must-play and do-not-play lists when you enquire.',
    'Give your DJ a timeline: ceremony walk-in (if needed), dinner background, first dance, and open dancing. Timeline clarity beats a 200-song playlist dump.',
  ],
  [
    'Can you provide DJ equipment and PA for outdoor events?',
    'Yes — branded booth, Pioneer CDJ setup and PA hire are available for festivals, carnivals and outdoor private events. Equipment is quoted separately from the performance fee.',
    'Outdoor PA needs headroom for wind and crowd noise. Ask about generator power, stage cover and rain contingency before the day.',
  ],
  [
    'Does DJ RHUE travel to Malta?',
    'Yes. International bookings include Malta — filmed sessions, club nights and private events. Enquire with date, venue and whether local kit or full production is required.',
    'International gigs need clear agreements on flights, hotels, visas, local backline and who covers excess baggage for USB/controllers.',
  ],
  [
    'How do I book DJ RHUE for a club or corporate event?',
    'Use the booking form with date, location and brief, WhatsApp 07305 940 902, or email booking.djrhue@gmail.com. A booking fee secures the date.',
    'Corporate briefs should include brand guidelines, clean edits requirements, and whether speeches interrupt the set.',
  ],
  [
    'Where does DJ RHUE perform in the UK?',
    'Based in Bristol with bookings across the South West, London and nationwide — St Paul’s Carnival, SWU.FM and Rinse FM sessions, club residencies and festival stages.',
    'Travel fees usually scale with distance and overnight stays. Ask early if your venue is outside the usual circuit.',
  ],
  [
    'What deposit locks in a date?',
    'A booking fee locks the calendar slot. Balance and any equipment hire are confirmed in the written quote. Dates are not held on verbal interest alone.',
    'Never rely on a handshake for peak weekends. Written confirmation protects both artist and promoter.',
  ],
  [
    'Can I request specific songs or genres?',
    'Yes — share must-plays, energy targets and any banned tracks. Requests are woven into a room-reading set rather than played as a rigid list.',
    'Prioritise 10–20 must-plays over a 300-track dump. DJs need freedom to read the floor between your anchors.',
  ],
  [
    'Do you play clean / radio edits for family events?',
    'Clean and radio-edit sets are available for weddings, schools, corporate and daytime community events. Flag the policy when you enquire.',
    'Build a clean crate in advance. Scrambling for edits mid-set is how explicit lyrics slip through.',
  ],
  [
    'What happens if the event runs late?',
    'Overtime is quoted in advance. If the night overruns, confirm extension with the DJ and venue before assuming the set continues.',
    'Agree overtime rates in the contract. Last-minute “just one more hour” without pay is how bookings go sour.',
  ],
  [
    'Do you need a hotel for late finishes?',
    'Late finishes outside Bristol may require overnight accommodation — especially after 1am load-outs. Flag travel distance when you enquire so the quote is accurate.',
    'A safe finish and hotel beats a tired drive. Build it into the budget for out-of-town peak slots.',
  ],
  [
    'Can two DJs share the booth?',
    'Guest and back-to-back formats are welcome when the brief and timeline are clear. Confirm who owns peak hour and how changeovers work.',
    'Label USB sticks, agree BPM handoff ranges, and never yank cables mid-mix without a plan.',
  ],
  [
    'Is there a cancellation policy?',
    'Cancellation terms are in the booking agreement and rates docs. Deposits typically secure calendar time that cannot be sold twice.',
    'Read cancellation windows before you announce the date publicly. Promoting a night you might cancel hurts everyone.',
  ],
]

for (const [title, summary, tip] of bookingFaqs) {
  add({
    category: 'booking',
    kind: 'faq',
    title,
    summary,
    tags: ['booking', 'bristol', 'rates'],
    published: '2026-03-01',
    body: [summary, tip],
    answers: [roomAnswer(summary + ' ' + tip, 28)],
  })
}

// ─── GEAR ────────────────────────────────────────────────────────────────────
const gearGuides = [
  {
    title: 'Pioneer CDJ-3000 vs CDJ-2000NXS2 — what actually changes on the night',
    summary: 'Touchscreen workflows, Hot Cue banks, Beat Sync behaviour and reliability differences that matter when you are reading a packed floor.',
    tags: ['cdj', 'pioneer', 'club'],
    body: [
      'The CDJ-3000 keeps the club-standard layout while adding a faster UI, clearer waveform colour modes and deeper Hot Cue performance pads. If you already know NXS2, muscle memory transfers in minutes.',
      'For guests: always bring a USB prepared in rekordbox with analysed grids. Never assume the venue’s library or your phone cable will save you.',
      'Key night-of differences: 3000s feel snappier for stem-adjacent workflows and browsing large crates; NXS2s remain everywhere and are still fully professional. Know both.',
      'Always check firmware and USB format before doors. A stick that mounts at home but fails on club players is a classic first-gig failure.',
    ],
  },
  {
    title: 'How to prep a rekordbox USB that never fails in the booth',
    summary: 'Export settings, folder structure, hot cues, memory cues and the dual-stick redundancy habit serious DJs use.',
    tags: ['rekordbox', 'usb', 'prep'],
    body: [
      'Use a quality USB 3 stick formatted correctly for the players you will meet. Keep a second identical stick in a different pocket.',
      'Analyse everything at home. Set grids on tracks you will beatmatch by ear anyway — clean grids help looping and FX even when you mix manually.',
      'Structure crates by energy and vibe, not only genre: warm-up, groove, peak, reload, closing. That maps to how rooms actually move.',
      'Colour-code hot cues consistently (intro drop, vocal, breakdown, outro). Consistency beats fancy cue maps you forget under pressure.',
    ],
  },
  {
    title: 'XLR, RCA, speakON and TRS — cable literacy for DJs',
    summary: 'What each connector is for, what not to force, and the small adapter kit that prevents silent booth panic.',
    tags: ['cables', 'pa', 'basics'],
    body: [
      'XLR carries balanced mic/line signals and feeds many mixers and PA inputs. RCA is common on DJ gear outputs. speakON locks into modern speakers. TRS appears on headphones and some line I/O.',
      'Never force a connector. If it does not seat cleanly, you have the wrong gender, wrong format, or a damaged socket — forcing it makes it your bill.',
      'Carry: RCA–RCA, XLR male–female, RCA–XLR adapters, a spare IEC, and gaffer. That kit solves 80% of “we can’t hear the DJ” moments that are actually cabling.',
    ],
  },
  {
    title: 'How loud should booth monitors be?',
    summary: 'Monitoring levels that let you mix accurately without destroying your hearing before peak time.',
    tags: ['monitors', 'hearing', 'booth'],
    body: [
      'Booth monitors should be loud enough to hear kick and transient detail over crowd bleed — not a competition with the FOH.',
      'If you cannot hear your cue without cranking headphones to pain, fix monitor position/angle first. Ear fatigue destroys mix judgement after 90 minutes.',
      'Ask the engineer for a stable booth feed. Riding the master to “feel” energy while monitors are wrong is how sets get muddy.',
    ],
  },
  {
    title: 'Controllers vs club CDJs — when each makes sense',
    summary: 'Bedroom practice, mobile gigs, club standards and why promoters still ask for USB-on-CDJs.',
    tags: ['controller', 'cdj', 'mobile'],
    body: [
      'Controllers are excellent for practice, livestreams and many mobile/wedding jobs where you own the whole rig.',
      'Club culture still centres on USB + CDJ/mixer because changeovers are fast and every guest can play without installing software.',
      'If you want club bookings, practise on CDJs regularly even if you own a controller. Muscle memory is part of the audition.',
    ],
  },
  {
    title: 'Building a mobile DJ rack that survives load-in',
    summary: 'Cases, cable management, power distribution and the order of setup that keeps outdoor gigs calm.',
    tags: ['mobile', 'rack', 'festival'],
    body: [
      'Label both ends of every cable. Future-you at 00:40 in the rain will thank you.',
      'Power: one clean distribution path, no daisy-chained random strips. Ask about generator stability for outdoor jobs.',
      'Setup order: power → speakers/stands → mixer/players → soundcheck at low level → décor/booth skin. Music last, show first.',
    ],
  },
  {
    title: 'Serato vs rekordbox vs Traktor — choosing a software lane',
    summary: 'Ecosystem fit, club relevance and why serious DJs eventually learn more than one.',
    tags: ['serato', 'rekordbox', 'traktor'],
    body: [
      'rekordbox is the club USB standard for Pioneer ecosystems. Serato dominates many mobile and hip-hop performance workflows. Traktor still has deep remix-deck fans.',
      'Pick one for daily crate building, but stay literate in the one your local clubs expect. Dual fluency wins more guest slots.',
      'Stems are useful — and easy to overuse. Treat them as a spice rack, not the whole meal.',
    ],
  },
  {
    title: 'Headphone buying guide for DJs who mix for hours',
    summary: 'Closed-back isolation, replacement parts, and why comfort matters more than hype brand flex.',
    tags: ['headphones', 'gear'],
    body: [
      'Closed-back designs help against booth bleed. Swivel cups and replaceable cables/earpads extend lifespan.',
      'Try before you buy if possible — clamp force that feels fine for 10 minutes can hurt at hour three.',
      'Carry a spare pair. Headphone failure mid-set is preventable with redundancy.',
    ],
  },
]

for (const g of gearGuides) {
  add({
    category: 'gear',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-02-15',
    body: g.body,
  })
}

const gearFaqs = [
  ['Do I need CDJs to get club gigs?', 'You need CDJ competence more than you need to own them. Practise in shops, friends’ studios, or hire time. Promoters care that you can plug in a USB and read the room.'],
  ['What USB brand works on Pioneer players?', 'Stick to well-known USB 3 sticks and test on the exact player family before the gig. Cheap no-name sticks are a common failure point.'],
  ['Should I buy a mixer before players?', 'For home, a controller can wait. For club skills, time on a DJM + CDJs teaches EQ and channel discipline better than a tiny all-in-one alone.'],
  ['Is Bluetooth OK for a paid gig?', 'No for primary playback. Latency and dropouts are unprofessional. Wired connections only for paid work.'],
  ['How many hot cues should I set?', 'Enough to be useful, few enough to remember. A consistent 3–4 cue roles per track beats 8 random markers.'],
]

for (const [title, summary] of gearFaqs) {
  add({
    category: 'gear',
    kind: 'faq',
    title,
    summary,
    tags: ['gear', 'faq'],
    published: '2026-02-20',
    body: [summary],
    answers: [roomAnswer(summary, 15)],
  })
}

// ─── MIXING ──────────────────────────────────────────────────────────────────
const mixingGuides = [
  {
    title: 'Phrase mixing for Afrobeats and Dancehall',
    summary: 'Counting phrases, spotting vocal entries and landing drops so Caribbean and African records feel intentional — not chopped.',
    tags: ['phrasing', 'afrobeats', 'dancehall'],
    body: [
      'Most dancefloor records breathe in 8/16/32-bar phrases. Train your ear to hear when a vocal or percussion pattern restarts.',
      'Afrobeats often rides groove longer than UK garage; do not force a 16-bar habit if the vocal needs 32 to resolve.',
      'Dancehall can be riddim-led — respect the space. A busy blend that works on house can smother a dancehall vocal.',
      'Practice: loop intros and count out loud until phrase sense is automatic. Then stop counting and feel it.',
    ],
  },
  {
    title: 'EQ that cleans a mix without killing energy',
    summary: 'Low-end trading, presence cuts and the difference between corrective EQ and creative tone shaping.',
    tags: ['eq', 'technique'],
    body: [
      'One kick owns the sub. When blending, carve bass on the incoming or outgoing channel so the master does not double-pump into mush.',
      'Cut before you boost. A small cut on a clashing midrange often sounds clearer than boosting “more presence”.',
      'Highs carry hi-hats and air — useful for announcing a new track — but endless bright blends fatigue a room.',
      'If the FOH already sounds harsh, do not brighten more in the booth. Fix the blend, not the PA with your channel EQ.',
    ],
  },
  {
    title: 'Using Serato Stems without sounding gimmicky',
    summary: 'Vocal chops, instrumental dropouts and tasteful transitions that serve the floor instead of the demo reel.',
    tags: ['stems', 'serato', 'transitions'],
    body: [
      'Stems shine for acapella moments, breakdown drama and quick cleans when an explicit line appears unexpectedly.',
      'Avoid stem solos every transition. The crowd came for music, not a feature demo.',
      'Combine stems with phrase awareness. A vocal isolation that lands on a new phrase feels intentional; mid-bar isolation feels like a glitch.',
    ],
  },
  {
    title: 'Beatmatching by ear when the grid is wrong',
    summary: 'Nudging, pitch ranging and trusting your headphones when analysis fails on a Caribbean edit.',
    tags: ['beatmatch', 'ear'],
    body: [
      'Grids fail on live percussion, rub-a-dub feels and rough edits. Your ears are the backup system — practise weekly without looking.',
      'Match kick to kick first, then check hats. If the groove “swims”, you are close but not locked — tiny pitch moves, not panic nudges.',
      'When a track will not grid cleanly, mark memory cues at reliable hits and ride pitch manually.',
    ],
  },
  {
    title: 'Programming energy across a two-hour set',
    summary: 'Warm-up patience, peak construction, reload valleys and closing without killing the night.',
    tags: ['programming', 'set-flow'],
    body: [
      'Warm-up is hospitality: groove people into the space. Peak is architecture: payoffs they can feel. Closing is memory: leave them wanting the next party.',
      'Build plateaus, not only climbs. Rooms need breath so the next peak hits harder.',
      'Keep a reload crate for when the floor dips — familiar rhythm, not random panic bangers that fight the mood.',
    ],
  },
  {
    title: 'Transitions between Hip Hop and Afrobeats',
    summary: 'Tempo bridges, percussion beds and key-friendly blends across urban and African dancefloor lanes.',
    tags: ['transitions', 'hiphop', 'afrobeats'],
    body: [
      'Find BPM neighbours or half-time relationships. A Hip Hop joint at 95 can talk to Afrobeats energy via percussion and vocal hooks even when grids differ.',
      'Use instrumental beds and short blends rather than long harmonic mash attempts if keys fight.',
      'Cultural respect matters: do not treat either lane as “filler” between the genres you prefer.',
    ],
  },
]

for (const g of mixingGuides) {
  add({
    category: 'mixing',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-01-20',
    body: g.body,
  })
}

const mixingTips = [
  ['Count the room before you count the bars', 'Watch shoulders and conversation clusters. If people are still arriving, do not dump peak edits at minute ten.'],
  ['Leave space for the vocal', 'Caribbean and Afro vocals need air. Over-layering percussion mid-chorus is a common bedroom habit that fails on big systems.'],
  ['One idea per transition', 'Loop + echo + filter + stem mute + quick cut is five ideas. Pick one and make it clean.'],
  ['Record every set', 'A cheap stereo record out teaches more than another plugin pack. Review sober the next day.'],
  ['Know your closing track options', 'Have three endings ready: soft emotional, peak chant, and groove fade. Choose from the room, not the ego.'],
]

for (const [title, summary] of mixingTips) {
  add({
    category: 'mixing',
    kind: 'tip',
    title,
    summary,
    tags: ['tip', 'mixing'],
    published: '2026-01-25',
    body: [summary, 'Room tip: technique serves people. If the floor is happy, you are winning — even without a flashy transition.'],
  })
}

// ─── SOUND ───────────────────────────────────────────────────────────────────
const soundGuides = [
  {
    title: 'Gain structure basics for DJs',
    summary: 'Channel gain, master output and why red lights are not a personality trait.',
    tags: ['gain', 'meters', 'pa'],
    body: [
      'Set channel gains so meters are healthy with EQ at noon. Do not fix a quiet channel by slamming the master.',
      'If FOH asks you to pull back, pull back. Clipping the desk to “get more energy” mostly gets you distortion and angry engineers.',
      'Different tracks are mastered differently. Riding gain between songs is normal professional behaviour.',
    ],
  },
  {
    title: 'Feedback — find it fast, kill it clean',
    summary: 'Mic technique, monitor aiming and the first moves when a howl hits mid-speech.',
    tags: ['feedback', 'mics'],
    body: [
      'Feedback is a loop: mic hears speaker, system re-amplifies. Lower mic gain, move mic off-axis from monitors, notch the ringing frequency if you have a graphic/PA tech.',
      'Never hand a live mic to a guest pointed at the stacks. Brief people quickly or keep control of the mic.',
      'If you are not the engineer, call them immediately rather than sweeping random EQ forever.',
    ],
  },
  {
    title: 'Outdoor PA realities for carnival and garden parties',
    summary: 'Wind, power, coverage and neighbour politics that indoor club muscle memory forgets.',
    tags: ['outdoor', 'pa', 'carnival'],
    body: [
      'Wind eats high frequencies and can tip light stands. Weight everything. Cover decks from rain even if the forecast looks friendly.',
      'Coverage beats raw volume. Two well-placed stacks often serve a garden better than one screaming wedge of doom.',
      'Know local noise cut-off times. A perfect set that gets shut down at 22:05 still fails the client.',
    ],
  },
  {
    title: 'Protecting your hearing on a DJ schedule',
    summary: 'Dose, plugs, booth habits and career-length thinking.',
    tags: ['hearing', 'health'],
    body: [
      'Hearing damage is cumulative. High nights add up even when you “feel fine”.',
      'Use musician earplugs when you are in the crowd. In the booth, keep monitors sane and headphones only as loud as needed for cueing.',
      'Tinnitus after gigs is a warning light, not a badge. Get checked and adjust habits early.',
    ],
  },
]

for (const g of soundGuides) {
  add({
    category: 'sound',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-02-01',
    body: g.body,
  })
}

const soundFaqs = [
  ['Why does my USB set sound quieter than the resident?', 'Mastering differences, gain rides and their channel trim. Match perceived loudness with gain, not by slamming the master into clip.'],
  ['Should I use the mixer limiter?', 'Know the desk. Some limiters protect the system; they are not an excuse to drive channels into the red all night.'],
  ['What is a sub drop doing to my mix?', 'Subs make kick and bass physical. If your low-end trading is sloppy, a powerful sub exposes it instantly.'],
]

for (const [title, summary] of soundFaqs) {
  add({
    category: 'sound',
    kind: 'faq',
    title,
    summary,
    tags: ['sound', 'faq'],
    published: '2026-02-05',
    body: [summary],
    answers: [roomAnswer(summary, 11)],
  })
}

// ─── GENRES ──────────────────────────────────────────────────────────────────
const genreGuides = [
  {
    title: 'Afrobeats on a UK club system — selection notes',
    summary: 'Tempo ranges, vocal-led floors and blending UK funky / bashment energy without losing the plot.',
    tags: ['afrobeats', 'club'],
    body: [
      'Afrobeats dancefloors often respond to vocal recognition and groove patience. Train yourself to ride a mood longer than a three-track TikTok attention span.',
      'Know current singles and the classics people will scream for. Both matter.',
      'When blending into Dancehall or Amapiano, listen for percussion compatibility — not only BPM math.',
    ],
  },
  {
    title: 'Dancehall selector instincts',
    summary: 'Riddims, rewinds, vocal respect and reading a Caribbean room in Bristol or abroad.',
    tags: ['dancehall', 'caribbean'],
    body: [
      'Dancehall culture has its own pacing and call-response energy. A house-DJ transition style can feel wrong even when the beatmatch is perfect.',
      'Respect vocals — do not steamroll a big line with a clumsy loop. Learn when a pull-up serves the room.',
      'Keep a crate of reliable riddim tools and modern heat, and know which audience is in front of you tonight.',
    ],
  },
  {
    title: 'Amapiano energy without losing the floor',
    summary: 'Log drums, long-form grooves and how to introduce piano to mixed UK crowds.',
    tags: ['amapiano'],
    body: [
      'Amapiano can be hypnotic and long. Give grooves time before you panic-mix into a familiar chart edit.',
      'For mixed rooms, bridge with percussion and vocal hooks rather than hard-cutting into a totally different rhythmic language.',
      'Sound system translation matters — log drums need a system that can carry low mids cleanly.',
    ],
  },
  {
    title: 'Reggae and lovers rock for weddings',
    summary: 'Multi-generational Caribbean programming that keeps grandparents and cousins on the floor.',
    tags: ['reggae', 'wedding'],
    body: [
      'Weddings need familiarity and warmth. Classic reggae and lovers rock often outperform obscure selector flexes during dinner-to-dance transitions.',
      'Save heavier bashment for when the age mix on the floor supports it.',
      'Ask the couple about church sensitivity, clean lyrics and family dynamics early.',
    ],
  },
  {
    title: 'Hip Hop and R&B as the glue in urban sets',
    summary: 'Using recognisable UK/US records to reset a room between specialist Caribbean runs.',
    tags: ['hiphop', 'rnb'],
    body: [
      'Familiar Hip Hop/R&B can re-centre a mixed crowd after a deep specialist run — then you earn another journey.',
      'Avoid treating these lanes as lazy filler. Programme them with the same care as peak Afrobeats.',
      'Watch for explicit lyrics policies at corporate and daytime events.',
    ],
  },
]

for (const g of genreGuides) {
  add({
    category: 'genres',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-01-10',
    body: g.body,
  })
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
const eventGuides = [
  {
    title: 'Club guest set checklist (60–90 minutes)',
    summary: 'Arrival, USB plan, rider basics and how to leave the resident in a good place.',
    tags: ['club', 'guest'],
    body: [
      'Arrive early enough to soundcheck calmly. Rushed guests make rushed first blends.',
      'Ask: set length, who plays before/after, genre expectations, and any banned content.',
      'Leave channels tidy, USB ejected properly, and the booth better than you found it. Reputation travels faster than mixes.',
    ],
  },
  {
    title: 'Wedding DJ timeline that actually works',
    summary: 'Ceremony, dinner levels, first dance and open floor — without fighting the photographer.',
    tags: ['wedding', 'timeline'],
    body: [
      'Get a minute-by-minute from the planner: speeches, cake, first dance, bouquet, sparkler send-off.',
      'Dinner music should allow conversation. If wait staff are shouting, you are too loud.',
      'First dance: confirm exact edit length and whether a fade is needed for speeches immediately after.',
    ],
  },
  {
    title: 'Corporate event rules of the booth',
    summary: 'Brand-safe music, mic management and why “one more drink” requests can sink a client.',
    tags: ['corporate'],
    body: [
      'Ask for brand do-not-play themes and whether explicit tracks are banned.',
      'Keep volume appropriate for networking. Energy can rise later if the brief allows.',
      'Put requests through a filter: the CEO’s favourite ballad at peak networking may not serve the room.',
    ],
  },
  {
    title: 'Festival and carnival stage realities',
    summary: 'Changeovers, weather, crowd flow and playing to a moving outdoor audience.',
    tags: ['festival', 'carnival'],
    body: [
      'Outdoor crowds move. Play for the densest cluster you can see, and keep intros tighter than a dark club warm-up.',
      'Weatherproof the booth. One shower can end a USB career for the afternoon.',
      'Changeovers are sacred — pack light, label everything, and be ready early.',
    ],
  },
  {
    title: 'Private parties in living rooms and lofts',
    summary: 'Neighbour volume, small-system EQ and reading a room that is also someone’s home.',
    tags: ['private', 'house-party'],
    body: [
      'Home systems distort differently than clubs. Keep levels honest; distorted bass is not “more energy”.',
      'Agree an end time with the host before guests start lobbying for “one more hour”.',
      'Protect floors and cable runs — residential gigs still need professional cable discipline.',
    ],
  },
]

for (const g of eventGuides) {
  add({
    category: 'events',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-02-10',
    body: g.body,
  })
}

// ─── SOFTWARE ────────────────────────────────────────────────────────────────
const softwareGuides = [
  {
    title: 'rekordbox library hygiene that scales',
    summary: 'Playlists, smart crates, colour systems and backing up before a tour run.',
    tags: ['rekordbox', 'library'],
    body: [
      'Your library is an instrument. Duplicate tags and chaotic folders cost you seconds you do not have mid-peak.',
      'Backup: cloud + local drive. Treat a dead laptop as an expected event, not a tragedy.',
      'Smart playlists by BPM/rating help, but manual vibe crates still win on cultural specialist nights.',
    ],
  },
  {
    title: 'Hot cue colour systems that stick under pressure',
    summary: 'A simple standard you can teach yourself once and use on every USB.',
    tags: ['hot-cues', 'workflow'],
    body: [
      'Example system: Cue 1 intro hit, Cue 2 vocal start, Cue 3 drop/hook, Cue 4 outro or break. Repeat on every track.',
      'Consistency beats complexity. If you need a legend sheet, the system is too clever for peak time.',
    ],
  },
  {
    title: 'Recording sets for Mixcloud without shame',
    summary: 'Levels, talkover edits and why rough live recordings beat overprocessed bedroom remixes for booking proof.',
    tags: ['recording', 'mixcloud'],
    body: [
      'A clean live recording with honest crowd bleed often books better than a sterile bedroom mix pretending to be a club.',
      'Leave some air — do not brickwall the upload. Platforms already loudness-normalise.',
      'Tag genres accurately so the right promoters find you.',
    ],
  },
]

for (const g of softwareGuides) {
  add({
    category: 'software',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-01-28',
    body: g.body,
  })
}

const softwareFaqs = [
  ['Do I need a laptop in the club?', 'Often no — USB on CDJs is the standard. Bring a laptop only if the brief needs Serato/hybrid performance and the club supports it.'],
  ['Can I play Spotify on a paid gig?', 'Not as a primary professional source. Licensing, reliability and offline gaps make it the wrong tool for paid booths.'],
  ['Why won’t my USB read?', 'Format, file system, stick quality, too many files, or corrupted export. Test on comparable players before doors.'],
]

for (const [title, summary] of softwareFaqs) {
  add({
    category: 'software',
    kind: 'faq',
    title,
    summary,
    tags: ['software', 'faq'],
    published: '2026-01-30',
    body: [summary],
    answers: [roomAnswer(summary, 14)],
  })
}

// ─── PRODUCTION ──────────────────────────────────────────────────────────────
const productionGuides = [
  {
    title: 'DJ edits that help the dancefloor',
    summary: 'Extended intros, radio-clean versions and loopable outros without wrecking the song.',
    tags: ['edits', 'production'],
    body: [
      'Useful edits solve booth problems: longer intros for blending, clean lyrics for daytime, early drops for festival formats.',
      'Keep the soul of the record. An edit that shows off your DAW skills but kills the hook fails the floor.',
      'Label edits clearly in your library so you do not grab the dirty version at a family wedding.',
    ],
  },
  {
    title: 'Basic mashup rules so promoters do not hate you',
    summary: 'Key, tempo, vocal collisions and cultural taste checks before you upload.',
    tags: ['mashup'],
    body: [
      'If vocals fight, one of them has to go. Layering two lead vocals is rarely clever.',
      'Check key relationships roughly — even a simple compatible-key habit prevents painful clashes.',
      'Respect culture and credits. Mashups can be love letters or lazy theft depending on craft and context.',
    ],
  },
]

for (const g of productionGuides) {
  add({
    category: 'production',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-02-12',
    body: g.body,
  })
}

// ─── CAREER ──────────────────────────────────────────────────────────────────
const careerGuides = [
  {
    title: 'How to ask for a guest slot without being annoying',
    summary: 'Short messages, relevant mixes and following up like a professional.',
    tags: ['booking', 'career'],
    body: [
      'Send a tight note: who you are, what you play, one mix link, and why their night is a fit. No novel, no 12 links.',
      'Follow up once. Twice max over a month. Spamming every story reply burns the bridge.',
      'Show face at the night as a supporter first when you can. Relationships beat cold DMs.',
    ],
  },
  {
    title: 'EPK essentials for DJs',
    summary: 'Photos, bio, credits, technical rider and the one-page PDF promoters actually open.',
    tags: ['epk', 'promo'],
    body: [
      'A good EPK answers: who, what genres, where played, how to contact, and what you need technically.',
      'Use sharp photos and real credits. Fake international prestige is easy to spot.',
      'Keep a short bio and a longer bio. Different promoters need different depths.',
    ],
  },
  {
    title: 'Getting paid without awkwardness',
    summary: 'Invoices, deposits, cash vs transfer and what to do when a promoter stalls.',
    tags: ['money', 'invoices'],
    body: [
      'Agree fee, deposit, balance timing and overtime in writing before the date.',
      'Bring invoice details. Treat DJing as a business even when the night feels like a party.',
      'If payment stalls, keep records calm and professional. Your future self needs a paper trail.',
    ],
  },
  {
    title: 'Social proof that helps bookings',
    summary: 'Clips, crowd shots and radio links that show taste — not only vanity metrics.',
    tags: ['social', 'promo'],
    body: [
      'A 20-second clip of a room reacting beats a 60-second selfie in the booth.',
      'Tag venues and collaborators. Make it easy for browsers to see you in context.',
      'Consistency matters more than algorithmic miracles. Show up with your sound weekly.',
    ],
  },
]

for (const g of careerGuides) {
  add({
    category: 'career',
    kind: 'guide',
    title: g.title,
    summary: g.summary,
    tags: g.tags,
    published: '2026-02-18',
    body: g.body,
  })
}

// ─── ROOM TIPS (branded) ─────────────────────────────────────────────────────
const roomTips = [
  ['Reads the room > reads the playlist', 'Playlists are ingredients. The room decides the recipe. Watch the floor more than your laptop screen.'],
  ['Arrive like you already respect the night', 'Early, tidy, prepared USBs, polite to security and engineers. Your mix starts before the first blend.'],
  ['Peak time is earned', 'If you burn peak edits in the first twenty minutes, you have nowhere to go when the room finally peaks.'],
  ['Caribbean floors reward patience', 'Let the groove speak. Not every bar needs a trick.'],
  ['Keep a panic crate — then rarely use it', 'Safety tracks reduce fear. Overusing them makes a set generic.'],
  ['Water beats another energy drink', 'Hydration keeps ears and decisions clearer across a long night.'],
  ['Learn the resident’s lane', 'A guest who complements the night gets invited back. A guest who fights the night gets replaced.'],
  ['Silence can be a transition', 'A clean cut into a vocal can hit harder than a 32-bar filter sweep.'],
  ['Document your fees', 'Undercharging quietly trains the market to underpay you. Publish ranges and stick to them.'],
  ['Protect the brand in the booth', 'No messy cables in photos, no arguing on mic, no blaming the crowd. Professional energy is contagious.'],
]

for (const [title, summary] of roomTips) {
  add({
    category: 'room-tips',
    kind: 'tip',
    title,
    summary,
    tags: ['room', 'tips'],
    published: '2026-03-01',
    body: [summary, 'From the Room — practical habits from DJ RHUE nights across Bristol, carnival stages and Malta.'],
  })
}

// ─── COMMUNITY Q&A (many) ────────────────────────────────────────────────────
const qaPairs = [
  ['My grids slip on Dancehall edits — am I cooked?', 'Not cooked. Many Dancehall and live-percussion edits defeat auto-analysis. Beatmatch by ear, set manual cues on reliable hits, and stop trusting a red grid as gospel.'],
  ['How do I practise CDJs without owning them?', 'Book shop demo time, friends’ studios, or venue daytime hire. Practise USB export/import every session — that is half the skill.'],
  ['Promoter wants a free gig “for exposure”.', 'Exposure does not pay rent. Early career exceptions exist for strategic stages — but make them rare, intentional, and reciprocal (recording, photos, real audience).'],
  ['Should I talk on the mic?', 'Only if it serves the night. Short hype is fine; long speeches kill groove. Know the culture of the room.'],
  ['Wedding guest keeps demanding TikTok songs mid-speech.', 'Smile, acknowledge, and park it. Speeches and formal moments override requests. Confirm hierarchy with the couple beforehand.'],
  ['How loud is too loud for neighbours at a loft party?', 'If bass is travelling through floors, you are already near the line. Prioritise clarity over volume and agree a hard stop with the host.'],
  ['Is Amapiano too slow for a peak club slot?', 'Not if the room is with you. Peak is about tension and release, not a BPM number. Read bodies, not dogma.'],
  ['Do I need stems to be taken seriously?', 'No. Clean blends, taste and room reading still win. Stems are optional sauce.'],
  ['USB failed mid-set — what now?', 'Switch to backup USB immediately. If both fail, stay calm, signal the resident/engineer, and never start reformatting in a panic on the primary stick.'],
  ['How do I price outdoor carnival PA?', 'Itemise DJ fee, PA hire, power needs, crew and weather risk. Outdoor production is not “same as club plus speakers”.'],
  ['Can I learn mixing only on a controller then go to clubs?', 'You can start there, but schedule regular CDJ time before guesting. Club muscle memory is a different sport.'],
  ['What makes a Bristol DJ night different?', 'Tight scenes, carnival influence, and crowds that know Caribbean and African music deeply. Bring authenticity, not tourist selections.'],
  ['How do I stop overusing the filter?', 'Record yourself. If every transition sounds identical, ban the filter for a week of practice and rebuild vocabulary: cuts, EQ swaps, loops, short blends.'],
  ['Client wants a 5-hour set alone — healthy?', 'Possible with breaks for speeches/food, hydration and realistic programming. Clarify overtime and fatigue — quality drops when you are empty.'],
  ['Should I publish every mix I play?', 'Publish the ones that represent your lane. Not every warm-up needs to be content.'],
]

for (const [title, answer] of qaPairs) {
  add({
    category: 'room-tips',
    kind: 'qa',
    title,
    summary: answer.slice(0, 140) + (answer.length > 140 ? '…' : ''),
    tags: ['qa', 'community'],
    published: '2026-03-05',
    body: ['Community question answered in The Room.'],
    answers: [
      communityAnswer('Room visitor', title.includes('?') ? 'Looking for practical advice from people who play out.' : 'Wanted a sanity check before my next booking.', 3),
      roomAnswer(answer, 22),
    ],
  })
}

// Extra bulk Q&A across categories for depth
const bulkQa = [
  ['gear', 'Do I need two CDJs and a mixer at home?', 'Helpful, not mandatory. A good controller plus occasional CDJ practice can work. Prioritise time in the booth over bankrupt gear debt.'],
  ['gear', 'What’s a sensible first speaker upgrade?', 'Buy for clean headroom at the volumes you actually use. Overpowered nightclub stacks in a flat help nobody — including your neighbours.'],
  ['mixing', 'How long should a blend be?', 'As long as the music needs, as short as the room allows. Long blends are not automatically more skilful.'],
  ['mixing', 'Harmonic mixing — required?', 'Useful literacy, not a religion. A compatible key with the wrong energy still fails. Energy first, key as support.'],
  ['sound', 'Why do my tracks sound thin outdoors?', 'Wind and open air steal bass and highs. You need appropriate PA and realistic EQ — bedroom club curves do not translate.'],
  ['sound', 'Should DJs carry a DI box?', 'Handy for awkward venue inputs. Not always required, but a small DI and adapters make you the calm person in a chaotic changeover.'],
  ['genres', 'Is Soca OK at a UK wedding?', 'If the crowd has carnival energy or the couple requests it — yes. Read the room; force-feeding jump-up to a quiet dinner crowd is chaos.'],
  ['genres', 'How do I keep up with Afrobeats releases?', 'Follow specialists, radio shows, and dancing rooms — not only charts. Note reactions live; that is better A&R than any playlist.'],
  ['events', 'Who controls the playlist at a wedding — planner or couple?', 'Couple wins on must-plays; planner wins on timing. You win on floor reading between those anchors.'],
  ['events', 'Club wants a photo rider — what do I send?', 'High-res press image, logo, short bio, socials, and a live shot if you have a strong one. Make it easy to copy-paste.'],
  ['software', 'Cloud libraries mid-gig — safe?', 'Dangerous as primary. Offline local USB/collection only for paid work. Internet dies at the worst moment.'],
  ['software', 'How often should I re-analyse my library?', 'After major software updates or when grids feel wrong. Do not re-analyse blindly an hour before doors.'],
  ['production', 'What BPM should my edit intros be labelled at?', 'Label actual mix BPM and note half-time feels. Clear naming saves booth confusion.'],
  ['production', 'Can I sell DJ edits?', 'Know licensing law. Personal booth edits ≠ distribution rights. When in doubt, keep edits private to your USB.'],
  ['career', 'How many mixes before I message promoters?', 'Enough to show a coherent lane — often 2–3 strong recordings beat 15 scattered experiments.'],
  ['career', 'Should I play every genre to get booked?', 'Specialists get booked for a reason. Be versatile within a clear identity rather than randomly everything.'],
  ['booking', 'Can I negotiate rates for charity events?', 'Yes — decide your charity policy in advance so you are not pressured into free labour on the spot.'],
  ['booking', 'What details belong in a booking enquiry?', 'Date, venue, city, set times, audience size, genres wanted, kit needs, budget range, and contact name.'],
  ['room-tips', 'How do I calm nerves before peak?', 'Breathing, water, and a first-three-tracks plan. Nervous energy fades once the first clean blend lands.'],
  ['room-tips', 'What if the crowd is not dancing yet?', 'Do not panic-bang. Tighten groove, watch for the first cluster of movers, and build from real signals.'],
]

for (const [category, title, answer] of bulkQa) {
  add({
    category,
    kind: 'qa',
    title,
    summary: answer.slice(0, 120) + '…',
    tags: ['qa', category],
    published: '2026-03-08',
    body: ['Question from The Room community.'],
    answers: [
      communityAnswer('Guest DJ', 'Been thinking about this before my next booking.', 2),
      roomAnswer(answer, 18),
      communityAnswer('Promoter friend', 'This matches what I tell new DJs on my nights too.', 6),
    ],
  })
}

// Procedural expansion: technique/detail cards for volume with real topics
const expandTopics = [
  ['gear', 'tip', 'Label your USB ports in the bag', 'A tiny label for Primary and Backup prevents grabbing the empty stick when stressed.'],
  ['gear', 'tip', 'Carry gaffer and electrical tape', 'Cable downs and quick fixes are part of the job. Tape is cheaper than chaos.'],
  ['gear', 'faq', 'Do club mixers all feel the same?', 'Layouts are similar; curve and EQ personality differ. Arrive early and feel the channel strip before doors.'],
  ['gear', 'guide', 'Understanding the DJM channel strip', 'Gain, EQ, filter and fader are a sentence — learn to speak it without looking down.'],
  ['mixing', 'tip', 'Look up between blends', 'Confirm the floor responded. Mixing with your head in the waveform trains bad habits.'],
  ['mixing', 'tip', 'Save your wildest loop for a moment that deserves it', 'If every track gets sliced, nothing feels special.'],
  ['mixing', 'faq', 'Is sync cheating?', 'Sync is a tool. Relying on it without listening is the problem. Pros listen either way.'],
  ['mixing', 'guide', 'Echo outs that do not smear the next intro', 'Short, timed echoes into a clean downbeat beat accidental washouts.'],
  ['sound', 'tip', 'Ask where the fire exits are', 'Professionalism includes safety awareness, not only USB prep.'],
  ['sound', 'faq', 'Why does the engineer keep turning me down?', 'You are likely hotter than the system wants. Cooperate — they hear the room from places you cannot.'],
  ['sound', 'guide', 'Stereo vs mono compatibility for big systems', 'Check mixes for phase weirdness; club summing can expose bedroom stereo tricks.'],
  ['genres', 'tip', 'Note the first track that filled the floor', 'Write it down after. That data is gold for the next similar room.'],
  ['genres', 'faq', 'Can I play UK funky with Afrobeats?', 'Yes when percussion and energy talk. Bridge thoughtfully; do not hard-crash cultures as a flex.'],
  ['genres', 'guide', 'Building a Caribbean warm-up crate', 'Focus on groove, familiarity and conversational bass — not peak rewinds at 21:10.'],
  ['events', 'tip', 'Confirm load-in parking the day before', 'City centres and Malta venues alike punish assumptions.'],
  ['events', 'faq', 'Who brings the mic stands?', 'Ask. Never assume. Speeches die on missing stands.'],
  ['events', 'guide', 'Working with photographers and videographers', 'Agree lighting moments and avoid fog blasts into lenses without warning.'],
  ['software', 'tip', 'Color your played tracks during the set', 'Prevents accidental repeats when requests blur your memory.'],
  ['software', 'faq', 'Are lossless files required?', 'High-quality files help on big systems. Avoid low-bitrate rips for paid gigs.'],
  ['software', 'guide', 'Exporting playlists for a second DJ mid-night', 'Agree format early — USB structure or shared offline folder — before alcohol maths begins.'],
  ['production', 'tip', 'Name files with BPM and version', '120clean and 120dirty in the filename saves marriages and corporate careers.'],
  ['production', 'faq', 'Should DJs learn a DAW?', 'Basic editing skills pay off. You do not need to be a full producer to fix intros.'],
  ['production', 'guide', 'Making a radio edit for daytime community events', 'Mute/replace explicit phrases carefully and listen through headphones and speakers.'],
  ['career', 'tip', 'Keep a gig diary', 'Venue, fee, contacts, what worked. Memory fades; diaries book future work.'],
  ['career', 'faq', 'Is a logo necessary?', 'Helpful for flyers and booth branding. Music still comes first, but visual consistency helps.'],
  ['career', 'guide', 'Following up after a strong guest set', 'Thank the promoter within 48 hours, send a short clip, and leave the door open without pressure.'],
  ['booking', 'tip', 'Send a single clear WhatsApp summary after calls', 'Verbal quotes evaporate. A written recap protects both sides.'],
  ['booking', 'faq', 'Do you charge for consultations?', 'Serious booking chats are part of the process; endless speculative planning may need boundaries.'],
  ['booking', 'guide', 'Reading a venue advance like a pro', 'Note power, backline, schedule, contacts and hospitality. Questions early beat surprises late.'],
  ['room-tips', 'tip', 'Protect your ears between gigs too', 'Clubs, headphones and gyms all count toward your weekly dose.'],
  ['room-tips', 'tip', 'Be kind to the new DJ on before you', 'Scenes remember how you treat people when you are the bigger name on the bill.'],
  ['room-tips', 'guide', 'The Room philosophy in one page', 'Taste, timing, respect for culture, and service to the floor. Everything else is decoration.'],
]

for (const [category, kind, title, summary] of expandTopics) {
  const body =
    kind === 'guide'
      ? [summary, 'Break the idea into practice: try it on three tracks this week, then once on a live floor. Notes after the night matter more than theory.' , 'If it fails, adjust — rooms teach faster than tutorials.']
      : [summary, 'Room note: small professional habits compound into a reputation promoters trust.']
  add({
    category,
    kind,
    title,
    summary,
    tags: [kind, category],
    published: '2026-03-12',
    body,
    answers:
      kind === 'faq' || kind === 'qa'
        ? [roomAnswer(summary, 9)]
        : undefined,
  })
}

// More genre deep-dives
const genreExtra = [
  ['Selecting Bashment for mixed UK crowds', 'Start with widely known vocals, then go deeper if the floor shows you it can take it.'],
  ['Afro house adjacent bridging', 'Use percussion and organic drums as the handshake between house tempos and Afro vocal energy.'],
  ['Old school Hip Hop respect moments', 'A well-timed classic can unite ages — keep the edit clean and the blend tidy.'],
  ['R&B slow jams: when to deploy', 'Late-night intimacy or first-dance adjacent energy — not usually early doors.'],
  ['Soca peak tools', 'Carnival whistles and jump energy need a ready crowd. Telegraph the moment; do not ambush a chill room.'],
  ['Reggae roots vs dancefloor reggae', 'Know which lane the booking wants. Spiritual roots sets and party reggae are different contracts with the room.'],
  ['UK rap crossovers', 'Local vocals can lift a Bristol room — check explicit policy and regional relevance.'],
  ['Amapiano vocals vs instrumental rides', 'Instrumental hypnosis vs singalong payoffs — alternate to avoid monotone energy.'],
]

for (const [title, summary] of genreExtra) {
  add({
    category: 'genres',
    kind: 'guide',
    title,
    summary,
    tags: ['genres', 'selection'],
    published: '2026-03-14',
    body: [summary, 'Selection is cultural literacy plus observation. Charts help; dancing feet decide.', 'Keep notes on what Bristol rooms respond to versus tourist-heavy crowds abroad.'],
  })
}

// Dense FAQ/tip expansion for search depth
const dense = [
  ['booking', 'faq', 'Do you offer same-week bookings?', 'Sometimes. Peak weekends are unlikely; midweek and off-peak may open up. Message with the date and we will be honest about availability.'],
  ['booking', 'faq', 'Can I book only equipment hire without a DJ?', 'Equipment hire can be discussed for the right brief. Share venue, power and schedule details for a quote.'],
  ['booking', 'faq', 'Do you provide lighting?', 'Lighting packages can be arranged or referred. Performance and PA are the core offer — extras are quoted case by case.'],
  ['booking', 'tip', 'Include parking notes in the advance', 'A perfect fee means nothing if load-in takes 90 minutes circling one-way streets.'],
  ['booking', 'tip', 'Name a day-of contact', 'When the planner’s phone dies, you still need someone with keys and answers.'],
  ['gear', 'faq', 'Are CDJ-3000s required for a headline set?', 'Competence on club standards matters more than a specific model. Many venues still run NXS2 or mixed booths.'],
  ['gear', 'faq', 'Should I buy used club gear?', 'Yes if you can test it. Check faders, pots, USB ports and firmware. Budget for servicing.'],
  ['gear', 'tip', 'Pack a spare IEC and RCA pair', 'The cable that fails is always the one you did not duplicate.'],
  ['gear', 'tip', 'Keep USB sticks out of jean pockets with keys', 'Metal keys destroy USB housings. Use a pouch.'],
  ['gear', 'guide', 'Mixer fader curves and scratch vs club settings', 'Know whether the night needs smooth blends or sharper cuts. Ask before you fight the curve all set.'],
  ['gear', 'guide', 'Laptop standby settings before a hybrid gig', 'Disable sleep, notifications and auto-updates. A popup mid-drop is a professional low.'],
  ['mixing', 'faq', 'How do I fix a trainwreck in public?', 'Cut to the stronger track cleanly, smile, and move on. Lingering on a bad blend makes it worse.'],
  ['mixing', 'faq', 'Should I mix in key on Dancehall?', 'Energy and vocal space first. Key helps when it does not fight the culture of the blend.'],
  ['mixing', 'tip', 'Practice with the waveform hidden', 'Weekly ear training keeps you dangerous when screens glare or fail.'],
  ['mixing', 'tip', 'Leave the FX return down by default', 'FX should be intentional, not a constant soup.'],
  ['mixing', 'guide', 'Using loops to extend a vocal-friendly outro', 'Loop a clean bar to finish a story, then exit before the loop becomes obvious wallpaper.'],
  ['mixing', 'guide', 'Back-to-back etiquette', 'Agree channel ownership, do not grab a fader mid-move, and communicate the next energy with a word or gesture.'],
  ['sound', 'faq', 'What does “pull the master” mean?', 'Lower your master/output level. Engineers say it when the desk or PA is being overdriven.'],
  ['sound', 'faq', 'Can I EQ the PA from the DJ mixer?', 'Channel EQ shapes your blend; system EQ belongs to FOH. Do not try to “fix the room” with DJ EQ alone.'],
  ['sound', 'tip', 'Do a quiet pink-noise or music check early', 'Find obvious problems before guests arrive and drinks start.'],
  ['sound', 'tip', 'Keep drinks away from the mixer', 'One spill can end more than a night — it can end a residency.'],
  ['sound', 'guide', 'Understanding headroom on battery PA', 'Battery systems compress and die sooner than you think. Programme dynamics and volume with that limit in mind.'],
  ['genres', 'faq', 'What’s the difference between Afrobeats and Afro house?', 'Different rhythmic centres, production aesthetics and dance cultures. Learn both respectfully if you bridge them.'],
  ['genres', 'faq', 'Is Reggae the same as Dancehall?', 'Related Caribbean lineage, different eras and rhythmic feels. Do not use the names interchangeably in briefs.'],
  ['genres', 'tip', 'Watch for national flags and crew shirts', 'Carnival crowds tell you what pride anthems may land.'],
  ['genres', 'tip', 'Keep a multilingual vocal awareness', 'Even if you do not speak every language, know when a vocal is sacred, comedic, or explicit.'],
  ['genres', 'guide', 'Programming a Malta guest set', 'Research the local crowd mix, confirm kit, and bring a flexible crate — tourist and local energy can differ by hour.'],
  ['events', 'faq', 'Do I need public liability insurance?', 'For professional work, yes — many venues require proof. Get cover appropriate to your kit and activities.'],
  ['events', 'faq', 'Who schedules speeches at a wedding?', 'Usually the planner/couple. Get the order in writing and protect those windows in your timeline.'],
  ['events', 'tip', 'Confirm power type for outdoor stages', 'Generator vs mains changes cable plans and risk.'],
  ['events', 'tip', 'Have a rain decision tree', 'Know who calls delay/cancel and how fees work if weather kills the set.'],
  ['events', 'guide', 'Club residency habits that keep you booked', 'Consistency, scene support, tidy changeovers, and sets that make the bar and dancefloor both happy.'],
  ['software', 'faq', 'Is rekordbox free enough for club USBs?', 'Core export workflows are available — verify your version’s export features and device limits before gig week.'],
  ['software', 'faq', 'Can I use iCloud Drive as my music library?', 'Risky for live work. Local SSD collections are more dependable.'],
  ['software', 'tip', 'Duplicate your export playlist the night before', 'Last-minute track adds are fine; last-minute full re-exports invite mistakes.'],
  ['software', 'guide', 'Organising crates by room type', 'Wedding clean, club peak, carnival outdoor, radio — different rooms need different tools ready.'],
  ['production', 'faq', 'What sample rate should DJ files be?', '44.1kHz stereo is standard for DJ libraries. Stay consistent across the collection.'],
  ['production', 'tip', 'Keep unedited originals archived', 'You will need the clean source again when a client changes lyric policy.'],
  ['production', 'guide', 'Creating an extended intro from a radio edit', 'Loop or rearrange an instrumental section carefully; avoid audible circular artefacts.'],
  ['career', 'faq', 'How important is Mixcloud vs SoundCloud?', 'Both can work. Pick a home base, keep links current, and share recordings that match the bookings you want.'],
  ['career', 'faq', 'Should I play for free at my friend’s bar?', 'Maybe once as a favour with clear limits. Ongoing free labour teaches them your rate is zero.'],
  ['career', 'tip', 'Save promoter contacts with venue notes', 'A CRM does not have to be fancy — a notes app beats lost Instagram DMs.'],
  ['career', 'guide', 'Building a signature within Caribbean & urban lanes', 'Specialism plus personality: selection, transitions, and how you host energy without drowning the music.'],
  ['room-tips', 'faq', 'What does “Reads the Room” actually mean?', 'It means changing plan based on real people in front of you — not abandoning taste, but serving the night intelligently.'],
  ['room-tips', 'tip', 'Take a 20-second booth pause after a big moment', 'Let the crowd cheer. You do not have to fill every gap with a trick.'],
  ['room-tips', 'tip', 'Credit the culture you play', 'You are a guest in musical traditions — play with knowledge and respect.'],
  ['room-tips', 'guide', 'How The Room library is meant to be used', 'Search when you have a problem, browse before a booking type you have not played, and steal habits — not identity.'],
  ['room-tips', 'qa', 'How do I know if I am overplaying edits?', 'If every track is a custom flip, the room may miss the records they came to hear. Balance craft with recognition.'],
  ['mixing', 'qa', 'Double drop or clean handover for peak?', 'Only double-drop if both tracks deserve it and the system can take the low end. Clean handovers age better than cluttered flexes.'],
  ['gear', 'qa', 'Controller mapping — worth customising?', 'Light customisation helps; total remaps hurt when you guest on default gear. Keep transferable habits.'],
  ['sound', 'qa', 'My headphones sound great but FOH sounds bad', 'Booth ≠ room. Trust the engineer’s perspective and reference walks when possible.'],
  ['booking', 'qa', 'Can I hold two dates while a client decides?', 'Short courtesy holds maybe; long unpaid holds block real work. Set expiry times.'],
  ['events', 'qa', 'What if the couple’s must-play empties the floor?', 'Play it cleanly once at a suitable moment, then return to what the room responds to — unless they insist otherwise in the brief.'],
  ['genres', 'qa', 'How deep should my Dancehall crate go?', 'Deep enough to serve specialists, familiar enough to catch mixed crowds. Know both shelves.'],
  ['software', 'qa', 'One big playlist or many mini crates?', 'Many vibe crates scale better. One giant list becomes a scrolling tax at peak.'],
  ['career', 'qa', 'Do I need a stage name like RHUE?', 'A clear, memorable name helps branding. Consistency across flyers and socials matters more than clever spelling.'],
  ['production', 'qa', 'Are AI-generated DJ tools okay?', 'Use tools that improve prep, not ones that fake live skill. Audiences and promoters still book humans who can read a room.'],
]

for (const row of dense) {
  const [category, kind, title, summary] = row
  const body =
    kind === 'guide'
      ? [summary, 'Practice the idea in rehearsal, then validate it live. Adjust from notes — not from ego.', 'Share what you learn with the next DJ in the booth; scenes rise together.']
      : [summary]
  add({
    category,
    kind,
    title,
    summary,
    tags: [kind, category, 'room'],
    published: '2026-03-18',
    body:
      kind === 'qa'
        ? ['Community question in The Room.']
        : body.length === 1
          ? [summary, 'Practical detail from The Room — built for working DJs, promoters and curious fans.']
          : body,
    answers:
      kind === 'faq' || kind === 'qa'
        ? [
            ...(kind === 'qa'
              ? [communityAnswer('Room visitor', 'Had this come up on a recent gig.', 2)]
              : []),
            roomAnswer(summary, kind === 'qa' ? 16 : 10),
          ]
        : undefined,
  })
}

// Technique drills (numbered series)
for (let n = 1; n <= 24; n++) {
  const drills = [
    'Beatmatch two tracks with waveforms covered for 10 minutes',
    'EQ-out bass on the outgoing track for eight bars, then swap',
    'Build a 6-track warm-up with no FX',
    'Practice three clean cuts into vocal downbeats',
    'Prepare a clean-edit wedding crate of 30 labels',
    'Rehearse a USB failure swap to backup in under 20 seconds',
    'Record a 30-minute mix and note every messy blend',
    'Learn phrase lengths on five Afrobeats vocals',
    'Set consistent hot cues on 20 peak tracks',
    'Practice gain matching between quiet and loud masters',
    'Mix Hip Hop into Afrobeats using a percussion bridge',
    'Perform a 90-second echo-out that lands clean',
    'Build an outdoor carnival peak sequence of 8 tracks',
    'Label cables and photograph your mobile rack',
    'Write your fee sheet and cancellation terms on one page',
    'Update EPK credits with your last three real gigs',
    'Walk a venue and mark power + load-in notes',
    'Create a neighbour-friendly private-party level plan',
    'Test your USB on two different player families',
    'Make a closing trio: soft, chant, groove-fade',
    'Practice mic courtesy for a 15-second hype only',
    'Build an Amapiano patience crate (long grooves)',
    'Translate a bedroom controller habit onto CDJs',
    'Review a live recording at 0.75x and mark timing errors',
  ]
  const title = `Room drill ${String(n).padStart(2, '0')}: ${drills[n - 1]}`
  add({
    category: 'room-tips',
    kind: 'tip',
    title,
    summary: drills[n - 1] + ' — a focused practice block from The Room.',
    tags: ['drill', 'practice', 'room'],
    published: '2026-03-20',
    body: [
      drills[n - 1] + '.',
      'Do this drill once without filming. Do it again and record. Compare without judgement — look for one improvement only.',
      'Room standard: small weekly drills beat rare heroic practice weekends.',
    ],
  })
}

// Deduplicate slugs
const seen = new Set()
for (const p of posts) {
  let s = p.slug
  let i = 2
  while (seen.has(s)) {
    s = `${p.slug}-${i++}`
  }
  p.slug = s
  seen.add(s)
}

mkdirSync(dirname(outPath), { recursive: true })

const header = `/** Auto-generated by scripts/generate-room-content.mjs — do not edit by hand. */
import type { RoomPost } from './types'

export const roomPosts: RoomPost[] = `
const json = JSON.stringify(posts, null, 2)
writeFileSync(outPath, `${header}${json}\n`, 'utf8')

console.log(`Wrote ${posts.length} posts across ${categories.length} categories → ${outPath}`)

// Also emit a Room sitemap fragment for SEO
const sitemapPath = join(__dirname, '..', 'public', 'sitemap-room.xml')
const lastmod = '2026-08-29'
const urls = [
  `  <url><loc>https://djrhue.com/room/</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.95</priority></url>`,
]
for (const id of categories) {
  urls.push(
    `  <url><loc>https://djrhue.com/room/${id}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`,
  )
}
for (const p of posts) {
  urls.push(
    `  <url><loc>https://djrhue.com/room/${p.category}/${p.slug}/</loc><lastmod>${p.published}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
  )
}
writeFileSync(
  sitemapPath,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  'utf8',
)
console.log(`Wrote Room sitemap (${urls.length} URLs) → ${sitemapPath}`)
