export interface ColorScheme {
    type: 'discrete' | 'gradient';
    name: string;
    colors: string[];
    positions: number[];
}
