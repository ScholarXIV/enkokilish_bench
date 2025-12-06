<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';
	import { scaleBand } from 'd3-scale';
	import { BarChart } from 'layerchart';
	import { cubicInOut } from 'svelte/easing';

	let { evalResults } = $props();
</script>

<Chart.Container
	config={{
		successCount: { label: 'Success', color: '#000000' },
		failCount: { label: 'Fail', color: '#000000' }
	}}
	class="min-h-[300px] w-full"
>
	<BarChart
		labels={{ offset: 10 }}
		data={evalResults}
		orientation="horizontal"
		yScale={scaleBand().padding(0.2)}
		y="model"
		axis="y"
		series={[
			{ key: 'successCount', label: 'Success', color: 'black' },
			{ key: 'failCount', label: 'Fail', color: '#000000' }
		]}
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
				minWidth: 2,
				motion: {
					x: { type: 'tween', duration: 500, easing: cubicInOut },
					width: { type: 'tween', duration: 500, easing: cubicInOut }
				}
			}
			// yAxis: {
			// 	tickLabelProps: {
			// 		textAnchor: 'start',
			// 		dx: 6,
			// 		class: 'stroke-none fill-background!'
			// 	},
			// 	tickLength: 0
			// }
		}}
	>
		{#snippet tooltip()}
			<Chart.Tooltip indicator="dashed" />
		{/snippet}
	</BarChart>
</Chart.Container>
