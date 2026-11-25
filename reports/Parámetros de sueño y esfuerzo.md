# Convierte el Apple Watch en decisiones fiables

La app debe girar alrededor de cuatro números que el Apple Watch mide bien cada noche y que la ciencia sabe interpretar. El primero es el **tiempo total de sueño frente a una necesidad personal**, con 8,0 h por defecto y un rango ajustable de 7,0 a 9,5 h. El segundo es la **regularidad del horario** (SRI y desviación típica del punto medio del sueño). El tercero es el **pulso en reposo** y el cuarto la **frecuencia respiratoria nocturna**, ambos comparados con una línea base propia. Todo lo demás tiene que mostrarse como tendencia de 7 a 14 noches y nunca como veredicto de una noche suelta: fases, despertares, VFC/SDNN, temperatura de muñeca y SpO2. El motivo es medible. Frente a polisomnografía, el reloj acierta el sueño total con un sesgo de unos +8 a +20 min, pero **infravalora el sueño profundo en 25 a 43 min** y sus límites de acuerdo por fase rondan ±60 a 100 min por noche. Las fuentes dan umbrales sólidos para la duración (NSF/AASM), la calidad (consenso NSF 2017), la recuperación tras deuda de sueño (Banks, Kitamura, Van Dongen), la cafeína (Gardiner 2023: café ≥8,8 h antes de dormir) y las siestas (10 a 20 min, Brooks & Lack). En cambio, la deuda ponderada a 14 noches, la puntuación de recuperación, el objetivo diario de carga y la detección de ciclos son reglas de ingeniería: están razonadas, pero ninguna está validada. El ACWR (carga aguda/crónica) solo es defendible como indicador descriptivo del ritmo de progresión, porque el Instituto Australiano del Deporte desaconseja usarlo para predecir lesiones. Hay además tres restricciones técnicas que condicionan el diseño. Apple no expone el Sleep Score por API. HealthKit no escribe fases para sesiones de 1 a 3 h. Y no está confirmado que Atajos pueda leer la puntuación de esfuerzo, así que la app tiene que pedir el RPE ella misma.

**Convención del informe.** Cada valor lleva una de estas dos etiquetas. **[F]** indica que el valor o el umbral sale directamente de una fuente citada. **[H]** indica una heurística, es decir, una regla propuesta a partir de las fuentes pero no validada; conviene calibrarla con los datos del propio usuario. Las heurísticas se pueden ajustar. Los valores [F] solo deberían cambiarse si aparece evidencia nueva.

## Ocho horas por defecto, siete como suelo y un 85 % de eficiencia como listón

Para un adulto de 18 a 25 años, la National Sleep Foundation recomienda **7 a 9 h**. Considera "posiblemente apropiadas" **6 h y 10 a 11 h** y desaconseja **menos de 6 h o más de 11 h** [F] ([NSF 2015, PubMed 29073412](https://pubmed.ncbi.nlm.nih.gov/29073412/)). El consenso AASM/SRS fija **7 h o más** como suelo para la salud. Añade que más de 9 h puede ser apropiado en adultos jóvenes o en quienes recuperan deuda [F] ([Watson et al. 2015, PMC4434546](https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/)). El mejor estudio de laboratorio para fijar el valor por defecto es el de Kitamura et al. (2016). En 15 hombres de 20 a 26 años con 12 h de oportunidad de sueño durante 9 noches, la duración óptima asintótica fue **8,41 h, con un rango de 7,29 a 9,26 h**, frente a un sueño habitual de 7,37 h. Eso implica una deuda "potencial" de **~1 h**. La primera noche de extensión durmieron 10,59 h por efecto rebote, y el sueño no se estabilizó hasta la cuarta noche [F] ([Kitamura et al. 2016, PMC5075948](https://pmc.ncbi.nlm.nih.gov/articles/PMC5075948/)). Encaja con Van Dongen et al. (2003): los lapsos de atención crecían con la vigilia acumulada por encima de **15,84 h/día**, lo que equivale a una necesidad de ~8,2 h [F] ([PubMed 12683469](https://pubmed.ncbi.nlm.nih.gov/12683469/)).

**Algoritmo de necesidad personal [H].** Se arranca en `need = 8,0 h`; también es defendible 8,25 h, dada la media de Kitamura. Para personalizarla se usan solo noches "libres", sin alarma y sin hora de despertar forzada. Se descartan las 1 o 2 primeras noches libres que siguen a una racha de noches cortas, y cualquier noche que supere en más de 1,5 h la media de 14 días, porque son rebote y no necesidad. Con al menos **3 a 4 semanas** de datos, la necesidad pasa a ser la **mediana del TST de las noches libres restantes**, acotada a **7,0 a 9,5 h** y con un cambio máximo de **±15 min por semana**. Una variante más fiel a Kitamura es un "modo vacaciones": con 7 o más días seguidos sin restricciones, se promedia el TST desde el día 4. El TST del reloj sobreestima ligeramente (+8 a +20 min), así que la necesidad estimada con el reloj es coherente consigo misma pero puede quedar 10 a 20 min por encima de la que daría una polisomnografía. Para la comparación diaria no importa, porque el sesgo afecta por igual a la necesidad y al sueño medido.

### Calidad nocturna: los umbrales NSF 2017 necesitan corrección para el reloj

El consenso de la NSF sobre calidad del sueño (Ohayon et al. 2017) revisó 277 estudios y define cortes específicos para "adulto joven" (18 a 25 años) [F] ([texto completo, eScholarship](https://escholarship.org/content/qt9xc5x5h2/qt9xc5x5h2.pdf); [PubMed 28346153](https://pubmed.ncbi.nlm.nih.gov/28346153/)):

| Indicador (definido por polisomnografía) | Buena calidad | Zona incierta | Mala calidad | Origen |
|---|---|---|---|---|
| Latencia de sueño | ≤30 min | 31–45 min | >45 min | [F] |
| Despertares >5 min | ≤1 | 2–3 (inferido) | ≥4 | [F] |
| WASO (vigilia tras inicio del sueño) | ≤20 min | 21–40 min | ≥41 min | [F] |
| Eficiencia del sueño | ≥85 % | 65–84 % | ≤64 % | [F] |
| Siestas | 0 por día | — | ≥3 en 24 h o una >100 min | [F] |

Los cortes están definidos frente a polisomnografía, y el reloj tiende a hacer que las noches parezcan mejores de lo que son. Schyvens et al. (2025) midieron en el Series 8 un sesgo de **WASO de −21,2 min** y de **eficiencia de +4,4 puntos** [F] ([Schyvens et al. 2025, SLEEP Advances](https://academic.oup.com/sleepadvances/article/6/2/zpaf021/8090472)). **Regla propuesta [H]:** antes de aplicar la tabla, corregir con `WASO_corr = WASO_reloj + 15 min` y `SE_corr = SE_reloj − 4 puntos`, y evaluar la noche con los valores corregidos. Una noche cuenta como "buena" si cumple **TST 7–9 h, eficiencia corregida ≥85 %, WASO corregido ≤20 min y ≤1 despertar >5 min**. Una noche cuenta como "mala" si se da cualquiera de estas condiciones: **TST <6 h, eficiencia corregida ≤64 %, WASO corregido ≥41 min o ≥4 despertares**. La latencia hay que omitirla o mostrarla solo como media semanal. El reloj no registra el momento de apagar la luz, y los límites de acuerdo de la latencia son de ±48 min.

Apple ofrece desde watchOS 26 un **Sleep Score de 0 a 100**. Lo compone la duración (50 puntos), la regularidad de la hora de dormirse en las **últimas 13 noches** (30 puntos) y las interrupciones (20 puntos). Las franjas actuales son Muy bajo 0–40, Bajo 41–60, OK 61–80, Alto 81–95 y Muy alto 96–100 [F] ([Apple Watch User Guide](https://support.apple.com/guide/watch/apded441a669); [MacRumors, cambio de franjas en 26.2](https://www.macrumors.com/2025/11/04/watchos-26-2-updates-sleep-score-ranges/)). **No hay API pública para leerlo**. Un ingeniero de Apple lo confirmó en los foros de desarrolladores [F] ([Apple Developer Forums 800403](https://developer.apple.com/forums/thread/800403)). La app debe calcular su propia puntuación con la misma estructura 50/30/20 [H]. La duración se mide contra `need`. La regularidad, como desviación entre la hora de dormirse y la mediana de las 13 noches anteriores. Las interrupciones, como número y minutos de segmentos "Awake". No debe presentarse como el número de Apple. Las curvas de puntuación que circulan por internet no están confirmadas por Apple y son internamente incoherentes ([the5krunner](https://the5krunner.com/2025/10/06/how-apple-watchs-sleep-score-is-calculated-all-you-need-to-know-to-improve-sleep-health)).

## Las fases y los ciclos solo valen como tendencia, nunca como despertador

Apple clasifica cada época de 30 s como Awake, REM, Core (= N1+N2) o Deep (= N3) a partir del acelerómetro. En su propia validación, con 166 personas de edad media 47 años, la concordancia en cuatro fases fue un **kappa de 0,63**, que sube a **0,68 con watchOS 26**. El error más común es **etiquetar Deep real como Core**. Las sesiones de **1 a 3 h se escriben en HealthKit solo como sueño/vigilia**, sin fases [F] ([white paper de Apple, oct. 2025](https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf)). Los estudios independientes (todos con el Series 8 y software anterior a watchOS 26) coinciden en el diagnóstico. Robbins et al. (2024) midieron un TST de +8 min (no significativo), **Deep −43 min**, Core/ligero **+45 min**, REM +6 min y una concordancia (ICC) de solo **0,13 para Deep** y 0,37 para REM. Conviene saber que el estudio lo financió Oura [F] ([Robbins et al. 2024, PMC11511193](https://pmc.ncbi.nlm.nih.gov/articles/pmc11511193)). Schyvens et al. (2025) midieron un TST de +19,6 min con límites de −38 a +78 min, Deep −25,2 min y REM −13,4 min, con límites de acuerdo de unos ±65 min en cada fase [F] ([PMC12038347](https://pmc.ncbi.nlm.nih.gov/articles/PMC12038347/)). No existe validación independiente del Series 10, de watchOS 26 ni específica de personas de 18 a 25 años. El modelo de reloj no influyó en el kappa según Apple, de modo que el Series 10 no aporta ventaja de hardware para las fases.

En polisomnografía, un adulto joven sano tiene aproximadamente **N1 2–5 %, N2 45–55 %, N3 15–25 % y REM 20–25 %** del TST. El N3 baja ~2 % por década [F] ([StatPearls NBK526132](https://www.ncbi.nlm.nih.gov/books/NBK526132/); [Ohayon 2004, PubMed 15586779](https://pubmed.ncbi.nlm.nih.gov/15586779/)). El consenso NSF 2017 solo llegó a acuerdo en los extremos para este grupo de edad: **N3 ≤5 % y REM ≥41 % son "no buenos"** [F]. Con el sesgo del reloj, los rangos que la app debería considerar normales son los siguientes [H]. **REM 18–28 %**, con aviso si la media de 7 días sale de 15–35 %. **Deep 8–18 % tal como lo reporta el reloj**, con aviso solo si la media de 7 a 14 noches queda por debajo de ~5–6 %. **Core 60–70 %**, que en el reloj es normal porque absorbe parte del profundo. Las estadísticas de fases requieren **≥5 noches válidas de 7** y excluyen las sesiones de menos de 3 h. Un detalle útil para la interfaz: el profundo se concentra en los dos primeros ciclos y el REM en el último tercio de la noche [F] ([Sleep Foundation](https://www.sleepfoundation.org/sleep-health-basics/stages-of-sleep)). Por eso una noche recortada por una alarma temprana pierde sobre todo REM, y la app puede explicarlo así cuando el REM baja.

### Ciclos de ~93 min con una dispersión de ±25 min

El ciclo NREM–REM mediano en 369 sujetos sanos (6.064 ciclos) fue de **96 min** según Cajochen et al. (2024). El primer ciclo es sistemáticamente más corto. La privación de sueño alarga el NREM del primer ciclo y las siestas alargan el REM [F] ([Cajochen et al. 2024, Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:37914631&resultType=core&format=json)). Rosenblum et al. (2025) dan **90 ± 25 min** para los ciclos clásicos, con un patrón de U invertida a lo largo de la noche [F] ([eLife 96784](https://elifesciences.org/reviewed-preprints/96784v2)). Kishi & Van Dongen (2023) añaden la cifra que más pesa en el diseño: la longitud media de ciclo de una persona es un rasgo **solo moderadamente estable (ICC 0,32)**, y varía "de 70 a 150 min" dentro de cada persona y entre personas [F] ([Dovepress](https://dovepress.com/phenotypic-interindividual-differences-in-the-dynamic-structure-of-sle-peer-reviewed-fulltext-article-NSS)). No hay ningún estudio que haya probado la regla de "dormir en múltiplos de 90 min". Con una desviación típica de ~25 min por ciclo, tras 5 ciclos el error acumulado es de **~55 min** (25 × √5) [H], así que la regla no sirve para clavar un despertar.

**Detección de ciclos [H]** (adaptada de las reglas Feinberg & Floyd del paquete `SleepCycles`, que exigen NREM ≥15 min, REM ≥5 min salvo el primero, y dividir los NREM de más de 120 min [F] ([SleepCycles, CRAN](https://rdrr.io/cran/SleepCycles/man/SleepCycles.html))). El procedimiento tiene estos pasos:

1. Unir las muestras con huecos ≤60 min en un episodio y quedarse con el más largo de la franja nocturna.
2. Remuestrear a épocas de 30 s.
3. Recodificar las vigilias de ≤2 min al estadio que las rodea.
4. Tratar Core y Deep juntos como NREM.
5. Reasignar a NREM los tramos REM de <3 min.
6. Fusionar los tramos REM separados por ≤15 min.
7. Exigir REM ≥5 min (≥3 min para el primero) y NREM ≥15 min por ciclo.
8. Partir los NREM de más de 120 min (o de más de 1,5 × la media personal) y marcarlos como "REM saltado".
9. Descartar las noches con <4 h de sueño o con >10 % de huecos, y los ciclos fuera de 50–180 min.

**Ciclo personal [H]:** usar solo los ciclos intermedios completos, excluyendo el primero y el fragmento final, y estimar con contracción hacia la media poblacional: `mu = (n0·93 + n·mediana_obs)/(n0 + n)`, con `n0 = 10–15` ciclos ficticios. La ventana es móvil de 14 a 28 noches, y se excluyen las noches tras privación de sueño, alcohol o recuperación. El dato se muestra con **≥14 noches (~40 ciclos)**, como "tus ciclos rondan X min (rango típico A–B)", y sirve para sugerir ventanas de ±15 min, nunca minutos exactos.

### Inercia al despertar: el estado de sueño previo pesa más que la fase

Despertar desde N3 produce en general más inercia que desde N1/N2, y el REM queda en medio. Pero la evidencia es irregular. En Lovato (2009), el 91 % de los que despertaron desde sueño profundo no mostró deterioro. El efecto de la fase es más claro tras siestas largas o con mucha presión de sueño. La inercia básica se disipa en **15 a 30 min**, pero la recuperación completa puede llevar **≥1 h**, y es peor cerca del mínimo circadiano y tras restricción crónica de sueño [F] ([Hilditch & McHill 2019, Dovepress](https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS); [Tassi & Muzet 2000, Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:12531174%20OR%20EXT_ID:15586779%20OR%20EXT_ID:11883293&resultType=core&format=json)). **Regla [H]:** clasificar el despertar según la fase de los últimos 5 a 10 min. Si fue REM terminando o Core sin Deep, el mensaje es "despertaste al final de un ciclo". Si hubo Deep en los últimos 5 min, el mensaje es "puede que notes más aturdimiento; suele pasar en 15–30 min". El lenguaje debe ser prudente, porque el reloj se pierde la mitad del N3. Con un TST <6 h, el aviso de aturdimiento debe salir independientemente de la fase. Un "Deep al despertar" por la mañana apunta más a deuda de sueño, a una alarma que cortó un ciclo temprano o a un error de clasificación. Sobre las alarmas inteligentes no hay ensayo que demuestre menos inercia frente a una alarma fija: Jakowski & Stork (2022), con 98 estudiantes atletas, no encontraron efecto en el sueño subjetivo [F] ([Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=(%22smart%20alarm%22%20OR%20%22sleep%20stage%20based%20alarm%22)%20AND%20(inertia%20OR%20awakening)&resultType=core&format=json&pageSize=15)). Además, Apple escribe las fases al terminar la sesión, así que una web app alimentada por Atajos solo puede evaluar el despertar a posteriori. No puede hacer de despertador inteligente.

## La deuda se paga adelantando la hora de acostarse, no con fines de semana largos

No existe una fórmula científica estándar de deuda de sueño, pero los datos de laboratorio delimitan bien su comportamiento [F]. Con 6 h o menos durante 14 noches, el deterioro cognitivo llegó a equivaler a **2 noches sin dormir**, y los sujetos apenas lo percibían ([Van Dongen 2003](https://pubmed.ncbi.nlm.nih.gov/12683469/)). Quienes durmieron 5 o 7 h durante una semana **no recuperaron** su rendimiento en 3 noches de 8 h en cama ([Belenky 2003, PubMed 12603781](https://pubmed.ncbi.nlm.nih.gov/12603781/)). Una sola noche de 10 h en cama (8,96 h dormidas) dejó la recuperación **incompleta** ([Banks 2010, PMC2910531](https://pmc.ncbi.nlm.nih.gov/articles/PMC2910531)). Y la recuperación de fin de semana no protegió la sensibilidad a la insulina, que cayó un **9 a 27 %** al volver a la restricción ([Depner 2019, PubMed 30827911](https://pubmed.ncbi.nlm.nih.gov/30827911/)). Las apps comerciales usan ventanas de 14 noches con más peso para lo reciente. RISE da ~15 % a la última noche ([RISE](https://help.risescience.com/hc/en-us/articles/40621334445335-How-is-my-sleep-debt-calculated)). Oura exige **≥5 noches** y clasifica la deuda en <2 h baja y >5 h alta ([Oura](https://support.ouraring.com/hc/articles/46233324892691)).

**Fórmula propuesta [H]:**

```
deficit_i = need − TST_i              (TST incluye siestas; surplus por noche acotado a −2 h)
w_i ∝ (14 − i), i = 0 (anoche) … 13   → anoche ≈ 13 % del peso
debt = 14 · Σ(w_i · deficit_i) / Σ w_i   (solo noches válidas; mínimo 5 de 14)
debt = max(0, debt); mostrar hasta 20 h
Bandas: <2 h baja · 2–5 h moderada · >5 h alta
```

Para pagar la deuda, la regla [H] es dormir **+0,5 a +1,5 h por encima de la necesidad** adelantando la hora de acostarse, hasta bajar de 2 h. La app debe avisar de que cada hora de deuda cuesta **~3 a 4 noches** (Kitamura) y de que lo prioritario es no generar deuda nueva.

### Regularidad: SRI ≥83 sobre 100 y punto medio estable

El Sleep Regularity Index (SRI) mide la probabilidad de estar en el mismo estado (dormido o despierto) en dos momentos separados exactamente 24 h. Se creó con 61 universitarios, en los que se correlacionó con el rendimiento académico (r = 0,37) y no con la duración del sueño [F] ([Phillips et al. 2017, MIT DSpace](https://dspace.mit.edu/handle/1721.1/113615)). En el UK Biobank (~61.000 adultos), la **mediana fue 81** en escala 0–100. El quintil más irregular (**<71,65**) tuvo la mayor mortalidad, y los quintiles superiores tuvieron un riesgo un 20 a 48 % menor. El SRI predijo mejor que la duración [F] ([Windred et al. 2024, Sleep](https://academic.oup.com/sleep/article/47/1/zsad253/7280269)). Son datos de adultos mayores, así que para un estudiante solo indican la dirección del efecto. Fischer et al. (2021) muestran que el SRI capta la regularidad día a día, mientras que la desviación típica (SD) del horario capta la regularidad a lo largo de varios días. También muestran que la estabilidad interdiaria (IS) es inestable con menos de 14 días [F] ([PMC8503839](https://pmc.ncbi.nlm.nih.gov/articles/PMC8503839)).

**Cálculo [H]** (sobre la implementación de GGIR [F] ([GGIR](https://rdrr.io/cran/GGIR/src/R/CalcSleepRegularityIndex.R))). Se construye un vector binario por día civil a 1 min de resolución (1440 posiciones, 1 = dormido, siestas incluidas). Para cada par de días consecutivos, `p` es la proporción de minutos coincidentes. Entonces `SRI_0–100 = 100 · media(p)`, o `SRI_Phillips = 200·media(p) − 100` en la escala original de −100 a 100. Los pares con datos ausentes se excluyen. Se necesitan **≥3 días, y mejor ≥7**. Bandas sobre la escala 0–100, tomadas de los quintiles de Windred: **<72 irregular, 72–83 moderado, ≥83 regular, ≥87 muy regular**. Como referencia, desplazar el horario ~1 h cada día da un SRI de ~90, y desplazarlo ~3 h da ~75. Como métrica complementaria, la **SD del punto medio del sueño** en 7 a 14 noches, calculada con estadística circular (desenrollando las horas en torno al mediodía), con bandas [H] **<30 min buena, 30–60 moderada, >60 irregular**. Ninguna fuente da umbrales de resultado para esta SD. Además deben mostrarse por separado la SD de la hora de acostarse y la de la hora de levantarse, porque son las que el usuario puede cambiar.

### Jet lag social: ≥1 h ya es señal de aviso

El jet lag social es `SJL = |MSF − MSW|`, la diferencia entre el punto medio del sueño en días libres y en días laborables, medida por el arco más corto. El cronotipo se calcula como `MSFsc = MSF − (SD_F − SD_week)/2` cuando el sueño en días libres supera al de días laborables. Si se usa alarma en días libres, `MSFsc` no se calcula [F] ([mctq: sjl](https://docs.ropensci.org/mctq/reference/sjl.html); [mctq: msf_sc](https://docs.ropensci.org/mctq/reference/msf_sc.html)). En universitarios chinos, un SJL **≥2 h** se asoció con depresión leve (OR 5,67), y otro estudio vio el riesgo dispararse desde **≥1,2 h** [F] ([estudio no lineal](https://library.kab.ac.ug/Record/doaj-art-1e9381ac214f4e36a049ebeeb9ead0c9/Details)). En ~15.000 estudiantes, el jet lag social se asoció con peor rendimiento académico [F] ([Smarr & Schirmer 2018, PMC5876324](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5876324/)). **Implementación [H]:** un estudiante no tiene una semana laboral fija, así que cada noche se etiqueta como "condicionada" (alarma, o clase o examen por la mañana) o "libre". Se calcula la media circular del punto medio en cada grupo, con **≥14 días y ≥2 noches libres**. Bandas: **<1 h bien, 1–2 h aviso, ≥2 h alto**.

## La recuperación se mide contra el propio usuario y necesita 14 noches

La regla común a todas las métricas de recuperación es **no comparar nunca con normas poblacionales ni con otros dispositivos**. Cada métrica se compara con una línea base propia. Apple Vitals construye un rango típico tras **7 noches** y avisa cuando **2 o más métricas** salen de rango [F] ([Apple Support 120142](https://support.apple.com/en-gb/120142)). Garmin necesita **~3 semanas** para el estado de la VFC ([Garmin](https://www8.garmin.com/manuals/webhelp/GUID-4462687B-8DF5-4719-872E-E16754F9D4B0/EN-US/GUID-5247CEC7-AF06-44FB-B6AD-87C53D4F7941.html)). WHOOP calibra durante ~4 días y afirma que la VFC aporta la mayor parte del valor predictivo [F] ([WHOOP 101](https://whoop.com/thelocker/how-does-whoop-recovery-work-101)). **Línea base [H]:** media y SD robusta (MAD × 1,4826) de los días **−60 a −8**, con un mínimo de −28 a −8 cuando hay poco historial. La semana más reciente se excluye para que un problema en curso no contamine su propia referencia. Las noches etiquetadas como enfermedad o viaje, y las 2 primeras tras cambiar de reloj, también se excluyen. Se aplica un suelo a la SD para evitar divisiones por SD minúsculas: **VFC 0,05 unidades ln, pulso 1,5 lpm, respiración 0,4 rpm, temperatura 0,15 °C**.

### VFC (SDNN): útil en tendencia de 7 días y siempre leída junto al pulso

Apple guarda la VFC como **SDNN** a partir de lecturas cortas y oportunistas. Cada sesión de Respirar/Mindfulness genera una lectura [F] ([Altini 2023](https://marcoaltini.substack.com/p/apple-watch-and-heart-rate-variability)). Frente a una banda de pecho Polar H10, el Series 9/Ultra 2 **infravalora la VFC en ~8,3 ms**, mientras que su pulso en reposo es "relativamente preciso" [F] ([Sensors 2024, 24(19):6220](https://www.mdpi.com/1424-8220/24/19/6220)). En un **Series 10, la app Vitals muestra la duración del sueño en lugar de la VFC**, aunque las muestras de SDNN se siguen escribiendo en Salud [F] ([Apple Support 120142](https://support.apple.com/en-gb/120142)). Buchheit (2014) da un coeficiente de variación diario de ln rMSSD del **10 al 20 %**. Fija el cambio mínimo relevante (SWC) en **0,5 × CV individual** y considera necesario promediar **3 a 4 días** antes de que la VFC se relacione con el rendimiento. También advierte que una VFC baja con pulso bajo puede ser "saturación parasimpática" y no fatiga [F] ([Buchheit 2014, Front Physiol](https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full)). Plews y el AIS usan la media móvil de 7 días frente a la línea base [F] ([tesis de Plews, AUT](https://openrepository.aut.ac.nz/handle/10292/7122)).

**Regla [H].** El valor diario es `hrv_day = ln(media de las SDNN entre el inicio y el fin del sueño)`. Si el usuario hace cada mañana una sesión de Respirar de ≥1 min en la misma postura, esa lectura tiene prioridad, pero nunca deben mezclarse ambas fuentes en una misma línea base. Se exige ≥1 muestra por noche y los días sin muestra no se imputan. La tendencia es `hrv7 = media de 7 días`, con **≥4 días válidos**. El rango normal es la línea base ± 0,5 SD, y "claramente baja" es por debajo de la base − 1 SD. Si |z| < 0,5, se considera ruido. Para interpretarla: VFC baja con pulso alto indica tensión o posible enfermedad. VFC baja con pulso igual o más bajo que la base indica posible saturación y no se penaliza.

### Pulso, respiración, temperatura y oxígeno: umbrales para cada señal

| Métrica (HealthKit) | Valor diario | Ruido | Elevado | Fuerte / posible enfermedad | Origen |
|---|---|---|---|---|---|
| Pulso en reposo | Muestra diaria de Apple o media nocturna (elegir una y mantenerla) | \|z\|<1 o \|Δ\|<2 lpm | z ≥1 **y** Δ ≥+3 lpm | z ≥2 o Δ ≥+5 lpm en ≥2 noches seguidas | [H] sobre Buchheit/Mishra |
| Frecuencia respiratoria | Media de las muestras durante el sueño (descartar <8 o >30 rpm) | \|Δ\|<1 rpm | Δ ≥+1 rpm y z ≥1,5 | Δ ≥+2 rpm, o z ≥2 en ≥2 noches | [H] sobre Miller 2020 |
| Temperatura de muñeca | Desviación nocturna de Apple (`dT`) | \|dT\|<0,3 °C | dT ≥+0,5 °C | dT ≥+1,0 °C, o ≥+0,5 °C ×2 noches con aviso de pulso o respiración | [H] |
| SpO2 | Media nocturna | — | — | ≤92 % en ≥2 noches sin altitud: nota neutra "conviene comprobar" | [H] |

El respaldo de cada fila es el siguiente. Para el pulso, Mishra et al. (2020) detectaron el 63 % de los casos de COVID antes de los síntomas con elevaciones frente a una línea base móvil de **28 días** [F] ([Nature BME](https://www.nature.com/articles/s41551-020-00640-6)). En DETECT, solo el **30 %** de los positivos superó 2 SD de pulso, y combinar sensores dio un AUC de 0,72 [F] ([Scripps DETECT](https://www.scripps.edu/news-events/news/20201029-topol-radin-quer-detect/)). El pulso solo, por tanto, pierde la mayoría de las infecciones. La respiración nocturna fue la base del modelo de COVID de WHOOP por su **baja variación entre noches** [F] ([Miller et al. 2020, PMC7728254](https://pmc.ncbi.nlm.nih.gov/articles/PMC7728254)), aunque no hay validación de la respiración del Apple Watch frente a polisomnografía. La temperatura solo se muestra como desviación respecto a una línea base que Apple fija tras **~5 noches**. Se muestrea cada 5 s con dos sensores, y la alteran el ciclo menstrual, el alcohol, el entorno y el ajuste de la correa [F] ([Apple Support 102674](https://support.apple.com/en-gb/102674)). La subida ovulatoria es de **≥0,2 °C** [F] ([Apple Women's Health Study](https://hsph.harvard.edu/research/apple-womens-health-study/publications)). Las desviaciones de ≤−1 °C deben tratarse como artefacto (habitación fría o brazo fuera de la ropa de cama). Si el usuario menstrúa, el umbral sube ~+0,3 °C en la fase lútea [H]. El SpO2 del Series 6 no muestra un sesgo sistemático fuerte, pero tiene valores atípicos de **hasta 15 puntos** [F] ([PMC10039641](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10039641/)), sobreestima en hipoxia [F] ([JMIR Form Res 2026](https://formative.jmir.org/2026/1/e85253)) y no tiene validación durante el sueño. **Debe quedar fuera de cualquier puntuación.** En unidades compradas en España la función se mantiene: las restricciones afectan solo a los números de pieza estadounidenses LW/A y LS/A [F] ([MacRumors](https://www.macrumors.com/2025/08/14/blood-oxygen-monitoring-returning-to-apple-watch/)).

**Puntuación de recuperación [H]** (diseño propio; ninguna puntuación compuesta está validada con datos del Apple Watch):

```
zH = (ln SDNN_hoy − media)/sd          zR = −(RHR_hoy − media)/sd
zB = −max(0, RR_hoy − media)/sd        zT = −max(0, dT_hoy)/sd_T  (sd_T inicial 0,3 °C)
cada z acotado a [−3, +2]
Z = 0,40·zH + 0,30·zR + 0,15·zB + 0,15·zT   (renormalizar si falta alguna; sin VFC → "baja confianza")
Score = round(clamp(50 + 20·Z, 0, 100))
Bandas: ≥67 verde (listo) · 34–66 amarillo · ≤33 rojo (prioriza recuperar)
```

Las bandas copian las de WHOOP. Con esta fórmula, el verde corresponde a estar ~0,85 SD mejor de lo habitual. Además, la app debe tener una **alerta independiente de tipo Vitals**. Las métricas que cuentan como atípicas son: pulso con z ≥2 o +5 lpm, respiración +2 rpm o z ≥2, dT ≥+0,5 °C y VFC con z ≤−2. Si salen **≥2 atípicas la misma noche, o la misma atípica 2 noches seguidas**, la app muestra "posible enfermedad, alcohol o mal sueño: revisa cómo te encuentras". Las fases de visualización según el historial son estas:

1. Días 1 a 6: "calibrando".
2. Días 7 a 13: puntuación provisional marcada como "baja confianza".
3. **≥14 noches válidas**: puntuación completa.
4. **≥21 a 28 noches**: tarjeta de tendencia de la VFC.
5. 60 noches: línea base madura.

Una noche es válida si tiene ≥4 h de sueño, ≥1 muestra de VFC y valores de pulso y respiración.

## Carga de entrenamiento: sRPE como moneda común y el ACWR solo como velocímetro

La carga de cada sesión debe ser el **RPE de sesión (CR-10) × minutos**, en unidades arbitrarias (UA) [F]. Foster lo validó para una amplia variedad de ejercicios ([PubMed 11708692](https://pubmed.ncbi.nlm.nih.gov/11708692/)). En fuerza, su fiabilidad tiene un **ICC de 0,88 a 0,95**, y el RPE recogido 30 min después representa mejor la sesión que el promedio por serie [F] ([Haddad et al. 2017, PMC5673663](https://pmc.ncbi.nlm.nih.gov/articles/PMC5673663/)). El TRIMP basado en pulso correlaciona entre r = 0,5 y 0,9 en deportes de equipo, pero se queda corto en fuerza pesada, donde el pulso no refleja la carga mecánica [H]. Apple calcula su propia carga de entrenamiento como **esfuerzo × duración**, comparando 7 días con 28. Su esfuerzo automático sale del pulso medio, **no se estima para el entrenamiento de fuerza** y necesita ~10 días para formar la base [F] ([DC Rainmaker](https://dcrainmaker.com/2024/07/apples-training-load-vitals-watchos11.html)). HealthKit tiene `workoutEffortScore` y `estimatedWorkoutEffortScore` en escala 0–10 [F] ([Apple Developer Forums 764884](https://developer.apple.com/forums/thread/764884)), pero no hay constancia de que "Buscar muestras médicas" en Atajos los ofrezca. **Diseño [H]:** al cerrar una sesión de gimnasio, la app pregunta "¿Cómo de dura fue la sesión? (0–10)" con las anclas de la escala CR-10 (2 fácil, 3 moderada, 5 dura, 7 muy dura, 10 máxima), idealmente 15 a 30 min después. Si no hay RPE, se recurre a esta cadena: esfuerzo de Apple si llega, luego TRIMP de Edwards con el pulso bruto (zonas 50–60…90–100 % de FCmáx con pesos 1–5, y FCmáx observada en el historial), luego un RPE por defecto según el tipo (caminar 2–3, fuerza 6), y por último minutos de ejercicio fuera de entrenamientos × 2. Cada registro debe guardar su `source`. El volumen (series × repeticiones × kg) se queda como gráfico de progreso aparte y no entra en la carga.

### El ACWR tiene críticas serias; mostrarlo sin prometer nada

La "zona óptima" de **0,8 a 1,3**, con picos ≥1,5 asociados a lesiones, viene de cohortes de deportes de equipo [F] ([Gabbett 2016, BJSM](https://bjsm.bmj.com/content/50/5/273.abstract)). El cálculo con EWMA (media móvil exponencial) resultó más sensible que las medias móviles simples ([Murray 2017](https://acuresearchbank.acu.edu.au/item/8qv67/calculating-acute-chronic-workload-ratios-using-exponentially-weighted-moving-averages-provides-a-more-sensitive-indicator-of-injury-likelihood-than-rolling-averages)). Las críticas son contundentes [F]:

1. La semana aguda está dentro de la media crónica, lo que crea una correlación espuria de r ≈ 0,52, y el cociente no se normaliza ni siquiera cuando se desacoplan las ventanas ([Lolli et al. 2019, BJSM](https://bjsm.bmj.com/content/53/15/921.abstract)).
2. Se han probado 336 combinaciones de ventanas, lo que equivale a sobreajustar.
3. Simulaciones sin ningún efecto real reproducen la "zona óptima".
4. **El AIS desaconseja usar el ACWR como indicador de riesgo de lesión** ([Impellizzeri et al. 2020, PMC7534938](https://pmc.ncbi.nlm.nih.gov/articles/PMC7534938/)).
5. Una carga crónica aleatoria funciona igual de bien que la real ([Impellizzeri 2021](https://opus.lib.uts.edu.au/handle/10453/145169)).

Coyne et al. (2019) defienden que el acoplamiento importa poco en la práctica ([ECU](https://ro.ecu.edu.au/ecuworkspost2013/7321/)), pero no hay estudios en levantadores recreativos.

**Cálculo [H]:**

```
L[d] = Σ cargas del día (guardar 0 los días sin entrenar)
λa = 2/(7+1) = 0,25    λc = 2/(28+1) ≈ 0,069
A[d] = λa·L[d] + (1−λa)·A[d−1]      C[d] = λc·L[d] + (1−λc)·C[d−1]
C se inicializa con la media de los primeros 14–28 días; no mostrar nada antes de 21–28 días
R = A/C → <0,8 por debajo · 0,8–1,3 estable · 1,3–1,5 por encima · >1,5 muy por encima
Ramp semanal desacoplado = carga últimos 7 d / media semanal de los 21 d previos − 1  (guía: ≤ +10–30 %)
Monotonía (7 d) = media(L)/sd(L); Strain = suma(L) × monotonía
```

La etiqueta debe decir siempre "comparación de tu última semana con tus últimas 4 semanas; no predice lesiones". La monotonía y la tensión vienen de Foster (1998), que las asoció con enfermedad [F] ([Scilit](https://scilit.com/publications/e31bb6480eb258196e899f1d8de4d3d2)). El umbral de **monotonía >2,0** es una convención práctica no verificada en el original. Solo debe avisar si además la carga semanal supera la media de 28 días, y conviene calcularla solo con la carga de entrenamientos, porque caminar a diario la infla mecánicamente [H]. Conviene mostrar dos series, "carga gimnasio" y "carga total", para que las caminatas no oculten las subidas en el gimnasio.

### Objetivo diario: base crónica × recuperación × sueño, con un techo de progresión

Hay evidencia de que conviene **reducir** la carga tras poco sueño [F]. En el metaanálisis de Craven et al. (2022), dormir ≤6 h frente a >6 h bajó el rendimiento un **7,6 %**. El efecto fue consistente sobre todo cuando la restricción consistía en levantarse antes, y el rendimiento empeoraba un **~0,4 % por hora despierto** antes del ejercicio, mientras que las tareas de mañana apenas se resentían ([PubMed 35708888](https://www.pubmed.gov/35708888/)). En adolescentes, dormir <8 h se asoció con **1,7 veces** más lesiones, aunque son datos observacionales ([Milewski 2014, PubMed 25028798](https://pubmed.ncbi.nlm.nih.gov/25028798/)). La pérdida de fuerza existe pero es pequeña ([Stronger By Science](https://www.strongerbyscience.com/research-spotlight-sleep-loss/)). Ningún modelo revisado por pares convierte desviaciones de VFC o pulso en un multiplicador de carga, y los de WHOOP y Garmin son propietarios ([WHOOP Strain Coach](https://whoop.com/thelocker/strain-coach)).

**Regla propuesta [H]:**

```
T_base = C × 7 / sesionesPlanificadasPorSemana     (día solo de caminar: 0,3–0,5 × T_base; rango ±15 %)
L_max  = (r·(1−λc)·C − (1−λa)·A) / (λa − r·λc), con r = 1,3   (si L_max < 0 → descanso/paseo)
Objetivo = min(T_base × m_recuperación × m_sueño, L_max), nunca >2 × T_base, nunca 0 para caminar
```

En este cálculo, A y C son los valores de ayer. Ejemplo: con A = C = 300 UA/día, el techo es L_max ≈ 860 UA. El multiplicador **m_sueño** vale:

| Condición | m_sueño |
|---|---|
| Anoche ≥7 h y media de 7 días ≥7 h | 1,0 |
| Anoche 6–7 h, o media de 7 días 6,5–7 h | 0,9 |
| Anoche <6 h, o deuda >5 h | 0,75 (mantener los básicos, −25–30 % de series y nada al fallo; avisar si la sesión es tarde) |
| Anoche <4,5 h | 0,5 (técnica, movilidad, paseo) |

El multiplicador **m_recuperación** usa los z de pulso y VFC frente a la línea base:

| Estado | Condición | m_recuperación |
|---|---|---|
| Verde | Ambos dentro de ±1 SD | 1,0–1,1 |
| Ámbar | Uno más de 1 SD en sentido adverso | 0,85 |
| Rojo | Ambos más de 1 SD en sentido adverso, o pulso ≥+7 lpm | 0,6 |

Conviene añadir una pregunta subjetiva de disposición o agujetas en escala 1–5. La app debe enseñar siempre el razonamiento, por ejemplo "sueño corto → −25 %".

## Café con nueve horas de margen y siestas de veinte minutos

El metaanálisis de Gardiner et al. (2023), con 24 estudios, cuantificó el efecto de la cafeína [F]: **−45 min de sueño total, −7 % de eficiencia, −11 min de profundo, +9 min de latencia y +12 min de WASO**. Para no perder sueño, un café de **107 mg** debe tomarse **≥8,8 h antes de acostarse** y un pre-entreno de **217,5 mg**, **≥13,2 h** antes. Con el té no se encontró hora límite ([Leeds Beckett eprint](https://eprints.leedsbeckett.ac.uk/id/eprint/9625); [AJMC](https://www.ajmc.com/view/caffeine-and-sleep-review-suggests-consumption-guidelines)). En Drake et al. (2013), 400 mg tomados **6 h antes** recortaron más de 1 h de sueño sin que los sujetos lo notaran [F] ([PMC3805807](https://pmc.ncbi.nlm.nih.gov/articles/PMC3805807)). La vida media de la cafeína es de **~5 h, con un rango de 1,5 a 9,5 h** [F] ([NCBI NBK223808](https://www.ncbi.nlm.nih.gov/books/NBK223808/)), y sube a **7,9 h con anticonceptivos orales** [F] ([PubMed 4029248](https://pubmed.ncbi.nlm.nih.gov/4029248/)). **Regla [H]:** `hora_límite = hora_objetivo_de_dormir − H`. H vale **9 h** para un café o una bebida energética de hasta ~160 mg y **13 h** para un pre-entreno o una toma de ≥200 mg. Un té de ≤50 mg no tiene límite. Se suman **+2 h** con anticonceptivos orales o sensibilidad declarada. Como suelo absoluto, nada de ≥200 mg en las 6 h previas a dormir. La hora límite se calcula con la hora de dormir prevista para esa noche, de modo que se adelanta los días de clase temprana. Para acostarse a las 00:00, el último café sería a las 15:00 y el último pre-entreno a las 11:00. Como apoyo secundario, la cafeína residual se estima con `C_dormir = Σ dosis_k · 0,5^((t_dormir − t_k)/5)`, con aviso si supera **50 mg**. La regla horaria manda, porque la de Gardiner es más estricta que la farmacocinética.

En siestas, Brooks & Lack (2006) compararon duraciones en jóvenes con el sueño restringido [F]. **10 min** dieron beneficio inmediato que duró hasta 155 min. 20 min lo dieron a partir de ~35 min. 30 min causaron inercia inicial ([Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=Brooks%20Lack%202006%20brief%20afternoon%20nap%20%22most%20recuperative%22&resultType=core&format=json&pageSize=5)). Las siestas de ≤30 min tienen menos riesgo de entrar en sueño profundo [F] ([Hilditch & McHill 2019](https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS)). El metaanálisis de Dutheil (2021) da un efecto pequeño pero real sobre la cognición (**ES 0,18**) y la alerta (**ES 0,29**) [F] ([PMC8507757](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8507757/)). En 14 estudiantes atletas, siestas de 25 o 90 min que terminaban a las 15:00 no alteraron el sueño de esa noche [F] ([Boukhris et al. 2026, PMC12856117](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12856117/)). En cambio, en 384 universitarios, las siestas más largas se asociaron con más WASO y peor eficiencia esa noche, y las noches cortas predecían siestas largas al día siguiente [F] ([Mead et al. 2022, Europe PMC](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:35195690%20OR%20EXT_ID:19645971%20OR%20PMCID:PMC12856117%20OR%20EXT_ID:20797557&resultType=core&format=json)).

**Reglas [H]:**

1. **Siesta corta por defecto**: 20 a 25 min en la cama (unos 10 a 15 min dormido), con alarma, entre 13:00 y 15:00.
2. **Siesta de ciclo completo**: 90 a 100 min (o el ciclo personal más la latencia), solo tras una pérdida de sueño importante y terminando antes de las 15:00.
3. **Evitar 40 a 70 min**, porque esas siestas acaban cerca del sueño profundo.
4. Avisar si una siesta acaba a **menos de 7 a 8 h** de la hora habitual de acostarse. No hay estudio que fije un corte exacto.
5. Si una siesta supera los 30 min de sueño, avisar de 30 a 60 min de aturdimiento y dejar 15 a 30 min antes de conducir o de un examen.
6. Una siesta larga tras una noche corta se presenta como síntoma de deuda.
7. Opcional: un café justo antes de una siesta de 20 min.

El white paper de Apple solo documenta la escritura en HealthKit de las sesiones de 1 a 3 h, y sin fases. Para siestas de 20 min, lo más seguro es que el usuario las registre a mano en la app; esto es una inferencia y conviene comprobarlo en el dispositivo.

## Qué enseñar cada noche y qué solo como tendencia

La tabla siguiente reúne la fiabilidad de cada métrica en el Apple Watch y lo que la app debe mostrar. La fiabilidad sale de las validaciones citadas arriba. Los mínimos de noches son heurísticas [H], excepto los de Apple, Oura y Garmin, que salen de sus fuentes.

| Métrica | Fiabilidad en el Apple Watch | Mostrar cada noche | Solo como tendencia | Mínimo antes de mostrar |
|---|---|---|---|---|
| Sueño total (Core+Deep+REM) | Alta (sesgo +8 a +20 min) | Sí, frente a la necesidad | Media de 7 días | 1 noche; media con 5 de 7 |
| Hora de dormirse y de despertar, punto medio | Alta | Sí | SD de 7–14 días | 1 noche; SD con ≥7 |
| Necesidad personal | Derivada | — | Revisión semanal (±15 min) | 3–4 semanas con noches libres |
| SRI | Alta (depende de sueño/vigilia) | — | Ventana de 7–14 días | ≥3 días (mejor ≥7) |
| Jet lag social y cronotipo (MSFsc) | Alta | — | Ventana de 14+ días | ≥14 días y ≥2 noches libres |
| Deuda de sueño | Derivada del TST | Sí (ventana móvil) | — | ≥5 de 14 noches |
| Eficiencia | Media (+4 puntos) | Con cautela, corregida | Regla ≥85 % sobre la media de 7 días | 1 noche; juicio con 5 de 7 |
| Despertares y WASO | Media-baja (−21 min) | Solo como "interrupciones" | Media semanal | 5 de 7 |
| Latencia | Baja (±48 min) | No | Semanal u omitir | 7 noches |
| REM % | Media de promedio, ruidosa por noche | No | Media de 7 días | 5 de 7 (sesiones >3 h) |
| Deep % | Baja (−25 a −43 min, ICC 0,13) | No (y nunca alertas) | 7–14 días | 5 de 7; aviso con 14 |
| Core % | Baja (absorbe el profundo) | No | Solo como contexto | — |
| Ciclo personal | Ingeniería, sin validar | No | "X min (A–B)" | ≥14 noches (~40 ciclos) |
| Fase al despertar (inercia) | Baja | Mensaje prudente | — | 1 noche |
| Pulso en reposo | Alta | Sí, z frente a la base | Media de 7 días | Base con 7 noches; completa con 14–28 |
| VFC (SDNN) | Media; −8 ms frente a banda de pecho; muestreo irregular | Solo dentro de la puntuación | **Media de 7 días ± 0,5 SD** | ≥4 de 7 días; tarjeta con 21–28 |
| Frecuencia respiratoria | Estable, sin validar en Apple | Solo avisos | 7 días | 7 noches (Apple Vitals) |
| Temperatura de muñeca | Relativa; muchos factores la alteran | Solo avisos | 30 noches para la SD propia | 5 noches (base de Apple) |
| SpO2 | Baja para recuperación | No (fuera de la puntuación) | Nota si ≤92 % ×2 | 7 noches |
| Puntuación de recuperación | Diseño propio | Sí, desde el día 14 | — | 7 provisional; 14 completa |
| Carga aguda/crónica (EWMA) | sRPE fiable; ratio criticado | Carga del día | Ratio y progresión semanal | 21–28 días |
| Objetivo de carga diario | Heurística | Sí, como rango ±15 % | — | 21–28 días |

## Conclusión

La lección principal es que **la incertidumbre de la medida debe decidir el diseño de la interfaz**, no al revés. El reloj es casi perfecto para saber cuándo y cuánto duerme el usuario. Es mediocre para saber cómo duerme y no sirve como oxímetro. Así que la app gana fiabilidad si da más protagonismo a la regularidad y a la deuda que a las fases. Además, los datos apuntan en la misma dirección: según Windred et al., el SRI predice resultados de salud mejor que la duración, y la regularidad es justo lo que un estudiante con horario cambiante tiene más margen de mejorar. Quitar importancia al "sueño profundo de anoche" no hace la app menos útil. Al contrario, la protege de aconsejar en función de un dato que el reloj infravalora sistemáticamente.

La segunda lección es que **casi todo lo que convierte datos en recomendaciones es heurística**: el peso de la deuda, la mezcla 40/30/15/15 de la recuperación, los multiplicadores de carga y el techo de progresión. Eso no invalida la app, pero obliga a tres disciplinas. Primero, dejar los parámetros [H] en un archivo de configuración y no incrustarlos en el código. Segundo, recoger etiquetas del usuario (alcohol, enfermedad, viaje, RPE, cómo se siente) para recalibrar con sus propios datos tras 4 a 8 semanas. Tercero, enseñar siempre el razonamiento ("sueño corto → −25 %") en vez de un número opaco. Antes de programar quedan tres comprobaciones en el dispositivo: si Atajos expone el esfuerzo de los entrenamientos, si las siestas cortas llegan a Salud y si una versión posterior de HealthKit ha abierto el Sleep Score.

## Referencias

**Sueño: duración, calidad y fases**
- Hirshkowitz et al. 2015, NSF duración — https://pubmed.ncbi.nlm.nih.gov/29073412/
- Watson et al. 2015, AASM/SRS — https://pmc.ncbi.nlm.nih.gov/articles/PMC4434546/
- Ohayon et al. 2017, NSF calidad — https://escholarship.org/content/qt9xc5x5h2/qt9xc5x5h2.pdf
- Ohayon et al. 2004, metaanálisis de arquitectura del sueño — https://pubmed.ncbi.nlm.nih.gov/15586779/
- StatPearls, fases del sueño — https://www.ncbi.nlm.nih.gov/books/NBK526132/
- Kitamura et al. 2016 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5075948/

**Apple Watch: validación y funciones**
- White paper de Apple sobre fases del sueño (oct. 2025) — https://www.apple.com/kr/health/pdf/Estimating_Sleep_Stages_from_Apple_Watch_Oct_2025.pdf
- Robbins et al. 2024 — https://pmc.ncbi.nlm.nih.gov/articles/pmc11511193
- Schyvens et al. 2025 — https://academic.oup.com/sleepadvances/article/6/2/zpaf021/8090472
- Sleep Score, Apple Watch User Guide — https://support.apple.com/guide/watch/apded441a669
- Ausencia de API para el Sleep Score — https://developer.apple.com/forums/thread/800403

**Ciclos, inercia y siestas**
- Cajochen et al. 2024 — https://eprints.soton.ac.uk/502837
- Rosenblum et al. 2025 — https://elifesciences.org/reviewed-preprints/96784v2
- Kishi & Van Dongen 2023 — https://dovepress.com/phenotypic-interindividual-differences-in-the-dynamic-structure-of-sle-peer-reviewed-fulltext-article-NSS
- Paquete SleepCycles — https://rdrr.io/cran/SleepCycles/man/SleepCycles.html
- Hilditch & McHill 2019 — https://www.dovepress.com/sleep-inertia-current-insights-peer-reviewed-fulltext-article-NSS
- Dutheil et al. 2021 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8507757/
- Boukhris et al. 2026 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12856117/

**Deuda, regularidad y jet lag social**
- Van Dongen et al. 2003 — https://pubmed.ncbi.nlm.nih.gov/12683469/
- Belenky et al. 2003 — https://pubmed.ncbi.nlm.nih.gov/12603781/
- Banks et al. 2010 — https://pmc.ncbi.nlm.nih.gov/articles/PMC2910531
- Depner et al. 2019 — https://pubmed.ncbi.nlm.nih.gov/30827911/
- Phillips et al. 2017 — https://dspace.mit.edu/handle/1721.1/113615
- Windred et al. 2024 — https://academic.oup.com/sleep/article/47/1/zsad253/7280269
- Fischer et al. 2021 — https://pmc.ncbi.nlm.nih.gov/articles/PMC8503839
- GGIR, cálculo del SRI — https://rdrr.io/cran/GGIR/src/R/CalcSleepRegularityIndex.R
- Paquete mctq — https://docs.ropensci.org/mctq/reference/sjl.html
- Smarr & Schirmer 2018 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5876324/

**Cafeína**
- Gardiner et al. 2023 — https://eprints.leedsbeckett.ac.uk/id/eprint/9625
- Drake et al. 2013 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3805807
- Vida media de la cafeína — https://www.ncbi.nlm.nih.gov/books/NBK223808/

**Recuperación**
- Buchheit 2014 — https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2014.00073/full
- Validación del Series 9/Ultra 2 frente a Polar H10 (Sensors 2024) — https://www.mdpi.com/1424-8220/24/19/6220
- Altini 2023, VFC en el Apple Watch — https://marcoaltini.substack.com/p/apple-watch-and-heart-rate-variability
- Mishra et al. 2020 — https://www.nature.com/articles/s41551-020-00640-6
- Miller et al. 2020 — https://pmc.ncbi.nlm.nih.gov/articles/PMC7728254
- Apple Vitals — https://support.apple.com/en-gb/120142
- Temperatura de muñeca de Apple — https://support.apple.com/en-gb/102674
- Revisión de SpO2 en el Apple Watch — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10039641/
- WHOOP Recovery — https://whoop.com/thelocker/how-does-whoop-recovery-work-101

**Carga de entrenamiento**
- Foster et al. 2001 — https://pubmed.ncbi.nlm.nih.gov/11708692/
- Haddad et al. 2017 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5673663/
- DC Rainmaker, Training Load de Apple — https://dcrainmaker.com/2024/07/apples-training-load-vitals-watchos11.html
- Gabbett 2016 — https://bjsm.bmj.com/content/50/5/273.abstract
- Williams et al. 2017, EWMA — https://pubmed.ncbi.nlm.nih.gov/27650255/
- Lolli et al. 2019 — https://bjsm.bmj.com/content/53/15/921.abstract
- Impellizzeri et al. 2020 — https://pmc.ncbi.nlm.nih.gov/articles/PMC7534938/
- Craven et al. 2022 — https://www.pubmed.gov/35708888/
- Milewski et al. 2014 — https://pubmed.ncbi.nlm.nih.gov/25028798/
