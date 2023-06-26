import { motion } from "framer-motion";
import * as React from 'react';
import Particles from 'react-tsparticles';
import resolveConfig from 'tailwindcss/resolveConfig';
import { loadFull } from 'tsparticles';

import tailwindConfig from '@root/tailwind.config.js';

const Frame = (props) => {
  const tailwindStyles = resolveConfig(tailwindConfig);
  const particlesInit = React.useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);
  const particlesLoaded = React.useCallback(async (container) => {
    await console.log(container);
  }, []);
  const particlesOpts = {
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
      },
    },
    particles: {
      color: { value: tailwindStyles.theme.colors.blush },
      links: {
        enable: false,
      },
      move: {
        attract: { enable: false },
        bounce: false,
        direction: 'top',
        enable: true,
        out_mode: 'out',
        random: false,
        speed: 1,
        straight: true,
      },
      number: { density: { enable: true, value_area: 800 }, value: 124 },
      opacity: {
        anim: { enable: false },
        random: true,
        value: 0.8,
      },
      shape: {
        type: 'edge',
      },
      size: {
        anim: { enable: false },
        random: true,
        value: 3,
      },
    },
    detectRetina: true,
  };
  return (
    <div className="relative w-screen min-h-screen h-100 bg-gradient-to-b from-ink-100 to-ink-200 bg-[length:400%_400%] overflow-auto">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOpts}
      />
      <div className="relative flex px-12">
        <motion.header 
          initial={{ y: '350%' }}
          animate={{ y: '100%' }}
          transition={{ ease: [0, 0.71, 0.37, 1], duration: 0.5 }}
          className="col-span-full mx-auto font-bold select-none"
        >
            <h1 className="text-stroke-gold font-heading leading-6 heading">
              Web
              <br />
              Developer
            </h1>
            <h2 className="mt-5 text-gold font-subheading text-right heading">
              Gillian A
            </h2>
        </motion.header>
        <main className="col-span-full sm:col-start-1 sm:col-end-3 md:col-start-2 text-plum font-body text-xl">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Frame;
