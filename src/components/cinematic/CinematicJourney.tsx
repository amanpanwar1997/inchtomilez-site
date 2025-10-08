import { useScroll, useTransform, motion } from 'motion/react';
import { useRef, useMemo } from 'react';
import { Scene01_Hero } from './Scene01_Hero';
import { Scene02_About } from './Scene02_About';
import { Scene03_WhyChooseUs } from './Scene03_WhyChooseUs';
import { Scene05_DigitalMarketing } from './Scene05_DigitalMarketing';
import { Scene13_ToolsTech } from './Scene13_ToolsTech';
import { Scene27_FinalCTA } from './Scene27_FinalCTA';

/**
 * CINEMATIC JOURNEY - 28 Scene Parallax System
 * 
 * This component creates a continuous scroll-based journey through 28 distinct scenes,
 * each with its own visual style, animations, and narrative.
 * 
 * Scene Mapping:
 * 1. Hero - Futuristic Skyline
 * 2. About - Office Interior
 * 3. Why Choose Us - Museum/Gallery
 * 4. Core Services - Service Hall
 * 5. Digital Marketing - Control Room
 * 6. Advertising - Street Billboard Scene
 * 7. IT Services - Matrix/Tech World
 * 8. Media & Creative - Studio Space
 * 9. SEO & Growth - City Growth Chart
 * 10. Case Studies - Holographic Display
 * 11. Industries - Rotating Globe
 * 12. Process - Workflow Tunnel
 * 13. Tools & Tech - Space/Orbital
 * 14. Testimonials - Memory Bubbles
 * 15. Awards - Stage with Spotlights
 * 16. Team - Hero Lineup
 * 17. Blog - Desk/Magazine
 * 18. Pricing - Glass Panels
 * 19. FAQ - Speech Bubbles
 * 20. Comparison - Split Screen
 * 21. Global Reach - Globe
 * 22. Newsletter - Paper Plane
 * 23. Free Tools - Treasure Chest
 * 24. CSR - Earth/Trees
 * 25. Culture - Office Carousel
 * 26. Contact - Dark Gradient
 * 27. Final CTA - Neon Night
 * 28. Footer - Dark Holographic
 */

interface SceneConfig {
  id: number;
  name: string;
  component: React.ComponentType;
  startProgress: number;
  endProgress: number;
  zIndex: number;
}

export function CinematicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Define all 28 scenes with their scroll ranges
  const scenes: SceneConfig[] = useMemo(() => {
    const sceneCount = 28;
    const progressPerScene = 1 / sceneCount;
    
    return [
      { id: 1, name: 'Hero', component: Scene01_Hero, startProgress: 0, endProgress: progressPerScene * 1.5, zIndex: 28 },
      { id: 2, name: 'About', component: Scene02_About, startProgress: progressPerScene * 1, endProgress: progressPerScene * 2.5, zIndex: 27 },
      { id: 3, name: 'WhyChooseUs', component: Scene03_WhyChooseUs, startProgress: progressPerScene * 2, endProgress: progressPerScene * 3.5, zIndex: 26 },
      { id: 5, name: 'DigitalMarketing', component: Scene05_DigitalMarketing, startProgress: progressPerScene * 4, endProgress: progressPerScene * 5.5, zIndex: 24 },
      { id: 13, name: 'ToolsTech', component: Scene13_ToolsTech, startProgress: progressPerScene * 12, endProgress: progressPerScene * 13.5, zIndex: 16 },
      { id: 27, name: 'FinalCTA', component: Scene27_FinalCTA, startProgress: progressPerScene * 26, endProgress: progressPerScene * 28, zIndex: 2 },
      // More scenes can be added here as they are created
    ];
  }, []);

  // Calculate which scene should be visible based on scroll
  const currentSceneIndex = useTransform(scrollYProgress, (progress) => {
    return Math.floor(progress * 28);
  });

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky/Base Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.3, 0.3, 1])
        }}
      />

      {/* Render Active Scenes */}
      {scenes.map((scene) => {
        const SceneComponent = scene.component;
        const sceneProgress = useTransform(
          scrollYProgress,
          [scene.startProgress, scene.endProgress],
          [0, 1]
        );

        const sceneOpacity = useTransform(
          scrollYProgress,
          [
            scene.startProgress - 0.05,
            scene.startProgress,
            scene.endProgress,
            scene.endProgress + 0.05
          ],
          [0, 1, 1, 0]
        );

        return (
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            style={{
              zIndex: scene.zIndex,
              opacity: sceneOpacity
            }}
          >
            <SceneComponent />
          </motion.div>
        );
      })}

      {/* Ambient Particles - Always Present */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Scene Transition Overlays */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.02, 0.04, 0.06],
            [1, 0, 0, 0]
          )
        }}
      />
    </div>
  );
}

/**
 * Scene Spacer Component
 * Creates the necessary scroll height for the cinematic journey
 */
export function CinematicSpacer() {
  return (
    <div className="relative" style={{ height: '2800vh' }}>
      {/* This creates the scroll distance for 28 scenes (100vh per scene) */}
    </div>
  );
}
