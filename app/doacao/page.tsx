"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Copy, Check, ArrowLeft, Phone, Mail } from "lucide-react";

// Dados reais
const PIX_KEY = ""; // (opcional) código copia-e-cola do QR se houver
const PIX_COPY_KEY = "29.578.741/0001-36"; // Chave PIX (CNPJ)
const BANK_NAME = "Banco 197";
const AGENCIA = "0001";
const CONTA = "423843630";
const CNPJ = "29.578.741/0001-36";
const WHATSAPP_TEL = "+556584451308";
const EMAIL = "presidente@institutosaopio.org.br";

export default function DoacaoPage() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Header shadow on scroll
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Theme toggle (light/dark)
    useEffect(() => {
        const stored = window.localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
            setTheme(stored);
            document.documentElement.classList.toggle("dark", stored === "dark");
        } else {
            document.documentElement.classList.add("dark");
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        window.localStorage.setItem("theme", next);
    };

    const copyPix = async () => {
        try {
            await navigator.clipboard.writeText(PIX_COPY_KEY);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error(e);
        }
    };

    const copyText = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#0f1226]">
            {/* Header */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "backdrop-blur-md bg-[#17ace2]/90 dark:bg-[#0f1226]/70 shadow-lg shadow-black/10 border-b border-white/20 dark:border-white/10"
                    : "bg-[#17ace2] dark:bg-[#33366b] border-b border-white/20 dark:border-[#1a1a2a]"
                    }`}
            >
                <nav className="container mx-auto px-4 md:px-6 py-2">
                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex-1 flex justify-center md:justify-start">
                            <Link
                                href="/"
                                aria-label="Ir para a Home"
                                className="relative w-40 h-16 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/30 dark:ring-white/10 bg-white/10"
                            >
                                <Image
                                    src="/logo_lacre_mais_visao.jpg"
                                    alt="Logo Lacre Mais Visão"
                                    fill
                                    className="object-contain"
                                />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-2 ml-auto">
                            <Link href="/#about" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                                Sobre
                                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
                            </Link>
                            <Link href="/#how-it-works" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                                Como Funciona
                                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
                            </Link>
                            <Link href="/#impact" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                                Nosso Impacto
                                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
                            </Link>
                            <Link href="/parceiros" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                                Parceiros
                                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
                            </Link>
                            <Link href="/contato" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                                Contato
                                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
                            </Link>
                            <div className="mx-2 h-6 w-px bg-white/30" />
                            <button
                                aria-label="Alternar tema claro/escuro"
                                onClick={toggleTheme}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 dark:hover:bg-white/5"
                                title={theme === "dark" ? "Tema: Escuro" : "Tema: Claro"}
                            >
                                {theme === "dark" ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5 text-white" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center ml-2">
                            <button
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                aria-label="Abrir menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-2 space-y-2 rounded-xl bg-[#17ace2]/95 dark:bg-[#0f1226]/80 p-4 shadow-xl ring-1 ring-white/20">
                            <Link href="/#about" className="block w-full text-left text-white/95 hover:text-white">Sobre</Link>
                            <Link href="/#how-it-works" className="block w-full text-left text-white/95 hover:text-white">Como Funciona</Link>
                            <Link href="/#impact" className="block w-full text-left text-white/95 hover:text-white">Nosso Impacto</Link>
                            <Link href="/parceiros" className="block w-full text-left text-white/95 hover:text-white">Parceiros</Link>
                            <Link href="/contato" className="block w-full text-left text-white/95 hover:text-white">Contato</Link>
                            <div className="flex justify-center pt-2">
                                <button
                                    aria-label="Alternar tema claro/escuro"
                                    onClick={toggleTheme}
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 dark:hover:bg-white/5"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </nav>
                <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-[#17ace2] via-white/60 to-[#1da5d9] dark:from-[#8fcde8] dark:via-white/10 dark:to-[#33366b]" />
            </header>

            {/* Spacing below header */}
            <div className="pt-28" />

            {/* Title */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33366b] dark:text-[#f3f1f1]">
                        Faça sua Doação
                    </h1>
                    <p className="mt-2 text-[#33366b]/80 dark:text-white/70 max-w-2xl mx-auto">
                        Cada contribuição ajuda a transformar a visão de crianças e adolescentes. Obrigado por apoiar nossa campanha!
                    </p>
                </div>
            </section>

            {/* Donation blocks */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* PIX */}
                    <div className="rounded-2xl p-6 ring-1 ring-[#17ace2]/20 bg-gradient-to-b from-white to-[#f3f1f1] dark:from-[#11152c] dark:to-[#0f1226] dark:ring-white/10">
                        <h3 className="text-xl font-bold mb-3 text-[#33366b] dark:text-[#f3f1f1]">Doe via PIX</h3>
                        <p className="text-sm text-[#33366b]/80 dark:text-white/70 mb-3">Copie a <strong>chave PIX (CNPJ)</strong> abaixo e cole no seu app do banco.</p>
                        {/* Key box: PIX key fully visible, copy button below */}
                        <div className="rounded-xl ring-1 ring-[#17ace2]/30 bg-white/90 dark:bg-[#0f1226] p-4 flex flex-col items-center gap-3">
                            <code className="font-mono text-lg tracking-wide text-center text-[#33366b] dark:text-[#f3f1f1] break-words w-full">
                                {PIX_COPY_KEY}
                            </code>
                            <button
                                onClick={() => copyText(PIX_COPY_KEY)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#17ace2] text-white hover:bg-[#1da5d9]"
                                aria-label="Copiar chave PIX"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'Copiado' : 'Copiar'}
                            </button>
                        </div>
                        {/* Help text */}
                        <p className="text-xs mt-3 text-[#33366b]/70 dark:text-white/60">
                            Dica: no campo de <em>chave</em> do PIX, selecione <strong>CNPJ</strong> e cole <strong>{PIX_COPY_KEY}</strong>.
                        </p>
                    </div>

                    {/* Transferência Bancária */}
                    <div className="rounded-2xl p-6 ring-1 ring-[#17ace2]/20 bg-gradient-to-b from-white to-[#f3f1f1] dark:from-[#11152c] dark:to-[#0f1226] dark:ring-white/10">
                        <h3 className="text-xl font-bold mb-2 text-[#33366b] dark:text-[#f3f1f1]">Transferência Bancária</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="col-span-1 sm:col-span-2">
                                <dt className="font-semibold text-[#33366b] dark:text-white/90">Banco</dt>
                                <dd className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-md bg-white/70 dark:bg-[#0f1226] ring-1 ring-[#17ace2]/20">{BANK_NAME}</span>
                                    <button onClick={() => copyText(BANK_NAME)} className="p-2 rounded-md ring-1 ring-[#17ace2]/30 hover:bg-[#17ace2]/10">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-[#33366b] dark:text-white/90">Agência</dt>
                                <dd className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-md bg-white/70 dark:bg-[#0f1226] ring-1 ring-[#17ace2]/20">{AGENCIA}</span>
                                    <button onClick={() => copyText(AGENCIA)} className="p-2 rounded-md ring-1 ring-[#17ace2]/30 hover:bg-[#17ace2]/10">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </dd>
                            </div>
                            <div>
                                <dt className="font-semibold text-[#33366b] dark:text-white/90">Conta</dt>
                                <dd className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-md bg-white/70 dark:bg-[#0f1226] ring-1 ring-[#17ace2]/20">{CONTA}</span>
                                    <button onClick={() => copyText(CONTA)} className="p-2 rounded-md ring-1 ring-[#17ace2]/30 hover:bg-[#17ace2]/10">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </dd>
                            </div>
                            <div className="sm:col-span-2">
                                <dt className="font-semibold text-[#33366b] dark:text-white/90">CNPJ (favorecido: Instituto São Pio)</dt>
                                <dd className="flex items-center gap-2">
                                    <span className="px-2 py-1 rounded-md bg-white/70 dark:bg-[#0f1226] ring-1 ring-[#17ace2]/20">{CNPJ}</span>
                                    <button onClick={() => copyText(CNPJ)} className="p-2 rounded-md ring-1 ring-[#17ace2]/30 hover:bg-[#17ace2]/10">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </dd>
                            </div>
                        </dl>
                        <p className="text-xs mt-3 text-[#33366b]/70 dark:text-white/60">Envie o comprovante por e-mail ou WhatsApp para identificarmos sua doação.</p>
                    </div>

                    {/* Fale com a gente */}
                    <div className="rounded-2xl p-6 ring-1 ring-[#17ace2]/20 bg-gradient-to-b from-white to-[#f3f1f1] dark:from-[#11152c] dark:to-[#0f1226] dark:ring-white/10">
                        <h3 className="text-xl font-bold mb-2 text-[#33366b] dark:text-[#f3f1f1]">Fale com a gente</h3>
                        <p className="text-sm mb-4 text-[#33366b]/80 dark:text-white/70">Tem outra forma de apoiar? Vamos conversar.</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={`https://wa.me/${WHATSAPP_TEL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#17ace2] text-white hover:bg-[#1da5d9]"
                            >
                                <Phone className="h-4 w-4" /> WhatsApp
                            </Link>
                            <Link
                                href={`mailto:${EMAIL}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md ring-1 ring-[#17ace2]/40 text-[#17ace2] hover:bg-[#17ace2]/10 dark:text-[#8fcde8] dark:ring-white/10"
                            >
                                <Mail className="h-4 w-4" /> E-mail
                            </Link>
                        </div>
                        <p className="text-xs mt-3 text-[#33366b]/70 dark:text-white/60">
                            Também recebemos **lacres físicos**. Veja pontos de coleta na página de Contato.
                        </p>
                    </div>
                </div>

                <div className="h-16" />
            </section>
        </main>
    );
}
