import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>        
        <header className="p-4 flex justify-end">
          <ThemeToggle />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
