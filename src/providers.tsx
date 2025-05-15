'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import SmoothScrollProvider from './components/SmoothScrollProvider';

export function Providers({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
			<SmoothScrollProvider>
				{children}
			</SmoothScrollProvider>
		</NextThemesProvider>
	);
}