<script lang="ts">
	interface Props {
		responsive?: boolean;
	}

	const { responsive = false }: Props = $props();
</script>

<svg width="20" height="20" class:responsive viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
	<g clip-path="url(#clip0_1_27)">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M18.3124 9.17996L2.63436 0.128008C2.49096 0.0445404 2.32813 0.000284538 2.16221 -0.000312805H2.15947C1.99347 0.000346513 1.83055 0.0446251 1.68705 0.128086C1.54254 0.210502 1.42256 0.329889 1.33943 0.473992C1.2563 0.618096 1.21301 0.781725 1.21401 0.948086V19.0518C1.21335 19.2183 1.25669 19.382 1.33964 19.5263C1.42258 19.6706 1.54219 19.7905 1.68636 19.8737C1.83052 19.957 1.99412 20.0006 2.16058 20.0003C2.32705 20 2.49048 19.9557 2.63432 19.8719L18.3124 10.8199C18.4564 10.7368 18.5759 10.6173 18.659 10.4734C18.7421 10.3294 18.7859 10.1661 18.7859 9.99994C18.7859 9.83373 18.7421 9.67045 18.659 9.52652C18.5759 9.38258 18.4564 9.26306 18.3124 9.17996Z"
			fill="black" />
	</g>
	<defs>
		<clipPath id="clip0_1_27">
			<rect width="20" height="20" fill="white" />
		</clipPath>
	</defs>
</svg>

<style lang="scss">
	.responsive {
		width: 14px !important;
		height: 14px !important;
	}

	@media (min-width: $breakpoint-mobile) {
		.responsive {
			width: 24px !important;
			height: 24px !important;
		}
	}
</style>
