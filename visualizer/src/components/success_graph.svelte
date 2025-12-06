<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { scaleBand } from 'd3-scale';
	import { BarChart } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';

	let { evalResultsForGraphs } = $props();
</script>

<div
	class="w-full hidden md:inline-block border pr-4 py-4 rounded-lg bg-emerald-50 border-emerald-500"
>
	<Chart.Container
		config={{
			successCount: { label: 'Success', color: '#000000' }
		}}
	>
		<BarChart
			labels={{ offset: -25, class: 'stroke-none fill-background!' }}
			data={evalResultsForGraphs}
			orientation="horizontal"
			yScale={scaleBand().padding(0.0)}
			y="model"
			axis="y"
			series={[{ key: 'successCount', label: 'Success', color: '#10b981' }]}
			y1Scale={scaleBand().paddingInner(0.2)}
			seriesLayout="group"
			grid={false}
			rule={false}
			tooltip={false}
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
						// textAnchor: 'end',
						// dx: -30
						// // class: 'stroke-none fill-background!'
					},
					tickLength: 0
				}
			}}
		>
			<!-- {#snippet tooltip()}
				<Chart.Tooltip indicator="dashed" />
			{/snippet} -->
		</BarChart>
	</Chart.Container>
</div>
