import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lacre Mais Visão - Olhar de Amor',
  description: 'Colete lacres de alumínio e ajude a transformar vidas. Cada lacre doado vira óculos de grau para quem precisa.',
  keywords: 'lacre, doação, solidariedade, óculos, reciclagem, alumínio, visão',
  openGraph: {
    title: 'Lacre Mais Visão - Olhar de Amor',
    description: 'Cada lacre doado se transforma em óculos de grau para crianças e pessoas que precisam de uma nova visão.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/logo_lacre_mais_visao_menor.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" >
      <body className={`${inter.className} bg-white text-black dark:bg-gray-900 dark:text-white`}>{children}</body>
    </html>
  );
}