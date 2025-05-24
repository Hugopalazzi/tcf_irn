<script lang="ts">
	interface Props {
		goodAnwser: number;
	}

	let { goodAnwser }: Props = $props();
</script>

<div class="progress-wrapper">
	<div
		style="width: {(100 * (goodAnwser ?? 0)) / 20}%; "
		class="progress-bar"
		class:low={goodAnwser <= 7}
		class:medium={goodAnwser <= 13 && goodAnwser > 7}
		class:good={goodAnwser > 13}>
	</div>
	<span class="progress-text">{goodAnwser}/20</span>
</div>

<style lang="scss">
	.progress-wrapper {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: rem(8);
		margin-top: rem(4);

		.progress-bar {
			height: rem(12);
			border-radius: rem(12);
			&.low {
				background: linear-gradient(90deg, #e42a6c 0%, #c393ff 100%);
			}

			&.medium {
				background: linear-gradient(90deg, #ff8669 0%, #ffeba2 100%);
			}

			&.good {
				background: linear-gradient(90deg, #2acee4 0%, #93ffb1 100%);
			}
		}
		.progress-text {
			color: var(--white);
			font-size: rem(12);
			font-weight: bold;
			white-space: nowrap;
		}
	}
</style>
