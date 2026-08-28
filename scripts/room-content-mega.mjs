/**
 * Mega expansion pack for The Room — deep technical + exhaustive Q&A.
 * Imported by generate-room-content.mjs
 */

export function buildMegaPosts({ add, roomAnswer, communityAnswer }) {
  // ─── CABLES ENCYCLOPEDIA ───────────────────────────────────────────────────
  const cableGuides = [
    [
      'Understanding your cables: the DJ & PA map',
      'A plain-English map of every connector you will meet between USB, mixer, amps and speakers — and what not to force.',
      [
        'Cables are how signal and power move. Mixing them up is the fastest way to a silent booth or a damaged socket.',
        'Audio signal cables (XLR, TRS, TS, RCA) are not power cables (IEC, powerCON). Never treat a signal lead like a mains lead.',
        'Balanced lines (XLR, TRS) reject noise better over distance. Unbalanced (TS, RCA) are fine for short runs and many DJ outputs — but adapt carefully.',
        'Carry a labelled adapter pouch: RCA–RCA, RCA–XLR, XLR M–F, TRS–XLR, spare IEC, and gaffer. That kit ends most “we can’t hear the DJ” panics.',
        'Gold rule: if it does not seat cleanly, stop. Wrong gender, wrong format, or a damaged socket — forcing it becomes your repair bill.',
      ],
      ['cables', 'xlr', 'rca', 'pa', 'basics'],
    ],
    [
      'XLR cables explained for DJs',
      'What the three pins do, mic vs line, and when your mixer expects XLR instead of RCA.',
      [
        'XLR is a locking, usually balanced connector common on mics, DI boxes, mixers and PA inputs. Male and female ends matter — learn which way signal flows on your chain.',
        'Typical pinout (AES standard): Pin 1 ground/shield, Pin 2 hot (+), Pin 3 cold (−). You do not need to rewire XLRs mid-gig, but knowing this helps when a cable is wired wrong.',
        'Mic level and line level are different voltages. Plugging a line output into a mic input can distort or damage; mic into line can be tiny. Use the right input or a DI/pad.',
        'For FOH: leave spare XLR runs coiled and labelled. A dead channel is often a cable, not a mixer.',
      ],
      ['xlr', 'cables', 'balanced'],
    ],
    [
      'RCA / phono cables in the booth',
      'Why DJ gear loves RCA, how phono vs line differs, and the ground-wire trap on turntables.',
      [
        'RCA (phono plugs) are unbalanced stereo pairs used on many DJ controllers, CDJs and mixer channel inputs.',
        'Phono inputs expect turntable-level signal plus RIAA EQ. Line inputs expect CDJ/controller level. Wrong switch = thin/noisy or massively loud distortion.',
        'Turntables need a ground wire to the mixer ground post. Skip it and you often get hum.',
        'Keep RCA runs short when you can. Long unbalanced runs pick up noise — especially near power bricks and lighting dimmers.',
      ],
      ['rca', 'phono', 'cables', 'turntables'],
    ],
    [
      'TRS vs TS: headphones, inserts and balanced line',
      'The tip-ring-sleeve story in language that survives peak time.',
      [
        'TS (tip-sleeve) is unbalanced mono — guitar leads, some DJ inserts, unbalanced sends.',
        'TRS (tip-ring-sleeve) can be balanced mono line, stereo unbalanced (headphones), or insert cables depending on wiring. Context matters.',
        'Booth headphones are usually TRS stereo. A mono TS jammed into a headphone jack is a bad idea.',
        'Balanced TRS line outs exist on some interfaces and mixers. Match them to balanced inputs when cable runs get long.',
      ],
      ['trs', 'ts', 'headphones', 'cables'],
    ],
    [
      'speakON and speaker cables — do not use mic leads for speakers',
      'Why speaker cable is different, what speakON locks do, and the amp-to-cab mistakes that blow drivers.',
      [
        'Speaker cables carry amplified power, not mic-level signal. Using skinny mic XLR as a speaker lead is unsafe and can melt or fail.',
        'speakON (NL2/NL4 etc.) locks into modern speakers and amps so the cable cannot fall out mid-drop.',
        'Match amp power and impedance to the cabinet. Bridging, wrong ohm loads, and clipped amps kill cones.',
        'Coil speaker cable properly and inspect jackets. A crushed cable under a stage riser is a future short.',
      ],
      ['speakon', 'speaker-cable', 'pa', 'safety'],
    ],
    [
      'Power cables: IEC, powerCON and distribution hygiene',
      'How to feed the booth without daisy-chain roulette.',
      [
        'IEC (kettle leads) power many CDJs, mixers and laptop PSUs. Carry at least one spare.',
        'powerCON (and TRUE1 variants) lock into many PA racks. Learn the in/out direction on your specific connectors — they are not all identical.',
        'One clean distribution path beats random multi-plugs chained across the stage. Ask about generator stability outdoors.',
        'Label power runs separately from audio. Crossing power over audio inputs invites hum.',
      ],
      ['power', 'iec', 'powercon', 'cables'],
    ],
    [
      'USB cables and sticks that survive club players',
      'Data vs charge cables, USB format traps, and why the cheap stick dies at doors.',
      [
        'A charge-only USB cable will not talk to a controller or hard drive. Keep known-good data cables in the booth pouch.',
        'USB sticks for Pioneer players: quality brand, correct format, tested on the player family before the gig.',
        'USB hubs add failure points. Prefer direct ports for primary library sticks.',
        'Never yank a stick during write/export. Eject cleanly. Corruption loves panic.',
      ],
      ['usb', 'cables', 'rekordbox'],
    ],
    [
      'Adapter matrix: what connects to what (and what should not)',
      'A practical cheat sheet for RCA–XLR, TRS–XLR, gender changers and the adapters that lie.',
      [
        'RCA to XLR adapters move connectors — they do not magically balance an unbalanced signal. Useful, not miraculous.',
        'Gender changers fix a wrong sex cable; they do not fix a wrong signal type.',
        'Stereo to mono summing adapters can cause phase weirdness if misused. Prefer proper mono summing in the mixer when possible.',
        'Build a tested adapter kit once. Do not invent new Franken-cables at 23:40.',
      ],
      ['adapters', 'cables', 'booth'],
    ],
    [
      'Balanced vs unbalanced audio — why your long cable hums',
      'Noise rejection in one page, without an engineering degree.',
      [
        'Balanced connections send the signal two ways (hot/cold) so interference can be cancelled at the input.',
        'Unbalanced sends one signal + ground. Fine for short DJ RCA runs; risky across a warehouse.',
        'If the booth is quiet but FOH hums, suspect long unbalanced runs, ground loops, or lighting dimmers on shared power.',
        'DI boxes convert and isolate. Ask FOH before inventing a new path through the building.',
      ],
      ['balanced', 'unbalanced', 'noise', 'cables'],
    ],
    [
      'Cable care, coiling and gig-bag discipline',
      'How pros keep leads alive longer than one carnival season.',
      [
        'Over-under coiling reduces twists. Yank-coiling destroys internals over months.',
        'Colour-sleeve or label both ends. Primary / backup / FOH / monitors — future-you in the rain will thank you.',
        'Retire cables with cracked jackets, loose strain relief, or intermittent crackle. Intermittent is worse than dead.',
        'Keep drinks off the cable pile. Sticky beer inside an XLR is a slow betrayal.',
      ],
      ['cables', 'maintenance', 'tips'],
    ],
  ]

  for (const [title, summary, body, tags] of cableGuides) {
    add({
      category: 'gear',
      kind: 'guide',
      title,
      summary,
      tags,
      published: '2026-03-22',
      body,
    })
  }

  const cableFaqs = [
    ['Can I use a microphone XLR as a speaker cable?', 'No. Speaker runs need proper speaker cable / speakON. Mic XLR is for low-level signal, not amp power.'],
    ['Why is there only sound in one side of my RCA?', 'Dead cable channel, half-seated RCA, or a mono/stereo mismatch. Swap the cable first before blaming the mixer.'],
    ['Do gold-plated connectors matter?', 'Contact quality and cable construction matter more than gold marketing. A solid mid cable beats a fancy intermittent one.'],
    ['How long can an unbalanced RCA run be?', 'Keep them short when possible. If you must go long, expect more noise risk — prefer balanced where the system allows.'],
    ['What is a ground loop hum?', 'Multiple ground paths creating a loop that buzzes. Solutions involve power hygiene, DI isolation, and not random adapter piles — ask FOH.'],
    ['TRS headphone extension — any gotchas?', 'Use a proper headphone extension. Ultra-cheap ones fail and add hiss. Keep the primary pair short and reliable.'],
    ['Can lighting DMX share my audio multicore casually?', 'Best practice: keep lighting and audio loom discipline clear. Cross-talk and confusion at changeover are real.'],
    ['IEC lead feels loose in the CDJ — safe?', 'Replace it. A loose IEC can drop power mid-set. Carry spares rated for the load.'],
    ['RCA colour red/white — which is left?', 'Convention: red right, white/black left. Confirm if a cable is mis-moulded — ears over stickers when unsure.'],
    ['Should speaker cable be thicker for long runs?', 'Long speaker runs prefer appropriate gauge. Undersized cable wastes power as heat and can limit headroom.'],
  ]

  for (const [title, summary] of cableFaqs) {
    add({
      category: 'gear',
      kind: 'faq',
      title,
      summary,
      tags: ['cables', 'faq', 'gear'],
      published: '2026-03-22',
      body: [summary, 'Room note: cable problems look like “mixer problems” until you swap one lead and the night comes back.'],
      answers: [roomAnswer(summary, 19)],
    })
  }

  // ─── DEEP GEAR ─────────────────────────────────────────────────────────────
  const gearDeep = [
    ['CDJ USB hierarchy: stick vs playlist vs search', 'Learn the player’s browse model before doors. Searching a chaotic stick mid-peak is how sets stall.'],
    ['Hot Cue banks vs Memory Cues on Pioneer', 'Memory cues are navigate-and-jump landmarks; hot cues are performance pads. Use both with a consistent personal system.'],
    ['Jog wheel modes you should actually know', 'Vinyl vs CDJ jog behaviour changes nudge feel. Practice both so a venue preference does not wreck your first blend.'],
    ['DJM filter resonance — spice vs mud', 'A little resonance announces a transition; too much turns the master into a whistle. Ride it with intention.'],
    ['Booth cue vs master cue discipline', 'Cue is preview; master is the room. Mixing only on cue without checking master is a classic new-DJ leak.'],
    ['Limiter lights on the DJM — what they mean', 'They are warnings, not creative FX. If you live in limiter, pull gains and talk to FOH.'],
    ['Active speakers vs passive cabs for mobile DJs', 'Active = amp built in; passive needs an external amp. Match the whole chain including stands and covers.'],
    ['Subwoofer crossover basics for DJs hiring PA', 'Subs need a correct crossover point. Too high and kick gets muddy; too low and the floor feels hollow.'],
    ['Wireless mics for weddings — when they fail', 'Batteries, frequency clashes, and bodypack placement. Always have a wired backup for speeches.'],
    ['Laptop stand height and wrist survival', 'Ergonomics is career length. A low laptop forces bad shoulders for a four-hour set.'],
    ['Controller screen brightness outdoors', 'Daylight kills OLEDs. Shade the booth and increase contrast; do not rely on a washed waveform.'],
    ['Spare fader and crossfader reality', 'Club desks get abused. If the night is scratch-heavy, test the curve early and adapt.'],
  ]

  for (const [title, summary] of gearDeep) {
    add({
      category: 'gear',
      kind: 'guide',
      title,
      summary,
      tags: ['gear', 'guide'],
      published: '2026-03-23',
      body: [
        summary,
        'Practice the idea at home, then confirm it on club kit. Gear literacy is half selection, half survival.',
        'If something feels wrong in soundcheck, fix it before doors — not during the first guest photo dump on the dancefloor.',
      ],
    })
  }

  // ─── SOUND / ACOUSTICS / HEARING ───────────────────────────────────────────
  const soundDeep = [
    ['What is clipping, really?', 'Clipping is the waveform smashing flat because the signal is too hot for the stage. It sounds harsh and can damage speakers.'],
    ['Headroom explained without maths panic', 'Headroom is spare space before clipping. Leave some. Loudness is not the same as “all meters solid red”.'],
    ['Room modes and why bass is uneven in venues', 'Bass builds and cancels depending on room shape. Walk the floor; do not EQ only from the booth sweet spot.'],
    ['Feedback frequencies — find and notch', 'Howl is often a narrow band. Lower gain, move mic, notch if you have tools — do not randomly gut the whole EQ.'],
    ['Pink noise what FOH sometimes uses', 'Engineers use measurement signals to tune systems. If you hear it pre-doors, stay out of the way and wait for your soundcheck window.'],
    ['Delay towers at festivals — why your USB feels late', 'Large sites time-align delay speakers. Your ears in the booth are not the whole site — trust the system tech.'],
    ['Cardioid vs omni mics for speeches', 'Cardioid rejects more rear noise and helps feedback control. Omni hears everything — including monitors.'],
    ['In-ear monitors for DJs — worth it?', 'Useful in loud environments and for hearing protection strategy, but learn the mix. Sudden IEM failure needs a backup plan.'],
    ['Compressor on the master bus — DJ myths', 'Heavy master compression can glue or squash dynamics. Many club systems already limit; do not double-murder the transient.'],
    ['Why the floor loves kick and the bar hates it', 'Coverage and volume priorities differ across a venue. Negotiate with FOH rather than secretly riding the sub forever.'],
  ]

  for (const [title, summary] of soundDeep) {
    add({
      category: 'sound',
      kind: 'guide',
      title,
      summary,
      tags: ['sound', 'pa', 'guide'],
      published: '2026-03-23',
      body: [
        summary,
        'Sound problems are often gain, placement, or expectations — not “bad tracks”. Diagnose in that order.',
        'Protect your ears while you learn. A long career beats one heroic clipped night.',
      ],
    })
  }

  // ─── MIXING CRAFT DEEP ─────────────────────────────────────────────────────
  const mixingDeep = [
    ['Intro length literacy on modern edits', 'Know whether the intro gives you 8, 16 or 32 bars before the vocal. That number is your blend budget.'],
    ['Outro litter — when tracks never end clean', 'Many streaming-era edits collapse. Build your own loopable outro points with cues.'],
    ['Energy mapping on paper before a guest set', 'Sketch warm → groove → peak → reload → close. Arrive with a plan you are willing to abandon.'],
    ['Key clash triage mid-blend', 'If it hurts, exit early with a cut or drop to drums. Do not “EQ your way” through a minor-second car crash for 32 bars.'],
    ['Quick cut as a skill, not a panic', 'A clean cut on a downbeat is musical. A flustered cut mid-phrase is a confession.'],
    ['Loop + bass swap transition', 'Loop a stable bar, trade lows, then release into the new phrase. Simple, powerful, overused only when every track gets it.'],
    ['Echo out timing to the snare', 'Time the feedback so repeats land on groove, then kill it before the next intro’s first kick.'],
    ['Backspin ethics in club culture', 'A backspin can hype or annoy. Know the room’s language — Caribbean selectors and house dens do not always share punctuation.'],
    ['Programming for a talking crowd vs a dancing crowd', 'Conversation rooms need midrange courtesy. Dance rooms need physical low end. Same USB, different rides.'],
    ['The 3-track test for a new genre lane', 'Can you warm, peak, and reload inside one lane without escaping to comfort bangers? That is literacy.'],
  ]

  for (const [title, summary] of mixingDeep) {
    add({
      category: 'mixing',
      kind: 'guide',
      title,
      summary,
      tags: ['mixing', 'craft'],
      published: '2026-03-23',
      body: [
        summary,
        'Record yourself weekly. The mix you remember and the mix that happened are different files.',
        'Steal structure from residents you admire — not their exact tracklists.',
      ],
    })
  }

  // ─── GENRES DEEP ───────────────────────────────────────────────────────────
  const genresDeep = [
    ['Afrobeats vocal respect on big systems', 'Keep space around the vocal. Over-layering percussion mid-chorus is a bedroom habit that fails on club volume.'],
    ['Dancehall pull-up culture — when and why', 'A pull-up rewards recognition and energy. Random pull-ups on tracks nobody knows just stop the night.'],
    ['Amapiano log drum translation on small PAs', 'Log drums need clean low-mids. On tiny battery speakers they can vanish or distort — choose edits accordingly.'],
    ['Reggae dynasties vs dancefloor tools', 'Know whether the booking wants roots reverence or party reggae. Wrong lane feels disrespectful even if BPMs match.'],
    ['Soca and road march energy indoors', 'Carnival jump translated into a low ceiling can overwhelm. Telegraph the moment and read density on the floor.'],
    ['UK funky / broken elements as bridges', 'Percussive UK styles can handshake Afro and house energies when you listen for drums, not only genre labels.'],
    ['Hip Hop radio edits vs album cuts', 'Corporate and daytime need clean. Keep both labelled. Grabbing the dirty version at a family wedding is avoidable.'],
    ['R&B blends into Dancehall', 'Shared dancers, different pockets. Use vocals and groove beds; avoid stubborn harmonic mash attempts.'],
    ['Afro house adjacent to Afrobeats — not identical', 'Different crowds and pacing. Bridge with intention; do not assume the names are interchangeable in a brief.'],
    ['Baile funk caution and context', 'Powerful and specific. Play with cultural awareness and crowd fit — not as random “internet heat”.'],
    ['Gospel / lovers crossovers at Caribbean weddings', 'Multi-gen floors often need warmth and familiarity before bashment weight.'],
    ['Reading diaspora rooms in Bristol', 'Flags, crews, age mix and request language tell you which Caribbean/African lanes will land tonight.'],
  ]

  for (const [title, summary] of genresDeep) {
    add({
      category: 'genres',
      kind: 'guide',
      title,
      summary,
      tags: ['genres', 'culture', 'selection'],
      published: '2026-03-24',
      body: [
        summary,
        'Charts help discovery; dancing bodies confirm truth. Keep a gig diary of what actually filled the floor.',
        'Play as a guest in the culture — knowledge and respect beat tourist crate energy.',
      ],
    })
  }

  // ─── SOFTWARE / FILES / LIBRARY ────────────────────────────────────────────
  const softDeep = [
    ['Lossless vs high-bitrate MP3 on club systems', 'Better files help on big PAs. Avoid low-bitrate rips for paid work — artefacts get expensive-sounding.'],
    ['Duplicate tracks across crates — how to manage', 'Duplicates confuse search. One master file, many playlists pointing to it, beats five copies with five cue maps.'],
    ['rekordbox export checklist the night before', 'Stick format, playlist sync, hot cues present, backup stick cloned, player family tested.'],
    ['Serato stems CPU spikes on older laptops', 'Stems cost CPU. Close browsers, disable notifications, and test your worst case before doors.'],
    ['Cloud sync mid-tour — why it bites', 'Internet dies. Offline local collection only for paid booths.'],
    ['Colour coding played tracks live', 'Mark played so requests do not loop you into repeats when adrenaline scrambles memory.'],
    ['Beatgrid war on live percussion edits', 'Some Caribbean/live edits will not grid cleanly. Manual cues + ears beat fighting the red lines.'],
    ['Firmware updates — when not to update', 'Do not update club players an hour before doors unless FOH requires it and you can test.'],
    ['Backup laptop image for touring DJs', 'Assume the machine dies. A clone drive and a USB-only plan are adult behaviour.'],
    ['Recording boards vs soundcard loopback', 'Know your record path. A cable to a recorder still beats “I thought the software was capturing”.'],
  ]

  for (const [title, summary] of softDeep) {
    add({
      category: 'software',
      kind: 'guide',
      title,
      summary,
      tags: ['software', 'library'],
      published: '2026-03-24',
      body: [summary, 'Prep is silent professionalism. The crowd never applauds your folder structure — they only notice when it fails.'],
    })
  }

  // ─── EVENTS / LEGAL / MONEY / HEALTH ───────────────────────────────────────
  const careerDeep = [
    ['UK DJ public liability — why venues ask', 'Many rooms require proof of insurance. Get cover that matches kit hire and public performance realities.'],
    ['PRSforMusic / venue licensing basics for DJs', 'Venues usually handle music licences for the premises. Your job is still legal acquisition of the files you play.'],
    ['Invoicing as a sole trader DJ in the UK', 'Clear invoices, late fees policy, and records. Treat the booth like a business even when the night feels like a party.'],
    ['Deposit disputes — how to stay calm and documented', 'Written quotes and dated messages win. Verbal-only bookings create fog.'],
    ['Tax envelopes: keep gig receipts', 'Travel, kit, software subscriptions — organised records reduce stress later.'],
    ['Hearing tests as career maintenance', 'Baseline your hearing. Tinnitus after runs of gigs is data, not a personality trait.'],
    ['Sleep after late load-outs', 'Heroic drives home destroy next-week performance. Budget hotels when the finish is savage.'],
    ['Social media clips without killing the mix', 'Film peaks briefly; do not stare at your phone through the blend. Hire a friend when you can.'],
    ['When to say no to a booking', 'Unsafe power, unpaid history, impossible travel, or values clash. No is a professional tool.'],
    ['Agent vs self-booked — what changes', 'Agents take commission for reach and filtering. Self-booked means you own chase-up and negotiation.'],
  ]

  for (const [title, summary] of careerDeep) {
    add({
      category: 'career',
      kind: 'guide',
      title,
      summary,
      tags: ['career', 'business', 'uk'],
      published: '2026-03-24',
      body: [
        summary,
        'This is general practical guidance, not personal legal or tax advice — confirm details for your situation.',
        'Professionals document. Casual scenes still respect people who invoice cleanly and show up prepared.',
      ],
    })
  }

  // ─── PRODUCTION / EDITS ────────────────────────────────────────────────────
  const prodDeep = [
    ['Extended intro recipe that DJs actually use', 'Add 16–32 bars of mixable drums/bass without wrecking the song identity.'],
    ['Radio edit ethics for daytime community events', 'Mute/replace explicit lines carefully and listen on multiple systems before the gig.'],
    ['Tempo-mapped edits for festival formats', 'Some stages want earlier drops. Edit for the format, label clearly, keep the original archived.'],
    ['Stem cleanup for acapella moments', 'Imperfect stems rattle on big systems. Choose clean sources; do not solo mud.'],
    ['Normalisation vs loudness for DJ files', 'Do not brickwall every track identical. Ride gain live; leave dynamics.'],
    ['File naming that saves marriages', 'Include BPM, version (clean/dirty), and edit type in the filename.'],
  ]

  for (const [title, summary] of prodDeep) {
    add({
      category: 'production',
      kind: 'guide',
      title,
      summary,
      tags: ['production', 'edits'],
      published: '2026-03-24',
      body: [summary, 'Booth edits solve booth problems. If the edit only shows off your DAW, it is not finished.'],
    })
  }

  // ─── PROCEDURAL FAQ STORMS (comprehensive Q coverage) ──────────────────────
  const faqStorm = [
    // cables / interconnect
    ['gear', 'What does a DI box do for a DJ?', 'It converts and often isolates signals so FOH can take your output cleanly — useful with awkward venue inputs and ground issues.'],
    ['gear', 'Can I split my master to FOH and a recorder?', 'Yes with the right splitter/recorder feed. Ask before y-splitting in ways that load the output wrongly.'],
    ['gear', 'Why do my XLRs crackle when touched?', 'Failing solder or strain relief. Retire the cable. Intermittent crackle becomes a drop-out at peak.'],
    ['gear', 'Is optical TOSLINK useful in DJ booths?', 'Rare in standard club changeovers. Analog/USB workflows dominate. Do not rely on optical unless the residency is built for it.'],
    ['gear', 'MIDI cables — still relevant?', 'For syncing hardware/controllers yes. For a USB-CDJ club guest set, usually no.'],
    ['gear', 'What is powerCON TRUE1 vs older powerCON?', 'Different connector families with different lock/load behaviours. Do not force incompatibles; learn your rack.'],
    ['gear', 'Should I tape RCA connections?', 'In mobile/festival chaos, a little security tape can prevent kicks. Do not glue things permanently to venue kit.'],
    ['gear', 'How do I test a cable quickly?', 'Cable tester, or swap with a known-good lead. Continuity guessing wastes soundcheck.'],
    ['sound', 'What is a pass-through on speakers?', 'Daisy-chaining speakers/amp outs. Follow manufacturer limits — random daisy chains overheat and fail.'],
    ['sound', 'Why does bass disappear when I walk five steps?', 'Room modes and coverage. Not always your EQ. Walk the room and collaborate with FOH.'],
    // mixing
    ['mixing', 'How do I stop mixing every transition the same?', 'Ban your favourite FX for a week of practice. Rebuild vocabulary: cuts, EQ trades, loops, short blends, silence.'],
    ['mixing', 'Is beatmatching dead because sync exists?', 'No. Sync fails, grids fail, and ears keep you employable on unfamiliar desks.'],
    ['mixing', 'What BPM range is Afrobeats usually in?', 'Often roughly mid-90s to around 120 depending on era/edit — verify each track; do not worship a single number.'],
    ['mixing', 'What BPM is Dancehall often around?', 'Many sit roughly mid-80s to low-100s depending on riddim/feel — always check the actual track and half-time perception.'],
    ['mixing', 'Should I mix in key on every blend?', 'Energy and vocal space first. Key is a helper, not a religion.'],
    ['mixing', 'How long should I practice weekly?', 'Consistent short sessions beat rare marathon weekends. Add one live-floor session whenever you can.'],
    // booking / events
    ['booking', 'Do you price travel separately from the DJ fee?', 'Yes — travel and overnight needs are itemised so the performance fee stays clear.'],
    ['booking', 'Can I book DJ RHUE for a daytime community festival?', 'Yes when the diary allows — share times, PA reality, and clean-edit requirements.'],
    ['booking', 'Do you take playlist requests from guests on the night?', 'Anchored must-plays from the client come first; live requests are filtered through room reading.'],
    ['events', 'How do I run speeches without killing dancefloor momentum?', 'Schedule them, duck music politely, keep transitions short, and restart with a familiar groove — not a random peak edit.'],
    ['events', 'What is a rider for a DJ guest set?', 'Your technical/hospitality needs: USB/CDJ preference, monitoring, timing, contacts. Keep it realistic.'],
    ['events', 'Who provides tables and booth décor?', 'Confirm in the advance. Assume nothing — especially outdoors.'],
    // software
    ['software', 'Can I play from my phone professionally?', 'Not as primary for paid club work. Phones are backup desperation, not a plan.'],
    ['software', 'Why does rekordbox analysis differ from Serato?', 'Different algorithms and cue ecosystems. Re-check grids when moving ecosystems.'],
    ['software', 'How many tracks is too many on one USB?', 'Enough to serve the night, not your entire life. Bloated sticks browse slowly and fail more often.'],
    // career
    ['career', 'How do I price myself as a new DJ?', 'Research local rates, be honest about experience, and avoid racing to zero. Undercharging trains the market.'],
    ['career', 'Should I watermark my mixes?', 'Optional. Prioritise clear tags and contact links. Do not ruin listening with aggressive audio watermarks.'],
    ['career', 'How do I handle a promoter who ghosts after the gig?', 'Paper trail, polite firm reminders, then escalate per your agreement. Prevention: deposits and written terms.'],
    // room / philosophy
    ['room-tips', 'What should I search The Room for first?', 'Search the problem in your words: cable, wedding timeline, Afrobeats blend, USB failed — then filter by Guide or FAQ.'],
    ['room-tips', 'How do I use The Room before a booking type I have not played?', 'Open that event category, read two guides, and steal one prep checklist — not a whole new personality.'],
  ]

  for (const [category, title, summary] of faqStorm) {
    add({
      category,
      kind: 'faq',
      title,
      summary,
      tags: ['faq', category],
      published: '2026-03-25',
      body: [summary, 'Answered in The Room for working DJs, promoters and curious fans who want practical truth over forum myth.'],
      answers: [roomAnswer(summary, 14)],
    })
  }

  // ─── Q&A MEGA (community style) ────────────────────────────────────────────
  const qaMega = [
    ['gear', 'My speakON fit wrong and now I am scared', 'Stop forcing it. Confirm NL2 vs NL4 and the chassis type. Wrong speakON violence breaks expensive things.'],
    ['gear', 'Venue only has TS guitar leads for CDJs', 'Ask for proper RCA/line leads. Guitar leads are a last-resort compromise and can be noisy/wrong.'],
    ['gear', 'Is a €5 USB stick fine for CDJ-3000s?', 'Often no. Buy known-good media and test. Cheap sticks are a leading cause of booth failure.'],
    ['sound', 'Engineer said my USB is “too hot”', 'Lower channel gains / output. Matching perceived loudness is your job; clipping the desk is not “more energy”.'],
    ['sound', 'Outdoor wind made treble vanish', 'Expected. Cover, reposition, and accept physics — do not just crank highs into distortion.'],
    ['mixing', 'Crowd wants chart pop mid Afrobeats peak', 'Land one recognition moment if it serves unity, then steer back — unless the promoter brief says otherwise.'],
    ['mixing', 'I always trainwreck when nervous', 'Pre-plan first three transitions. Nervousness fades after a clean opener. Record rehearsals of those three weekly.'],
    ['genres', 'Is it OK to learn Dancehall only from TikTok?', 'Use it for discovery, then study full tracks, riddims and live rooms. TikTok alone makes thin selectors.'],
    ['genres', 'Someone said I played “wrong” Afrobeats', 'Listen, learn, and stay humble. Diaspora rooms have deep knowledge — treat correction as free education.'],
    ['events', 'Photographer asked me to replay first dance', 'If timeline allows and couple agrees. Do not derail speeches. Confirm once, cleanly.'],
    ['events', 'Corporate wants “no explicit” but guests keep requesting dirty versions', 'Policy wins. Keep clean crates ready. You are hired for the brief, not the loudest guest.'],
    ['software', 'rekordbox library corrupt before Malta flight', 'This is why backup sticks and offline clones exist. Rebuild from backup; never travel on one copy.'],
    ['software', 'Stems vocal isolation sounds robotic live', 'Use sparingly and on clean sources. Robotic stems on a big system expose themselves instantly.'],
    ['production', 'Can I DJ only my own unreleased edits?', 'Risky for most public floors. Blend craft with recognition unless the night is explicitly experimental.'],
    ['career', 'How do I ask for photos from a promoter?', 'Ask politely within 48 hours, offer a clip exchange, and do not harass. Relationships > one Instagram frame.'],
    ['career', 'Should I play for “exposure” at a big brand party?', 'Only if the strategic value is real and written. Exposure does not automatically equal career fuel.'],
    ['booking', 'Client wants to pay after the event only', 'Deposits exist because calendar slots are finite. Be cautious with zero-deposit peak dates.'],
    ['booking', 'Can we renegotiate fee on the day?', 'Bad practice. Agree before. Day-of renegotiation under pressure burns trust.'],
    ['room-tips', 'How do I know The Room answer is solid?', 'Prefer answers that include a prep step and a live-floor check. Theory without a booth test is incomplete.'],
    ['cables', 'I mixed up TS and TRS in my bag', 'Label sleeves permanently. A one-time labelling session prevents a season of silent mono mysteries.'],
  ]

  for (const [category, title, answer] of qaMega) {
    const cat = category === 'cables' ? 'gear' : category
    add({
      category: cat,
      kind: 'qa',
      title,
      summary: answer.slice(0, 140) + (answer.length > 140 ? '…' : ''),
      tags: ['qa', cat],
      published: '2026-03-25',
      body: ['Community question in The Room.'],
      answers: [
        communityAnswer('Room visitor', 'Need a straight answer before the next gig.', 3),
        roomAnswer(answer, 21),
      ],
    })
  }

  // ─── TIP DRILLS / CHECKLISTS (volume + utility) ────────────────────────────
  const checklists = [
    ['gear', 'Pre-gig cable pouch checklist', 'RCA pair, XLR M–F, IEC spare, adapter trio, tape, USB backup, headphone spare — photographed in your notes app.'],
    ['gear', 'CDJ guest arrival checklist', 'USB primary + backup, headphone, USB light, adapter pouch, polite hello to engineer, channel tidy promise.'],
    ['events', 'Wedding morning checklist', 'Timeline PDF, clean crate, first-dance edit, speech order, power notes, emergency instrumental bed.'],
    ['events', 'Outdoor carnival checklist', 'Weather cover, weights, cable ramps, power plan, sunscreen for the human, towel for the desks.'],
    ['sound', 'Two-minute feedback survival checklist', 'Mic gain down, mic off-axis from speakers, call FOH, do not sweep every EQ blindly forever.'],
    ['software', 'Night-before USB checklist', 'Export complete, backup cloned, test stick mount, top 20 peak cues verified, clean versions labelled.'],
    ['mixing', 'First-three-tracks plan', 'Write them. Rehearse them. Let nerves burn on a plan, not on improvisation at minute one.'],
    ['career', 'Post-gig follow-up checklist', 'Thank promoter, save contacts, invoice if needed, note what filled the floor, request one photo/clip.'],
    ['booking', 'Enquiry reply checklist', 'Date, times, city, fee range, kit needs, deposit terms, next question — keep it human and clear.'],
    ['room-tips', 'Weekly Room study checklist', 'One cable/article, one genre guide, one mixing drill, one career note. Compound knowledge.'],
  ]

  for (const [category, title, summary] of checklists) {
    add({
      category,
      kind: 'tip',
      title,
      summary,
      tags: ['checklist', 'tip', category],
      published: '2026-03-26',
      body: [
        summary,
        'Print it or save it offline. Checklists feel boring until they save a night.',
        'Room standard: professionals borrow memory from paper so their ears can stay on the floor.',
      ],
    })
  }

  // Dense connector / signal glossary as many small FAQs
  const glossary = [
    ['XLR', 'A circular locking connector used for mics and balanced line — common in PA and booths.'],
    ['RCA', 'Unbalanced phono connectors common on DJ gear channel inputs/outputs.'],
    ['TRS', 'Tip-ring-sleeve jack — headphones, balanced line, or inserts depending on wiring.'],
    ['TS', 'Tip-sleeve unbalanced mono jack — often instrument leads.'],
    ['speakON', 'Locking speaker power connector between amps and cabinets.'],
    ['IEC', 'Standard mains inlet lead used on much DJ and IT gear (“kettle lead”).'],
    ['powerCON', 'Locking mains connector family used on many PA racks (check TRUE1 vs older types).'],
    ['DI box', 'Direct input box — converts/isolates signals for FOH friendliness.'],
    ['Gain', 'Input level calibration on a channel before EQ/fader — set this before slamming the master.'],
    ['Headroom', 'Available space before clipping; leave some on purpose.'],
    ['FOH', 'Front of house — the engineer and system facing the audience.'],
    ['Monitor / booth', 'Local speakers for the DJ; not the same mix perspective as the dancefloor.'],
    ['Phono vs line', 'Turntable-level input with RIAA vs consumer/line-level from CDJs/controllers.'],
    ['Impedance', 'Electrical load characteristic important when matching amps and speakers.'],
    ['Balanced line', 'Noise-rejecting signal method using hot/cold conductors plus ground.'],
    ['Ground lift', 'A switch on some DIs/devices to help break hum loops — use thoughtfully, not as superstition.'],
    ['Insert cable', 'Special TRS wiring for processor inserts — not a generic headphone lead.'],
    ['Multicore', 'A thick loom carrying many channels between stage and FOH.'],
    ['Stage box', 'Breakout for multicore connections on stage.'],
    ['Pad', 'Attenuates a too-hot signal into an input.'],
  ]

  for (const [term, meaning] of glossary) {
    add({
      category: 'gear',
      kind: 'faq',
      title: `Glossary: what is ${term}?`,
      summary: meaning,
      tags: ['glossary', 'cables', 'gear', term.toLowerCase()],
      published: '2026-03-26',
      body: [
        meaning,
        'Search The Room for the longer guide if you need the how-to, not only the definition.',
      ],
      answers: [roomAnswer(meaning, 8)],
    })
  }

  // Scenario tips — “how to help” style queries people actually type
  const howTo = [
    ['How to fix no sound from CDJs', 'Check power, input select (line), cables seated, channel faders, crossfader assign, master level, and booth vs FOH path — in that calm order.'],
    ['How to stop USB not reading on Pioneer', 'Try backup stick, different USB port, re-export, confirm format, reduce clutter, avoid hubs, test before doors next time.'],
    ['How to blend Afrobeats into Dancehall', 'Listen for percussion conversation and vocal space; use a bridge groove; do not force a house-length blend if the vocal needs air.'],
    ['How to prep a wedding DJ timeline', 'Get minute-by-minute from planner: ceremony, dinner, speeches, first dance, open floor, hard curfew.'],
    ['How to choose speaker stands safely', 'Weight rated stands, spiked/secure bases, cable managed, no top-heavy accidents in wind.'],
    ['How to talk to FOH without drama', 'Arrive early, ask preferred levels, take feedback politely, never secretly fight the limiter all night.'],
    ['How to build a clean-edit crate fast', 'Filter explicit tags, verify by ear, rename files, separate playlist, test search on the stick.'],
    ['How to recover from a trainwreck', 'Cut to the stronger track on a downbeat, smile, move on. Do not narrate the mistake on mic.'],
    ['How to pack a mobile DJ rack', 'Heavy gear low, cables labelled, lids closed, loose items secured, load-in path scouted.'],
    ['How to read a quiet room', 'Do not panic-bang. Tighten groove, watch for the first movers, build from real signals.'],
    ['How to EQ muddy low end', 'One kick owns the sub — carve bass between channels; cut mud mid-low; stop boosting “more bass” into sludge.'],
    ['How to use a graphic EQ on a PA', 'If you are not the engineer, ask before sweeping. Feedback notches are surgical, not creative smile curves.'],
    ['How to label hot cues consistently', 'Same roles on every track: intro, vocal, drop/hook, outro/break. Consistency beats cleverness.'],
    ['How to ask for a guest slot', 'Short message, one mix, why their night fits, one follow-up max. Support the night as a punter too.'],
    ['How to set booth monitor volume', 'Loud enough to hear kick/transients over crowd bleed — not a war with FOH.'],
    ['How to avoid ground hum', 'Clean power, short unbalanced runs, DI isolation when needed, stop stacking mystery adapters.'],
    ['How to prepare for Malta club kit differences', 'Confirm backline, bring flexible USB, arrive early, adapt jog/mixer curves without ego.'],
    ['How to keep neighbours happy at loft parties', 'Agree curfew, mind the sub, prefer clarity over volume, protect floors and shared walls.'],
    ['How to record a set for Mixcloud', 'Clean record path, honest levels, accurate tags, represent the lane you want to book.'],
    ['How to learn cables as a beginner', 'Start with RCA + XLR + IEC + headphones. Add speakON/power when you touch PA. Search The Room cable guides next.'],
  ]

  for (const [title, summary] of howTo) {
    add({
      category: 'room-tips',
      kind: 'guide',
      title,
      summary,
      tags: ['how-to', 'search', 'guide'],
      published: '2026-03-27',
      body: [
        summary,
        'This is the “how can we help” layer of The Room — practical steps first, theory second.',
        'If you still fail after the checklist, change one variable at a time: cable, channel, stick, gain.',
      ],
    })
  }

  // Generate many short tips from topic × action templates for breadth
  const topics = [
    ['gear', 'CDJ platters'],
    ['gear', 'mixer channel EQ'],
    ['gear', 'booth headphones'],
    ['gear', 'USB sticks'],
    ['gear', 'XLR runs'],
    ['gear', 'RCA runs'],
    ['gear', 'speakON leads'],
    ['gear', 'IEC power'],
    ['gear', 'laptop standby'],
    ['gear', 'controller mapping'],
    ['sound', 'gain staging'],
    ['sound', 'feedback control'],
    ['sound', 'sub alignment'],
    ['sound', 'outdoor wind'],
    ['sound', 'hearing protection'],
    ['mixing', 'phrase counting'],
    ['mixing', 'bass swaps'],
    ['mixing', 'echo outs'],
    ['mixing', 'quick cuts'],
    ['mixing', 'energy programming'],
    ['genres', 'Afrobeats selection'],
    ['genres', 'Dancehall selection'],
    ['genres', 'Amapiano patience'],
    ['genres', 'Reggae weddings'],
    ['genres', 'Hip Hop glue'],
    ['events', 'club changeovers'],
    ['events', 'wedding speeches'],
    ['events', 'corporate briefs'],
    ['events', 'festival timings'],
    ['events', 'private party volume'],
    ['software', 'rekordbox export'],
    ['software', 'Serato stems'],
    ['software', 'crate hygiene'],
    ['software', 'offline backups'],
    ['software', 'cue consistency'],
    ['production', 'clean edits'],
    ['production', 'extended intros'],
    ['production', 'file naming'],
    ['career', 'invoicing'],
    ['career', 'EPK updates'],
    ['career', 'promoter follow-ups'],
    ['booking', 'deposit clarity'],
    ['booking', 'written quotes'],
    ['booking', 'overtime rates'],
    ['room-tips', 'room reading'],
    ['room-tips', 'hydration'],
    ['room-tips', 'post-gig notes'],
  ]

  const actions = [
    ['tip', 'One mistake to avoid with', 'Treat it as a failure point you can eliminate with a checklist before doors.'],
    ['tip', 'A pro habit for', 'Do the boring prep once, then trust it under pressure.'],
    ['faq', 'Why does', 'fail on the night?', 'Because it was not tested under gig conditions. Rehearse the failure mode, not only the happy path.'],
    ['qa', 'Anyone else struggle with', '?', 'Yes. The fix is usually prep + calm diagnosis, not buying more gear immediately.'],
  ]

  let n = 0
  for (const [category, topic] of topics) {
    for (const action of actions) {
      n++
      const [kind, prefix, midOrSuffix, maybeExtra] = action
      let title
      let summary
      if (kind === 'tip') {
        title = `${prefix} ${topic}`
        summary = `${midOrSuffix} Specifically for ${topic}: keep it simple, labelled, and tested.`
      } else if (kind === 'faq') {
        title = `${prefix} ${topic} ${midOrSuffix}`
        summary = maybeExtra
      } else {
        title = `${prefix} ${topic}${midOrSuffix}`
        summary = `Common issue. For ${topic}, slow down, isolate variables, and use The Room checklists before spending money.`
      }
      add({
        category,
        kind,
        title,
        summary,
        tags: [kind, category, 'mega', topic.split(' ')[0].toLowerCase()],
        published: '2026-03-28',
        body:
          kind === 'qa'
            ? ['Community question in The Room.']
            : [
                summary,
                `Focus topic: ${topic}. Make one improvement this week, then verify it live.`,
                'Ridiculous detail compounds — small booth truths beat vague internet flexes.',
              ],
        answers:
          kind === 'faq' || kind === 'qa'
            ? [
                ...(kind === 'qa' ? [communityAnswer('Room visitor', `Stuck on ${topic}.`, 2)] : []),
                roomAnswer(summary, 11),
              ]
            : undefined,
      })
    }
  }

  // Extra cable pin / troubleshooting microguides
  const cableMicro = [
    'Intermittent left channel on RCA',
    'XLR pin 1 damage symptoms',
    'TRS partially inserted headphone risks',
    'speakON not locking fully',
    'IEC strain relief failure',
    'Adapter barrel that loses ground',
    'Snake fanout mislabel',
    'Stage cable under door pinch',
    'Wet cable outdoor contingency',
    'Coiling speakON without jacket twists',
    'Colour coding loom with tape',
    'Testing continuity with a cheap tester',
    'Replacing a broken RCA end vs whole cable',
    'When to retire a cable immediately',
    'Keeping spare tails for FOH preference',
    'Avoiding mystery cables from the venue drawer',
    'Labelling both ends identically',
    'Separating power and audio in the bag',
    'Velcro vs gaffer for temporary bundling',
    'Travel kit minimum for flights',
  ]

  for (const item of cableMicro) {
    add({
      category: 'gear',
      kind: 'tip',
      title: `Cables: ${item}`,
      summary: `Practical booth note on ${item.toLowerCase()} — diagnose, swap, and retire bad leads without drama.`,
      tags: ['cables', 'troubleshooting', 'tip'],
      published: '2026-03-29',
      body: [
        `Practical booth note on ${item.toLowerCase()}.`,
        'Swap with a known-good cable before you redesign the whole signal path. Most “mixer faults” are leads.',
        'If a cable fails once under load, retire it. Intermittent cables wait for peak time to betray you.',
      ],
    })
  }

  // Extra encyclopedic Q waves for “any question” coverage
  const moreQuestions = [
    ['gear', 'What is phantom power and do DJs need it?', '48V phantom powers condenser mics. Most DJ booths do not need it for CDJs — only for certain mics. Do not send phantom into gear that hates it.'],
    ['gear', 'Can I run CDJs on a domestic extension reel?', 'Use proper rated distribution; fully unwind reels under load. Ask about venue power before improvising dangerous daisy chains.'],
    ['gear', 'Why does my controller need a power supply and USB?', 'USB alone may not feed enough power. Use the manufacturer PSU for stability on long gigs.'],
    ['gear', 'What is a booth insert / send for FX?', 'Some desks provide send/return paths for external FX. Know whether you are on insert or aux before patching.'],
    ['sound', 'What does “ringing out” a system mean?', 'Engineers find feedback frequencies and notch them before the show. Stay quiet during that process.'],
    ['sound', 'Should DJs carry earplugs every gig?', 'Yes for crowd time and often for long nights. Hearing is a tool — protect it.'],
    ['sound', 'Why do battery PA systems compress late at night?', 'Batteries sag under load. Programme with that limit; bring mains when promised.'],
    ['mixing', 'How do I practice without neighbours complaining?', 'Headphones, daytime sessions, and controller volume discipline. Record instead of repeating peaks aloud.'],
    ['mixing', 'What is a transition library?', 'Saved loops/edits/FX gestures you can deploy. Useful — until every blend sounds identical.'],
    ['mixing', 'Should I look at the waveform or the room?', 'Both. Waveform for precision; room for truth. Never only the screen.'],
    ['genres', 'What is a riddim in Dancehall?', 'A shared instrumental bed multiple vocals can ride. Selector literacy includes riddim awareness.'],
    ['genres', 'How do I avoid offensive tracks at mixed events?', 'Know lyrics, keep clean crates, and ask the client about cultural/religious sensitivities early.'],
    ['genres', 'Is Amapiano the same as Afro house?', 'No. Related audiences sometimes, different rhythmic and production languages.'],
    ['events', 'Who controls volume — DJ or venue?', 'Venue/FOH usually owns legal limits. Cooperate. Your ears in the booth are not the council meter.'],
    ['events', 'How do I handle a drunk guest on the mic?', 'Keep control of the mic, short interventions, and host/security backup. Do not escalate on open channel.'],
    ['events', 'What’s a reasonable DJ meal / break rider?', 'Water is non-negotiable. Food helps long bookings. Keep riders human, not rockstar parody.'],
    ['software', 'Should I analyse at 1x or with advanced features on?', 'Use the analysis that matches your workflow, then verify grids on critical tracks by ear.'],
    ['software', 'Can two DJs share one rekordbox library live?', 'Plan export format and sticks in advance. Mid-gig library merging is chaos.'],
    ['software', 'Why are my hot cues missing on the club USB?', 'Export settings, playlist not synced, or wrong USB slot. Test the exact export path before travel.'],
    ['production', 'Do I need Ableton to DJ?', 'No. Basic editing helps. DJing and producing overlap but are different jobs.'],
    ['production', 'Is pitching a whole set in the DAW cheating?', 'Prep is fine. Live reading still matters. Do not confuse a fixed timeline with a living room.'],
    ['career', 'How do I write a short DJ bio?', 'Who you are, where, what you play, notable stages, contact. Cut adjectives that do not earn their place.'],
    ['career', 'Should I put rates on my website?', 'Transparent ranges reduce tyre-kickers. DJ RHUE publishes ranges and itemises extras.'],
    ['career', 'How do I deal with burnout?', 'Fewer heroic weeks, sleep, ear rest, and saying no. A tired DJ makes thin decisions.'],
    ['booking', 'What is a reasonable deposit percentage?', 'Enough to secure the date meaningfully. DJ RHUE uses clear booking fees by set type.'],
    ['booking', 'Can clients supply a full Spotify playlist only?', 'As inspiration yes; as rigid law no. Provide must-plays and energy targets instead.'],
    ['booking', 'Do you soft-hold dates?', 'Short courtesy holds maybe — with expiry. Long unpaid holds block real work.'],
    ['room-tips', 'How do I search if I do not know the term?', 'Type the symptom: no sound, hum, USB, muddy bass, wedding speeches. The Room tags synonyms and glossary entries.'],
    ['room-tips', 'What’s the fastest cable literacy path?', 'Read Understanding your cables, then XLR, RCA, speakON, power — then pack a tested pouch.'],
    ['gear', 'Difference between NL2 and NL4 speakON?', 'Contact configurations differ. Match cable, amp and cab. Forcing the wrong type breaks gear.'],
  ]

  for (const [category, title, summary] of moreQuestions) {
    add({
      category,
      kind: 'faq',
      title,
      summary,
      tags: ['faq', category, 'comprehensive'],
      published: '2026-03-30',
      body: [summary, 'Filed in The Room so the next person with the same 2am problem finds a straight answer.'],
      answers: [roomAnswer(summary, 13)],
    })
  }

  return n
}
