import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Menu, X, Plus, Check } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const projects = [
  { n: '01', title: 'Casa Norte', place: 'Buenos Aires · 2026', type: 'Vivienda unifamiliar', area: '286 m²', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85', align: 'left' },
  { n: '02', title: 'Umbral / 27', place: 'Mar del Plata · 2025', type: 'Reforma integral', area: '410 m²', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85', align: 'right' },
  { n: '03', title: 'Patio Cero', place: 'Córdoba · 2024', type: 'Espacio cultural', area: '1.240 m²', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85', align: 'tall' },
  { n: '04', title: 'Línea de Agua', place: 'Punta del Este · 2023', type: 'Casa de descanso', area: '198 m²', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85', align: 'wide' },
  { n: '05', title: 'Taller Delta', place: 'Rosario · 2022', type: 'Uso mixto', area: '2.830 m²', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85', align: 'offset' },
];

const materials = [
  { name: 'Hormigón', sub: 'TEXTURA / 01', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1000&q=85', className: 'md:col-span-5 md:row-span-2' },
  { name: 'Madera', sub: 'CALIDEZ / 02', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85', className: 'md:col-span-3' },
  { name: 'Piedra', sub: 'PESO / 03', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=85', className: 'md:col-span-4' },
  { name: 'Vidrio', sub: 'REFLEJO / 04', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', className: 'md:col-span-4' },
  { name: 'Metal', sub: 'TENSIÓN / 05', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1000&q=85', className: 'md:col-span-3' },
];

const services = [
  { n: '01', title: 'Arquitectura', desc: 'Proyectos que encuentran su forma en el diálogo entre lugar, luz y materia.', image: projects[0].image },
  { n: '02', title: 'Interiorismo', desc: 'Interiores precisos, sensibles y profundamente habitables.', image: projects[1].image },
  { n: '03', title: 'Reformas', desc: 'Nuevas lecturas para espacios que ya tienen una historia.', image: projects[2].image },
  { n: '04', title: 'Dirección de obra', desc: 'La idea intacta hasta el último encuentro de materiales.', image: projects[3].image },
  { n: '05', title: 'Visualización 3D', desc: 'Imágenes para anticipar atmósferas antes de construirlas.', image: projects[4].image },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: .8, ease: [0.22, 1, .36, 1] } },
};

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18 }} variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: .8, delay } } }}>{children}</motion.div>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['proyectos', 'Proyectos'], ['estudio', 'Estudio'], ['proceso', 'Proceso'], ['materialidad', 'Materialidad'], ['contacto', 'Contacto']];
  return (
    <header className={`fixed top-0 left-0 right-0 z-20 border-b border-transparent transition-colors duration-500 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 md:px-10">
        <a href="#inicio" className="group flex items-center gap-3" data-testid="link-logo">
          <span className="flex h-7 w-7 items-center justify-center border border-[#f45b2a] text-[#f45b2a] font-mono-custom text-[11px]">N</span>
          <span className="font-display text-[15px] font-semibold tracking-[.22em]">NÓRDICA</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          {links.map(([href, label]) => <a key={href} href={`#${href}`} className="eyebrow transition-colors hover:text-[#f45b2a]" data-testid={`link-nav-${href}`}>{label}</a>)}
          <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#f45b2a]" aria-hidden="true" />
        </nav>
        <button className="flex items-center gap-3 text-[#e8e1d5] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} data-testid="button-menu">
          {open ? <X size={20} /> : <Menu size={20} />} <span className="eyebrow">Menú</span>
        </button>
      </div>
      {open && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t hairline bg-[#171512] px-5 pb-7 pt-4 md:hidden" aria-label="Menú móvil">
        {links.map(([href, label], index) => <a key={href} href={`#${href}`} onClick={() => setOpen(false)} className="flex items-center justify-between border-b hairline py-4 font-display text-2xl" data-testid={`link-mobile-${href}`}><span>{label}</span><span className="font-mono-custom text-xs text-[#f45b2a]">0{index + 1}</span></a>)}
      </motion.nav>}
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 150]);
  return <section id="inicio" className="hero relative flex min-h-[100dvh] items-end overflow-hidden bg-[#171512]">
    <motion.img style={{ y }} className="hero-image absolute inset-0 h-full w-full object-cover opacity-75" src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90" alt="Interior contemporáneo de hormigón y luz natural" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,21,18,.2)_0%,rgba(23,21,18,.12)_35%,rgba(23,21,18,.88)_100%)]" />
    <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 md:block"><span className="eyebrow writing-vertical">Buenos Aires · Estudio de arquitectura</span></div>
    <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-14 md:px-10 md:pb-20">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .15 }} className="mb-9 flex items-center gap-3"><span className="h-px w-9 bg-[#f45b2a]" /><span className="eyebrow text-[#e8e1d5]">Estudio Nórdica / Arquitectura contemporánea</span></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .3, ease: [.22, 1, .36, 1] }} className="font-display max-w-[1000px] text-[clamp(3.8rem,9.5vw,9.7rem)] font-medium leading-[.87] tracking-[-.075em] text-[#f2ede4]">Espacios que<br /><em className="font-normal text-[#f45b2a]">cambian</em> la forma<br />de habitar.</motion.h1>
      <div className="mt-12 flex flex-col gap-7 md:ml-[34%] md:flex-row md:items-end md:justify-between">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .85 }} className="max-w-[330px] text-sm leading-6 text-[#d2c8ba]">Arquitectura contemporánea, interiorismo y espacios pensados para trascender.</motion.p>
        <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: 1 }} href="#proyectos" className="group inline-flex items-center gap-3 font-mono-custom text-xs uppercase tracking-[.1em] text-[#f2ede4]" data-testid="link-explorar-proyectos">Explorar proyectos <span className="flex h-9 w-9 items-center justify-center border border-[#f45b2a] text-[#f45b2a] transition-colors group-hover:bg-[#f45b2a] group-hover:text-[#171512]"><ArrowDownRight size={16} /></span></motion.a>
      </div>
    </div>
    <div className="scroll-mark absolute bottom-7 right-6 hidden items-center gap-3 md:flex"><span className="eyebrow">Desplazar</span><span className="h-12 w-px bg-[#f45b2a]" /></div>
  </section>;
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return <div className="mb-10 flex items-center gap-4"><span className="font-mono-custom text-xs text-[#f45b2a]">{number}</span><span className="h-px w-12 bg-[#f45b2a]" /><span className="eyebrow">{label}</span></div>;
}

function Projects() {
  return <section id="proyectos" className="bg-[#1b1916] px-5 py-28 md:px-10 md:py-40">
    <div className="mx-auto max-w-[1500px]">
      <div className="flex items-end justify-between"><div><SectionMarker number="01" label="Obra seleccionada" /><Reveal><h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.88] tracking-[-.07em]">El espacio<br /><span className="text-[#a7a097]">como materia.</span></h2></Reveal></div><p className="hidden max-w-[190px] pb-2 font-mono-custom text-[10px] leading-5 text-[#a7a097] md:block">Cinco proyectos.<br />Cinco maneras de<br />hacer lugar.</p></div>
      <div className="mt-20 space-y-28 md:mt-32 md:space-y-48">
        {projects.map((project, i) => <Project key={project.n} project={project} index={i} />)}
      </div>
    </div>
  </section>;
}

function Project({ project, index }: { project: typeof projects[number]; index: number }) {
  const layout = project.align === 'right' ? 'md:ml-[18%] md:w-[70%]' : project.align === 'tall' ? 'md:ml-[12%] md:w-[47%]' : project.align === 'wide' ? 'md:ml-[3%] md:w-[84%]' : project.align === 'offset' ? 'md:ml-[28%] md:w-[63%]' : 'md:w-[82%]';
  return <Reveal className={`project-frame relative ${layout}`} delay={index * .04}>
    <a href="#contacto" className="group block" data-testid={`link-proyecto-${project.n}`}>
      <div className={`relative overflow-hidden ${project.align === 'tall' ? 'aspect-[4/5]' : project.align === 'wide' ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
        <img className="project-image h-full w-full object-cover" src={project.image} alt={`${project.title}, ${project.type}`} loading={index > 1 ? 'lazy' : 'eager'} />
        <div className="absolute inset-0 bg-[#171512]/20 transition-colors group-hover:bg-[#171512]/5" />
        <div className="project-reveal absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#171512]/85 to-transparent px-5 pb-5 pt-20 md:px-8 md:pb-8"><span className="font-display text-3xl md:text-5xl">{project.title}</span><ArrowRight className="text-[#f45b2a]" /></div>
      </div>
      <div className="mt-4 flex items-start justify-between border-t hairline pt-3 md:mt-5"><div><span className="font-mono-custom text-xs text-[#f45b2a]">{project.n} / </span><span className="eyebrow ml-1">{project.place}</span></div><div className="hidden gap-8 font-mono-custom text-[10px] uppercase text-[#a7a097] md:flex"><span>{project.type}</span><span>{project.area}</span></div><span className="font-display text-xl md:hidden">{project.title}</span></div>
    </a>
  </Reveal>;
}

function Manifesto() {
  return <section className="relative overflow-hidden bg-[#171512] px-5 py-36 md:px-10 md:py-64"><div className="absolute right-[13%] top-20 hidden h-44 w-px bg-[#f45b2a]/60 md:block" /><div className="absolute left-[8%] top-24 hidden font-mono-custom text-[9px] uppercase tracking-[.2em] text-[#635f59] md:block">41°23'12"S / 2°10'26"O</div>
    <div className="mx-auto max-w-[1500px]"><SectionMarker number="02" label="Manifiesto" /><Reveal><p className="max-w-[1160px] font-display text-[clamp(3rem,7.9vw,8.8rem)] leading-[.91] tracking-[-.07em]">No diseñamos edificios.<br /><span className="text-[#a7a097]">Diseñamos la forma en que</span><br /><em className="font-normal text-[#f45b2a]">las personas los viven.</em></p></Reveal><div className="mt-14 flex justify-end"><p className="max-w-[260px] text-sm leading-6 text-[#a7a097]">Un proyecto empieza mucho antes de su primera línea. Empieza escuchando el lugar.</p></div></div>
  </section>;
}

function Studio() {
  return <section id="estudio" className="bg-[#e8e1d5] px-5 py-28 text-[#1b1916] md:px-10 md:py-40"><div className="mx-auto grid max-w-[1500px] items-start gap-14 md:grid-cols-[1.08fr_.92fr] md:gap-24"><Reveal><div className="relative"><img className="aspect-[4/5] w-full object-cover md:aspect-[.88/1]" src="https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1300&q=85" alt="Detalle de una vivienda contemporánea con patio interior" loading="lazy" /><span className="absolute -bottom-5 right-0 font-mono-custom text-[10px] text-[#6d675e] md:bottom-6 md:-right-10">NÓRDICA / ARCHIVO 014</span></div></Reveal><div className="pt-3 md:pt-32"><SectionMarker number="03" label="El estudio" /><Reveal><h2 className="font-display text-[clamp(3.2rem,6vw,6.4rem)] leading-[.9] tracking-[-.065em]">La medida<br />de <em className="font-normal text-[#f45b2a]">lo esencial.</em></h2><p className="mt-10 max-w-[430px] text-base leading-7 text-[#5f5a53]">Somos un estudio de arquitectura que entiende cada proyecto como una oportunidad para crear algo único. Trabajamos entre la intuición y el rigor, desde Buenos Aires hacia donde el espacio nos convoque.</p></Reveal><div className="mt-16 grid max-w-[430px] grid-cols-2 gap-x-8 gap-y-5 border-t border-[#1b1916]/20 pt-5">{['Arquitectura', 'Interiorismo', 'Dirección de obra', 'Diseño conceptual'].map((item, i) => <div key={item} className="flex gap-3 text-sm"><span className="font-mono-custom text-[10px] text-[#f45b2a]">0{i + 1}</span>{item}</div>)}</div></div></div></section>;
}

function Process() {
  const stages = [['01', 'Concepto', 'Leer el lugar. Encontrar la pregunta precisa.'], ['02', 'Desarrollo', 'Dar estructura a una intuición y hacerla habitable.'], ['03', 'Materialidad', 'Elegir aquello que el tiempo sabrá transformar.'], ['04', 'Construcción', 'Cuidar cada encuentro hasta que la idea se vuelva real.']];
  return <section id="proceso" className="bg-[#211f1b] px-5 py-28 md:px-10 md:py-40"><div className="mx-auto max-w-[1500px]"><SectionMarker number="04" label="Proceso" /><div className="grid md:grid-cols-[.7fr_1.3fr] md:gap-28"><Reveal><h2 className="font-display text-[clamp(3.3rem,7vw,7.6rem)] leading-[.86] tracking-[-.07em]">De la<br /><span className="text-[#a7a097]">idea</span> al<br />espacio.</h2><p className="mt-10 max-w-[230px] text-sm leading-6 text-[#a7a097]">Una línea de trabajo, cuatro momentos de precisión.</p></Reveal><div className="relative mt-16 md:mt-0"><div className="absolute bottom-0 left-[22px] top-0 w-px bg-[#605b53]" /><motion.div initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ duration: 1.7, ease: 'easeInOut' }} className="absolute left-[22px] top-0 w-px bg-[#f45b2a]" />{stages.map(([num, title, copy], i) => <Reveal key={num} delay={i * .08} className="relative grid min-h-[145px] grid-cols-[45px_1fr] gap-7 border-b hairline py-5 md:min-h-[175px] md:grid-cols-[45px_1fr_1fr]"><div className="relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#f45b2a] bg-[#211f1b] font-mono-custom text-xs text-[#f45b2a]">{num}</div><h3 className="font-display text-3xl md:text-4xl">{title}</h3><p className="col-start-2 max-w-[250px] text-sm leading-6 text-[#a7a097] md:col-start-3">{copy}</p></Reveal>)}</div></div></div></section>;
}

function Services() {
  const [active, setActive] = useState(0);
  return <section id="servicios" className="relative overflow-hidden bg-[#171512] px-5 py-28 md:px-10 md:py-40"><div className="absolute inset-0"><img className="service-image h-full w-full object-cover opacity-20" src={services[active].image} alt="" aria-hidden="true" key={active} /></div><div className="relative mx-auto max-w-[1500px]"><SectionMarker number="05" label="Servicios" /><div className="grid md:grid-cols-[.35fr_1.65fr] md:gap-20"><div><p className="max-w-[220px] text-sm leading-6 text-[#a7a097]">Desde la primera conversación hasta la última capa de pintura.</p><div className="mt-16 hidden font-mono-custom text-[10px] leading-5 text-[#a7a097] md:block">HOVER PARA<br />EXPLORAR</div></div><div>{services.map((service, i) => <button key={service.n} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} className="service-row group flex w-full items-baseline gap-4 border-b hairline py-5 text-left md:py-7" data-testid={`button-servicio-${service.n}`}><span className="service-index font-mono-custom text-xs text-[#a7a097]">{service.n}</span><span className="font-display text-[clamp(2.4rem,6.4vw,6.8rem)] leading-none tracking-[-.065em]">{service.title}</span><Plus className="ml-auto shrink-0 text-[#f45b2a] transition-transform duration-500 group-hover:rotate-45" size={20} /><span className="sr-only">{service.desc}</span></button>)}<motion.p key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-[350px] text-sm leading-6 text-[#c2b9ac] md:ml-12">{services[active].desc}</motion.p></div></div></div></section>;
}

function Materiality() {
  return <section id="materialidad" className="bg-[#e8e1d5] px-5 py-28 text-[#1b1916] md:px-10 md:py-40"><div className="mx-auto max-w-[1500px]"><div className="flex items-end justify-between"><div><SectionMarker number="06" label="Materialidad" /><Reveal><h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] leading-[.88] tracking-[-.07em]">Lo que toca<br /><em className="font-normal text-[#f45b2a]">la mirada.</em></h2></Reveal></div><p className="hidden max-w-[200px] pb-2 font-mono-custom text-[10px] leading-5 text-[#6d675e] md:block">Cinco materias.<br />Una atmósfera.</p></div><div className="mt-16 grid auto-rows-[170px] grid-cols-1 gap-3 md:mt-24 md:auto-rows-[190px] md:grid-cols-12">{materials.map((material, i) => <Reveal key={material.name} delay={i * .05} className={`material-tile group relative overflow-hidden ${material.className}`}><img src={material.image} alt={`Textura de ${material.name.toLowerCase()}`} className="h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-[#1b1916]/25 transition-colors group-hover:bg-[#1b1916]/5" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[#f2ede4] md:p-5"><span className="font-display text-2xl md:text-3xl">{material.name}</span><span className="font-mono-custom text-[9px] tracking-[.12em]">{material.sub}</span></div></Reveal>)}</div></div></section>;
}

function Facts() {
  const facts = [['18', 'Años de experiencia'], ['42', 'Proyectos realizados'], ['07', 'Ciudades'], ['12', 'Premios y reconocimientos']];
  return <section className="bg-[#f45b2a] px-5 py-24 text-[#171512] md:px-10 md:py-36"><div className="mx-auto max-w-[1500px]"><SectionMarker number="07" label="En números" /><div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-10">{facts.map(([number, label], i) => <Reveal key={label} delay={i * .08}><div className="border-t border-[#171512]/35 pt-4"><span className="font-display text-[clamp(4rem,10vw,10rem)] font-medium leading-none tracking-[-.09em]">{number}</span><p className="mt-3 max-w-[120px] font-mono-custom text-[10px] uppercase leading-4">{label}</p></div></Reveal>)}</div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  return <section id="contacto" className="relative overflow-hidden bg-[#171512] px-5 py-28 md:px-10 md:py-44"><div className="absolute right-0 top-0 hidden h-full w-[35%] md:block"><img className="h-full w-full object-cover opacity-25" src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85" alt="" aria-hidden="true" /><div className="absolute inset-0 bg-[#171512]/45" /></div><div className="relative mx-auto max-w-[1500px]"><SectionMarker number="08" label="Contacto" /><div className="grid md:grid-cols-[1fr_.7fr] md:gap-28"><div><Reveal><h2 className="font-display text-[clamp(3.5rem,8vw,8.7rem)] leading-[.86] tracking-[-.075em]">¿Construimos<br />algo <em className="font-normal text-[#f45b2a]">extraordinario?</em></h2><p className="mt-10 text-base text-[#a7a097]">Hablemos de tu próximo proyecto.</p></Reveal></div><Reveal className="mt-16 md:mt-2" delay={.15}><form onSubmit={handleSubmit} className="relative z-10" aria-label="Formulario de contacto"><div className="input-line mb-7 pb-3"><label className="eyebrow block mb-2" htmlFor="nombre">Nombre</label><input id="nombre" name="nombre" required className="w-full text-sm" data-testid="input-nombre" /></div><div className="input-line mb-7 pb-3"><label className="eyebrow block mb-2" htmlFor="correo">Correo</label><input id="correo" name="correo" type="email" required className="w-full text-sm" data-testid="input-correo" /></div><div className="input-line mb-7 pb-3"><label className="eyebrow block mb-2" htmlFor="tipo">Tipo de proyecto</label><select id="tipo" name="tipo" className="w-full text-sm" defaultValue="" data-testid="select-tipo"><option value="" disabled>Seleccionar</option><option>Vivienda</option><option>Interiorismo</option><option>Espacio cultural</option><option>Otro</option></select></div><div className="input-line mb-8 pb-3"><label className="eyebrow block mb-2" htmlFor="mensaje">Mensaje</label><textarea id="mensaje" name="mensaje" required rows={3} className="w-full resize-none text-sm" data-testid="textarea-mensaje" /></div>{sent && <p className="mb-5 flex items-center gap-2 text-sm text-[#f45b2a]" role="status" data-testid="status-formulario"><Check size={16} /> Gracias. Nos pondremos en contacto pronto.</p>}<button type="submit" className="group inline-flex items-center gap-3 font-mono-custom text-xs uppercase tracking-[.1em]" data-testid="button-enviar-formulario">Iniciar conversación <span className="flex h-10 w-10 items-center justify-center border border-[#f45b2a] text-[#f45b2a] transition-colors group-hover:bg-[#f45b2a] group-hover:text-[#171512]"><ArrowRight size={16} /></span></button></form></Reveal></div></div></section>;
}

function Footer() {
  return <footer className="border-t hairline bg-[#171512] px-5 py-9 md:px-10"><div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between"><a href="#inicio" className="flex items-center gap-3" data-testid="link-footer-logo"><span className="flex h-7 w-7 items-center justify-center border border-[#f45b2a] text-[#f45b2a] font-mono-custom text-[11px]">N</span><span className="font-display text-[15px] font-semibold tracking-[.22em]">NÓRDICA</span></a><p className="eyebrow max-w-[220px] leading-5">Diseño que inspira.<br />Espacios que permanecen.</p><div className="flex flex-wrap gap-5 font-mono-custom text-[10px] uppercase text-[#a7a097]"><a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f45b2a]" data-testid="link-instagram">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#f45b2a]" data-testid="link-linkedin">LinkedIn</a><a href="mailto:hola@nordica.ar" className="transition-colors hover:text-[#f45b2a]" data-testid="link-email">Email</a></div><span className="eyebrow">Buenos Aires · Argentina</span></div></footer>;
}

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });
  return <div className="grain min-h-[100dvh] bg-[#171512]"><motion.div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-[#f45b2a]" style={{ scaleX }} /><Nav /><main><Hero /><Projects /><Manifesto /><Studio /><Process /><Services /><Materiality /><Facts /><Contact /></main><Footer /></div>;
}

function App() {
  useEffect(() => {
    document.title = 'NÓRDICA — Arquitectura que transforma el espacio';
    const description = 'Estudio de arquitectura contemporánea, interiorismo y espacios pensados para trascender.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const og = document.querySelector('meta[property="og:title"]');
    if (!og) { const created = document.createElement('meta'); created.setAttribute('property', 'og:title'); created.setAttribute('content', document.title); document.head.appendChild(created); }
  }, []);
  return <QueryClientProvider client={queryClient}><TooltipProvider><ErrorBoundary resetKey="home"><AppContent /></ErrorBoundary><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;