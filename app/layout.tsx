import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shards of Arventyr: Expedition',
  description: 'Persistent hex-map adventure prototype'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
