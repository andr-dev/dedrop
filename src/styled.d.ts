import 'styled-components';

export type GapOption = 4 | 6 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 56 | 64;
export type SizeOption = 0 | GapOption | 96 | 128 | 192 | 256;

declare module 'styled-components' {
    export interface DefaultTheme {
        layout: {
        },
        colors: {
            primaryLight: string,
            primary: string,
            primaryDark: string,
        },
        fonts: string[],
        fontSizes: {
            small: string,
            medium: string,
            large: string
        }
    }
}
