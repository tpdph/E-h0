import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useAvatarStore, AvatarState } from '../../store/avatarStore';
import { useTheme } from '../../contexts/ThemeContext';

interface AvatarProps {
  speaking: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  speaking, 
  size = 'md', 
  interactive = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarModel = useAvatarStore((state: AvatarState) => state.avatarModel);
  const { theme, mode } = useTheme();
  
  // Size mapping
  const sizeMap = {
    sm: { width: 100, height: 100 },
    md: { width: 200, height: 200 },
    lg: { width: 400, height: 400 }
  };

  useEffect(() => {
    if (!containerRef.current || !avatarModel) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      sizeMap[size].width / sizeMap[size].height,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(sizeMap[size].width, sizeMap[size].height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Get theme colors from CSS variables
    const getThemeColor = (variable: string) => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
      return color.startsWith('#') ? color : `#${color}`;
    };

    // Lighting setup based on theme
    const primaryColor = getThemeColor('--accent-primary');
    const secondaryColor = getThemeColor('--accent-secondary');
    const bgColor = getThemeColor('--bg-primary');
    
    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(
      primaryColor,
      mode === 'dark' ? 0.5 : 0.7
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      secondaryColor,
      mode === 'dark' ? 0.8 : 1
    );
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Add rim light for better definition
    const rimLight = new THREE.DirectionalLight(
      mode === 'dark' ? 0xffffff : primaryColor,
      mode === 'dark' ? 0.3 : 0.2
    );
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Add subtle fill light
    const fillLight = new THREE.DirectionalLight(
      bgColor,
      mode === 'dark' ? 0.2 : 0.1
    );
    fillLight.position.set(5, -5, -5);
    scene.add(fillLight);

    // Container setup
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;
    camera.position.y = 1;

    // Controls setup if interactive
    let controls: OrbitControls | null = null;
    if (interactive) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 1.5;
    }

    // Load and setup avatar model
    const loader = new GLTFLoader();
    loader.load(avatarModel, (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, 0);
      
      // Apply theme-based material adjustments
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            child.material.envMapIntensity = mode === 'dark' ? 1 : 0.7;
            child.material.needsUpdate = true;
          }
        }
      });
      
      scene.add(model);

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        if (speaking) {
          model.rotation.y += 0.01;
        }
        
        if (controls) {
          controls.update();
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
    });

    // Handle window resize
    const handleResize = () => {
      const { width, height } = sizeMap[size];
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (controls) {
        controls.dispose();
      }
      renderer.dispose();
      scene.clear();
    };
  }, [avatarModel, size, speaking, theme, mode, interactive]);

  return (
    <div 
      ref={containerRef} 
      className={`
        relative rounded-xl overflow-hidden bg-[var(--bg-secondary)]
        ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}
        ${speaking ? 'animate-glow ring-1 ring-[var(--accent-primary)]' : ''}
        shadow-lg shadow-[var(--shadow-glow)]/10
        theme-transition
      `}
      style={{
        width: sizeMap[size].width,
        height: sizeMap[size].height
      }}
    />
  );
};

export default Avatar;
