import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "CareerTrust - AI Career Guidance",
  description: "Intelligent career insights and analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
