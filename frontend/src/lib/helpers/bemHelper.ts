type Modifiers = Record<string, boolean | string | number | undefined | null>;
type Options = {
	modifiers?: Modifiers;
	extra?: string | string[];
};

function isOptions(obj: any): obj is Options {
	return obj && (obj.modifiers !== undefined || obj.extra !== undefined);
}

function normalizeExtra(extra?: string | string[] | null): string[] {
	if (!extra) return [];
	if (Array.isArray(extra)) return extra.filter(Boolean);
	return [extra];
}

export function createBEM(block: string) {
	function bem(element?: string, options?: Modifiers | Options): string {
		let base = block;
		if (element) base += `__${element}`;

		const classes = [base];

		let modifiers: Modifiers = {};
		let extra: string[] = [];

		if (isOptions(options)) {
			modifiers = options.modifiers || {};
			extra = normalizeExtra(options.extra);
		} else if (typeof options === 'object' && options !== null) {
			modifiers = options;
		}

		Object.entries(modifiers).forEach(([key, value]) => {
			if (value === false || value == null) return;
			if (typeof value === 'boolean') {
				classes.push(`${base}--${key}`);
			} else {
				classes.push(`${base}--${key}_${value}`);
			}
		});

		return [...classes, ...extra].join(' ');
	}

	bem.mix = (...args: Array<string | undefined | false | null>) => {
		return args.filter(Boolean).join(' ');
	};

	return bem;
}
