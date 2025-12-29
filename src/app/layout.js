import "./global.css";
import Script from 'next/script'

export const metadata = {
  title: {
      template: "%s | MulyonoGPT",
      default: "MulyonoGPT"
  },
  description: "MulyonoGPT - AI Pria Solo Untuk Membantu Kebutuhanmu. Mengobrol, berbincang dan bertanya tentang berbagai topik dengan AI Asli Solo!\n\n⚠️ HANYA UNTUK HIBURAN SEMATA, TIDAK ADA MAKSUD LAIN ⚠️",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="id" className="overflow-x-hiddens">
      <head>
      <script src="https://kit.fontawesome.com/c2165b4022.js" crossOrigin="anonymous"></script>
       <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_circle_down" />
      </head>
      <body className={`antialiased`} data-theme="business">
        {children}

<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<Script src="/aos.js" />
<Script src="/navbar.js" />
      </body>
    </html>
    </>
  );
}
