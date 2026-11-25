# Sleep cycles (NREM-REM), cycle detection from a consumer hypnogram, sleep inertia, and napping

Scope: healthy young adults (18-25, university student). Data source: Apple Watch Series 10 stages (Awake / REM / Core / Deep) via Apple Health.
Research note: PubMed/PMC pages were blocked by bot checks during research. Abstracts were read through the Europe PMC API and publisher pages. Several numbers come from abstracts or from secondary summaries inside reviews, and this is flagged where it applies.

## 1. How long are NREM-REM cycles in healthy young adults, and how do they change across the night?

### Takeaway
The population center is about 90-96 min, with a large spread. Classical PSG cycles average 90 +/- 25 min, the largest recent dataset gives a median of 96 min, and individual cycles run from about 70 to 150 min, both within and between people. The first cycle is consistently shorter than later ones, and cycle length across the night follows an inverted U, with the middle cycles longest. A 7-8 h night usually holds 4-5 cycles.

### Cited Findings
- Cajochen et al., *Sleep Health* 2024;10(1S):S52-S62 (epub Oct 2023), a retrospective study of 369 healthy participants from Basel lab studies (1994-2020) with an 8-h sleep opportunity at habitual bedtime. Across 6,064 PSG-recorded cycles the median NREM-REM cycle was 96 min, with large individual variability. The first cycle was consistently shorter than later cycles. Older participants had longer NREM and shorter REM, especially late in the night, and women had longer NREM episodes. High sleep pressure (sleep deprivation) lengthened first-cycle NREM, and low sleep pressure (multiple naps) lengthened REM episodes. Moderate presleep light and nocturnal noise had no significant effect on cycle duration. The cycle rules were based on Feinberg & Floyd 1979, which the authors note lacked empirical biological validation. — [Europe PMC record, PMID 37914631](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:37914631&resultType=core&format=json); [Southampton eprint](https://eprints.soton.ac.uk/502837)
- Rosenblum et al., *eLife* 2025;13 (DOI 10.7554/eLife.96784; PMID 39784706), n = 205 healthy adults aged 18-75, 21 children and adolescents aged 8-17, and 111 patients with major depression. Classical NREM-REM cycles lasted 90 +/- 25 min and "fractal" (aperiodic-activity) cycles 89 +/- 34 min (r = 0.5 between them). Fractal cycles were 94 +/- 32 min in young adults versus 76 +/- 34 min in children and adolescents. Both fractal and classical cycle durations followed an inverted U across the night. The fractal method detected skipped-REM cycles in 91-98% of cases. Medication lengthened cycles in depression (107 +/- 51 vs 92 +/- 38 min unmedicated). — [Europe PMC search results (eLife and bioRxiv versions)](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22fractal%20cycles%22%20sleep%20Rosenblum&resultType=core&format=json); [eLife reviewed preprint](https://elifesciences.org/reviewed-preprints/96784v2)
- Kishi & Van Dongen, *Nature and Science of Sleep* 2023 (PMID 37388963), n = 17 healthy adults aged 28.6 +/- 5.7 (range 22-40), in a 12-day lab study with 12-h sleep opportunities. The paper cites the usual 90-100 min average and says cycle length "varies widely within and between individuals from 70 min to 150 min". — [Dovepress full text](https://dovepress.com/phenotypic-interindividual-differences-in-the-dynamic-structure-of-sle-peer-reviewed-fulltext-article-NSS)
- Feinberg & Floyd, *Psychophysiology* 1979;16(3):283-291 (DOI 10.1111/j.1469-8986.1979.tb02991.x). As summarized on Wikipedia, a 7-8 h sleep probably contains about five cycles, and the middle two tend to be longer than the first and the fourth. The 90-min figure was popularized by Kleitman around 1963 rather than established by a single definitive study. — [Scilit record](https://www.scilit.net/publications/09a29c54760f9de9443d3107aa32497a); [Wikipedia: Sleep cycle](https://en.wikipedia.org/wiki/Sleep_cycle) (secondary source)
- Other published ranges for the adult cycle are 90-110 min (Gronfier et al. 1999) and 80-120 min (Brandenberger et al. 2001), and UPMC gives 70-110 min. REM takes a growing share of each cycle as the night goes on, and N3 periods shrink. — [Wikipedia: Sleep cycle](https://en.wikipedia.org/wiki/Sleep_cycle) (secondary source; the primary papers were not checked)
- Ohayon et al. 2004 meta-analysis (*Sleep*, PMID 15586779): in adults, REM latency and REM % decrease with age. The abstract gives no young-adult REM latency values. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:12531174%20OR%20EXT_ID:15586779%20OR%20EXT_ID:11883293&resultType=core&format=json)

### Inferences
- Suggested population prior for an app: mean cycle about 90-95 min, SD about 25 min, plausible single-cycle range about 60-150 min. A first cycle shorter than the population mean is expected.
- For an 18-25-year-old, 90-96 min is a reasonable default. The young-adult fractal value of 94 min and the Basel median of 96 min both point there.
- After sleep loss (for example a short night before exams), expect a longer first NREM period and therefore a later first REM. After naps or a long lie-in, REM episodes run longer.
- Deep (N3) is concentrated in the first 1-2 cycles and REM in the last cycles. Morning awakenings at the end of a normal night therefore come far more often out of REM or Core than out of Deep.

### Gaps
- I could not get Le Bon et al.'s primary numbers (mean and SD per cycle number). Only Le Bon's 2020-2021 theoretical reviews turned up, with no numbers in their abstracts.
- I found no sourced normative first-REM-latency value for 18-25-year-olds (the commonly quoted figure is about 70-120 min). The Ohayon 2004 abstract gives only age trends, and the "about 90 min" on Wikipedia is uncited.
- I did not find per-cycle-number means (cycle 1 vs 2 vs 3...) in a fetchable source. Only the qualitative facts are confirmed: the first cycle is shorter, the pattern across the night is an inverted U, and the middle cycles are longest.
- I did not find the percentage of young-adult nights with a skipped first REM.

## 2. Rules for defining cycle boundaries from a hypnogram, and a robust algorithm for Apple Watch data

### Takeaway
The de-facto standard is Feinberg & Floyd (1979) as implemented in the R package `SleepCycles` (Blume & Cajochen 2021). A cycle is an NREM period followed by a REM period. Each NREM period must last at least 15 min. Each REM period must last at least 5 min, except the first, which has no minimum. An NREM period longer than 120 min can be split, to handle a skipped REM. A trailing cycle with less than 5 min of NREM or wake after its REM is "incomplete". These rules carry over to Apple Watch data with stage mapping (Core = N1/N2, Deep = N3), plus smoothing for wearable noise.

### Cited Findings
- `SleepCycles` R package (Blume & Cajochen 2021, PMID 34434837), with criteria "largely based on" Feinberg & Floyd 1979. The rules as documented:
  - A cycle is an NREM period (NREMP) followed by a REM period (REMP). The exception is a split NREMP, whose first part forms a cycle without REM.
  - The first NREMP starts at the first N1 by default, or N2 if `sleepstart = "N2"`.
  - The minimum NREMP is 15 min. An NREMP can include wake and REM bouts shorter than 5 min.
  - Any REM following NREM is a candidate REMP. It must last at least 5 min (default `REMP_length` = 10 epochs of 30 s). The first REMP has no minimum duration. The authors discourage lowering the threshold.
  - An NREMP longer than 120 min (excluding wake) can be split. The new cycle starts at the first N3 after a non-N3 phase longer than 12 min.
  - Incomplete periods are cycles followed by less than 5 min of NREM or wake. They are optionally removed (`rm_incomplete_period`, default FALSE).
  - Input must be in 30-s epochs.
  — [SleepCycles documentation (rdrr.io/CRAN)](https://rdrr.io/cran/SleepCycles/man/SleepCycles.html); [Europe PMC search](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22sleep%20cycle%22%20AND%20%22Feinberg%20and%20Floyd%22%20AND%20criteria)&resultType=core&format=json&pageSize=15)
- Alternative anchoring: Hartmann (1968) measured cycles from the end of one REM period to the end of the next. Feinberg & Floyd discuss anchoring at REM onset or at stage 2 onset. The choice decides whether the first NREM and the final REM are counted. — [Wikipedia: Sleep cycle](https://en.wikipedia.org/wiki/Sleep_cycle) (secondary source)
- Kishi & Van Dongen 2023 used Feinberg & Floyd criteria, measured NREM periods from the onset of any NREM stage, and used the REM-onset interval (ROI) as their cycle-length metric. — [Dovepress](https://dovepress.com/phenotypic-interindividual-differences-in-the-dynamic-structure-of-sle-peer-reviewed-fulltext-article-NSS)
- Apple Watch staging accuracy, which matters for noise handling. Robbins et al., *Sensors* 2024 (PMID 39460013) compared Apple Watch Series 8 against PSG in healthy adults. Sleep-vs-wake sensitivity was at least 95%, but the watch underestimated Deep by about 43 min and overestimated Core by about 45 min. A secondary summary gives kappa about 0.60. Apple's own white paper (Oct 2025, vendor evidence) maps Deep = N3, Core = N1/N2, REM = REM. A secondary source reports clinical-setting kappas of 0.55-0.57, with most errors between Core and Deep. — [Robbins et al. 2024](https://pubmed.ncbi.nlm.nih.gov/39460013/); [Apple white paper](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf) (the PDF was too large to fetch; details come from the search summary)
- An encoder-decoder RNN on smartwatch data (92 users, 138 nights) reached only 66-70% 4-class stage accuracy and 71-77% for Deep/REM vs Light/Wake. This illustrates the typical wearable ceiling. — Slyusarenko & Fedorin, IEEE EMBC 2020, PMID 33018943, via [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22smart%20alarm%22%20OR%20%22sleep%20stage%20based%20alarm%22)%20AND%20(inertia%20OR%20awakening)&resultType=core&format=json&pageSize=15)

### Inferences (proposed algorithm, my design adapted from the `SleepCycles` rules)
Input: HealthKit sleep samples (`asleepCore`, `asleepDeep`, `asleepREM`, `awake`, optionally `inBed`), each with a start and an end. Steps:
1. **Pick the main sleep episode.** Sort the samples. Merge consecutive samples into one episode when the gaps between them, awake included, are 60 min or less. Take the longest episode in the night window as the main sleep. Treat others as naps if they fall in the daytime.
2. **Resample to 30-s epochs.** Label each epoch W, N (Core), D (Deep), R (REM), or gap. Fill missing data inside the episode as wake when it is 5 min or less, and flag the night when it is longer.
3. **Smooth.** (a) Recode W bouts of 2 min or less inside sleep to the surrounding stage. (b) Treat Core and Deep together as "NREM" for cycle segmentation, because Core/Deep confusion is the main watch error and does not affect cycle boundaries. (c) Recode REM bouts shorter than 3 min to NREM, except a candidate first REM. (d) Merge two REM bouts separated by 15 min or less of NREM or wake into one REM period. This mirrors the "include <5 min REM inside NREMP" rule, and the 15-min merge is a common hypnogram convention. I did not verify it in a primary source, so tune it.
4. **Sleep onset** is the first epoch of NREM followed by at least 10 min of mostly sleep. This replaces "first N1", which the watch cannot see reliably.
5. **Find REM periods.** A REM period is a run of REM (after merging) of 5 min or more. The first REM period needs only 3 min or more, a relaxation for wearable noise; the SleepCycles default for the first REM has no minimum.
6. **Set cycle boundaries.** Cycle k runs from the end of REM period k-1 (or sleep onset for k = 1) to the end of REM period k. A cycle is valid only if its NREM portion is 15 min or more. When a would-be cycle has less than 15 min of NREM, join that REM period to the previous one.
7. **Handle a skipped REM.** When the NREM stretch before the next REM is longer than 120 min (or longer than 1.5 x the personal mean cycle once learned), split it. Use the minimum of a "depth" proxy: the end of a Deep bout followed by 12 min or more of non-Deep, or a cluster of awakenings or Core, at roughly 80-110 min. Mark the resulting cycle as "skipped REM".
8. **Last cycle.** Whatever follows the last REM period up to final wake is a "terminal fragment". When the last REM period ends less than 5 min before final wake, the final cycle counts as complete and the person woke at its end. Otherwise the fragment is an incomplete cycle.
9. **Quality flags.** Mark a night as unusable for learning when its total sleep is under 4 h, gaps exceed 10% of the episode, it has no REM, or the watch was not worn. Cap cycle lengths at 50-180 min and treat anything outside as an artifact.
- Choice of metric: report both the REM-end-to-REM-end cycle length and the REM-onset interval (as Kishi & Van Dongen do). The REM-onset interval is less sensitive to the noisy edges of REM bouts.

### Gaps
- I could not access the primary Feinberg & Floyd 1979 text to confirm the exact REM-interruption merge threshold (the commonly cited figure is 15 min).
- I found no published validation of cycle segmentation on Apple Watch (or any consumer wearable) hypnograms against PSG cycles. The algorithm above is an engineering proposal.
- HealthKit's exact segment granularity and minimum sample length were not verified, because the Apple white paper failed to download.

## 3. Does the "90-minute rule" for alarm timing work? Within-person variability, and learning a personal cycle length from ~2 weeks of data

### Takeaway
No study I found tests "sleep in 90-min multiples" alarm timing. The underlying assumption is weak. Cycles vary by +/-25-35 min (SD), and the first cycle is shorter, so the error after 5 cycles adds up to tens of minutes. A person's mean cycle length is only a modestly stable trait (ICC about 0.32), and night-to-night variability within the night is not trait-like. An app can learn a personal mean with shrinkage toward a prior, but it should use it as a soft prior, not a precise timer.

### Cited Findings
- Kishi & Van Dongen 2023 (n = 17, 22-40 y, baseline and recovery nights) report ICCs. Mean REM-onset interval (personal cycle length): ICC 0.32 (p = 0.022), fair stability, consistent with a phenotypic basal cycle length. Number of cycles: ICC 0.37. Within-night SD of REM-onset intervals: ICC 0.02 (not significant), so within-night variability is not a stable trait. The authors describe interindividual differences in cycle structure as "substantial and stable". Cycle length "varies widely within and between individuals from 70 min to 150 min". — [Dovepress](https://dovepress.com/phenotypic-interindividual-differences-in-the-dynamic-structure-of-sle-peer-reviewed-fulltext-article-NSS)
- The classical-cycle SD is about 25 min across healthy adults, and the young-adult fractal SD is 32 min. — [Rosenblum et al. 2025 via Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22fractal%20cycles%22%20sleep%20Rosenblum&resultType=core&format=json)
- In the Basel data, sleep pressure shifts cycle structure: deprivation lengthens first-cycle NREM, and naps lengthen REM. — [Cajochen et al. 2024](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:37914631&resultType=core&format=json)
- The 90-min figure is a popularized convention (Kleitman, around 1963), not an established individual constant. — [Wikipedia: Sleep cycle](https://en.wikipedia.org/wiki/Sleep_cycle) (secondary source)

### Inferences
- **Why fixed 90-min multiples fail.** Over 4.5-5 cycles, an individual SD of about 25 min per cycle gives an accumulated error of about 25 x sqrt(5), roughly 55 min, if cycles were independent. Sleep latency (about 10-20 min) and a shorter first cycle add more error. A fixed "6 h / 7.5 h" rule therefore cannot reliably land on a cycle end.
- **Learning a personal cycle length (14 nights):**
  - Use only complete, valid cycles, excluding cycle 1 and the terminal fragment, because cycle 1 is systematically shorter. Keep a separate personal estimate for cycle 1 (onset to end of first REM) and a separate first-REM latency.
  - Expect about 3 usable middle cycles per night, about 40 cycles in 14 nights. Use the median or a trimmed mean, and the MAD for spread.
  - Shrink toward the population prior: `mu_personal = (n0 * 93 + n * median_obs) / (n0 + n)`, with n0 about 10-15 pseudo-cycles to reflect the low ICC and wearable noise. Report a credible range (for example mu +/- 1.5 x MAD) rather than one number.
  - Exclude or down-weight nights after sleep deprivation, nights with alcohol, and recovery lie-ins, since sleep pressure changes cycle structure.
  - Recompute on a rolling 14-28-night window.
  - Statistical precision: SE about 25/sqrt(40), roughly 4 min. This is nominal, because Apple Watch stage errors add bias and the true personal stability is only fair (ICC 0.32).
- **Recommended UX:** show "your cycles average about X min (typical range A-B)". Use this to suggest bedtimes or wake windows of about +/-15 min, not exact minutes.

### Gaps
- I found no empirical test (RCT or observational) of the "90-min multiple" alarm/bedtime rule.
- I found no study of how many nights are needed to estimate a personal cycle length with a given precision, nor any study of how well wearable-derived cycle length agrees with PSG-derived cycle length.

## 4. Sleep inertia by stage at awakening: magnitude and duration

### Takeaway
Waking from N3 (slow-wave sleep) generally produces more inertia than waking from N1/N2, and REM is intermediate. The effect is inconsistent, though, and strongest after long naps or high sleep pressure. Circadian phase (waking near the biological night) and prior sleep loss often matter as much or more. Inertia usually clears within 15-30 min for basic performance, but full recovery can take an hour or more, and some measures take 2-3.5 h after a normal night's sleep.

### Cited Findings
- Tassi & Muzet, *Sleep Medicine Reviews* 2000 (PMID 12531174):
  - Reported inertia durations range from about 1 min to 4 h, and without major sleep deprivation rarely exceed 30 min.
  - Waking from SWS produces more inertia than waking from stage 1 or 2, with REM intermediate.
  - Sleep deprivation increases inertia, partly by increasing SWS.
  - Inertia is stronger when waking near the trough of core body temperature.
  — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:12531174%20OR%20EXT_ID:15586779%20OR%20EXT_ID:11883293&resultType=core&format=json)
- Hilditch & McHill, "Sleep inertia: current insights", *Nature and Science of Sleep* 2019;11:155-165, a narrative review:
  - **Stage evidence is mixed.**
    - Stampi 1992: a 41% performance drop after waking from SWS, with little change after N2.
    - Bruck & Pisani 1999: decision-making was worse after SWS than after REM.
    - Dinges 1985: deeper sleep (stage 4) went with slower responses, in 2-h naps during 54 h of deprivation.
    - Tassi 2006: delta activity in the 10 min before waking correlated with worse performance.
    - Vallat 2019: greater default-mode network connectivity after N3 awakenings than after N2.
    - Several studies found no stage effect (Scheer 2008; Lovato 2009; Signal 2012). In Lovato 2009, 91% of participants woke from SWS without measurable impairment.
    - The authors conclude the stage effect is strongest after longer naps and under high homeostatic pressure.
  - **Duration.**
    - Performance often returns to pre-sleep levels within about 30 min, sometimes 15 min.
    - Full recovery usually takes at least 1 h. Jewett 1999 found subjective alertness improving for about 2 h and addition performance up to 3.5 h after habitual morning waking, with the circadian rise as a confound.
    - Achermann 1995 found a similar time course after 8-h night sleep and a 2-h nap, lasting at least 1 h.
  - **Magnitude.**
    - Wertz 2006: addition performance right after waking was worse than after a night of total sleep deprivation.
    - Miccoli 2008: response times in the first hour after restricted sleep matched those after total deprivation.
    - Subjective and objective measures diverge: people rate their performance as better than it is (Hilditch 2016).
  - **Modifiers.**
    - Inertia is worst near the circadian low (Scheer 2008).
    - Prior sleep loss worsens it. McHill 2019 found that chronic restriction to 5.6 h/day worsened post-waking performance by about 10%, still not back to baseline after 70 min.
    - Later chronotypes take longer to recover (Ritchie 2017).
  - **Function.** Gradual waking from REM has been proposed as a "reset" function (Vyazovskiy 2014, rodents). The review does not discuss smart alarms.
  — [Dovepress full text](https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS)
- Beauchamps et al., *Frontiers in Physiology* 2026 (PMID 42707609): inertia was greater after a 3-h recovery night following sleep deprivation than after a 9-h night. Brief respiratory and muscular "physiological dynamization" cut reaction times by 49 ms and lapses by 2.3 within 20 min. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22sleep%20inertia%22%20AND%20(review%20OR%20%22stage%20of%20awakening%22)%20AND%20(Trotti%20OR%20Tassi))&resultType=core&format=json&pageSize=10)
- The AASM shift-work guideline (Wright et al., *JCSM* 2026, PMID 42925456) advises allowing time for sleep inertia to resolve before driving or other safety-sensitive tasks, especially after naps. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22sleep%20inertia%22%20AND%20(review%20OR%20%22stage%20of%20awakening%22)%20AND%20(Trotti%20OR%20Tassi))&resultType=core&format=json&pageSize=10)

### Inferences (messaging rules)
- Grade the final awakening by the stage in the last about 5-10 min before the final wake segment:
  - **"Woke at the end of a cycle / from light sleep":** the last sleep before waking is REM ending within 5 min of wake, or Core, with no Deep in the last 10 min.
  - **"Woke from deep sleep":** Deep present in the last about 5 min. The message should say grogginess is more likely and usually fades within about 15-30 min.
  - **"Spontaneous / natural wake":** an awake segment begins before the alarm time, if the alarm time is known.
- Hedge the language ("probably", "may feel groggier"). Two reasons: the stage effect is inconsistent in well-rested people, and the watch underestimates Deep by about 40 min per night, so it may miss N3 at waking.
- In the morning, N3 at waking is uncommon because N3 is concentrated early in the night. A "Deep at wake" flag in the morning more likely signals sleep debt, an early alarm cutting into an early cycle, or misclassification.
- Grogginess messaging should weigh prior sleep debt and circadian timing at least as much as stage. For example: "after <6 h sleep, expect more grogginess regardless of stage". Also say that inertia can feel gone before performance has recovered.

### Gaps
- I did not retrieve Trotti 2017 ("Waking up is the hardest thing I do all day", *Sleep Medicine Reviews*) directly. Its content is not represented here beyond what overlaps with Hilditch & McHill.
- I found no quantitative stage-specific effect size (for example a d value for N3 vs N2 vs REM awakenings) pooled across studies.

## 5. Smart alarms (waking in a light-sleep window)

### Takeaway
I found no randomized or controlled evidence that wearable "light-sleep window" alarms reduce sleep inertia or improve morning alertness compared with a fixed alarm. The available studies either test only classification accuracy (about 66-77%) or show no effect on subjective sleep outcomes. The rationale is plausible, but the evidence is indirect and rests on the mixed stage-dependence data in section 4.

### Cited Findings
- Slyusarenko & Fedorin, IEEE EMBC 2020 (PMID 33018943): a smartwatch smart alarm with sleep-stage prediction (92 users, 138 nights). Accuracy was 66-70% for 4 classes and 71-77% for Deep/REM vs Light/Wake. No inertia outcome and no comparison with a fixed alarm. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22smart%20alarm%22%20OR%20%22sleep%20stage%20based%20alarm%22)%20AND%20(inertia%20OR%20awakening)&resultType=core&format=json&pageSize=15)
- Jakowski & Stork, *Somnologie* 2022 (PMID 36311283): a 2-week controlled study of 98 student athletes in which app groups used a "smart alarm" in week 2. There were no significant effects on subjective sleep markers, and inertia was not measured. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22smart%20alarm%22%20OR%20%22sleep%20stage%20based%20alarm%22)%20AND%20(inertia%20OR%20awakening)&resultType=core&format=json&pageSize=15)
- Campanella et al., *Clocks & Sleep* 2024 (PMID 38534801): a lab study over four nights comparing a multimodal bedroom "smart" alarm (light, sound, temperature) with a traditional alarm. It had "little overall impact" on inertia, with some chronotype-dependent subgroup effects. It was not stage-timed. — [PMC10969141](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10969141/)
- Hilditch & McHill 2019 list sound and light countermeasures. Pink noise after a nap removed inertia (Tassi 1992). Preferred music improved performance for up to 20 min (Hayashi 2004). Light improved subjective but not objective outcomes. Caffeine before a short nap is the most effective proactive countermeasure (Van Dongen 2001). — [Dovepress](https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS)
- Industry opinion (not peer-reviewed; RISE Science blog) holds that consumer devices cannot reliably time "light sleep", and that circadian phase and sleep debt often matter more than stage at the alarm. — [RISE blog](https://www.risescience.com/blog/smart-alarm)

### Inferences
- If the app implements a wake window (for example 20-30 min before a hard deadline), the rule should be: wake at the first epoch in the window that is Awake, REM-ending, or Core after REM. Avoid Deep, and otherwise wake at the deadline. Do not promise less grogginess. Frame it as "the window may make waking easier".
- Real-time staging from HealthKit is not available during the night on the iPhone side. Apple writes sleep stages after the session, so a smart alarm would need on-watch logic. The app can still do *retrospective* grading of awakenings, as in section 4.

### Gaps
- I found no RCT of stage-timed alarms with an objective inertia outcome such as PVT.
- I did not verify whether Apple exposes stage data in real time to third-party watchOS apps.

## 6. Naps: optimal duration, timing, and effects on night sleep in young adults

### Takeaway
For a young adult, the best-supported nap is about 10-20 min of actual sleep (about 20-25 min in bed), taken early to mid-afternoon (ending by about 15:00-16:00). It gives quick benefit with little inertia. Naps of 30 min or more risk entering SWS and produce inertia lasting up to about 35-95 min before benefits appear. A 90-min, full-cycle nap ending by 15:00 did not harm that night's sleep in a small athlete study. Longer naps are associated with worse night sleep in observational student data.

### Cited Findings
- Brooks & Lack, *Sleep* 2006;29(6):831-840 (PMID 16796222): n = 24 healthy young good sleepers who were not habitual nappers, restricted to about 5 h the previous night, napping at 15:00 with 3 h of testing afterward.
  - A 5-min nap gave few benefits.
  - A 10-min nap gave immediate improvement in all measures (sleep latency, sleepiness, fatigue, vigor, cognition), lasting up to 155 min.
  - A 20-min nap gave benefits from about 35 min after waking, lasting up to 125 min.
  - A 30-min nap caused immediate impairment (inertia), then benefits up to 155 min.
  - Overall, 10 min was the most effective.
  — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Brooks%20Lack%202006%20brief%20afternoon%20nap%20%22most%20recuperative%22&resultType=core&format=json&pageSize=5)
- Hilditch & McHill 2019:
  - Naps of 30 min or less are less likely to cause inertia, plausibly because SWS typically begins about 30 min into sleep (Gillberg & Akerstedt 1991).
  - Short naps are no guarantee: a 10-min nap at 07:00 after extended wakefulness still impaired performance (Hilditch 2017).
  - After a 30-min afternoon nap, benefits appeared only 35-95 min after waking, depending on the task (Brooks & Lack 2006).
  — [Dovepress](https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS)
- Dutheil et al., *IJERPH* 2021;18(19):10212 (PMID 34639511), a meta-analysis of short daytime naps, almost all lab studies.
  - Cognitive performance improved after the nap (ES 0.18, 95% CI 0.09-0.27), especially alertness (ES 0.29, 0.10-0.48).
  - Nap duration and the time between nap and testing did not influence the benefit. Benefits ran mainly up to 120 min after the nap, and results during the inertia period were conflicting.
  - Benefits were independent of sex and age.
  — [PMC8507757](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8507757/); [PubMed 34639511](https://pubmed.ncbi.nlm.nih.gov/34639511/)
- Related meta-analysis of night-shift naps (Martin-Gill/Dutheil group, *Sleep* 2020): 18 articles, 494 participants, mean nap length about 42 min. Performance improved (ES 0.25, 0.10-0.41), with improvements mainly visible about 30 min after waking. — [HAL](https://hal.archives-ouvertes.fr/hal-02979271)
- Boukhris, Suppiah & Driller, *J Sleep Research* 2026;35(1):e70120 (PMID 40537913), a randomized counterbalanced crossover with 14 student athletes aged 23 +/- 2. The conditions were no nap, a 25-min nap (14:35-15:00), and a 90-min nap (13:30-15:00). Neither nap changed that night's bedtime, wake time, WASO, total sleep time (7:13 vs 7:05 vs 7:01), or actigraphy-estimated stages compared with no nap. — [PMC12856117](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12856117/)
- Mead et al., *Annals of Behavioral Medicine* 2022;56(11):1101-1109 (PMID 35195690): 384 college students, 14 days, self-reported naps plus actigraphy at night. Longer nap duration was associated with greater WASO, lower sleep efficiency, and longer sleep-onset latency that night. In the other direction, shorter nights predicted longer next-day naps. — [Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:35195690%20OR%20EXT_ID:19645971%20OR%20PMCID:PMC12856117%20OR%20EXT_ID:20797557&resultType=core&format=json)
- Sleep Foundation guidance (non-peer-reviewed): naps of 30 min or less are best for most people, and napping too late or too long may make it harder to fall and stay asleep at night. — [Sleep Foundation](https://www.sleepfoundation.org/how-sleep-works/does-napping-impact-sleep-at-night/embed)
- Milner & Cote, *J Sleep Research* 2009 (PMID 19645971), a review of how nap benefits depend on nap length, time of day, age, and napping experience. The abstract gives no numeric thresholds. — [PubMed 19645971](https://pubmed.ncbi.nlm.nih.gov/19645971/)

### Inferences (programmable nap rules)
- **Default "power nap":** 20 min in bed (about 10-15 min asleep, assuming about 5-10 min latency). Set an alarm at 20-25 min. Warn when Apple Watch shows a nap of more than 30 min of sleep: "longer nap, expect ~30-60 min of grogginess."
- **Full-cycle nap (only after major sleep loss):** about 90-100 min, or the learned personal cycle length plus latency, ending by 15:00. Advise against 40-70-min naps, which end close to N3.
- **Timing:** best in the early-afternoon dip (about 13:00-15:00). Soft cutoff: the nap should end by about 15:00-16:00 for a typical student bedtime around 00:00. Flag any nap ending less than about 7-8 h before habitual bedtime. This cutoff is an inference, as no study gives a precise hours-before-bed threshold.
- **Feedback loop:** when a long nap follows a short night (Mead 2022), present the nap as a symptom of sleep debt. Prioritize regular night sleep over napping.
- **Safety:** allow 15-30 min before driving or exams after any nap of more than 20 min (AASM guidance; Hilditch & McHill). Optionally suggest coffee right before a 20-min nap (Van Dongen 2001 via Hilditch & McHill).

### Gaps
- I found no peer-reviewed source giving a precise latest nap time or minimum gap to bedtime for young adults. The "before 15:00-16:00" rule is a convention supported only indirectly (Brooks & Lack naps at 15:00; Boukhris naps ending at 15:00 with no effect on night sleep).
- I could not retrieve the Hilditch et al. 2017 *Sleep Medicine Reviews* review on short naps ("do naps of 30 min or less really avoid sleep inertia and SWS?"), so I have no percentage of short naps that contain SWS.
- The Boukhris 2026 sample is small (n = 14) and made of athletes. The Mead 2022 nap data are self-reported and correlational.
