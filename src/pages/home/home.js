import './home.css'
// import gsap from "gsap";
// import SplitType from "split-type";
// import { SplitText } from "gsap/SplitText";
// import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
// import 'lenis/dist/lenis.css'
// // import { setupCounter } from './counter.js'
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// gsap.registerPlugin(SplitText, ScrambleTextPlugin,ScrollTrigger,ScrollSmoother, ScrollToPlugin);

export async function initHome() {

  if (typeof window === 'undefined') return; // evita SSR

  // Importa GSAP y plugins sólo en el cliente
  const [{ default: gsap }] = await Promise.all([import('gsap')]);

  // Plugins gratuitos (con fallback si no existen)
  const ScrollTriggerMod = await import('gsap/ScrollTrigger').catch(() => null);
  const ScrollToMod = await import('gsap/ScrollToPlugin').catch(() => null);

  if (ScrollTriggerMod?.ScrollTrigger) gsap.registerPlugin(ScrollTriggerMod.ScrollTrigger);
  if (ScrollToMod?.ScrollToPlugin) gsap.registerPlugin(ScrollToMod.ScrollToPlugin);

  // SplitType (libre)
  const { default: SplitType } = await import('split-type');

  window.gsap = gsap;

  // gsap.registerPlugin(SplitText, ScrambleTextPlugin,ScrollTrigger,ScrollSmoother, ScrollToPlugin);
  window.addEventListener("DOMContentLoaded", () => {
    const split = new SplitType(".intro h1", {
      types: "lines, chars",
      lineClass: "line",
      charClass: "char"
    });

    gsap.from(".char", {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "power4.out"
    });

    gsap.utils.toArray(".collage-item").forEach((el, i) => {
      gsap.to(el, {
        y: "+=20",      // subir y bajar 20px
        rotation: "+=2", // rotación ligera
        duration: 3 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    ScrollTrigger.create({
      trigger: ".nuestros-artistas",
      start: "top 90%", // cuando entra al viewport
      once: true,       // solo una vez
      onEnter: () => {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: ".nuestros-artistas", // requiere plugin scrollTo
          ease: "power2.out"
        });
      }
    });
  });

}

