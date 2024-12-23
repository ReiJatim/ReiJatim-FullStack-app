import Navbar from "@/components/Navbar"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
            <Navbar/>
            {children}
        </body>
      </html>
    )
  }
  