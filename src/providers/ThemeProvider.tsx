'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import { SmoothScrollProvider, ClickSparkProvider } from '@/providers';

export default function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="light">
			<SmoothScrollProvider>
				<ClickSparkProvider>
					{children}
				</ClickSparkProvider>
			</SmoothScrollProvider>
		</NextThemesProvider>
	);
}
