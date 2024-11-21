<script lang="ts">
	interface Props {
		goodAnwser: number;
	}

	let { goodAnwser }: Props = $props();
</script>

<div class="progress-wrapper">
	<div
		style="width: {(100 * (goodAnwser ?? 0)) / 20}%; "
		class="container"
		class:low={goodAnwser <= 7}
		class:medium={goodAnwser <= 13}
		class:good={goodAnwser > 13}
	></div>
	<span class="progress-text">{goodAnwser}/20</span>
</div>

<style lang="scss">
	.progress-wrapper {
		width: 100%; /* Largeur du conteneur */
		display: flex;
		align-items: center; /* Aligner verticalement */
		display: flex; /* Dispose la barre et le texte en ligne */

	}
	.container {
		width: 50%;
		height: rem(12);
		border-radius: rem(12);
		transition: width 0.3s ease;
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
		margin-left: rem(12);
		font-size: rem(12);
		color: var(--white);
		font-weight: bold;
		flex-shrink: 0;
	}
</style>
