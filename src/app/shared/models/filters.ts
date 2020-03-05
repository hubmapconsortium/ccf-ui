export interface Filter {
    type: string;
    label: string;
    options: string[] | [number, number];
    selection: (string | number)[];
}
