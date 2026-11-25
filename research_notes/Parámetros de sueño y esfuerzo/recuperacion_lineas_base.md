# Personal baselines and readiness/recovery signals from Apple Watch overnight metrics (RHR, HRV-SDNN, respiratory rate, wrist temperature, SpO2)

Research date: 2026-11-25. Context: Apple Watch Series 10, data via Apple Health; healthy, active university student (18-25) in Spain.
Note on sourcing: some PMC pages returned a bot-check screen and could not be read in full. Figures marked "(secondary)" come from abstracts, search snippets or press coverage, not the full paper. Programmable rules in the "Inferences" subsections are design proposals derived from the cited findings. They are not validated algorithms.

---

## 1. HRV: how Apple Watch measures SDNN, how reliable it is, and how to adapt the lnRMSSD rolling-average method

### Takeaway
Apple Health stores HRV as SDNN from short, opportunistic readings (plus every Breathe/Mindfulness session), not from a continuous overnight recording. Validation against chest straps shows reasonable agreement but a systematic underestimate (about 8 ms in Series 9/Ultra 2). Use it for trends, not for absolute values. The research method from Plews, Buchheit and the AIS (7-day rolling mean of log-HRV compared with an individual normal range of about ±0.5 SD or a CV-based smallest worthwhile change) can be applied to ln(SDNN), as long as you control the timing of the readings.

### Cited Findings
- Apple computes HRV as "the standard deviation of these beat-to-beat intervals measured by the heart rate sensor (also known as SDNN)" — [iMore, HRV and Apple Watch](https://www.imore.com/heart-rate-variability-hrv-what-it-and-why-does-apple-watch-track-it)
- Apple Watch writes HRV (SDNN) to Health opportunistically "from time to time" with unclear criteria. Each Breathe session reliably produces one reading — [Marco Altini, Substack, 22 Feb 2023](https://marcoaltini.substack.com/p/apple-watch-and-heart-rate-variability); [iMore, how to measure HRV](https://www.imore.com/how-measure-heart-rate-variability-hrv-your-apple-watch)
- Altini (2023): there is "no validation of the Apple Watch's automatically collected data", but the watch "is accurate when manually triggering a measurement". In his own test, Apple Watch peak-to-peak intervals against Polar RR (2 min rest + 2 min deep breathing) showed an "almost perfect correlation" (no statistic given). Sporadic overnight readings are confounded by circadian rhythm and sleep stage. His recommendation is a 1-2 min reading on waking (sitting, after the bathroom, before coffee or exercise), analysed as rMSSD with HRV4Training — [Altini, Substack](https://marcoaltini.substack.com/p/apple-watch-and-heart-rate-variability)
- Series 9 / Ultra 2 compared with Polar H10 + Kubios (2024 prospective cohort): Apple Watch underestimated HRV by a mean of about 8.31 ms. Resting HR was "relatively accurate". The sample was small, young and healthy (secondary; the figure came from the reviewer-report page) — [Sensors 2024, 24(19):6220](https://www.mdpi.com/1424-8220/24/19/6220); [PMC11478500](https://pmc.ncbi.nlm.nih.gov/articles/PMC11478500/)
- Hernando et al. 2018 (Apple Watch vs Polar H7, relaxation vs mental stress): the watch showed gaps where no beats were detected during the stress stage. An earlier small study reported about 90% concordance with the Polar H7 in 20 volunteers (secondary) — [Sensors 2018, PMC6111985](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6111985/)
- A 2025 study compared Series 6 against a Biopac 3-lead ECG in 78 healthy adults. Results were not retrieved — [Sensors 2025, 25(8):2380](https://www.mdpi.com/1424-8220/25/8/2380)
- An umbrella review cited in the 2024 paper reports that fewer than 5% of consumer wearables have formal validation for the biometrics they capture (secondary) — [Sensors 2024](https://www.mdpi.com/1424-8220/24/19/6220)
- Vitals app (support page dated 17 Sep 2026): HRV is an overnight Vitals metric only on Series 12 and Ultra 4, where it replaces sleep duration. Daytime RHR/HRV vitals and a "readiness score" exist only on those models. **On a Series 10, Vitals shows sleep duration instead of HRV**, although SDNN samples are still written to Health — [Apple Support 120142](https://support.apple.com/en-gb/120142); [Apple Watch User Guide: Vitals](https://support.apple.com/en-gb/guide/watch/apd15aa7ed96)
- Buchheit 2014: the day-to-day CV of Ln rMSSD is about 10-20% (about 12% for short field recordings). The SWC for HR-derived variables is set at 0.5×CV (or 1×CV) of the individual's own CV, which Buchheit prefers over 0.2×between-subject SD. The approximate SWC for a positive adaptation in resting vagal HRV is about +3%. Averaging at least 3-4 days was needed before HRV correlated with performance (4 tests roughly halve the noise). Record at least 3-4 mornings per week. Intense exercise lowers vagal HRV for 24-48 h — [Buchheit 2014, Front Physiol 5:73](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)
- Buchheit 2014, "parasympathetic saturation": a lower rMSSD together with a low HR (RR above about 1000 ms) and a falling Ln rMSSD/RR ratio reflects high vagal tone, not fatigue. A lower rMSSD together with a higher HR points to sympathetic fatigue. This is why HRV should always be read together with RHR — [Buchheit 2014](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)
- Buchheit 2014 on night versus morning: night recordings are theoretically the most standardized but are confounded by sleep stage. The recommended practice is 5-10 min on waking — [Buchheit 2014](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)
- Plews et al. used a 7-day rolling average of lnRMSSD compared with an individual SWC (thesis supervised in the Buchheit group) — [AUT repository, Plews thesis](https://openrepository.aut.ac.nz/handle/10292/7122). Validity is better with the 7-day rolling average than with single-day values — [PMC5721172](https://pmc.ncbi.nlm.nih.gov/articles/PMC5721172/)
- The SWC "normal band" of baseline ±0.5 SD is attributed to Plews et al. 2012 in a secondary source (a Spanish undergraduate thesis, not the original) — [UMH TFG](https://dspace.umh.es/jspui/bitstream/11000/27132/1/TFG-Carrillo%20de%20Le%c3%b3n%2c%20Alejandro.pdf)
- The Australian Institute of Sport HRV best-practice guide recommends lnRMSSD and assessing 7-day rolling averages against SWCs (snippet only; the PDF link returned 404 on fetch) — [AIS HRV best practice guide](https://www.ais.gov.au/__data/assets/pdf_file/0013/1130260/HRV-BPG_FINAL.pdf)
- A 2022 study used an SWC of about 0.2 SD for weekly lnRMSSD changes and found substantial disagreement between two devices. SWC conventions depend on the method and the device — [Sports Engineering 2022](https://link.springer.com/10.1007/s12283-022-00371-8)
- The CV of lnRMSSD has been reported to change (decrease) as athletes move toward non-functional overreaching (secondary citation of Buchheit/Plews) — [Front Physiol 2015, PMC4652221](https://pmc.ncbi.nlm.nih.gov/articles/PMC4652221)
- Garmin HRV Status: needs about 3 weeks of overnight data before a baseline range is shown. Status uses the 7-day average: "Balanced" if inside the baseline range, "Unbalanced" if above or below it, "Low" if well below it — [Garmin manual, HRV Status](https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html); [Tom's Guide](https://www.tomsguide.com/how-to/how-to-use-the-hrv-status-feature-on-your-garmin-watch). An independent reviewer reports that the weekly trend is reliable but single nights are not — [the5krunner](https://the5krunner.com/garmin-features/physiology/hrv-status/)

### Inferences
- **Recommended HRV signal for this device (programmable):**
  1. Daily value: `hrv_day = ln(mean(SDNN samples))`. Use only samples between sleep onset and wake time from Apple sleep analysis, or, better, one Breathe/Mindfulness session of at least 1 min done each morning on waking in the same posture. If the user does a morning Breathe session, give it priority over overnight spot samples. Do not mix sources inside one baseline.
  2. Require at least 1 valid sample per night (ideally 2 or more). Mark the day as missing otherwise. Do not impute.
  3. Short-term signal: `hrv7 = mean(hrv_day over the last 7 days)`, requiring at least 4 valid days (from Buchheit's "3-4 days" finding).
  4. Baseline: `base_mean, base_sd` over days −60…−8 (or −30…−8 while history is short), excluding the most recent 7 days so that a developing problem does not contaminate its own reference. Prefer a robust SD (MAD×1.4826) because spot readings have outliers.
  5. Normal range = `base_mean ± 0.5·base_sd` (Plews/Altini style). "Clearly low" = `hrv7 < base_mean − 1·base_sd`. Alternative CV-based SWC: `SWC = 0.5 × CV_individual` (Buchheit). The individual CV is computed on the daily ln values.
  6. Day-level z: `z_hrv = (hrv_day − base_mean)/base_sd`. Treat |z| < 0.5 as noise.
  7. Interpret a low HRV together with RHR. A low HRV with a high RHR suggests strain or illness. A low HRV with a low RHR may be saturation in a fit athlete and should not be penalised strongly.
- Use ln(SDNN) instead of raw SDNN because HRV distributions are right-skewed. Log-transforming makes SD-based ranges more symmetric; this is the same reason research uses lnRMSSD.
- Because Apple underestimates SDNN by a few ms compared with a chest strap and the readings are short, never compare the user's absolute values with population norms or with other devices. Compare only within the same device and the same timing. Reset the baseline after a watch change.
- SDNN over about 1 min reflects both vagal and some sympathetic or respiratory influence. It tracks rMSSD reasonably well at rest, but readings taken during REM versus deep sleep will differ. This is the main reason to standardise the reading time or average several samples.

### Gaps
- I found no official Apple documentation giving the exact background SDNN sampling schedule (how often, how long each reading is, whether watchOS 10/11/26/27 sample more during sleep). Altini (2023) and iMore say the criteria are unclear. The commonly cited "about 1 min reading, a few times a day" could not be confirmed in this session.
- I could not read the full text of the 2024 Series 9/Ultra 2 validation (PMC bot check), so its limits of agreement, CCC and MAPE are missing.
- I found no published validation of Apple's *overnight* SDNN against overnight ECG.
- I could not verify directly from the original paper the exact 0.5 SD band from Plews 2012/2013 or the Flatt/Kiviniemi thresholds. Kiviniemi's HRV-guided training studies (a reference value ±SD, e.g. a 10-day baseline) were not fetched.

---

## 2. Resting heart rate: day-to-day variability and meaningful elevations (fatigue, illness, alcohol, sleep)

### Takeaway
Resting HR is a stable, accurately measured signal on Apple Watch. Within-person noise is small (Buchheit's typical error is about 10% for HR indices in general, with an SWC of about 2%). Illness-detection studies flag deviations from a personal baseline over a 28-day sliding window, usually at 2 SD or more. A pragmatic rule is to flag RHR (7-day or daily) when it is ≥ +1 SD above baseline or, when the SD is very small, at least +3 bpm. Treat ≥ +2 SD or ≥ +5 bpm on two or more consecutive nights as a possible illness signal.

### Cited Findings
- Apple Watch resting HR was "relatively accurate" against Polar H10 in Series 9/Ultra 2 (secondary) — [Sensors 2024](https://www.mdpi.com/1424-8220/24/19/6220)
- Buchheit 2014 Table 1: resting HR typical error is about 10%, and the SWC for a positive adaptation is about −2%. Resting HR correlated r = 0.81 with non-functional overreaching (vagal HRV r = 0.88). No bpm magnitudes are given for overreaching — [Buchheit 2014](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)
- Mishra et al. 2020 (Nature Biomedical Engineering 4:1208-1220): 32 COVID-positive people out of about 5,300 participants. 26 (81%) showed changes in HR, steps or sleep. 63% of cases could have been detected pre-symptomatically in real time with a two-tier alert based on "extreme" RHR elevations. The baseline was a healthy reference from a 28-day sliding window. Algorithm: residuals of RHR computed by Mahalanobis/CuSum on a 28-day window (secondary) — [Nature BME](https://www.nature.com/articles/s41551-020-00640-6); [Stanford news, Dec 2020](https://med.stanford.edu/news/all-news/2020/12/smartwatch-can-detect-early-signs-of-illness.html)
- Mishra: false alerts can come from long air travel, menstrual cycles, high altitude and medication. The alerts cannot distinguish COVID from other infections — [Stanford news](https://med.stanford.edu/news/all-news/2020/12/smartwatch-can-detect-early-signs-of-illness.html)
- Quer et al. 2021 (Nature Medicine 27:73-77, DETECT): only 30.3% of positive cases showed an RHR change of more than 2 SD from baseline. AUCs: sleep metric 0.68, activity 0.69, combined RHR+sleep+activity 0.72, sensors+symptoms 0.80 (0.73-0.86) vs symptoms alone 0.71 (secondary) — [Scripps DETECT news](https://www.scripps.edu/news-events/news/20201029-topol-radin-quer-detect/); [medRxiv preprint](https://medrxiv.org/content/10.1101/2020.07.06.20141333.full.pdf); [MobiHealthNews](https://mobihealthnews.com/news/pairing-wearables-data-self-reported-symptoms-could-improve-covid-19-prediction)
- Replication caveat: Cleary et al. (medRxiv 2021) found that much of the discriminative power disappeared once data recorded after the test result were removed, which suggests behaviour change rather than physiology — [medRxiv 2021.04.17.21255513](https://www.medrxiv.org/content/10.1101/2021.04.17.21255513v1.full.pdf)
- Oura's readiness asks whether RHR was "substantially higher or lower than usual". A below-average RHR is a recovery signal. A "Recovery Index" captures how long RHR takes to stabilise during the night — [Oura readiness score](https://ouraring.com/blog/readiness-score/)
- The Vitals app lists alcohol intake, illness, medications and elevation as possible factors when metrics are out of range — [Apple Support 120142](https://support.apple.com/en-gb/120142)

### Inferences
- **Recommended RHR rule (programmable):** Use an overnight measure, for example the mean or lowest 5-min HR during sleep, or Apple's daily Resting Heart Rate sample. Choose one and keep it. Baseline mean and SD over days −60…−8 (−28…−8 minimum, matching Mishra's 28-day window). `z_rhr = (rhr_today − base_mean)/base_sd`, with the sign inverted for scoring (higher RHR = worse).
  - Noise: |z| < 1 or |Δ| < 2 bpm.
  - "Elevated": z ≥ 1 **and** Δ ≥ +3 bpm.
  - "Strongly elevated / possible illness": z ≥ 2 or Δ ≥ +5 bpm on ≥ 2 consecutive nights, especially together with high respiratory rate or temperature.
  - The ±3/±5 bpm values are pragmatic heuristics for a fit young adult (RHR often about 45-60 bpm, so 2% ≈ 1 bpm SWC, 10% ≈ 5 bpm). They are consistent with Buchheit's percentages but are not taken from a single paper.
- Studies show that RHR alone misses most infections (only about 30% exceed 2 SD in DETECT). The value comes from combining metrics, which also matches Apple's "2+ metrics" logic.
- An expected acute RHR rise the night after alcohol or a late hard session should be shown as a likely cause, not as illness. Ask the user to tag alcohol, late training, travel and illness so confounded days can be excluded from the baseline.

### Gaps
- I could not retrieve Mishra's exact numeric alert thresholds (the SD level for "red" and "yellow" alerts) or the 2-4 bpm elevations sometimes quoted. Only secondary descriptions were accessed.
- Radin et al. 2020 (Lancet Digital Health, Fitbit RHR and sleep for influenza-like-illness surveillance) was not fetched in this session. I have no verified numbers from it.
- I found no peer-reviewed source in this session quantifying the RHR rise after alcohol (e.g. +x bpm per drink) measured by Apple Watch.

---

## 3. Respiratory rate during sleep: normal range, stability, meaningful deviations

### Takeaway
Nightly sleeping respiratory rate is one of the most stable wearable metrics within a person. Miller et al. (WHOOP) built a COVID risk model on it because of its low night-to-night variation. A rise of about 1 or more breaths/min sustained over two or more nights, especially with RHR or temperature elevation, is a reasonable illness flag. Small single-night deviations are not.

### Cited Findings
- Miller et al. 2020 (PLOS ONE, Dec 2020; medRxiv June 2020): nightly respiratory rate = median breaths/min during the main sleep period (WHOOP). It was chosen because of low inter-night variation, analysed in 25,000 members / 750,000 nights (Nov 2019). The model identified 20% of COVID-positive people in the 2 days before symptom onset and 80% by day 3 of symptoms. Several authors were WHOOP employees or shareholders (conflict of interest) — [PLOS ONE via PMC7728254](https://pmc.ncbi.nlm.nih.gov/articles/PMC7728254); [medRxiv preprint](https://medrxiv.org/content/10.1101/2020.06.18.20131417v1.full.pdf)
- The same authors noted that no longitudinal PubMed studies at the time reported the variability of nightly respiratory rate in healthy adults — [medRxiv preprint](https://medrxiv.org/content/10.1101/2020.06.18.20131417v1.full.pdf)
- Respiratory rate is one of Apple's overnight Vitals metrics, with a personal typical range established after 7 nights — [Apple Support 120142](https://support.apple.com/en-gb/120142)
- WHOOP's 101 article lists respiratory rate as an input to Recovery, added after the original HRV/RHR/sleep model — [WHOOP: How does WHOOP Recovery work](https://whoop.com/thelocker/how-does-whoop-recovery-work-101)

### Inferences
- **Recommended RR rule (programmable):** daily value = mean of Apple's respiratoryRate samples during sleep. Baseline mean/SD over days −60…−8. `z_rr = (rr_today − base_mean)/base_sd`.
  - Noise: |Δ| < 1 br/min or |z| < 1.
  - Flag "elevated": Δ ≥ +1 br/min and z ≥ 1.5.
  - Flag "strongly elevated": Δ ≥ +2 br/min, or z ≥ 2 on ≥ 2 consecutive nights.
  - Penalise only increases. Small decreases are not "better recovery".
- Typical adult sleeping RR is roughly 12-20 br/min, and wearables in healthy adults commonly report about 13-17. This range is general physiology knowledge, not verified with a source in this session, so treat it only as a sanity-check bound (e.g. discard nights with values < 8 or > 30 as artifacts).

### Gaps
- I did not retrieve the actual night-to-night SD or CV figures from Miller et al. (often quoted as about 1 br/min or less), nor any validation of Apple Watch's sleeping respiratory rate against polysomnography or capnography.
- I found no Apple documentation of how respiratory rate is derived (accelerometer vs PPG) or of its accuracy.

---

## 4. Wrist temperature (Series 8+): Apple's reporting, baseline period, variability, meaningful deviations, confounders

### Takeaway
Apple reports only the nightly deviation from a personal baseline that it sets after about 5 nights. The absolute temperature is not shown. Sampling happens every 5 s during sleep with two sensors. Wrist skin temperature is strongly confounded by the menstrual cycle (luteal rise of about 0.2-0.5 °C), alcohol, room temperature, bedding and fit. A deviation of about +0.5 °C or more is a reasonable flag. About +1 °C or more, especially with high RHR or RR, suggests fever or illness. In people who menstruate, interpret this together with the cycle phase.

### Cited Findings
- Supported models: Series 8 or later, all Ultra models, and SE 3. Requires Track Sleep with Apple Watch and Sleep Focus for at least 4 h/night. Baseline after "about 5 nights", with "Needs More Data" shown until then. Re-baseline (about 5 nights) after switching watches. For users aged 14 or older — [Apple Support 102674](https://support.apple.com/en-gb/102674)
- Two sensors (back crystal and under the display) sample every 5 s while asleep, with algorithms combining them into one aggregate value per night. Apple says this design reduces environmental bias. Values are shown as relative change from baseline (Health → Body Measurements → Wrist Temperature) — [Apple Support 102674](https://support.apple.com/en-gb/102674)
- Listed confounders: diet, exercise, alcohol, sleep environment, menstrual cycle, illness, a loose fit. Apple says it is "not a thermometer", cannot take on-demand readings and is not a medical device. No accuracy figures or thresholds are published — [Apple Support 102674](https://support.apple.com/en-gb/102674)
- Press note: Apple shows no absolute value, only the variation from the baseline — [TechRadar](https://techradar.com/opinion/i-wore-my-apple-watch-8-for-a-week-and-still-dont-know-my-temperature); [MacRumors, Sep 2022](https://www.macrumors.com/2022/09/16/apple-watch-series-8-five-nights-temperature/)
- Apple/Harvard/NIEHS (Human Reproduction, March 2025): a wrist-temperature algorithm estimated ovulation in 80.8% of completed cycles with a wrist-temperature signal of at least 0.2 °C, with an MAE of 1.22 days. This indicates the cycle-related shift is roughly 0.2 °C or more (secondary) — [Harvard Apple Women's Health Study publications](https://hsph.harvard.edu/research/apple-womens-health-study/publications); [Nature Index entry, Hum Reprod deaf005](https://www.nature.com/nature-index/article/10.1093/humrep%2Fdeaf005)
- Wrist skin temperature across the cycle is better modelled as an oscillation (cosinor) than as a biphasic square wave. Algorithms may need to account for increased variance in nightly wrist skin temperature (npj Women's Health 2024) — [DOAJ npj Women's Health, Oct 2024](https://doaj.org/article/99ea373d8cdc4ac0874160122cfc663b)
- Shilaih et al. 2018 (Ava bracelet): cycle-related wrist skin temperature changes were not disrupted by alcohol, sex or late eating before bed (in that study) — [PubMed 29175999](https://pubmed.ncbi.nlm.nih.gov/29175999/)
- Oura: temperature readings "significantly above or below your normal range" lower the readiness score — [Oura readiness score](https://ouraring.com/blog/readiness-score/)

### Inferences
- **Recommended temperature rule (programmable):** use Apple's nightly deviation value (HealthKit sleeping wrist temperature) directly as `dT`. Apple's baseline is internal. You can also compute your own SD of `dT` over the last 30-60 nights.
  - Noise: |dT| < 0.3 °C.
  - Notable: dT ≥ +0.5 °C (or z ≥ 2 using your own SD).
  - Strong / possible fever: dT ≥ +1.0 °C, or ≥ +0.5 °C on ≥ 2 consecutive nights together with an RHR or RR flag.
  - Penalise mainly positive deviations. Flag large negative deviations (≤ −1 °C) as probable artifacts (cold room, loose fit, arm out of the bedding) rather than as poor recovery.
- If the user menstruates, take the cycle phase from Cycle Tracking and either raise the temperature threshold during the luteal phase (about +0.3 °C) or down-weight temperature in that phase. For a male user this confounder does not apply.
- These thresholds (0.3/0.5/1.0 °C) are heuristics. Apple publishes none, and I found no peer-reviewed number for typical nightly SD on Apple Watch. Calibrate them against the user's own SD after about 30 nights.

### Gaps
- No source found for the night-to-night SD of Apple wrist-temperature deviation in healthy users, nor for an Apple-validated fever threshold.
- I found no study quantifying the effect of alcohol or room temperature on Apple Watch wrist temperature specifically. Apple lists them as factors but gives no magnitude.

---

## 5. Blood oxygen during sleep: reliability, availability in Spain/EU (2026), thresholds

### Takeaway
A Series 10 bought in Spain or the EU keeps Apple's original on-watch Blood Oxygen feature and Vitals integration. The US Masimo import-ban changes (Jan 2024) and the August 2025 "redesigned" iPhone-computed version affect only US units with part numbers ending in LW/A or LS/A. Accuracy at rest in healthy people shows small mean bias but large outliers, and the watch overestimates SpO2 under hypoxia. Sleep-specific validation is lacking. SpO2 should therefore not carry weight in a recovery score. At most, use it as an informational flag for sustained low nightly values.

### Cited Findings
- Blood Oxygen is not shown in Vitals for US-purchased models from 18 Jan 2024 with part numbers ending in LW/A or LS/A. On those units it is analysed on iPhone and shown in Health. Not available on SE or Apple Watch for Kids — [Apple Support 120142](https://support.apple.com/en-gb/120142); [Apple Watch User Guide: Vitals](https://support.apple.com/en-gb/guide/watch/apd15aa7ed96)
- August 2025: Apple launched a redesigned Blood Oxygen feature in the US (iOS 18.6.1 / watchOS 11.6.1, Series 9, Series 10, Ultra 2). Sensor data is computed on the paired iPhone and the results appear in Health → Respiratory. Units bought outside the US never lost the original feature — [MacRumors, 14 Aug 2025](https://www.macrumors.com/2025/08/14/blood-oxygen-monitoring-returning-to-apple-watch/); [TechCrunch, 14 Aug 2025](https://techcrunch.com/2025/08/14/apples-blood-oxygen-monitoring-returns-to-its-latest-apple-watches); [Engadget](https://www.engadget.com/wearables/apples-redesigned-blood-oxygen-monitoring-feature-hits-apple-watches-in-the-us-today-131558485.html)
- Systematic review (2023): Apple Watch Series 6 shows no strong systematic bias compared with medical-grade pulse oximeters, but outliers of up to 15% SpO2 were reported. The effect of skin tone needs study — [PMC10039641](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10039641/)
- PLOS Digital Health 2023: Series 6 can reliably detect SpO2 < 90% compared with a medical-grade oximeter. In healthy people at rest, readings outside 95-100% were fairly common (secondary) — [PMC10337940](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337940)
- JMIR Formative Research 2026: Series 7 compared with a Masimo oximeter during induced hypoxia. Both overestimated SpO2, with accuracy falling during hypoxemia. The watch's bias implies it may miss hypoxemia close to 88% SaO2. Fast desaturation barely changed the error (−0.28%) (secondary) — [JMIR Form Res 2026, e85253](https://formative.jmir.org/2026/1/e85253)

### Inferences
- **Recommended SpO2 rule:** exclude it from the weighted score. Show it as information only. If the nightly average is ≤ 92% on ≥ 2 nights **and** the user has no altitude explanation, show a neutral "consider checking" note, not a recovery penalty. Single readings < 90% are often motion or fit artifacts.
- Reasons not to weight it: in a healthy 18-25-year-old at sea level, SpO2 has almost no recovery-related variance (it sits around 95-99%), the device noise and outliers are of the same order as any real change, and sleep-specific validation is missing.
- Spain-specific: confirm the Series 10's model or part number. A unit bought in Spain will not end in LW/A or LS/A, so Blood Oxygen should appear in Vitals. If it does not, check Settings → Blood Oxygen and the Health app privacy settings.

### Gaps
- I found no Apple support page explicitly listing EU or Spain availability for 2026. The conclusion that it is available is inferred from Apple's US-only exclusion wording and press reports that non-US units were never affected.
- I found no validation of Apple Watch SpO2 *during sleep* against polysomnography.

---

## 6. How consumer platforms combine signals, Apple Vitals logic, and a recommended simple recovery score

### Takeaway
Apple Vitals builds a 7-night "typical range" per metric and, by default, notifies when 2 or more overnight metrics are outliers. Garmin uses a 7-day HRV average against a baseline learnt over about 3 weeks. Oura compares recent HRV (about 2 weeks) with a longer (about 3-month) average and penalises temperature deviations. WHOOP weights HRV most heavily alongside RHR, sleep and RR, and shows a provisional score after about 4 days. A transparent HRV-weighted z-score formula (HRV 40%, RHR 30%, RR 15%, temperature 15%, SpO2 excluded), with a minimum of 14 valid nights before display and a separate "2+ outliers" illness flag, fits this evidence.

### Cited Findings
- Apple Vitals: overnight metrics are heart rate, respiratory rate, blood oxygen, wrist temperature and sleep duration. HRV replaces sleep duration only on Series 12 and Ultra 4. Wear the watch to sleep for 7 days to establish the typical range. By default a notification is sent when at least two overnight metrics are outside their typical range, with possible factors (medications, elevation, alcohol, illness). The iPhone shows High, Typical and Low states. Not a medical device. Page dated 17 Sep 2026, covering watchOS 26/27 — [Apple Support 120142](https://support.apple.com/en-gb/120142); [Apple Watch User Guide: Vitals](https://support.apple.com/en-gb/guide/watch/apd15aa7ed96)
- Wareable (press): the feature is unchanged in watchOS 26 since its 2024 debut. Common causes of 2+ outliers are illness onset, alcohol, extreme stress and environmental or time-zone changes (press, not Apple) — [Wareable](https://www.wareable.com/apple/how-vitals-app-finally-makes-apple-watch-a-wellness-powerhouse)
- Garmin HRV Status: about 3 weeks of overnight data before a baseline. A 7-day average is classified as Balanced, Unbalanced or Low against the baseline range — [Garmin manual](https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html)
- Oura Readiness contributors: RHR vs usual, HRV Balance (recent HRV vs long-term average; patent text: e.g. 2 weeks vs 3 months), body temperature outside the normal range, recovery index, sleep balance (2 weeks), activity balance (2 weeks). Weights are not published — [Oura readiness score](https://ouraring.com/blog/readiness-score/); [Oura patent, USPTO 12471819](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12471819)
- WHOOP Recovery: inputs are HRV, RHR and sleep performance, with respiratory rate added later. The 101 article also mentions SpO2 and skin temperature. WHOOP's research lead says HRV carries most of the predictive value, with RHR and sleep adding less because they overlap with HRV. HRV/RHR are measured during sleep. A roughly 4-day calibration (score greyed out) comes first. Bands: green 67-100%, yellow 34-66%, red 0-33%. The formula is proprietary — [WHOOP 101](https://whoop.com/thelocker/how-does-whoop-recovery-work-101); [WHOOP Recovery: taking HRV to the next level](https://whoop.com/thelocker/whoop-recovery-taking-hrv-to-the-next-level); [WHOOP community](https://www.community.whoop.com/t/what-is-the-recovery-score-and-how-is-it-calculated/107)
- Combining sensor metrics improves illness discrimination over any single metric (DETECT: combined sensors AUC 0.72; with symptoms 0.80) (secondary) — [Scripps DETECT](https://www.scripps.edu/news-events/news/20201029-topol-radin-quer-detect/)
- Buchheit recommends combining HR measures with training logs and questionnaires, because HR alone cannot capture all aspects of fatigue — [Buchheit 2014](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)

### Inferences (recommended algorithm, design proposal)

**Data per night (from HealthKit):** sleep window (sleep analysis); SDNN samples within the window or the morning Breathe reading; sleeping HR or daily resting HR; respiratory rate samples during sleep; wrist-temperature deviation; SpO2 samples (info only); user tags (alcohol, illness, travel, late training, menstruation).

**Validity rules:** a night is valid if it has ≥ 4 h of sleep (matching Apple's Sleep Focus requirement for temperature) and at least one HRV sample plus an RHR and RR value. Exclude from *baselines* (but still score) nights tagged illness or travel, and the first 2 nights after a watch change.

**Baselines:** rolling mean and robust SD over days −60…−8 (minimum −28…−8 when history is short). Floor the SD to avoid tiny-SD blow-ups: `sd_eff = max(sd, floor)`, with floors HRV 0.05 ln-units, RHR 1.5 bpm, RR 0.4 br/min, temperature 0.15 °C (heuristic floors).

**Per-metric sub-scores (z, sign so that + = better):**
- `zH = (ln SDNN_7d_or_today − mean)/sd` (use the 7-day rolling mean for the trend card and today's value for the daily score)
- `zR = −(RHR_today − mean)/sd`
- `zB = −max(0, RR_today − mean)/sd` (penalty only)
- `zT = −max(0, dT_today)/sd_T` (penalty only; sd_T = own SD of the deviation, initially 0.3 °C)
- Clamp each z to [−3, +2] so that one outlier cannot dominate and "super-recovery" is capped.

**Composite:** `Z = 0.40·zH + 0.30·zR + 0.15·zB + 0.15·zT`. `Score = round(clamp(50 + 20·Z, 0, 100))`. On average this gives about 50 (inside the normal range), ≥ 67 when about +0.85 SD better than usual, and ≤ 33 when about −0.85 SD worse. This mirrors the WHOOP-like green/yellow/red bands with HRV weighted highest, as WHOOP describes. If a metric is missing, renormalise the remaining weights. If HRV is missing, show "low confidence".

**Bands:** ≥ 67 green ("ready"), 34-66 yellow ("normal / moderate"), ≤ 33 red ("prioritise recovery").

**Illness / "Vitals-style" flag (independent of the score):** count outliers among {RHR z ≥ 2 or +5 bpm, RR ≥ +2 br/min or z ≥ 2, dT ≥ +0.5 °C, HRV z ≤ −2}. If ≥ 2 outliers occur on the same night, or the same single outlier occurs on ≥ 2 consecutive nights, show "possible illness, alcohol, or poor sleep: check how you feel". This mirrors Apple's ≥ 2-metric rule.

**Minimum history before display:**
- Days 1-6: no score ("calibrating"), matching Apple Vitals' 7 nights and Apple's 5 nights for temperature.
- Days 7-13: provisional score with a "low confidence" label. Use the population-free fallback of mean ± max(SD, floor).
- **≥ 14 valid nights: show the full score.**
- ≥ 21-28 nights: enable the HRV 7-day trend vs baseline "normal range" card (Garmin needs about 3 weeks; Mishra uses a 28-day window).
- Baseline matures at 60 nights.

**Trend card (Plews-style):** plot the 7-day rolling ln(SDNN) against the band `base_mean ± 0.5·SD`. A value below the band for ≥ 3 consecutive days together with an RHR 7-day mean above `base + 0.5·SD` means "accumulated fatigue". Below the band with RHR at or below baseline means "possible saturation / ignore unless performance drops" (Buchheit).

**Caveats to show to users:** not a medical device (Apple). SDNN timing varies. Absolute HRV is device-specific and underestimated compared with a chest strap. Temperature is affected by the cycle, alcohol, room and fit. SpO2 is excluded from the score. Re-baseline after a new watch or a long gap.

### Gaps
- Oura and WHOOP do not publish weights. The 40/30/15/15 weights are an inference from WHOOP's statement that HRV dominates and from the illness-detection literature, which values RHR and RR. They are not an externally validated formula.
- I found no peer-reviewed study validating any composite "recovery score" from Apple Watch data against performance or illness outcomes.
- HealthKit type identifiers (e.g. heartRateVariabilitySDNN, restingHeartRate, respiratoryRate, appleSleepingWristTemperature, oxygenSaturation) come from Apple's developer documentation and were not re-verified in this session.
