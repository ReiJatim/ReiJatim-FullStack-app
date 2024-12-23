import { ThemeProvider } from '@/components/ThemeProvider';
import '../globals.css';

// This layout will apply to all routes within /admin/*
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Do not render Navbar for admin paths */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
