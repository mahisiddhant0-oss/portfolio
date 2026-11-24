import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: "Mahi Siddhant Sharma — Software Developer",
  description: "Mahi Siddhant Sharma is a software developer focused on full-stack and backend engineering, API architecture, and practical systems.",
  applicationName: "Mahi Siddhant Sharma — Portfolio",
  keywords: ["Mahi Siddhant Sharma", "software developer", "backend engineering", "full-stack development", "portfolio"],
  openGraph: {
    title: "Mahi Siddhant Sharma — Software Developer",
    description: "Full-stack and backend engineering. Explore projects, system architecture, and the work behind them.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mahi Siddhant Sharma — Software Developer" }],
  },
  twitter: { card: "summary_large_image", title: "Mahi Siddhant Sharma — Software Developer", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}
