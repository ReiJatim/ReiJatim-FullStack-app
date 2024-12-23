import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Real Estate Indonesia Jatim | Official Website",
  description: "Discover the official website of Real Estate Indonesia Jatim, your trusted partner in property and real estate solutions.",
  icons: {
    icon: '/REILOGO.svg',
    apple: '/REILOGO.svg', // For Apple touch icons
  },
  keywords: ["Real Estate", "Indonesia", "Jatim", "Property", "Real Estate Indonesia Jatim", "reijatim"],
  authors: [{ name: "Real Estate Indonesia Jatim", url: "https://reijatim.com" }],
  openGraph: {
    title: "Real Estate Indonesia Jatim | Official Website",
    description: "Discover the official website of Real Estate Indonesia Jatim, your trusted partner in property and real estate solutions.",
    url: "https://reijatim.com",
    siteName: "Real Estate Indonesia Jatim",
    images: [
      {
        url: "/REILOGO.svg",
        width: 800,
        height: 600,
        alt: "Real Estate Indonesia Jatim Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@realestatejatim",
    creator: "@realestatejatim",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/REILOGO.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/REILOGO.svg" />

        {/* Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Real Estate Indonesia Jatim | Official Website" />
        <meta property="og:description" content="Discover the official website of Real Estate Indonesia Jatim, your trusted partner in property and real estate solutions." />
        <meta property="og:image" content="/REILOGO.svg" />
        <meta property="og:url" content="https://reijatim.com" />
        <meta property="og:site_name" content="Real Estate Indonesia Jatim" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@realestatejatim" />
        <meta name="twitter:creator" content="@realestatejatim" />
        <meta name="twitter:title" content="Real Estate Indonesia Jatim | Official Website" />
        <meta name="twitter:description" content="Discover the official website of Real Estate Indonesia Jatim, your trusted partner in property and real estate solutions." />
        <meta name="twitter:image" content="/REILOGO.svg" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
