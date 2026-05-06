import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Taha Jasim | Mechatronics Engineer",
  description:
    "Personal portfolio of Taha Jasim Mohammed — Mechatronics Engineering student, graphic designer, UI/UX designer, and developer from Mosul, Iraq.",
  keywords: [
    "Mechatronics Engineer",
    "Graphic Designer",
    "UI Designer",
    "Mosul",
    "Iraq",
    "Taha Jasim",
    "Portfolio",
  ],
  openGraph: {
    title: "Taha Jasim | Mechatronics Engineer",
    description: "Engineering precision meets artistic creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-body antialiased bg-obsidian-950 text-slate-100 overflow-x-hidden">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(8,14,24,0.9)",
                color: "#e8eaf0",
                border: "1px solid rgba(0,229,255,0.2)",
                backdropFilter: "blur(20px)",
                fontFamily: "DM Sans, sans-serif",
              },
              success: {
                iconTheme: { primary: "#00e5ff", secondary: "#020408" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
