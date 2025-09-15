import './globals.css'; // Assuming you have a globals.css in your app folder

export const metadata = {
  title: 'Mini App Cards',
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