# Sleep debt, sleep regularity and caffeine cut-off: formulas and thresholds for a personal app

Population of interest: healthy young adults (18-25), a university student with an irregular schedule. Most of the lab evidence below comes from healthy young or middle-aged adults. The mortality and cardiometabolic SRI cohorts (UK Biobank, MESA) are older adults, so treat those thresholds as directional for students.

## 1. Sleep debt: definition, calculation, and repayment

### Takeaway
No research-standard "sleep debt" formula exists. The lab evidence supports treating debt as cumulative excess wakefulness or a shortfall versus an individual sleep need. Consumer apps (RISE, Oura) use a rolling 14-night shortfall versus personal need, with recent nights weighted more. Recovery is slow and incomplete: one 10 h night or a weekend of catch-up sleep does not fully restore performance or metabolism. So a realistic plan repays at roughly +0.5-2 h per night over several nights, combined with stopping new debt.

### Cited Findings
**Lab evidence on accumulation**
- Van Dongen et al. 2003 (*Sleep* 26(2):117-126) randomized healthy adults to 4, 6 or 8 h time in bed (TIB) for 14 consecutive nights, plus a separate arm with 3 nights of total sleep deprivation. Restricting sleep to ≤6 h/night produced cognitive deficits equivalent to up to 2 nights of total sleep deprivation — [PubMed 12683469](https://pubmed.ncbi.nlm.nih.gov/12683469/); [Penn UEP PDF](https://www.med.upenn.edu/uep/assets/user-content/documents/Van_Dongen_Dinges_Sleep_26_3_2003.pdf)
- Van Dongen 2003: attention lapses tracked the cumulative wakefulness in excess of 15.84 h/day (SE 0.73 h), however the sleep was lost. That implies a "critical wake" of about 15.8 h, i.e., a sleep need of about 8.2 h/24 h. Subjects were largely unaware of their growing deficits, judging by subjective sleepiness — [PubMed 12683469](https://pubmed.ncbi.nlm.nih.gov/12683469/)
- Belenky et al. 2003 (*J Sleep Res*) gave 3, 5, 7 or 9 h TIB for 7 days, then 3 recovery nights of 8 h TIB. In the 7 h and 5 h groups, PVT speed (and lapses in the 5 h group) stayed at the reduced level with no sign of recovery over the 3 recovery nights. The 3 h group improved after the first recovery night but plateaued below baseline. The 9 h group stayed at baseline. The authors interpret this as the brain adapting to chronic restriction — [PubMed 12603781](https://pubmed.ncbi.nlm.nih.gov/12603781/); [PDF](https://jhanley.biostat.mcgill.ca/bios601/Surveys/Belenky2003.pdf)

**Lab evidence on recovery**
- Banks et al. 2010 (*Sleep*) used 2 baseline nights of 10 h TIB, then 5 nights of 4 h TIB, then one recovery night randomized to 0, 2, 4, 6, 8 or 10 h TIB. Every outcome improved dose-dependently with more recovery sleep. Recovery was still incomplete at 10 h TIB (8.96 h of actual sleep) for PVT, KSS sleepiness and POMS fatigue. Estimated full-recovery points ranged from about 8 to 15 h depending on the outcome (Table 3). The authors conclude that full recovery may need a longer night and/or several recovery nights — [PubMed 20815182](https://pubmed.ncbi.nlm.nih.gov/20815182/); [PMC2910531](https://pmc.ncbi.nlm.nih.gov/articles/PMC2910531)
- Kitamura et al. 2016 (*Sci Rep* 6:35812) offered healthy participants 12 h sleep opportunities for 9 consecutive nights to estimate each person's optimal sleep duration and "potential sleep debt" (PSD). The abstract-level summary says that even 1 h of PSD takes about 4 days of extended sleep to recover. Note that 9 days is the protocol length, not the recovery time — [Springer/Sci Rep 10.1038/srep35812](https://link.springer.com/10.1038/srep35812); [Examine summary](https://examine.com/summaries/study/9Lb5J1)
- Depner et al. 2019 (*Curr Biol* 29(6):957-967) had three groups of healthy young adults: control at 9 h opportunity (n=8), 5 h opportunity without weekend recovery (n=14), and 5 h with ad libitum weekend recovery (n=14). The weekend group added only about 1 h of sleep overall; NIH reports about 3 h extra over 2 nights. After restriction resumed, the weekend-recovery group's whole-body, hepatic and muscle insulin sensitivity fell about 9-27%. The no-recovery group's whole-body sensitivity fell about 13%. The authors call weekend recovery sleep "not an effective strategy" against recurrent insufficient sleep. Depner suggested social jet lag contributed — [PubMed 30827911](https://pubmed.ncbi.nlm.nih.gov/30827911/); [NIH Research Matters](https://www.nih.gov/news-events/nih-research-matters/weekend-catch-cant-counter-chronic-sleep-deprivation); [CU Boulder](https://www.colorado.edu/today/2019/02/28/catching-sleep-weekend-doesnt-work)

**Consumer-app practice (not peer reviewed; examples of product design)**
- RISE compares sleep obtained with an individualized sleep need over the past 14 nights. Shortfalls add to debt and surplus nights reduce it. The window rolls daily. Recent nights weigh more: last night is about 15% of the weight and the other 13 nights share 85%, with more recent nights weighted more. Sleep need is estimated from about a year of phone-use data. RISE says the exact weighting is a product choice, not a published formula — [RISE help: how is sleep debt calculated](https://help.risescience.com/hc/en-us/articles/40621334445335-How-is-my-sleep-debt-calculated); [RISE blog: sleep debt](https://www.risescience.com/blog/sleep-debt); [RISE sleep debt calculator](https://www.risescience.com/blog/sleep-debt-calculator)
- Oura computes debt over the past 2 weeks with more weight on recent days and needs at least 5 nights of data in that window. Total daily sleep, naps included, is compared with a personal "sleep need" derived from about 90 days of typical sleep, with outlier nights filtered. The categories are None, Low (<2 h) and High (>5 h) — [Oura support article](https://support.ouraring.com/hc/articles/46233324892691); [Oura blog: sleep debt](https://ouraring.com/blog/ja/sleep-debt/)

### Inferences
- **Implementable formula (proposal, synthesized from the above):**
  - `need` = personal sleep need. Default 8.0-8.5 h for 18-25 year-olds: the Van Dongen critical-wake estimate of 15.84 h implies about 8.2 h, and Kitamura-style extension studies point to an optimum above habitual sleep. If the user has ≥2 weeks of unconstrained (vacation) data, personalize it as the mean of free nights after the first 3-4 extension nights.
  - `deficit_i = need − TST_i`. Count naps in TST_i, as Oura does. Allow negative values (surplus), but clamp surplus per night to about 2 h so one long night cannot erase a week of debt. This matches Banks 2010 (one long night is incomplete recovery) and Kitamura (about 4 days per 1 h).
  - `debt = Σ_{i=0..13} w_i · deficit_i` over the last 14 nights, with w_0 (last night) highest. One option is linear decay, w_i ∝ (14 − i), normalized so Σw_i = 14 so the result is still in hours. That gives last night about 13% of the weight, close to RISE's stated 15%. An exponential alternative is w_i ∝ 0.85^i.
  - Floor the debt at 0 and cap the display at about 15-20 h. Show bands like Oura's: <2 h low, 2-5 h moderate, >5 h high.
  - Require ≥5 valid nights in the window, as Oura does, before showing a number.
- **Repayment rule:**
  - Target +0.5 to +1.5 h above need per night, i.e., go to bed earlier rather than sleeping in, until debt is below 2 h.
  - Expect about 3-4 nights per hour of debt (Kitamura), and incomplete recovery from a single night even at about 9 h TST (Banks).
  - Don't rely on weekend lie-ins, which raise social jet lag (Depner).
  - Most important: stop new debt. Belenky shows chronic 5-7 h sleepers did not recover over 3 nights of 8 h TIB.
- For a student, "repay by advancing bedtime" is better than "sleep in on weekends", because it protects regularity (section 2) and social jet lag (section 3).

### Gaps
- I could not open the Kitamura 2016 full text to verify the participants' habitual vs. optimal sleep durations or the exact PSD size. Only the abstract-level "1 h PSD → ~4 days" is cited.
- No peer-reviewed validation exists for 14-night weighted debt algorithms. RISE and Oura do not publish their exact weights. A specific cap value is not evidence-based.
- No study directly tests "+1 h vs +2 h per night" repayment speeds in free-living students.

## 2. Sleep regularity: SRI, bedtime/midpoint SD, interdaily stability

### Takeaway
The SRI is the probability (rescaled) of being in the same sleep/wake state at two times 24 h apart. It can be computed from bedtime/wake-time logs by expanding each night into 30-s or 1-min binary epochs. In UK Biobank the median SRI was 81. The least regular quintile (SRI < ~72) had the highest mortality, with most of the benefit reached by SRI ≥ ~83. For 7-14 nights, the SD of sleep midpoint (or of bed and wake times) is the simplest robust companion metric. Interdaily stability is unstable with few days.

### Cited Findings
**SRI definition and formula**
- Phillips et al. 2017 (*Sci Rep* 7:3216) introduced the SRI in 61 undergraduates tracked for 30 days with sleep diaries. A perfectly repeating pattern scores 100 and random sleep/wake scores 0. The SRI needs no "main sleep episode", which suits students with naps and all-nighters — [DOAJ record](https://doaj.org/article/98978c03a4da4abb894c69dbfb834eb9); [MIT DSpace](https://dspace.mit.edu/handle/1721.1/113615)
- In Phillips 2017, SRI was unrelated to average sleep duration (r = 0.05, p = 0.71) and correlated with academic performance (r = 0.37, p < 0.004). Irregular sleepers (bottom quintile) versus Regular (top quintile) had later DLMO, a later sleep-propensity rhythm and lower-amplitude light exposure — [MIT Media Lab summary](https://www.media.mit.edu/publications/irregular-sleep-wake-patterns-are-associated-with-poorer-academic-performance-and-delayed-circadian-and-sleep-wake-timing/); [EurekAlert](https://www.eurekalert.org/news-releases/628146)
- Formula notation: s_{i,j} is the state on day i at epoch j, M the epochs per day, N the number of days, and δ = 1 if two states are equal, 0 otherwise. The SRI is the probability of the same state at time points 24 h apart — [arXiv review of wearable models](https://arxiv.org/pdf/2407.21665)
- Reference implementation (R package GGIR, `CalcSleepRegularityIndex`):
  - For each pair of consecutive days, `SRI = 200 × N_equal / (M − N_skipped) − 100`, where N_equal counts epochs in the same state on both days and missing epochs are excluded.
  - Data are aggregated to 30-s epochs (M = 2880/day). The range is −100 (reversed) through 0 (random) to +100 (perfectly regular).
  - It returns NA with fewer than 3 distinct dates.
  - [GGIR source](https://rdrr.io/cran/GGIR/src/R/CalcSleepRegularityIndex.R); [GGIR docs](https://search.r-project.org/CRAN/refmans/GGIR/html/CalcSleepRegularityIndex.html)
- The usual whole-period form is SRI = −100 + 200/(M(N−1)) · Σ_{i=1}^{N−1} Σ_{j=1}^{M} δ(s_{i,j}, s_{i+1,j}). This is consistent with the GGIR code above. The exact typeset equation in Phillips 2017 could not be retrieved, so verify against the paper's Methods. Windred 2024 uses a 0-100 rescaling (see next bullet) — [GGIR source](https://rdrr.io/cran/GGIR/src/R/CalcSleepRegularityIndex.R)

**Population values and outcome thresholds**
- Windred et al. 2024 (*Sleep* 47(1):zsad253) used UK Biobank accelerometry: about 61,000 adults (60,977 in the abstract, 60,997 in the results), 1,859 deaths over a mean follow-up of 6.3 years. The SRI was scaled so that 100 is perfectly regular. Median SRI was 81.0 (IQR 73.8-86.3, range 2.5-98.5) — [OUP Sleep](https://academic.oup.com/sleep/article/47/1/zsad253/7280269)
- Windred 2024 SRI quintile cut-offs:

  | Quintile | SRI range |
  |---|---|
  | Q1 | 2.46-71.65 |
  | Q2 | 71.65-78.56 |
  | Q3 | 78.56-83.16 |
  | Q4 | 83.17-87.31 |
  | Q5 | 87.32-98.53 |

  [OUP Sleep](https://academic.oup.com/sleep/article/47/1/zsad253/7280269)
- Windred 2024 all-cause mortality hazard ratios versus Q1:

  | Quintile | Minimally adjusted HR | Fully adjusted HR |
  |---|---|---|
  | Q2 | 0.72 | 0.80 |
  | Q3 | 0.62 | 0.75 |
  | Q4 | 0.54 | 0.72 |
  | Q5 | 0.52 | 0.70 |

  The top four quintiles had 20-48% lower risk. SRI beat sleep duration as a predictor (lower AIC), and adding duration to the SRI models did not improve fit (p = 0.14 and p = 0.20). The study is observational, with one week of data from older, mostly white adults — [OUP Sleep](https://academic.oup.com/sleep/article/47/1/zsad253/7280269); [UK Biobank summary](https://www.ukbiobank.ac.uk/publications/sleep-regularity-is-a-stronger-predictor-of-mortality-risk-than-sleep-duration-a-prospective-cohort-study/)
- An earlier conference abstract of the same work reported that +1 SD of SRI (about 10.7 points) was associated with about 20% lower all-cause mortality hazard. This is a secondary, conference-level result — [search summary of Sleep Advances abstract via UK Biobank/Flinders](https://researchnow.flinders.edu.au/en/publications/sleep-regularity-is-a-stronger-predictor-of-mortality-risk-than-s/)
- A popular-science gloss (secondary, not from the paper) says the most regular 20% kept bed and wake times within about a 1 h daily window, versus about 3 h for the least regular 20% — [Stronger by Science](https://www.strongerbyscience.com/sleep-regularity/)
- Lunsford-Avery et al. 2018 (*Sci Rep* 8:14158; MESA, n = 1,978 older adults) found that lower SRI was associated with higher 10-year cardiovascular risk, obesity, hypertension, fasting glucose, HbA1c, diabetes, stress and depression, independent of sleep duration. Irregular sleepers had later sleep timing, more daytime sleepiness and less light exposure. A 2021 author correction amended some table values — [PMC6154967](https://pmc.ncbi.nlm.nih.gov/articles/PMC6154967); [Author correction](https://pubmed.ncbi.nlm.nih.gov/34916542/)

**Choosing a metric for 7-14 nights**
- Fischer, Klerman & Phillips 2021 (*Sleep* 44(10)) compared five metrics: SD of sleep timing, interdaily stability (IS), social jet lag, composite phase deviation (CPD) and SRI. Shuffling the order of days leaves SD and IS unchanged but changes CPD and SRI. So SD and IS capture multi-day (relative to one's own average) regularity, while SRI and CPD capture day-to-day regularity. All metrics were robust to up to 50% randomly missing data but sensitive to non-random gaps — [PubMed 33864369](https://pubmed.ncbi.nlm.nih.gov/33864369/); [PMC8503839](https://pmc.ncbi.nlm.nih.gov/articles/PMC8503839)
- In an earlier version of that work, the average IS estimate changed by up to 50% over the first 14 days while CPD and SRI stayed stable, so IS can overestimate regularity with few days — [core.ac.uk preprint](https://core.ac.uk/download/237469092.pdf); [elib.dlr.de](https://elib.dlr.de/142301/)

### Inferences
- **SRI from a bedtime/wake-time log:**
  1. Build a binary vector per calendar day at 1-min resolution: M = 1440, with 1 = asleep between sleep onset and wake, including logged naps.
  2. For each consecutive day pair, compute the proportion p of minutes in the same state.
  3. Calculate SRI = 200·mean(p) − 100 (Phillips/GGIR scale, −100..100). For Windred-style 0-100 values, use SRI₀₋₁₀₀ = 100·mean(p).
  4. Need ≥3 days, ideally ≥7. Exclude day pairs with missing logs.

  Note that with only one sleep bout per day and good logging, the two scales differ. Apply thresholds on the scale the source used: Windred reports on 0-100.
- **Interpretable bands (proposal; based on adult cohort quintiles, not validated in students):** SRI (0-100 scale)
  - <72 = irregular (Windred highest-risk quintile)
  - 72-83 = moderate
  - ≥83 = regular (most of the mortality-risk reduction reached)
  - ≥87 = very regular (top quintile)
- A shortcut sanity check: shifting one night by 1 h against an otherwise fixed 8 h schedule makes about 2 h of the 24 h pair discordant (1 h at each end), so p ≈ 0.917 for that pair. Daily shifts of about 1 h therefore give roughly SRI(0-100) ≈ 90. Daily shifts of about 3 h give roughly 75. This is derived arithmetic, not from a source, and it is consistent with the secondary "1 h vs 3 h window" gloss.
- **Simplest robust companion metric for 7-14 nights:** SD of sleep midpoint. Compute it with circular statistics, or by unwrapping clock times around noon, so that 23:30 and 00:30 are 1 h apart. Also show SD of bedtime and SD of wake time separately, because they are actionable.
  - No validated outcome thresholds for midpoint SD were found in this search. A pragmatic UI band would be <30 min good, 30-60 min moderate, >60 min irregular; this is an inference to verify against the broader literature.
- For a student, show SRI (day-to-day) together with midpoint SD (multi-day), as Fischer 2021 recommends. Skip IS with <14 days.

### Gaps
- Could not retrieve the Phillips 2017 full text (Nature and PMC blocked automated access). Missing: the exact typeset equation, the mean SRI in students, the Regular vs Irregular quintile SRI values, and the DLMO difference in hours. The circadian delay of about 2.6 h in irregular students is often quoted but was not verified here.
- No peer-reviewed SRI cut-off has been validated for 18-25 year-olds. Windred and Lunsford-Avery are older cohorts.
- No sourced outcome thresholds for bedtime or midpoint SD were found in this search.

## 3. Social jet lag (MCTQ) and chronotype

### Takeaway
Social jet lag is the absolute difference between mid-sleep on free days and workdays: SJL = |MSF − MSW|. Chronotype is MSFsc, the free-day mid-sleep corrected for oversleep on free days. ≥2 h is the commonly used "high SJL" cut-off and is associated with depressive symptoms and lower academic performance in students. Some data suggest risk already rises around 1-1.2 h, so ≥1 h is a reasonable warning level.

### Cited Findings
- Definitions from the rOpenSci `mctq` package documentation, citing Roenneberg et al. 2003, Roenneberg et al. 2012 and Ghotbi et al. 2020:
  - SJL_rel = MSF − MSW (signed) and SJL = |MSF − MSW|.
  - MSW and MSF are local mid-sleep on workdays and free days.
  - The package's default computes the difference over the shorter interval, to handle the midnight wrap.
  - Jankowski 2017 (*Chronobiol Int* 34(4):531-535) proposed a sleep-corrected SJL formula.
  - [mctq docs: sjl](https://docs.ropensci.org/mctq/reference/sjl.html)
- MSFsc (chronotype) per the `mctq` package:
  - If an alarm is used on free days, MSFsc = NA.
  - Else if SD_F ≤ SD_W, MSFsc = MSF.
  - Else MSFsc = MSF − (SD_F − SD_week)/2, equivalently SO_F + SD_week/2.
  - Here MSF = SO_F + SD_F/2 and SD_week is average weekly sleep duration.
  - In the standard MCTQ, SD_week = (SD_W·WD + SD_F·FD)/7; this weighting is from general knowledge, as the page did not state it.
  - [mctq docs: msf_sc](https://docs.ropensci.org/mctq/reference/msf_sc.html); [The WEP MCTQ](https://www.thewep.org/documentations/mctq/)
- Roenneberg et al. 2012 (*Curr Biol* 22(10):939-943): beyond sleep duration, social jet lag was associated with higher BMI. Press coverage quotes about 33% higher odds of overweight/obesity per hour of SJL; this figure is secondhand and was not verified in the abstract — [PubMed 22578422](https://pubmed.ncbi.nlm.nih.gov/22578422/); [ScienceDaily](https://sciencedaily.com/releases/2012/05/120510132637.htm)
- In Chinese college students, SJL ≥2 h was associated with mild depression (OR 5.67, 95% CI 1.83-17.51). Another Chinese student study found a non-linear association, with depression risk rising markedly at SJL ≥1.2 h. Both are cross-sectional — [Non-linear SJL-depression study](https://library.kab.ac.ug/Record/doaj-art-1e9381ac214f4e36a049ebeeb9ead0c9/Details); [BVS record](https://pesquisa.bvsalud.org/bolivia/resource/es/mdl-36270445)
- Smarr & Schirmer 2018 analyzed about 3.4 million LMS logins from about 14,900 students. Most students experienced social jet lag, and it correlated with lower performance, especially in later chronotypes — [PMC5876324](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5876324/)
- Prevalence varies widely: one review quotes 63.7% of university students with SJL ≥2 h (secondary, primary source not traced), whereas only 6% of Portuguese student-athletes had SJL >2 h — [Thieme review](https://thieme-connect.com/products/ejournals/html/10.1055/s-0043-1777777); [Colombian students PMC12641817](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12641817/)
- Depner 2019 attributed part of the metabolic harm of weekend catch-up to social jet lag — [CU Boulder](https://www.colorado.edu/today/2019/02/28/catching-sleep-weekend-doesnt-work)

### Inferences
- **Implementation from a daily log** (a student has no fixed workweek, so the app needs a rule for which days count as "work" and which as "free"):
  1. Label each night "constrained" (an alarm or class/exam/work next morning) or "free" (no alarm). This is better than a weekday/weekend split.
  2. MSW = circular mean of mid-sleep on constrained nights; MSF = circular mean on free nights.
  3. SJL = |MSF − MSW|, taking the shorter arc.
  4. Compute over ≥14 days with ≥2 free nights.
- **Bands (proposal):** <1 h ok; 1-2 h moderate (warn); ≥2 h high.
- **Chronotype:** MSFsc = MSF − (SD_F − SD_week)/2 when SD_F > SD_W, using only alarm-free free days. Display it as a clock time; later values mean a later chronotype. Use it to suggest a target sleep window, e.g. centered on MSFsc but moved earlier for class days.
- Using the sleep-corrected SJL variant (Jankowski 2017) avoids inflating SJL purely by oversleeping on free days. Consider it as an option.

### Gaps
- No primary-source verification of the "+33% obesity odds per hour SJL" figure or of the 63.7% student prevalence.
- The exact Jankowski 2017 sleep-corrected SJL formula was not retrieved.
- Population chronotype norms (MSFsc distribution) for 18-25 year-olds were not retrieved in this search.

## 4. Caffeine cut-off before bed

### Takeaway
Gardiner et al. 2023 (24 studies) found caffeine reduces total sleep time by about 45 min and deep sleep by about 11 min. To avoid TST loss, a standard coffee (~107 mg) should be taken ≥8.8 h before bed and a pre-workout serve (~217.5 mg) ≥13.2 h before; regular tea showed no cut-off. Drake 2013 showed 400 mg even 6 h before bed cut sleep by more than 1 h. A practical rule for a student who sleeps around 00:00 is: no coffee after about 14:30-15:00 and no pre-workout after about 11:00. Shift the cut-off with bedtime, and add margin for slow metabolizers such as oral-contraceptive users.

### Cited Findings
- Gardiner et al. 2023 (*Sleep Med Rev* 69:101764) pooled 24 studies. Caffeine reduced:
  - total sleep time by about 45 min and sleep efficiency by about 7%
  - deep sleep (N3/N4) by about 11.4 min (−1.4 percentage points)

  It increased:
  - sleep onset latency by about 9 min and WASO by about 12 min
  - light sleep (N1) by about 6.1 min (+1.7 percentage points)

  [EM-Consulte abstract](https://em-consulte.com/article/1592377/the-effect-of-caffeine-on-subsequent-sleep-a-syste); [Leeds Beckett eprint](https://eprints.leedsbeckett.ac.uk/id/eprint/9625)
- Gardiner 2023 cut-offs: coffee (107 mg/250 mL) ≥8.8 h before bedtime and a standard pre-workout serve (217.5 mg) ≥13.2 h before bedtime to avoid TST reductions — [Leeds Beckett eprint](https://eprints.leedsbeckett.ac.uk/id/eprint/9625); [AJMC](https://www.ajmc.com/view/caffeine-and-sleep-review-suggests-consumption-guidelines)
- Timing moderator: the TST difference versus control shrank by about 2.8 min for each additional hour between caffeine and bedtime. No cut-off time was identified for a cup of black tea (about 47 mg/250 mL in Gardiner's thesis, which says tea could be consumed up to bedtime). These details come from news and thesis summaries, not the article itself — [Pharmacy Times](https://www.pharmacytimes.com/view/study-coffee-consumption-should-occur-9-hours-before-sleep-reducing-disturbances); [ACU thesis record](https://acuresearchbank.acu.edu.au/item/9106w/investigating-the-effects-of-psychoactive-substances-on-subsequent-sleep)
- Drake et al. 2013 (*J Clin Sleep Med*) gave 400 mg caffeine 0, 3 or 6 h before habitual bedtime versus placebo in 12 healthy normal sleepers, in a crossover design measured at home. Even at 6 h, objective TST fell by more than 1 h, and participants largely did not notice. The authors support avoiding substantial caffeine for at least 6 h before bed — [PMC3805807](https://pmc.ncbi.nlm.nih.gov/articles/PMC3805807); [AASM release](https://aasm.org/late-afternoon-and-early-evening-caffeine-can-disrupt-sleep-at-night/)
- A later dose study (100 vs 400 mg) found significant delays in sleep initiation and altered sleep architecture when 400 mg was taken within 12 h of bedtime — [PMC11985402](https://pmc.ncbi.nlm.nih.gov/articles/PMC11985402/)
- Caffeine half-life:
  - Mean plasma half-life is about 5 h in healthy adults, with a range of about 1.5-9.5 h. Variation comes from pregnancy, obesity, oral contraceptives, smoking and altitude — [NCBI Bookshelf NBK223808](https://www.ncbi.nlm.nih.gov/books/NBK223808/)
  - Oral-contraceptive users had a mean half-life of 7.88 h vs 5.37 h in controls (small 1985 study) — [PubMed 4029248](https://pubmed.ncbi.nlm.nih.gov/4029248/)
  - Metabolism is mainly via CYP1A2. Excluding smokers and OC users, about 89% of the variation in caffeine AUC is genetic (Grzegorzewski et al. 2022 systematic review, 141 publications) — [Frontiers in Pharmacology 2021/2022](https://www.frontiersin.org/articles/10.3389/fphar.2021.752826)

### Inferences
- **Practical rule (proposal):**
  - `cutoff_time = target_bedtime − H`, where H = 9 h for coffee or an energy drink up to about 110-160 mg, H = 13 h for pre-workout or ≥200 mg in one dose, and no cut-off for one regular tea (≤~50 mg). Gardiner's 8.8 h is rounded up to 9 h.
  - Add +2 h if the user takes oral contraceptives or reports caffeine sensitivity.
  - As a floor, never take any substantial dose (≥200 mg) within 6 h of bed (Drake).
  - The cut-off uses the planned bedtime for that night, so on early-class nights it moves earlier.
- **A simple pharmacokinetic aid:** estimate residual caffeine at bedtime as C_bed = Σ dose_k · 0.5^((t_bed − t_k)/t½), with default t½ = 5 h. Warn if C_bed exceeds about 50 mg. This threshold is an inference that roughly matches a 107 mg coffee about 5 h before bed. Gardiner's cut-off implies stricter timing than PK alone, so the time-based rule should be primary and the PK estimate secondary.
- For a student going to bed at about 00:00-01:00: last coffee at about 15:00-16:00 and last pre-workout at about 11:00-12:00. For late training, suggest caffeine-free pre-workout.

### Gaps
- The Gardiner 2023 full text (moderator regression coefficients for dose in min/mg, sensitivity analyses) could not be extracted (PDF unreadable, PubMed blocked). The 2.8 min/h figure comes from secondary coverage.
- I found no direct evidence on caffeine cut-offs specific to 18-25 year-olds or to habitual high consumers (tolerance).
- No precise smoking effect size on half-life was retrieved. Smoking is known to shorten it.
