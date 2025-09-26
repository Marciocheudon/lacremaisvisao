"use client";

import { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Phone, Mail, Facebook, Instagram, ChevronDown, Recycle, Target, Handshake, Eye, Lightbulb, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Carousel state and effect
  const carouselImages = ["/1.png", "/2.png", "/garrafaspetmontinho.jpeg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 8000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const goTo = (i: number) => {
    const len = carouselImages.length;
    const next = (i + len) % len;
    setCurrentIndex(next);
    // reinicia o autoplay após interação manual
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // initialize theme from localStorage or prefers-color-scheme
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches : true;
    const initial = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal--visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f1f1] to-[#ffffff] dark:from-[#33366b] dark:to-[#1a1a2a]">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'backdrop-blur-md bg-[#17ace2]/90 dark:bg-[#0f1226]/70 shadow-lg shadow-black/10 border-b border-white/20 dark:border-white/10'
          : 'bg-[#17ace2] dark:bg-[#33366b] border-b border-white/20 dark:border-[#1a1a2a]'
          }`}
      >
        <nav className="container mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="relative w-40 h-16 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/30 dark:ring-white/10 bg-white/10">
                <Image
                  src="/logo_lacre_mais_visao.jpg"
                  alt="Logo Lacre Mais Visão"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
              <button onClick={() => scrollToSection('about')} className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                Sobre
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                Como Funciona
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
              </button>
              <button onClick={() => scrollToSection('impact')} className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                Nosso Impacto
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="group relative px-3 py-2 rounded-md text-white/95 hover:text-white transition-colors">
                Contato
                <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-white/80" />
              </button>
              <div className="mx-2 h-6 w-px bg-white/30" />
              <Button
                size="icon"
                aria-label="Alternar tema claro/escuro"
                onClick={toggleTheme}
                className="hover:bg-white/10 dark:hover:bg-white/5"
                title={theme === 'dark' ? 'Tema: Escuro' : 'Tema: Claro'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5 text-white" />
                )}
              </Button>
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
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white/95 hover:text-white">Sobre</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-white/95 hover:text-white">Como Funciona</button>
              <button onClick={() => scrollToSection('impact')} className="block w-full text-left text-white/95 hover:text-white">Nosso Impacto</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white/95 hover:text-white">Contato</button>
              <div className="flex justify-center pt-2">
                <Button
                  size="icon"
                  aria-label="Alternar tema claro/escuro"
                  onClick={toggleTheme}
                  className="hover:bg-white/10 dark:hover:bg-white/5"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Subtle gradient divider at the very bottom of header */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-[#17ace2] via-white/60 to-[#1da5d9] dark:from-[#8fcde8] dark:via-white/10 dark:to-[#33366b]" />
      </header>

      {/* Carousel Section */}
      <section className="w-full h-[500px] relative overflow-hidden bg-white dark:bg-[#33366b] mt-16 md:mt-24">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
          >
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              width={1600}
              height={600}
              className="w-full h-120 object-cover py-20 mx-auto md:h-full md:w-auto md:object-contain md:py-0"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Prev/Next controls */}
        <button
          aria-label="Slide anterior"
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          aria-label="Próximo slide"
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/40 text-white backdrop-blur-sm ring-1 ring-white/30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm ring-1 ring-white/30">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${i === currentIndex ? 'bg-white' : 'bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-2 md:py-16 px-4 bg-[#ffffff] dark:bg-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a] -mt-12 md:mt-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            <div className={`flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center space-x-4 mb-6">

                <div>
                  <p className="text-lg text-[#17ace2] dark:text-[#8fcde8] font-medium">“Pequenos gestos que transformam grandes futuros”</p>
                </div>
              </div>
              <p className="text-lg text-[#33366b] dark:text-[#f3f1f1]/90 mb-8 leading-relaxed">
                O Instituto São Pio, por meio da campanha “Lacre Mais Visão”, arrecada lacres de alumínio nas escolas da rede municipal e os reverte em óculos de grau para alunos em vulnerabilidade social que precisam de correção visual. Participe e ajude a transformar pequenos gestos em grandes futuros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[#17ace2] text-white hover:bg-[#1da5d9] px-8 py-4 text-base font-semibold shadow"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  Deposite Aqui
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#17ace2] text-[#17ace2] hover:bg-[#8fcde8] px-8 py-4 text-base font-semibold"
                  onClick={() => scrollToSection('about')}
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className={`flex-1 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative bg-[#f3f1f1] dark:bg-[#1a1a2a] rounded-[3rem] p-8 border border-[#f3f1f1] dark:border-[#33366b] shadow-lg">
                <div className="text-center">
                  <div className="relative w-60 h-60 mb-6 rounded-[2rem] overflow-hidden shadow-lg mx-auto">
                    <Image
                      src="/logo_lacre_mais_visao_menor.jpg"
                      alt="Mascote Lacre do Bem"
                      fill
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#33366b] dark:text-[#f3f1f1] mb-4">Junte-se ao Movimento!</h3>
                  <p className="text-[#33366b] dark:text-[#f3f1f1] text-base">
                    Cada lacre arrecadado ajuda a garantir óculos de grau para estudantes da rede municipal.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => scrollToSection('about')} className="animate-bounce">
            <ChevronDown className="h-7 w-7 text-[#17ace2] dark:text-[#8fcde8]" />
          </button>
        </div>
      </section>

      {/* Realização Section */}
      <section className="py-14 bg-[#ffffff] dark:bg-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a] text-center">
        <h2 className="text-2xl font-bold text-[#33366b] dark:text-[#f3f1f1] mb-6">Realização: Instituto São Pio</h2>
        <div className="relative h-28 w-56 mx-auto">
          <Image
            src="/instituto_sao_pio.png"
            alt="Logo Instituto São Pio"
            fill
            className="object-contain"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#ffffff] dark:bg-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="container mx-auto px-4 reveal">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-4 mb-6">

              <h2 className="text-4xl font-bold text-[#33366b] dark:text-[#f3f1f1]">Sobre o Lacre Mais Visão</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#17ace2] to-[#1da5d9] mx-auto mb-6"></div>
            <p className="text-xl text-[#33366b] dark:text-[#8fcde8] max-w-3xl mx-auto">
              O Instituto São Pio, por meio da campanha “Lacre Mais Visão”, realiza a arrecadação de lacres de alumínio nas escolas da rede municipal de ensino, revertendo-os em óculos de grau para alunos em vulnerabilidade social que necessitam de correção visual. A iniciativa une sustentabilidade, solidariedade e educação.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#17ace2] reveal">
              <CardContent className="p-8 text-center">

                <h3 className="text-xl font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Coleta Sustentável</h3>
                <p className="text-[#33366b] dark:text-[#8fcde8]">
                  Promovemos a reciclagem de lacres de alumínio, contribuindo para um mundo mais sustentável e consciente.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#e5352e] reveal">
              <CardContent className="p-8 text-center">

                <h3 className="text-xl font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Nova Visão</h3>
                <p className="text-[#33366b] dark:text-[#8fcde8]">
                  Cada lacre doado se transforma em óculos, proporcionando uma nova visão de mundo para quem precisa.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#33366b] reveal">
              <CardContent className="p-8 text-center">

                <h3 className="text-xl font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Solidariedade e Educação</h3>
                <p className="text-[#33366b] dark:text-[#8fcde8]">
                  Engajamos a comunidade escolar para promover cidadania e inclusão, aliando educação, saúde e sustentabilidade.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Você Sabia Que Section */}
      <section className="py-20 bg-gradient-to-br from-[#17ace2] via-[#8fcde8] to-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-[#33366b] rounded-3xl p-8 lg:p-12 shadow-2xl max-w-4xl mx-auto reveal">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="relative w-48 h-48 bg-white rounded-xl flex items-center justify-center mx-auto">
                  <Image
                    src="/mascote.png"
                    alt="Mascote explicando"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="bg-white dark:bg-[#33366b] rounded-2xl p-6 relative">
                  <div className="absolute -left-4 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-white dark:border-r-[#33366b]"></div>
                  <h3 className="text-2xl font-bold text-[#33366b] dark:text-[#f3f1f1] mb-4">Você Sabia Que:</h3>
                  <div className="space-y-3 text-[#33366b]">
                    <p className="text-lg text-[#33366b] dark:text-[#f3f1f1]">
                      Com <span className="font-bold text-[#17ace2]">2280 lacres</span>, é possível encher uma garrafa PET de <span className="font-bold text-[#17ace2]">2 litros</span>?
                    </p>
                    <p className="text-lg text-[#33366b] dark:text-[#f3f1f1]">
                      <span className="font-bold text-[#17ace2]">120 garrafas PET</span> cheias de lacre, equivalem a <span className="font-bold text-[#17ace2]">80 quilos</span> de alumínio?
                    </p>
                    <p className="text-lg text-[#33366b] dark:text-[#f3f1f1]">
                      <span className="font-bold text-[#17ace2]">80 quilos</span> de lacres são trocados por <span className="font-bold text-[#17ace2]">10 óculos</span> para doação
                    </p>
                  </div>
                  <div className="mt-6 p-4 bg-[#8fcde8] dark:bg-[#33366b]/40 rounded-xl text-center">
                    <p className="text-lg font-semibold text-[#33366b] dark:text-[#f3f1f1]">Ou Seja:</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="w-40 h-60 bg-gradient-to-br from-[#17ace2] to-[#1da5d9] rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-3 relative">
                  <Image
                    src="/lacres_mao.jpeg"
                    alt="Garrafa PET"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-[#17ace2]">2280 lacres</div>
              </div>
              <ArrowRight className="text-[#17ace2] h-8 w-8" />
              <div className="text-center">
                <div className="w-40 h-60 bg-gradient-to-br from-[#8fcde8] to-[#1da5d9] rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-3 relative">
                  <Image
                    src="/garrafapet_lacres.png"
                    alt="Reciclagem"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-[#1da5d9]">120 Garrafas Pet</div>
              </div>
              <ArrowRight className="text-[#17ace2] h-8 w-8" />
              <div className="text-center">
                <div className="w-60 h-60 bg-gradient-to-br from-[#33366b] to-[#1a1a2a] rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-3 relative">
                  <Image
                    src="/meninoculos.jpg"
                    alt="Óculos"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-[#1da5d9]">10 Óculos</div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-[#33366b] dark:text-[#8fcde8] font-medium">
                Junte lacres e deposite em alguma das garrafas Pet espalhadas pela cidade.
                Ajude a campanha <span className="font-bold text-[#17ace2]">“Lacre Mais Visão”</span>, do Instituto São Pio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#ffffff] dark:bg-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="relative w-28 h-28">
                <Image
                  src="/duvida.png"
                  alt="Mascote com dúvida"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-4xl font-bold text-[#33366b] dark:text-[#f3f1f1]">Como Funciona</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#17ace2] to-[#1da5d9] mx-auto mb-6"></div>
            <p className="text-xl text-[#33366b] dark:text-[#8fcde8] max-w-3xl mx-auto">
              Participar é simples! A campanha mobiliza escolas, coleta lacres e garante exames e óculos de grau para estudantes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-[#17ace2] to-[#1da5d9] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Mobilização nas Escolas</h3>
              <p className="text-[#33366b] dark:text-[#8fcde8]">
                Palestras e materiais informativos nas escolas da rede municipal sobre a campanha.
              </p>
            </div>

            <div className="text-center group reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8fcde8] to-[#1da5d9] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Coleta de Lacres</h3>
              <p className="text-[#33366b] dark:text-[#8fcde8]">
                Cada escola é um ponto de arrecadação: deposite os lacres nas garrafas identificadas.
              </p>
            </div>

            <div className="text-center group reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-[#33366b] to-[#1a1a2a] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Triagem Visual</h3>
              <p className="text-[#33366b] dark:text-[#8fcde8]">
                Realização de exames de vista gratuitos para alunos com possíveis dificuldades visuais.
              </p>
            </div>

            <div className="text-center group reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-[#e5352e] to-[#c72a24] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[#33366b] dark:text-[#f3f1f1]">Transforme Vidas</h3>
              <p className="text-[#33366b] dark:text-[#8fcde8]">
                Troca dos lacres por óculos de grau junto a parceiros e entrega aos alunos diagnosticados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-20 bg-gradient-to-r from-[#17ace2] via-[#1da5d9] to-[#33366b] text-white border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-4 mb-6">

              <div className="flex items-center space-x-4 mb-6">

                <div className="relative w-60 h-60 mb-2 rounded-[2rem] overflow-hidden shadow-lg mx-auto">
                  <Image
                    src="/logo_lacre_mais_visao_menor.jpg"
                    alt="Logo Lacre Mais Visão"
                    fill
                  />
                </div>
              </div>
              <h2 className="text-4xl font-bold">Nosso Impacto</h2>
            </div>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Entenda como a campanha promove inclusão educacional, saúde ocular, sustentabilidade e cidadania, e conheça nossas metas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 reveal">
              <h3 className="text-2xl font-semibold mb-4">Impacto Social Esperado</h3>
              <ul className="space-y-3 list-disc list-inside opacity-90 text-lg">
                <li>Inclusão educacional: melhora do rendimento e redução da evasão por dificuldades visuais.</li>
                <li>Saúde ocular: acesso gratuito a diagnóstico e correção visual.</li>
                <li>Sustentabilidade: reciclagem de alumínio e educação ambiental.</li>
                <li>Cidadania: engajamento da comunidade escolar em ação solidária.</li>
                <li>Equidade social: democratização do acesso a óculos de grau.</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 reveal">
              <h3 className="text-2xl font-semibold mb-4">Metas</h3>
              <ul className="space-y-3 list-disc list-inside opacity-90 text-lg">
                <li><strong>Curto prazo (6 meses):</strong> atender ao menos 300 alunos com exames de vista e doação de óculos.</li>
                <li><strong>Médio prazo (12 meses):</strong> expandir a campanha para todas as escolas municipais.</li>
                <li><strong>Longo prazo:</strong> tornar o “Lacre Mais Visão” um programa permanente de saúde ocular e educação ambiental.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Points */}
      <section className="py-20 bg-gradient-to-br from-[#f3f1f1] to-[#8fcde8] dark:from-[#33366b] dark:to-[#1a1a2a] border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#33366b] dark:text-[#f3f1f1] mb-4">Pontos de Coleta</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#17ace2] to-[#1da5d9] mx-auto mb-6"></div>
          <p className="text-xl text-[#33366b] dark:text-[#8fcde8] max-w-3xl mx-auto">
            Encontre uma garrafa PET mais próxima de você e faça parte desta corrente do bem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-8">
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#17ace2] reveal">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 shrink-0 aspect-square bg-white dark:bg-[#33366b] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#f3f1f1] dark:border-[#1a1a2a]">
                  <MapPin className="h-10 w-10 text-[#17ace2]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#33366b] dark:text-[#f3f1f1] mb-2">Escolas da Rede Municipal</h3>
                  <p className="text-[#33366b] dark:text-[#8fcde8] text-sm">
                    As escolas municipais são os principais pontos de arrecadação de lacres.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#1da5d9] reveal">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 shrink-0 aspect-square bg-white dark:bg-[#33366b] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#f3f1f1] dark:border-[#1a1a2a]">
                  <Target className="h-10 w-10 text-[#1da5d9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#33366b] dark:text-[#f3f1f1] mb-2">Unidades de Saúde Parceiras</h3>
                  <p className="text-[#33366b] dark:text-[#8fcde8] text-sm">
                    Articulação com a Secretaria Municipal de Saúde para triagem e apoio oftalmológico.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-t-[#33366b] reveal">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 shrink-0 aspect-square bg-white dark:bg-[#33366b] rounded-2xl flex items-center justify-center mx-3 mb-4 border border-[#f3f1f1] dark:border-[#1a1a2a]">
                  <Handshake className="h-10 w-10 text-[#1da5d9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#33366b] dark:text-[#f3f1f1] mb-2">Empresas Parceiras</h3>
                  <p className="text-[#33366b] dark:text-[#8fcde8] text-sm">
                    Rede de empresas e recicladoras locais comprometidas com responsabilidade social e sustentabilidade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#17ace2] to-[#1da5d9] hover:from-[#1da5d9] hover:to-[#33366b] text-white px-8 py-4 shadow-lg"
            onClick={() => scrollToSection('contact')}
          >
            Encontrar Ponto Mais Próximo
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#ffffff] dark:bg-[#33366b] border-b border-[#f3f1f1] dark:border-[#1a1a2a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="relative w-28 h-28 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src="/mascote.png"
                  alt="Mascote"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-4xl font-bold text-[#33366b] dark:text-[#f3f1f1]">Fale Conosco</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#17ace2] to-[#1da5d9] mx-auto mb-6"></div>
            <p className="text-xl text-[#33366b] dark:text-[#8fcde8] max-w-3xl mx-auto">
              Tem dúvidas, sugestões ou quer se tornar um parceiro? Fale conosco!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reveal">
              <h3 className="text-2xl font-semibold text-[#33366b] dark:text-[#f3f1f1] mb-6">Informações de Contato</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#8fcde8] rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#17ace2]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#33366b] dark:text-[#f3f1f1]">Telefone</h4>
                    <p className="text-[#33366b] dark:text-[#8fcde8]">+55 65 8445-1308</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#f7d4d2] rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#e5352e]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#33366b] dark:text-[#f3f1f1]">E-mail</h4>
                    <p className="text-[#33366b] dark:text-[#8fcde8]">sadi_os@yahoo.com.br</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#8fcde8] rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#1da5d9]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#33366b] dark:text-[#f3f1f1]">Endereço</h4>
                    <p className="text-[#33366b] dark:text-[#8fcde8]">Cuibá, MT</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-t-4 border-t-[#17ace2] reveal">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-[#33366b] dark:text-[#f3f1f1] mb-6">Envie uma Mensagem</h3>
                <form
                  className="space-y-6"
                  action="mailto:sadi_os@yahoo.com.br"
                  method="POST"
                  encType="text/plain"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#33366b] dark:text-[#8fcde8] mb-2">Nome</label>
                      <Input name="nome" placeholder="Seu nome" className="w-full border border-[#ccc] focus:border-[#17ace2] focus:ring-[#17ace2] dark:border-[#555] dark:bg-[#1a1a2a] dark:text-white dark:placeholder-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#33366b] dark:text-[#8fcde8] mb-2">E-mail</label>
                      <Input type="email" name="email" placeholder="seu@email.com" className="w-full border border-[#ccc] focus:border-[#17ace2] focus:ring-[#17ace2] dark:border-[#555] dark:bg-[#1a1a2a] dark:text-white dark:placeholder-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#33366b] dark:text-[#8fcde8] mb-2">Assunto</label>
                    <Input name="assunto" placeholder="Assunto da mensagem" className="w-full border border-[#ccc] focus:border-[#17ace2] focus:ring-[#17ace2] dark:border-[#555] dark:bg-[#1a1a2a] dark:text-white dark:placeholder-gray-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#33366b] dark:text-[#8fcde8] mb-2">Mensagem</label>
                    <Textarea name="mensagem" placeholder="Digite sua mensagem..." rows={4} className="w-full border border-[#ccc] focus:border-[#17ace2] focus:ring-[#17ace2] dark:border-[#555] dark:bg-[#1a1a2a] dark:text-white dark:placeholder-gray-400" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#17ace2] to-[#1da5d9] hover:from-[#1da5d9] hover:to-[#33366b] text-white py-3 shadow-lg"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17ace2] dark:bg-[#33366b] text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="relative w-40 h-20 rounded-lg overflow-hidden mx-auto md:mx-0">
                <Image
                  src="/logo_lacre_mais_visao.jpg"
                  alt="Logo Lacre Mais Visão"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-white/90">“Pequenos gestos que transformam grandes futuros”</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-white/90">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-[#8fcde8] transition-colors">Sobre Nós</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#8fcde8] transition-colors">Como Funciona</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('impact')} className="hover:text-[#8fcde8] transition-colors">Nosso Impacto</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-[#8fcde8] transition-colors">Contato</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-white/90">
                <li><Mail className="inline h-4 w-4 mr-2" /> sadi_os@yahoo.com.br</li>
                <li><Phone className="inline h-4 w-4 mr-2" /> +55 65 8445-1308</li>
                <li><MapPin className="inline h-4 w-4 mr-2" /> Cuibá, MT</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white/90">
            <p>
              &copy; 2024 Lacre Mais Visão. Todos os direitos reservados.
              <br />
              Desenvolvido com ❤️ por <a
                href="https://cheorse.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#8fcde8]"
              >
                Cheorse
              </a> para transformar vidas
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
}