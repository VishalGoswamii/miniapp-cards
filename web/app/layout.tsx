import './globals.css';

export const metadata = {
  title: 'Miniapp Cards',
  description: 'Your Farcaster Mini App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}