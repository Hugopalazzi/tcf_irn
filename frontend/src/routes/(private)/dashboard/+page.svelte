<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	const bem = createBEM('dashboard');
</script>

<div class={bem('container')}>
	<div class={bem('welcome-card')}>
		<img src="/assets/images/user-profile.jpg" class={bem('user-profile-image')} alt="user profile" />
		<p class={bem('welcome-label')}>Welcome back, John!</p>
	</div>
	<h1>daiujhfdhauz

	</h1>
	<span>
		faàjuhfoaz
	</span>
</div>

<style lang="scss">
	.dashboard {
		&__container {
		}

		&__welcome-card {
			border-radius: 60px;
			background: rgba(30, 12, 91, 0.05);
			display: inline-flex;
			padding: 8px 20px 8px 8px;
			justify-content: center;
			align-items: center;
			gap: 16px;
		}

		&__welcome-label {
			color: #1e0c5b;
			font-size: 16px;
			font-style: normal;
			font-weight: 700;
			line-height: 24px;
		}

		&__user-profile-image{
			border-radius: 46px;
			width: 46px;
			height: 46px;
		}
	}
</style>
