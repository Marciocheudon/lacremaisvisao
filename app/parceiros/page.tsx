"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

// Ajuste os caminhos das imagens dos parceiros conforme sua pasta /public
const partnerImages = [
    "/instituto_sao_pio.png",
];

export default function ParceirosPage() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            // default dark (alinhado ao site)
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

    // ===== Carousel =====
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoplay = () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % partnerImages.length);
        }, 6000);
    };

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    const goTo = (i: number) => {
        const len = partnerImages.length;
        const next = (i + len) % len;
        setCurrentIndex(next);
        startAutoplay();
    };

    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, []);

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
                            <Link href="/" aria-label="Ir para a Home" className="relative w-40 h-16 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/30 dark:ring-white/10 bg-white/10">
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
                            <Link href="/#contato" className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
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

            {/* Page header spacing */}
            <div className="pt-28" />

            {/* Title */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33366b] dark:text-[#f3f1f1]">
                        Nossos Parceiros
                    </h1>
                    <p className="mt-2 text-[#33366b]/80 dark:text-white/70 max-w-2xl mx-auto">
                        Quem caminha junto para transformar pequenos gestos em grandes futuros.
                    </p>
                </div>
            </section>

            {/* Carousel */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden rounded-2xl ring-1 ring-[#17ace2]/20 dark:ring-white/10 bg-white dark:bg-[#11152c]">
                    {partnerImages.map((img, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 transition-transform duration-700 ease-out flex items-center justify-center"
                            style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
                        >
                            <Image
                                src={img}
                                alt={`Parceiro ${index + 1}`}
                                width={900}
                                height={300}
                                className="w-auto h-40 md:h-56 object-contain"
                                priority={index === 0}
                            />
                        </div>
                    ))}

                    {/* Controls */}
                    <button
                        aria-label="Slide anterior"
                        onClick={() => goTo(currentIndex - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/30 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        aria-label="Próximo slide"
                        onClick={() => goTo(currentIndex + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/30 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm ring-1 ring-white/30">
                        {partnerImages.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Ir para slide ${i + 1}`}
                                onClick={() => goTo(i)}
                                className={`w-2.5 h-2.5 rounded-full transition ${i === currentIndex ? 'bg-white' : 'bg-white/60 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="h-16" />
        </main>
    );
}
