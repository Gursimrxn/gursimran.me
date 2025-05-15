'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import SmoothScrollProvider from './SmoothScrollProvider';

export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
			<SmoothScrollProvider>
				{children}
			</SmoothScrollProvider>
		</NextThemesProvider>
	);
}
