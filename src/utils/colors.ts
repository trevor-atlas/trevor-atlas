interface RGBColor {
	r: number;
	g: number;
	b: number;
}

export class Color {
	private readonly rgb: RGBColor | null;

	constructor(private readonly color: string) {
		this.rgb = this.hexToRgb(color);
	}

	public get() {
		return this.color;
	}

	public static lighten(color: string, percentage: number) {
		const R = parseInt(color.substring(1, 3), 16);
		const G = parseInt(color.substring(3, 5), 16);
		const B = parseInt(color.substring(5, 7), 16);
		const curr_total_dark = 255 * 3 - (R + G + B);

		// calculate how much of the current darkness comes from the different channels
		const RR = (255 - R) / curr_total_dark;
		const GR = (255 - G) / curr_total_dark;
		const BR = (255 - B) / curr_total_dark;

		// calculate how much darkness there should be in the new color
		const new_total_dark = (255 - 255 * (percentage / 100)) * 7;

		// make the new channels contain the same % of available dark as the old ones did
		const NR = 255 - Math.round(RR * new_total_dark);
		const NG = 255 - Math.round(GR * new_total_dark);
		const NB = 255 - Math.round(BR * new_total_dark);

		const RO =
			NR.toString(16).length === 1
				? '0' + NR.toString(16)
				: NR.toString(16);
		const GO =
			NG.toString(16).length === 1
				? '0' + NG.toString(16)
				: NG.toString(16);
		const BO =
			NB.toString(16).length === 1
				? '0' + NB.toString(16)
				: NB.toString(16);

		return '#' + RO + GO + BO;
	}

	public getRGBAString(alpha = 1) {
		if (!this.rgb) return '';
		const { r, g, b } = this.rgb;
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	public getRGBString() {
		if (!this.rgb) return '';
		const { r, g, b } = this.rgb;
		return `rgb(${r}, ${g}, ${b})`;
	}

	public getRGB(): RGBColor | null {
		return this.rgb;
	}

	public rgbToHex({ r, g, b }: RGBColor) {
		return (
			`#` + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	}

	public hexToRgb(hex: string): RGBColor | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: null;
	}
}

export class Colors {
	public static russianGreen = new Color('#6b8f71');
	public static primaryText = new Color('#eef0f2');
	public static secondaryText = new Color('#E1E8ED');
	public static primaryBG = new Color('#171923');
	public static secondaryBG = new Color('#182026');
	public static links = new Color('#00a6fb');
	public static linksHover = new Color('#8a4fff');
	public static readonly primary = new Color('#182026');
	public static readonly lines = new Color('#48AFF0');
}
