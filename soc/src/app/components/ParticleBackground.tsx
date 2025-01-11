'use client';

import { useCallback } from 'react';
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine);
    }, []);
  
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: ["#ff3333", "#ff4444", "#ff5555"],
            },
            links: {
              color: "#ff3333",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
            life: {
              duration: {
                sync: false,
                value: 3
              },
              count: 0
            },
          },
          detectRetina: true,
          emitters: [
            {
              direction: "none",
              rate: {
                quantity: 5,
                delay: 0.15
              },
              position: {
                x: 0,
                y: 0
              },
              size: {
                width: 100,
                height: 100
              },
              spawnColor: {
                value: "#ff0000"
              }
            }
          ]
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
    );
  };