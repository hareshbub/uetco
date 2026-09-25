export const metadata = {
  title: 'UETCO',
  description: 'Unified Environment for Theories and Creative Output'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
