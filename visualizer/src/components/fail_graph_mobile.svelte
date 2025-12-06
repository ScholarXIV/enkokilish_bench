<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { scaleBand } from 'd3-scale';
	import { BarChart } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';

	let { evalResultsForGraphs } = $props();
</script>

<div class="w-full inline-block md:hidden border pr-4 py-4 rounded-lg bg-red-50 border-red-500">
	<Chart.Container
		config={{
			failCount: { label: 'Fail', color: '#000000' }
		}}
		class="max-h-[300px] w-full"
	>
		<BarChart
			labels={{ offset: -30, class: 'stroke-none fill-background!' }}
			data={evalResultsForGraphs}
			orientation="horizontal"
			yScale={scaleBand().padding(0.0)}
			y="model"
			axis="y"
			series={[{ key: 'failCount', label: 'Fail', color: '#f87171' }]}
			y1Scale={scaleBand().paddingInner(0.2)}
			seriesLayout="group"
			grid={false}
			rule={false}
			props={{
				bars: {
					stroke: 'none',
					radius: 5,
					rounded: 'all',
					initialWidth: 0,
					initialX: 0,
					motion: {
						x: { type: 'tween', duration: 500, easing: cubicInOut },
						width: { type: 'tween', duration: 500, easing: cubicInOut }
					}
				},
				yAxis: {
					tickLabelProps: {
						textAnchor: 'start',
						dx: 6,
						class: 'stroke-none fill-background!'
					},
					tickLength: 0
				}
			}}
		>
			{#snippet tooltip()}
				<Chart.Tooltip indicator="dashed" />
			{/snippet}
		</BarChart>
	</Chart.Container>
</div>
