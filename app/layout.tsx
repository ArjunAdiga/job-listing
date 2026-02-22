import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white p-4">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
