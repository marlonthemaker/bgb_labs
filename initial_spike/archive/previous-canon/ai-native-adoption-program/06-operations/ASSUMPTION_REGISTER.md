# Assumption Register

ID: `DOC-OPS-0005`
Version: v0.2

Use this register for important unproven premises.

## Active Assumptions

`ASM-ALL-0001`: Native adoption can be operationalized with a practical scoring framework.

- Risk if false: the program may produce fragmented metrics rather than decision-grade findings.
- Validation path: compare scores with human journey review and continuation intent.

`ASM-WILD-0001`: Realistic user journeys reveal failures that prompt-only benchmarks miss.

- Risk if false: Wild may add cost without enough signal.
- Validation path: compare Wild observations to benchmark-only results.

`ASM-LAB-0001`: Controlled representation and behavior diagnostics can explain at least some Wild failures.

- Risk if false: Lab may remain academically interesting but operationally weak.
- Validation path: require Lab hypotheses to generate Sandbox treatment recommendations.

`ASM-SBOX-0001`: External adaptation can improve selected native adoption outcomes.

- Risk if false: Sandbox becomes mainly a negative-results track.
- Validation path: baseline versus treatment tests on matched journeys.

`ASM-PLAT-0001`: File-based registries are sufficient for the first milestone.

- Risk if false: coordination and reproducibility degrade.
- Validation path: review after first ten runs.

`ASM-PLAT-0002`: Local DuckDB plus JSONL or Parquet can support early evidence analysis.

- Risk if false: the team moves too slowly during analysis.
- Validation path: benchmark local query speed after the first evidence batch.

`ASM-PLAT-0003`: Hosted APIs will be necessary for testing closed commercial agents.

- Risk if false: unnecessary cloud spending or avoidable external dependencies.
- Validation path: classify each system under test by required access method.

`ASM-PLAT-0004`: Human evaluation can begin with structured review packets before a custom annotation app.

- Risk if false: evaluator throughput and consistency suffer.
- Validation path: review evaluator friction after the first two studies.

`ASM-WILD-0002`: Locale, community, and accessibility context can be captured practically without making early studies too slow.

- Risk if false: the program either under-specifies context or becomes operationally heavy.
- Validation path: test the required context fields on the first three journeys.

`ASM-TRUST-0001`: Evidence integrity and evaluator reliability checks will improve decision quality enough to justify their process cost.

- Risk if false: governance slows the loop without reducing meaningful risk.
- Validation path: compare review outcomes before and after trust checks in the first closed loop.

`ASM-PROD-0001`: Customers will value a closed-loop native adoption assessment more than a broad but shallow language benchmark.

- Risk if false: the offer may be too rigorous or narrow for initial demand.
- Validation path: test discovery conversations against assessment, benchmark, treatment, trust review, and platform starter offers.

`ASM-PROD-0002`: Black-box adaptation can become a repeatable product capability without hiding model or product limitations.

- Risk if false: treatments remain bespoke consulting artifacts rather than reusable product assets.
- Validation path: attempt to reuse the first successful treatment across at least one adjacent journey or system.
