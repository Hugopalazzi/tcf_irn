// bem.js
export function createBEM(block: string) {
	return function (element = '', modifiers = {}) {
		let className = block;

		if (element) {
			className += `__${element}`;
		}

		const modifierClasses = Object.entries(modifiers)
			.filter(([_, value]) => Boolean(value))
			.map(([key, value]) => {
				if (typeof value === 'string') {
					return `${block}${element ? `__${element}` : ''}--${key}_${value}`;
				}
				return `${block}${element ? `__${element}` : ''}--${key}`;
			});

		return [className, ...modifierClasses].join(' ');
	};
}
