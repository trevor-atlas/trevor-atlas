interface RGBColor {
	r: number;
	g: number;
	b: number
}

class Color {
	private readonly rgb: RGBColor | null;

	constructor(private readonly color: string) {
		this.rgb = this.hexToRgb(color);
	}

	public get() {
		return this.color
	}

	public getRGBAString(alpha: number = 1) {
		if (!this.rgb) return '';
		const { r, g, b } = this.rgb;
		return `rgba(${r}, ${g}, ${b}, ${alpha})`
	}

	public getRGBString() {
		if (!this.rgb) return '';
		const { r, g, b } = this.rgb;
		return `rgb(${r}, ${g}, ${b})`
	}

	public getRGB(): RGBColor | null {
		return this.rgb;
	}

	public rgbToHex({r, g, b}: RGBColor) {
		return `#` + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	public hexToRgb(hex: string): RGBColor | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
		  r: parseInt(result[1], 16),
		  g: parseInt(result[2], 16),
		  b: parseInt(result[3], 16)
		} : null;
	  }
}

export class Colors {
	public static primaryText = new Color('#F5F8FA');
	public static secondaryText = new Color('#E1E8ED');
	public static primaryBG = new Color('#202B33');
	public static secondaryBG = new Color('#30404D');
	public static links = new Color('#3d99ff');
	public static linksHover = new Color('#5b30be');
	public static readonly primary = new Color('#182026');
	public static readonly lines = new Color('#48AFF0');
}
