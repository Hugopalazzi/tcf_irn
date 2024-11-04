<script>
	import { Icon, User } from 'svelte-hero-icons';
</script>

<div class="topnav">
	<div class="left-links">
		<a class="active" href="#home">Home</a>
		<a href="comprehension-orale">Listening comprehension</a>
		<a href="comprension-ecrite">Written comprehension</a>
		<a href="expression-ecrite">Written expression</a>
	</div>

	<a href="mon-compte"><Icon src={User} size="18" /></a>
</div>
<slot />

<style lang="scss">
	.topnav {
		display: flex;
		flex-direction: column-reverse;
		margin: 0 rem(50);
		overflow: hidden;

		a {
			float: left;
			text-align: center;
			align-self: center;
            line-height: normal;
			padding: rem(4) rem(8);
			margin: 0 rem(6);
			margin-bottom: rem(10);
			&:hover {
				font-weight: 600;
			}
		}

		.left-links {
			display: flex;
			flex-direction: column;

			@include min-width(tablet) {
				flex-direction: row;
			}
		}

		@include min-width(tablet) {
			justify-content: space-between;
			border-bottom: rem(1.5) solid var(--secondary-500);
			flex-direction: row;
			justify-content: space-between;
		}
	}

	:global(.topnav a svg:hover) {
		zoom: 1.1;
	}

	.topnav a.active {
		border-bottom: rem(3) solid var(--correct-input);
	}
</style>
