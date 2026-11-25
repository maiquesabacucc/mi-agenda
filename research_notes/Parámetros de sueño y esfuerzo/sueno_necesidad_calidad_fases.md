# Sleep need, sleep quality criteria, normal stage proportions and Apple Watch staging accuracy (adults 18-25)

Research date: 2026-11-25. Population: healthy young adults 18-25. Device: Apple Watch Series 10, data read from Apple Health / HealthKit.

## 1. Official recommendations: AASM/SRS 2015, NSF 2015 (duration) and NSF 2017 (quality thresholds)

### Takeaway
For 18-25 year olds, target 7-9 h asleep (NSF), with 7 h as the floor (AASM/SRS) and up to 9+ h acceptable. In the NSF 2017 consensus, a good night for a young adult means sleep latency of 30 min or less, at most 1 awakening longer than 5 min, WASO of 20 min or less, and sleep efficiency of 85% or more. A night is clearly poor if latency is over 45 min, there are 4 or more awakenings, WASO is 41 min or more, or efficiency is 64% or less. Values in between are "uncertain".

### Cited Findings
**Duration: NSF 2015 (Hirshkowitz et al., Sleep Health 2015;1(1):40-43)**
- Young adults (18-25): **recommended 7-9 h**. **"May be appropriate": 6 h, and 10-11 h**. **Not recommended: under 6 h or over 11 h**. — [NSF press release, EurekAlert](https://www.eurekalert.org/news-releases/554948); [PubMed 29073412](https://pubmed.ncbi.nlm.nih.gov/29073412/)
- The panel had 18 multidisciplinary experts and used the RAND/UCLA Appropriateness Method. It reviewed 312 studies. — [PubMed 29073412](https://pubmed.ncbi.nlm.nih.gov/29073412/)
- The authors say durations outside the recommended range may be appropriate, but large deviations from the normal range are rare. — [PubMed 29073412](https://pubmed.ncbi.nlm.nih.gov/29073412/)

**Duration: AASM/SRS 2015 consensus (Watson et al., JCSM 2015;11(6) and SLEEP 2015;38(8):1161-83)**
- Adults 18-60 should sleep 7 or more hours per night on a regular basis to promote optimal health. — [JCSM consensus, PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)
- Regularly sleeping less than 7 h per night is associated with adverse health outcomes. — [PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)
- Regularly sleeping more than 9 h per night may be appropriate for young adults, people recovering from sleep debt, and people with illnesses. For others, it is uncertain whether more than 9 h carries health risk. — [PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)
- Individual sleep need varies with genetic, behavioral, medical and environmental factors. — [PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)
- The panel had 15 experts and used a modified RAND Appropriateness Method. AASM/SRS set no upper limit on recommended hours. — [AASM summary PDF](https://www.aasm.org/resources/pdf/adultsleepdurationconsensus.pdf); [PubMed 25979105](https://pubmed.ncbi.nlm.nih.gov/25979105/)

**Quality: NSF 2017 sleep quality indicators (Ohayon et al., Sleep Health 2017;3(1):6-19, doi 10.1016/j.sleh.2016.11.006)**
These values were read from the full text. The PDF text extraction drops the ≤ and ≥ signs, so the bounds below come from the "ie" ranges the paper gives. — [eScholarship full text](https://escholarship.org/content/qt9xc5x5h2/qt9xc5x5h2.pdf); [PubMed 28346153](https://pubmed.ncbi.nlm.nih.gov/28346153/)
- Method: 277 studies, modified Delphi RAND/UCLA. Each indicator was rated "appropriate" (panel median 7-9 without disagreement), "uncertain", or "inappropriate". Agreement meant at least 80% of votes fell in one 3-point band. "Young adult" was defined as 18-25 years.
- **Sleep latency, all ages:** 0-15 min means good quality, and 16-30 min is also judged good. For all ages except older adults, 46-60 min means poor quality. For all ages, more than 60 min means poor quality. Rule: **≤30 min good; 31-45 uncertain; >45 poor.**
- **Awakenings longer than 5 min, all ages:** 0-1 per night means good quality, and 4 or more means not good. Rule: **≤1 good; 2-3 uncertain; ≥4 poor.** The 2-3 band is uncertain only by inference, since the paper states only the two ends.
- **WASO, preschoolers through older adults:** 20 min or less (0-10 or 11-20) means good quality. For young adults specifically, 41 min or more means not good. Rule: **≤20 good; 21-40 uncertain; ≥41 poor.**
- **Sleep efficiency, all ages:** 85% or more (85-94% or ≥95%) means good quality. For young adults specifically, only **≤64%** is rated not good. The other age groups use ≤74%. Rule: **≥85% good; 65-84% uncertain; ≤64% poor.**
- **Naps, young adults:** no naps per 24 h and 0 nap days per week indicate good quality. 3 or more naps per 24 h, or a nap longer than 100 min, do not.
- **Architecture:** consensus was weak overall. For young adults it agreed only that **N1 ≤5% = good** and **N1 ≥20% = not good**, **N2 ≥81% = not good**, **N3 ≤5% = not good** (all ages except older adults), and **REM ≥41% = not good**. **REM 21-30%** and **N3 16-20%** were rated good for "adults" (26-64), not explicitly for 18-25.
- The panel notes that 4 or more awakenings of more than 5 min add up to more than 20 min of wake. It also notes that architecture results counter the misconception that more REM is always better.

### Inferences
- Rule set for a "good night" for ages 18-25, using PSG-defined metrics: TST in 7-9 h AND latency ≤30 min AND awakenings longer than 5 min ≤1 AND WASO ≤20 min AND efficiency ≥85%.
- Rule set for a "poor night": TST <6 h OR latency >45 min OR awakenings ≥4 OR WASO ≥41 min OR efficiency ≤64%.
- The thresholds were defined against PSG. Apple Watch underestimates WASO by about 20 min and overestimates efficiency by about 4 points (see section 5), so applying them to watch data will flag "good" too often. An app could tighten the watch-derived WASO rule by about 10-20 min, or apply it only to multi-night averages.

### Gaps
- The NSF figures are image-based. Exact "uncertain" bands for 18-25 were inferred from the text and not read off the figures.
- I did not open the full text of the AASM methodology paper (SLEEP 38(8)). It is the source for any additional young-adult discussion.

## 2. Estimating an individual's sleep need from their own data

### Takeaway
A sensible default is **8.0-8.5 h of sleep** for an 18-25 year old. The best lab estimate of optimal sleep in this age group averaged about 8.4 h (range 7.3-9.3 h). The adjustable range should be **7.0-9.5 h**. The need can be personalized from TST on free days, ideally after several consecutive unconstrained nights so that rebound sleep is excluded. MCTQ-style weekly averaging and social-jetlag measures supply the structure.

### Cited Findings
- **Kitamura et al. 2016, Sci Rep (doi 10.1038/srep35812):** 15 healthy young men aged 20-26 (mean 23.1). They had a 12-h sleep opportunity for 9 consecutive nights. An exponential decay curve was fitted to TST, and its asymptote was taken as "optimal sleep duration" (OSD). — [PMC5075948](https://pmc.ncbi.nlm.nih.gov/articles/PMC5075948/)
  - Habitual sleep at home was 7.37 ± 0.27 h (SEM; range 5.82-8.89).
  - **OSD was 8.41 ± 0.18 h (SEM; range 7.29-9.26 h)**. The approximate SD is 0.7 h.
  - **Potential sleep debt (OSD minus habitual) was 1.04 h** (range -0.58 to 2.73).
  - **First extension night TST was 10.59 h**, about 3.2 h above habitual. This is rebound and does not reflect need. Sleep settled near OSD from night 4 onward. The authors state that "only 1 h of PSD takes four days to recover".
  - The authors liken first-night rebound to weekend catch-up sleep. They found no significant correlation between corrected free-day mid-sleep (MSFsc) and potential sleep debt (r = -0.22, p = 0.43).
- **MCTQ (Roenneberg):** weekly average sleep = (workday sleep × 5 + free-day sleep × 2) / 7. Free-day sleep is less constrained by social obligations. The corrected mid-sleep (MSFsc) adjusts for free-day oversleep that compensates for workday sleep debt. — [Sci Rep 2024, s41598-024-53174-1](https://www.nature.com/articles/s41598-024-53174-1); [R package mctq README](https://stat.ethz.ch/CRAN/web/packages/mctq/readme/README.html)
- **Social jetlag** is the difference in mid-sleep between free days and workdays. In a database of about 300,000 people, those with 3 h or more of social jetlag slept about 1 h less per night, or about 5 h less per week. — [PMC search result (MCTQ literature)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5971234)
- The corrected free-day mid-sleep from MCTQ matched actigraphy in 115 young adults: 4:56 by MCTQ vs 4:51 by actigraphy, not significantly different. — [MCTQ validation (search result)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10858912)
- AASM/SRS: individual need varies with genetics, behavior, medical and environmental factors. — [PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)

### Inferences
- Suggested personalization algorithm:
  - (a) Start at a default of 8.0 h. 8.25-8.5 h is also defensible given Kitamura's mean of 8.41 h.
  - (b) Collect free nights (no alarm, wake time not forced) from Apple Health.
  - (c) Discard the first one or two free nights after a run of short workdays, or any night more than 1.5 h above the 14-day mean, because these are rebound sleep.
  - (d) Estimate need as the median TST of the remaining free nights over at least 3-4 weeks.
  - (e) Clamp the estimate to 7.0-9.5 h.
  - (f) Move the estimate by at most about 15 min per week.
  - (g) Sleep debt = need minus weekly average TST.
- An alternative, closer to Kitamura's method, is a "vacation mode": during 7 or more consecutive unconstrained days, average TST from day 4 onward.
- Watch TST is slightly overestimated, by about +8 to +20 min in independent studies (section 5). A need estimated from watch data is therefore internally consistent, but may run about 10-20 min high compared with PSG.

### Gaps
- No peer-reviewed validation exists of "free-day wearable TST" as an estimator of individual sleep need. Kitamura's sample was small (15 men only).
- The classic extended-sleep-opportunity studies (e.g., Klerman & Dijk 2008) were not fetched in this session.

## 3. Normal sleep stage proportions in young adults and their distribution across the night

### Takeaway
In healthy young adults, typical whole-night percentages of TST are: **N1 about 2-5%, N2 about 45-55%, N3 about 15-25%, REM about 20-25%**. Expressed as Apple categories: **Core (N1+N2) about 50-60%, Deep about 15-25%, REM about 20-25%**. N3 decreases about 2% per decade of adulthood, while REM changes little before old age. N3 is concentrated in the first cycles, and REM periods lengthen toward morning. Cycles last about 90 min, with 4-6 per night.

### Cited Findings
- **Ohayon et al. 2004, SLEEP 27(7):1255-73 meta-analysis:** 65 studies covering 3,577 healthy people aged 5-102. — [UPenn PDF](https://www.med.upenn.edu/cbti/assets/user-content/documents/carskadonmeta-analysisresleepnorms.pdf); [PubMed 15586779](https://pubmed.ncbi.nlm.nih.gov/15586779/)
  - In adults, **TST falls about 10 min per decade**, **SWS% falls linearly about 2% per decade**, and WASO rises about 10 min per decade from age 30.
  - REM% decline is subtler. It is mainly evident between young adults and people over 60, a gap of about 4%.
  - Stage 1% and stage 2% rise about 5% between ages 20 and 70, which is a small effect.
  - The first PSG night was discarded where possible because of the first-night effect.
  - Exact normative values at age 20-25 appear only in the paper's figures and equations and were not extractable as text.
- **StatPearls "Physiology, Sleep Stages":** N1 is about 5% of TST, N2 about 45%, N3 about 25%, REM about 20-25%. There are 4-6 cycles per night averaging about 90 min. N2 lasts about 25 min in the first cycle and lengthens with each cycle. — [StatPearls NBK526132](https://www.ncbi.nlm.nih.gov/books/NBK526132/)
- **IOM / National Academies (2006):** stage 2 eventually makes up 45-55% of the sleep episode. — [National Academies, ch. 2](https://www.nationalacademies.org/read/11617/chapter/4)
- **Sleep Foundation:** the first cycle lasts about 70-100 min and later cycles about 90-120 min. N3 periods in early cycles last 20-40 min. REM periods lengthen as the night goes on, especially in the second half. — [Sleep Foundation, stages of sleep](https://www.sleepfoundation.org/sleep-health-basics/stages-of-sleep)
- **NSF 2017 consensus on architecture:** for young adults, N1 ≤5% is good, N1 ≥20% is not good, N2 ≥81% is not good, N3 ≤5% is not good, and REM ≥41% is not good. For adults (26-64), REM 21-30% and N3 16-20% are good. — [Ohayon 2017 full text](https://escholarship.org/content/qt9xc5x5h2/qt9xc5x5h2.pdf)
- **Benchmark from Apple's own PSG validation set** (166 people, mean age 47 ± 16.5, PSG-scored): Core 65.9%, REM 21.4%, Deep 12.8%, efficiency 85.4%, WASO 35.5 min, TST 378 min. The design set (858 people, mean age 49): Core 69.5%, REM 18.1%, Deep 11.6%. These are middle-aged samples that include some apnea, so young adults should show more Deep. — [Apple white paper, Oct 2025, Table 1](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)

### Inferences
- Suggested "normal" bands for Apple data at age 18-25. These are PSG-based and need adjustment for watch bias (section 5).
  - REM: 18-28%, flagged if below 15% or above 35%.
  - Deep: 12-25% on PSG. Apple Watch underreports Deep by about 25-43 min (roughly 5-9 points of TST), so a watch-reported Deep of about 8-18% is plausibly normal. Flag only if consistently below about 5-6%.
  - Core: 50-65% on PSG, but Apple typically shows about 60-70% because Deep minutes are mislabeled as Core.
- Timing: expect most Deep in the first third of the night, in the first 2 cycles, and most REM in the last third. Apple's per-epoch Deep and REM timestamps in HealthKit could be checked for this pattern. Because a REM-rich last third is cut off, a short night loses disproportionately more REM, and a late bedtime with an early alarm means REM% falls.

### Gaps
- The Carskadon & Dement chapter (Principles and Practice of Sleep Medicine) was not accessible. The commonly quoted figures of N3 13-23% and REM 20-25% could not be verified from the chapter itself, and sources disagree on N3 depending on R&K vs AASM scoring.
- No source fetched gives a percentage split of N3 and REM by thirds of the night. The pattern is qualitative in these sources.

## 4. How Apple maps stages, and Apple's own validation (white paper, Sept 2023, updated Oct 2025)

### Takeaway
Apple labels each 30-s epoch as Awake, REM, Core (= N1+N2) or Deep (= N3), using the accelerometer. Its four-stage kappa against PSG was 0.63, and 0.68 with the watchOS 26 algorithm. Sleep detection sensitivity is about 97%. Wake detection specificity is 75%, rising to 79% in watchOS 26. The commonest error is true Deep being labeled Core.

### Cited Findings
All findings in this section come from the [Apple white paper "Estimating Sleep Stages from Apple Watch", Oct 2025](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf), read in full text.
- **Mapping:** the accelerometer time series (including breathing micro-movements) is classified every 30 s. Awake and REM equal the clinical stages. **Deep = N3. Core = N1 + N2.** "Core" was chosen instead of "light" because N2 is predominant (often more than 50% of the night) and physiologically important.
- **Data sets:** design used 1,171 nights from 858 participants. Validation used 299 nights from 166 held-out participants, mean age 47, 47% female, 78% in-lab PSG and 22% home PSG, scored by AASM rules. A separate clinical cohort had 236 patients and 390 sessions.
- **Original algorithm (2022/2023):**
  - Median sleep sensitivity **97.9%**, meaning 2.1% of true sleep is labeled awake.
  - Median specificity **75.0%**, meaning 25% of true wake is labeled sleep.
  - Mean four-stage **kappa 0.63 (SD 0.13)**.
  - Clinical cohort: kappa 0.55, sensitivity 97.5%, specificity 72.5%.
- **Confusion pattern:**
  - Mistaking true Deep as Awake is rare (0.13%), as is mistaking REM as Deep (0.28%).
  - **The most common misclassification overall is true Deep being labeled Core.** For every true stage, including Awake, the most common error is being labeled Core.
  - Per-stage diagonal percentages are given only in a figure image.
- **Kappa confounders:** more stage transitions (coefficient -0.037) and higher AHI (-0.036) lowered kappa. Male sex (-0.014) and age (-0.014) had smaller effects. Watch model had no effect.
- **Comparison with actigraphy:** classic actigraphy has sleep sensitivity of 90-97% but specificity often 50% or less.
- **2024 update (iOS 18 / watchOS 11):**
  - Sleep is tracked outside the sleep schedule, including naps.
  - **Sessions of 1-3 h are written to HealthKit as binary sleep/wake only. Full stages are written only for sessions longer than 3 h.**
- **2025 update (iOS 26 / watchOS 26):**
  - Foundation models built on Apple Heart and Movement Study data. Better detection of "quiet wake" (lying awake but still, before or after sleep).
  - **Wake correctly classified rose from 70% to 79%. Three of four stages improved. Median kappa rose from 0.63 to 0.68 (SD 0.11).**
  - Binary sleep/wake: median sensitivity 96.8%, specificity 78.9%. Clinical cohort: sensitivity 95.0%, specificity 86.5%, kappa 0.66.
  - Full staging now continues if the user goes back to sleep after dismissing an alarm.
  - Still accelerometer-based.
- The white paper says the accuracy suits tracking sleep over time and is not intended for clinical use.

### Inferences
- With watchOS 26, independent studies of Series 8 running older watchOS versions probably understate current wake detection. No independent study yet confirms the watchOS 26 gains.
- Series 10 has no stage-specific hardware advantage. Apple says the watch model had no effect on kappa, and the algorithm is accelerometer-based.

### Gaps
- Per-stage diagonal values in the confusion matrix (e.g., % of true Deep, REM and Core correctly classified) are images and could not be extracted. Apple publishes no mean bias in minutes per stage.

## 5. Independent validation of Apple Watch vs PSG (2024-2026)

### Takeaway
Independent lab studies, all of Series 8 on pre-watchOS 26 software, agree on four points. TST is accurate to within about 10-20 min on average. Wake and WASO are underestimated by about 7-21 min. **Deep is underestimated by about 25-43 min, and Core/light is overestimated by about 45-60 min.** REM is roughly right on average (-13 to +6 min), but individual nights are noisy, with 95% limits of agreement of about ±65 min for every stage.

### Cited Findings
**Robbins et al. 2024, *Sensors* (PubMed 39460013):** Apple Watch Series 8 vs Oura and Fitbit Sense 2 against inpatient PSG. 35 healthy adults aged 20-50, 29 with usable Apple data, one night. — [PMC11511193](https://pmc.ncbi.nlm.nih.gov/articles/pmc11511193); [PubMed](https://pubmed.ncbi.nlm.nih.gov/39460013/)
- Epoch sensitivity: sleep 97%, **wake 52.4%**, light 86.1%, **deep 50.5%**, REM 82.6%. Kappa 0.60 for both two-stage and four-stage classification.
- Mean minutes, Apple vs PSG:
  - TST 442 vs 434 (+8, not significant)
  - Wake 39 vs 46 (-7, p < 0.01)
  - **Light 289 vs 244 (+45, p < 0.001)**
  - **Deep 51 vs 94 (-43, p < 0.001)**
  - REM 102 vs 96 (+6, not significant)
- Agreement between watch and PSG (ICC, intraclass correlation) was poor for Deep (0.13) and REM (0.37).
- Funded by Oura Ring Inc., and the first author has an advisory role with Oura. This is a conflict of interest.

**Schyvens et al. 2025, *SLEEP Advances* 6(2):zpaf021:** six wrist wearables vs PSG. 62 adults, mean age 46 ± 12.6, including people with suspected apnea. **20 Apple Watch Series 8 datasets.** watchOS version not stated. — [OUP](https://academic.oup.com/sleepadvances/article/6/2/zpaf021/8090472); [PMC12038347](https://pmc.ncbi.nlm.nih.gov/articles/PMC12038347/)
- Sleep sensitivity 96.27%. **Wake specificity 52.15%**, the best of the six devices. **Kappa 0.53**, also the highest of the six and rated moderate.
- Correctly classified epochs: wake 52.15%, light 83.27%, **deep 50.66%**, REM 68.57%.
- Bland-Altman bias (device minus PSG), with 95% limits of agreement:
  - **TST +19.6 min** (-38 to +78). The narrowest limits of the six devices, and judged clinically acceptable at under 30 min.
  - **SE +4.4 points** (-6.5 to +15.4)
  - **WASO -21.2 min** (-75 to +32)
  - SOL +1.9 min, not significant (-46 to +50)
  - **Light +58.8 min** (-39 to +157)
  - **Deep -25.2 min** (-86 to +36)
  - **REM -13.4 min** (-79 to +52)
- All devices detected more than 90% of sleep epochs but had low specificity (29-52%).
- The authors suggest these devices can track prolonged changes in sleep architecture but cannot replace PSG.

**Series 9 / Series 10:** no peer-reviewed PSG validation of sleep staging was found. FDA clearance for Series 10 concerns sleep apnea notifications (breathing disturbances), not staging. — [Tom's Guide](https://tomsguide.com/wellness/sleep/sleep-apnea-experts-weigh-in-on-the-apple-watchs-latest-health-feature-heres-the-verdict)

### Inferences
- Bias corrections the app could show or apply, as approximate means across studies:
  - Deep about +25 to +40 min (the watch underreports)
  - Core about -45 to -60 min
  - WASO/awake about +10 to +20 min
  - TST about -10 to -20 min
  - REM about 0 min
- These corrections come from older algorithms and middle-aged samples. Deep bias may be larger in young adults, who have more true N3.
- Because the per-night limits of agreement are about ±60-100 min for stages and about ±60 min for TST, single-night stage minutes should not drive judgments. Averages over 7 or more nights shrink random error by about √7 ≈ 2.6×, though systematic bias remains.

### Gaps
- No independent validation of the watchOS 26 algorithm, of Series 10, or of young adults (18-25) specifically. Both independent studies have small Apple samples (20-29). No 2026 study was found.

## 6. watchOS 26 Sleep Score: existence, computation, and HealthKit/Shortcuts exposure

### Takeaway
Sleep Score exists from watchOS 26 / iOS 26 (Sept 2025). It runs 0-100 and has three components: **Duration up to 50 points, Bedtime consistency up to 30 points (based on sleep onset over the last 13 nights), and Interruptions up to 20 points (how often and how long you wake)**. Score bands were revised in 26.2. **There is no public HealthKit API for the score**, and no Shortcuts action was found. An app must recompute its own score from HKCategoryValueSleepAnalysis.

### Cited Findings
- Apple Watch User Guide:
  - Duration has 50 points, based on estimated time asleep.
  - Bedtime consistency has 30 points and "considers when you fell asleep during the last 13 nights".
  - Interruptions have 20 points and consider how often you wake and how long you stay awake.
  - The score appears in the Sleep app after waking. Bands: Very Low 0-40, Low 41-60, OK 61-80, High 81-95, Very High 96-100.
  - [Apple Watch User Guide](https://support.apple.com/guide/watch/apded441a669)
- The watchOS 26.2 / iOS 26.2 update (Nov 2025) raised the bands. The old bands were Very Low 0-29, Low 30-49, OK 50-69, High 70-89, Very High ("Excellent") 90-100. MacRumors notes that 5-6 h of restless sleep can still score "High". The score works on all watchOS 26-compatible watches. — [MacRumors, 4 Nov 2025](https://www.macrumors.com/2025/11/04/watchos-26-2-updates-sleep-score-ranges/)
- The score can be computed retroactively from past data, and from third-party devices that write sleep to Health. — [AppleInsider](https://appleinsider.com/articles/25/09/12/how-sleep-score-works-on-apple-watch-with-watchos-26); [9to5Mac](https://9to5mac.com/2025/09/10/psa-the-new-sleep-score-feature-works-with-third-party-devices/)
- **Unverified scoring curves (third-party, origin not stated):**
  - Duration: no deduction at or above 7 h 50 min. Two hours short costs about 13 points, non-linearly. Low Deep or low REM each cost about 5 points. Oversleeping is not penalized.
  - Bedtime: about 1 point per 5 min later than usual beyond 15 min, reaching -30 at about 150 min late. Going to bed early costs about 1 point per 30 min beyond 60 min, capped at 6.
  - Interruptions: the first 11 min awake are free, then about 1 point per 4 min. The first 2 wake events are free.
  - The figures are internally inconsistent and not Apple-confirmed. — [the5krunner, Oct 2025](https://the5krunner.com/2025/10/06/how-apple-watchs-sleep-score-is-calculated-all-you-need-to-know-to-improve-sleep-health)
- **API:** an Apple DTS engineer stated there is no API giving access to sleep scores and suggested filing feedback. The thread is undated (late 2025). — [Apple Developer Forums 800403](https://developer.apple.com/forums/thread/800403); [thread 799857](https://developer.apple.com/forums/thread/799857)
- HealthKit exposes stages via HKCategoryValueSleepAnalysis (awake, asleepREM, asleepCore, asleepDeep), written after waking. — [Apple Developer Forums (developer observation)](https://developer.apple.com/forums/thread/799857); [Apple white paper appendix](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)

### Inferences
- The app can approximate Apple's structure with its own 50/30/20 score:
  - Duration vs the personal need from section 2.
  - Bedtime consistency as the deviation of sleep onset from the median of the previous 13 nights.
  - Interruptions as the count and minutes of Awake segments.
- It should not claim to reproduce Apple's number exactly. Apple's score does not use NSF efficiency or latency directly, so the app's NSF-based "good night" rules complement it.

### Gaps
- Apple does not publish exact formulas. I could not confirm whether iOS 26.x or 27 later added a Sleep Score HealthKit type or Shortcuts action. The User Guide fetched is labeled watchOS 27 and still lists only the Sleep app. Re-check the HealthKit release notes before implementing.

## 7. Which Apple Watch metrics are reliable nightly vs only as weekly averages

### Takeaway
Show nightly: total sleep time, bedtime and wake time (timing and regularity), and a sleep/no-sleep timeline. Show Awake/WASO and stage minutes or percentages (Deep, REM, Core) mainly as 7-day or longer averages and trends, with an accuracy caveat. Never use them for diagnosis.

### Cited Findings
- TST bias is small (+8 min, not significant; +19.6 min with limits of about -38 to +78), and sleep sensitivity is about 96-98% across studies. — [Robbins 2024](https://pmc.ncbi.nlm.nih.gov/articles/pmc11511193); [Schyvens 2025](https://academic.oup.com/sleepadvances/article/6/2/zpaf021/8090472); [Apple white paper](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)
- Wake specificity in independent studies is about 52%, against Apple's 75%, rising to 79% in watchOS 26. WASO is underestimated by about 21 min with wide limits. — [Schyvens 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12038347/); [Apple white paper](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)
- Deep ICC is 0.13 and REM ICC 0.37. Deep sensitivity is about 50%. Stage limits of agreement are about ±60-100 min. — [Robbins 2024](https://pmc.ncbi.nlm.nih.gov/articles/pmc11511193); [Schyvens 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC12038347/)
- Apple positions the feature for tracking sleep over time, not for clinical use. Schyvens et al. say these devices can follow prolonged changes in architecture. — [Apple white paper](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf); [Schyvens 2025](https://academic.oup.com/sleepadvances/article/6/2/zpaf021/8090472)
- Sessions of 1-3 h (naps) have binary data only, with no stages in HealthKit. — [Apple white paper appendix](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)

### Inferences
Suggested tiering for the app:

| Metric (from HealthKit) | Reliability | Display |
|---|---|---|
| TST (sum of Core+Deep+REM) | High (bias about +10-20 min) | Nightly value, plus 7-day average vs need |
| Sleep onset / final wake time, mid-sleep, bedtime regularity, social jetlag | High (timing is driven by sleep/wake detection) | Nightly, plus 7-14 day SD |
| Sleep efficiency (TST / in-bed interval) | Medium. Overestimated by about 4 points, and "in bed" is poorly defined on the watch | Nightly with caution. Judge with a ≥85% rule on 7-day average |
| Awake minutes / WASO / number of awakenings | Medium-low. Underestimated by about 10-20 min, better on watchOS 26 | Weekly average. Nightly only as an "interruptions" indicator |
| Sleep latency | Low-medium. Mean bias about 0, but limits about ±48 min, and no reliable "lights off" event | Weekly only, or omit |
| REM minutes / % | Medium on average (bias about 0 to -13 min), noisy nightly | 7-day average and trend |
| Deep minutes / % | Low. Systematically underestimated by 25-43 min, ICC 0.13 | 7-14 day trend only. Never alert on one night. Low threshold about 5-6% |
| Core minutes / % | Low. Overestimated by 45-60 min (absorbs Deep) | Trend only, or fold into "light + deep" context |

- Use a minimum of 5 valid nights out of 7 before showing weekly averages. Exclude sessions under 3 h from stage statistics.

### Gaps
- No study quantifies the night-to-night test-retest reliability of Apple stage estimates in young adults. No study validates watch-derived sleep latency against PSG lights-off in free-living conditions.
