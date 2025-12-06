<script lang="ts">
	import result from '$lib/results/result-1765050648303.json';
	import Date from '../components/date.svelte';
	import FailGraph from '../components/fail_graph.svelte';
	import Header from '../components/header.svelte';
	import SuccessGraphMobile from '../components/success_graph_mobile.svelte';
	import SuccessGraph from '../components/success_graph.svelte';
	import TableOverview from '../components/table_overview.svelte';
	import FailGraphMobile from '../components/fail_graph_mobile.svelte';

	let evalResults: eachEvalResultType[] = [];
	let evalResultsForGraphs: eachEvalResultType[] = [];

	interface eachEvalResultType {
		model: string;
		averageScore: number;
		totalDuration: number | string;
		totalInputTokens: number | string;
		totalOutputTokens: number | string;
		totalTokens: number | string;
		totalCost: number;
		successCount: number;
		failCount: number;
	}

	function formatResult() {
		for (const suit of result.suites) {
			const eachEvalResult: eachEvalResultType = {
				model: suit.variantName,
				averageScore: suit.averageScore,
				totalDuration: 0,
				totalInputTokens: 0,
				totalOutputTokens: 0,
				totalTokens: 0,
				totalCost: 0,
				successCount: 0,
				failCount: 0
			};
			for (const eachEval of suit.evals) {
				eachEvalResult.totalDuration = Number(eachEvalResult.totalDuration) + eachEval.duration;
				if (eachEval.scores[0]) {
					eachEvalResult.failCount += eachEval.scores[0].score == 0 ? 1 : 0;
					eachEvalResult.successCount += eachEval.scores[0].score == 1 ? 1 : 0;
				}
				if (eachEval.output && eachEval.output.steps) {
					for (const step of eachEval.output.steps) {
						eachEvalResult.totalInputTokens =
							Number(eachEvalResult.totalInputTokens) + step.usage.inputTokens;
						eachEvalResult.totalOutputTokens =
							Number(eachEvalResult.totalOutputTokens) + step.usage.outputTokens;
						eachEvalResult.totalTokens =
							Number(eachEvalResult.totalTokens) + step.usage.totalTokens;
						eachEvalResult.totalCost += Number(step.response.body.providerMetadata.gateway.cost);
					}
				}
			}

			evalResults.push(eachEvalResult);
		}

		const formatter = new Intl.NumberFormat('en-US');
		evalResults = evalResults.map((item) => ({
			...item,
			averageScore: Number(item.averageScore.toFixed(2)),
			totalCost: Number(item.totalCost.toFixed(8)),
			totalDuration: formatter.format(Number(item.totalDuration)),
			totalInputTokens: formatter.format(Number(item.totalInputTokens)),
			totalOutputTokens: formatter.format(Number(item.totalOutputTokens)),
			totalTokens: formatter.format(Number(item.totalTokens))
		}));

		evalResultsForGraphs = evalResults.map((item) => ({
			...item,
			// successCount: item.successCount || 0.01,
			// failCount: item.failCount || 0.01,
			averageScore: Number(item.averageScore.toFixed(2)),
			totalCost: Number(item.totalCost.toFixed(8))
		}));
	}

	formatResult();
</script>

<div class="h-screen">
	<div class="w-[90vw] md:w-2/3 m-auto">
		<!-- Header -->
		<Header time={result.run.createdAt} />

		<div class="flex md:hidden mb-2">
			<Date time={result.run.createdAt} />
		</div>

		<div class="rounded-lg bg-neutral-100 border overflow-clip mt-2 mb-6">
			<div class="bg-neutral-200 flex justify-between px-3 py-1 text-sm italic">
				<div>System Prompt</div>
			</div>
			<div class="px-3 py-1">
				{result.suites[0].evals[0].output!.steps[0].request.body.prompt[0].content}
			</div>
		</div>

		<!-- Table Overview -->
		<TableOverview {evalResults} />

		<!-- Succes vs Fail Rates -->
		<div class="flex flex-col md:flex-row w-full gap-x-2 gap-y-4 md:gap-y-0">
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-green-500 rounded-full"></div>
					<div class="text-sm">Success Rates</div>
				</div>

				<SuccessGraph {evalResultsForGraphs} />
				<SuccessGraphMobile {evalResultsForGraphs} />
			</div>
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-red-500 rounded-full"></div>
					<div class="text-sm">Fail Rates</div>
				</div>

				<FailGraph {evalResultsForGraphs} />
				<FailGraphMobile {evalResultsForGraphs} />
			</div>
		</div>

		<!-- <SuccessFailGraph {evalResultsForGraphs} /> -->
	</div>
</div>
