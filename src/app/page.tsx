"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import {
  ChevronDown,
  Code,
  Layout,
  Smartphone,
  Sun,
  Moon,
  Menu,
  X,
  Instagram,
  Linkedin,
  Github,
  Globe,
  Search,
  Shield,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSubmitting]);

  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [messageForm, setMessageForm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameForm, emailForm, messageForm }),
      });

      if (!response.ok) {
        throw new Error("Falha ao enviar o formulário");
      }

      // Clear the form after successful submission
      setNameForm("");
      setEmailForm("");
      setMessageForm("");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      setErrorMessage(
        "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."
      );
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  const navItems = [
    { href: "home", label: "Início" },
    { href: "services", label: "Serviços" },
    { href: "projects", label: "Projetos" },
    { href: "about", label: "Sobre" },
    { href: "contact", label: "Contato" },
  ];

  const ThemeIcon = theme === "light" ? Sun : Moon;

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div
      className={`${spaceGrotesk.className} min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } transition-colors duration-300 ${
        isSubmitting ? "pointer-events-none" : ""
      }`}
      aria-busy={isSubmitting}
    >
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } p-8 rounded-xl shadow-2xl text-center max-w-md w-full mx-4`}
          >
            <div
              className={`${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              } rounded-full p-4 mb-6 inline-block`}
            >
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enviando mensagem...</h3>
            <p className="text-sm opacity-80">
              Por favor, aguarde enquanto processamos sua solicitação.
            </p>
          </div>
        </div>
      )}

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={`fixed top-0 left-0 right-0 z-40 ${
          theme === "dark" ? "bg-black bg-opacity-90" : "bg-white bg-opacity-90"
        } backdrop-blur-sm`}
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {theme === "dark" ? (
              <svg width="150" height="80" viewBox="0 0 150 80">
                <image
                  href="/spm-logo.svg"
                  width="150"
                  height="80"
                  className="filter invert"
                />
              </svg>
            ) : (
              <svg width="150" height="80" viewBox="0 0 150 80">
                <image href="/spm-logo.svg" width="150" height="80" />
              </svg>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="hover:text-blue-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              <ThemeIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu
              className={`h-6 w-6 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
          </Button>
        </nav>
      </header>

      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          />
          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-64 bg-gray-900 p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="absolute top-4 right-4"
            >
              <X className="h-6 w-6 text-white" />
            </Button>
            <div className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white hover:text-blue-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                <ThemeIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
                {theme === "light" ? "Modo Escuro" : "Modo Claro"}
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}

      <main>
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'url("")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${scrollY * 0.5}px)`,
              filter: "brightness(0.9) contrast(1.2)",
            }}
          />
          <div className="text-center z-10">
            <motion.h1
              className={`text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent ${
                theme === "dark"
                  ? "bg-gradient-to-r from-zinc-100 to-zinc-200"
                  : "bg-gradient-to-r from-blue-500 to-blue-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transformando Ideias em Soluções Digitais
            </motion.h1>
            <motion.p
              className={`text-xl md:text-2xl mb-8 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Criando presenças online poderosas para impulsionar o seu negócio.
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Entre em Contato
            </motion.button>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        <section
          id="services"
          className={`py-16 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code size={40} />,
                  title: "Desenvolvimento Web Personalizado",
                  description:
                    "Sites sob medida construídos do zero para atender às necessidades únicas da sua instituição.",
                },
                {
                  icon: <Layout size={40} />,
                  title: "Sistemas de Gerenciamento de Conteúdo",
                  description:
                    "Soluções CMS fáceis de usar para atualizações e gerenciamento de conteúdo sem esforço.",
                },
                {
                  icon: <Smartphone size={40} />,
                  title: "Design Responsivo",
                  description:
                    "Sites mobile-friendly que ficam ótimos em todos os dispositivos e tamanhos de tela.",
                },
                {
                  icon: <Globe size={40} />,
                  title: "Otimização para SEO",
                  description:
                    "Estratégias avançadas para melhorar a visibilidade do seu site nos motores de busca.",
                },
                {
                  icon: <Search size={40} />,
                  title: "Análise de Dados",
                  description:
                    "Implementação de ferramentas de análise para entender o comportamento dos visitantes e melhorar a performance do site.",
                },
                {
                  icon: <Shield size={40} />,
                  title: "Segurança e Manutenção",
                  description:
                    "Proteção contínua contra ameaças cibernéticas e atualizações regulares para manter seu site seguro e funcional.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className={`${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } p-6 rounded-lg text-center`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 text-blue-500">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Nossos Projetos
            </h2>
            <motion.div
              className={`${
                theme === "dark" ? "bg-gray-900" : "bg-gray-100"
              } rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="p-8 flex flex-col items-center">
                <Link
                  href="https://vision-care-azure.vercel.app/"
                  className="mb-6 transition-transform hover:scale-105"
                >
                  <Image
                    width={200}
                    height={200}
                    src="/visioncare_spm_logo.png"
                    alt="VisionCare Logo"
                    className="w-48 h-48 object-contain"
                  />
                </Link>
                <h3 className="text-2xl font-semibold mb-4 text-center">
                  VisionCare
                </h3>
                <p
                  className={`text-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  VisionCare é uma solução inovadora para gerenciamento de
                  óticas. Nossa plataforma oferece ferramentas intuitivas para
                  controle de estoque, gerenciamento de pedidos, e
                  acompanhamento de serviços, permitindo que profissionais do
                  ramo óptico foquem no que realmente importa: a saúde visual de
                  seus clientes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          className={`py-16 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold  mb-8 text-center">
              Sobre a SPM
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="bg-black p-8 rounded-lg shadow-lg flex justify-center items-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg width="300" height="300" viewBox="0 0 300 300">
                      <image
                        href="/spm-logo.svg"
                        width="300"
                        height="300"
                        className="filter invert"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <p className="mb-4">
                  A SPM é uma empresa especializada na criação de soluções
                  digitais completas, que incluem tanto o desenvolvimento de
                  sites institucionais impactantes quanto de aplicativos
                  prestadores de serviços. Nosso objetivo é ajudar empresas e
                  organizações a consolidarem sua presença digital com
                  ferramentas modernas, fáceis de usar e totalmente
                  personalizadas.
                </p>
                <p>
                  Oferecemos um conjunto completo de serviços que abrange desde
                  o design responsivo e otimização para SEO até a integração de
                  sistemas de gerenciamento de conteúdo e segurança de ponta.
                  Além disso, nossa expertise em desenvolvimento de aplicativos
                  garante que as instituições possam oferecer experiências
                  eficientes e intuitivas aos seus usuários, tanto na web quanto
                  em dispositivos móveis.
                </p>
              </div>
            </div>
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Nossa Equipe
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8">
                <div className="mb-8 md:mb-0 text-center w-full md:w-1/3">
                  <Image
                    src="https://github.com/pedrohmarinho.png"
                    alt="Membro da equipe 1"
                    width={200}
                    height={200}
                    className="rounded-full mb-4 mx-auto"
                  />
                  <h4 className="text-xl font-semibold">
                    Pedro Henrique Marinho de Oliveira
                  </h4>
                  <p className="text-sm mt-2 mb-4">
                    Fundador da SPM, Pedro Marinho é um desenvolvedor full stack
                    com experiência na criação de soluções tecnológicas. Com a
                    equipe da SPM, desenvolveu o SPM - Vision Care, uma
                    aplicação de gestão eficiente para óticas que tem por
                    objetivo otimizar processos e melhorar a eficiência
                    operacional do setor.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.instagram.com/pedrohomarinho/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pedro-marinho-9b6915204/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://github.com/pedrohmarinho"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
                <div className="text-center w-full md:w-1/3">
                  <Image
                    src="https://github.com/luizfelipemacedo.png"
                    alt="Membro da equipe 2"
                    width={200}
                    height={200}
                    className="rounded-full mb-4 mx-auto"
                  />
                  <h4 className="text-xl font-semibold">
                    Luiz Felipe Macedo Cruz
                  </h4>
                  <p className="text-sm mt-2 mb-4">
                    Cofundador da SPM, Luiz Felipe é um desenvolvedor de
                    software com uma trajetória sólida, focado em criar soluções
                    inovadoras. Liderou o desenvolvimento de um sistema de
                    backoffice integrado a um aplicativo de vendas homologado
                    pela Heineken e implementou uma esteira automatizada que
                    reduziu os custos com cloud em 75%. Ele também desenvolveu
                    uma solução multi-tenancy para gestão eficiente de bancos de
                    dados e aprimorou módulos de gestão de produtos e
                    precificação, aumentando a eficiência dos processos
                    administrativos.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.instagram.com/luizfelipemacedocruz/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/luiz-felipe-macedo-cruz-198b6824a/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://github.com/luizfelipemacedo"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
                <div className="text-center w-full md:w-1/3">
                  <Image
                    src="https://github.com/gustavopradobr.png"
                    alt="Membro da equipe 3"
                    width={200}
                    height={200}
                    className="rounded-full mb-4 mx-auto"
                  />
                  <h4 className="text-xl font-semibold">
                    Gustavo Soares Prado
                  </h4>
                  <p className="text-sm mt-2 mb-4">
                    Fundador da Prado Studios, Gustavo Prado é um desenvolvedor
                    de jogos com ampla experiência em Unity e C#, atuando
                    profissionalmente há mais de um ano e com mais de cinco anos
                    de dedicação a projetos pessoais. Entre seus principais
                    projetos, está o reconhecimento do primeiro jogo publicado,
                    Toon Chase, como finalista na categoria &quot;Melhor Jogo
                    Mobile&quot; no BIG Festival 2022, o maior evento de games
                    independentes da América Latina.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.instagram.com/gustavo.prado.beats/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/gustavo-prado/"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://github.com/gustavopradobr"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Entre em Contato
            </h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-3 py-2 ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    } rounded-md`}
                    value={nameForm}
                    onChange={(e) => setNameForm(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-3 py-2 ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    } rounded-md`}
                    value={emailForm}
                    onChange={(e) => setEmailForm(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`w-full px-3 py-2 ${
                      theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                    } rounded-md`}
                    value={messageForm}
                    onChange={(e) => setMessageForm(e.target.value)}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <div>
                  <motion.button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensagem"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} py-8`}
      >
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 SPM. Todos os direitos reservados.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="#"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              } transition-colors`}
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              } transition-colors`}
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              } transition-colors`}
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </footer>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-500">
              <CheckCircle className="mr-2" />
              Sucesso
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Sua mensagem foi enviada com sucesso! Entraremos em contato em
            breve.
          </DialogDescription>
          <Button onClick={() => setIsSuccessModalOpen(false)}>Fechar</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-500">
              <XCircle className="mr-2" />
              Erro
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>{errorMessage}</DialogDescription>
          <Button onClick={() => setIsErrorModalOpen(false)}>Fechar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
