class Color {
	constructor(private readonly color: string) {}

	public get() {
		return this.color
	}

	public getRGB(): {r: number, g: number, b: number} | null {
		return this.hexToRgb(this.color);
	}

	public rgbToHex(r: number, g: number, b: number) {
		return `#` + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	public hexToRgb(hex: string): {r: number, g: number, b: number} | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
		  r: parseInt(result[1], 16),
		  g: parseInt(result[2], 16),
		  b: parseInt(result[3], 16)
		} : null;
	  }
}

export class Colors {
	public static readonly primary = new Color('#00334E');
	public static readonly secondary = new Color('#145374');
	public static readonly tertiary  = new Color('#3a506b');
	public static readonly quaternary = new Color('#5bc0be');
	public static readonly quinary = new Color('#6fffe9');
}
