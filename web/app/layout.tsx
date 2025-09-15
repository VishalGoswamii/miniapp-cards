import './globals.css'; // This line expects globals.css in the same directory

export const metadata = {
  title: 'Miniapp Cards', // You can adjust this title
  description: 'Your Farcaster Mini App', // You can adjust this description
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