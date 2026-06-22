import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NeuralCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particle count and radius
    const particleCount = 1800;
    const minRadius = 4;
    const maxRadius = 10;

    // Allocate arrays
    const positions = new Float32Array(particleCount * 3);

    // Helpers
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function createTendril(
      startR: number,
      endR: number,
      segments: number,
      index: number
    ) {
      const axis = new THREE.Vector3(
        randomInRange(-1, 1),
        randomInRange(-1, 1),
        randomInRange(-1, 1)
      ).normalize();

      let currentPos = axis.clone().multiplyScalar(startR);
      const stepAxis = axis.clone().multiplyScalar((endR - startR) / segments);

      let ortho1 = new THREE.Vector3(1, 0, 0);
      if (Math.abs(axis.dot(ortho1)) > 0.9) ortho1.set(0, 1, 0);
      ortho1.cross(axis).normalize();

      const ortho2 = new THREE.Vector3().crossVectors(axis, ortho1).normalize();

      let idx = index * 3;
      for (let i = 0; i < segments; i++) {
        positions[idx] = currentPos.x;
        positions[idx + 1] = currentPos.y;
        positions[idx + 2] = currentPos.z;

        const angle1 = randomInRange(-Math.PI / 3, Math.PI / 3);
        const angle2 = randomInRange(-Math.PI / 3, Math.PI / 3);
        const displacement = ortho1
          .clone()
          .multiplyScalar(Math.sin(angle1))
          .add(ortho2.clone().multiplyScalar(Math.sin(angle2)))
          .multiplyScalar(randomInRange(0.1, 0.5));

        currentPos.add(stepAxis).add(displacement);
        idx += 3;
      }
    }

    // Generate tendrils
    const particlesPerLayer = 200;
    const layerStep = (maxRadius - minRadius) / 4;

    for (let layer = 0; layer < 3; layer++) {
      const startR = minRadius + layer * layerStep;
      const endR = startR + layerStep;
      for (let i = 0; i < particlesPerLayer; i++) {
        createTendril(
          startR,
          endR,
          3,
          layer * particlesPerLayer + i
        );
      }
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    // Load circle texture
    const textureLoader = new THREE.TextureLoader();
    const circleTexture = textureLoader.load('/assets/circle.png');

    // Shaders
    const vertexShader = `
      attribute float size;
      attribute vec3 customColor;
      varying vec3 vColor;
      varying float vDist;
      uniform float minRadius;
      uniform float maxRadius;
      uniform float globalScale;

      void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vDist = clamp((length(position) - minRadius) / (maxRadius - minRadius), 0.0, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * globalScale;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D pointTexture;
      uniform vec3 color;
      uniform float opacity;
      varying vec3 vColor;
      varying float vDist;

      void main() {
        vec4 texColor = texture2D(pointTexture, gl_PointCoord);
        vec3 finalColor = mix(color, vColor, 0.5);
        float alpha = texColor.a * opacity * (0.3 + 0.7 * (1.0 - vDist));
        if (alpha < 0.05) discard;
        gl_FragColor = vec4(finalColor * texColor.rgb, alpha);
      }
    `;

    // Create material
    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x0044ff) },
        globalScale: { value: 1.0 },
        opacity: { value: 0.9 },
        pointTexture: { value: circleTexture },
        minRadius: { value: 4.0 },
        maxRadius: { value: 10.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Attach attributes manually
    (nodeMaterial as any).attributes = {};
    (nodeMaterial as any).attributes.size = { value: [] };
    (nodeMaterial as any).attributes.customColor = { value: [] };

    for (let i = 0; i < particleCount; i++) {
      (nodeMaterial as any).attributes.size.value.push(
        THREE.MathUtils.randFloat(5, 15)
      );
      (nodeMaterial as any).attributes.customColor.value.push(
        new THREE.Color(0x00ddff).lerp(
          new THREE.Color(0x0044ff),
          i / particleCount
        )
      );
    }

    // Set attributes on geometry
    const sizesArray = new Float32Array(
      (nodeMaterial as any).attributes.size.value
    );
    const colorsArray = new Float32Array(
      (nodeMaterial as any).attributes.customColor.value.length * 3
    );
    let cIdx = 0;
    for (const c of (nodeMaterial as any).attributes.customColor.value) {
      colorsArray[cIdx++] = c.r;
      colorsArray[cIdx++] = c.g;
      colorsArray[cIdx++] = c.b;
    }
    geometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));
    geometry.setAttribute(
      'customColor',
      new THREE.BufferAttribute(colorsArray, 3)
    );

    // Connection lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = new Float32Array(200000 * 3);
    linesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linesPositions, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x0044ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);

    // Group
    const group = new THREE.Group();
    const points = new THREE.Points(geometry, nodeMaterial);
    group.add(points);
    group.add(linesMesh);
    scene.add(group);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseV3 = new THREE.Vector3(10000, 10000, 10000);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(group.children[0]);
      if (intersects.length > 0) {
        mouseV3 = intersects[0].point;
      } else {
        mouseV3 = new THREE.Vector3(10000, 10000, 10000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const linesArr = linesMesh.geometry.attributes.position
      .array as Float32Array;
    const tempV = new THREE.Vector3();

    let animId: number;
    const tick = () => {
      animId = requestAnimationFrame(tick);

      group.rotation.y += 0.001;
      group.rotation.x += 0.0005;

      const positionsArr = (group.children[0] as THREE.Points).geometry
        .attributes.position.array as Float32Array;

      let lineIdx = 0;
      const maxConnections = 3;

      for (let i = 0; i < particleCount; i++) {
        const ix = positionsArr[i * 3];
        const iy = positionsArr[i * 3 + 1];
        const iz = positionsArr[i * 3 + 2];

        tempV.set(ix, iy, iz).applyMatrix4(group.matrixWorld);

        if (tempV.distanceToSquared(mouseV3) < 4) {
          let connectionCount = 0;

          for (
            let j = i + 1;
            j < particleCount && connectionCount < maxConnections;
            j++
          ) {
            const jx = positionsArr[j * 3];
            const jy = positionsArr[j * 3 + 1];
            const jz = positionsArr[j * 3 + 2];

            const dj =
              (jx - ix) * (jx - ix) +
              (jy - iy) * (jy - iy) +
              (jz - iz) * (jz - iz);

            if (dj < 3) {
              linesArr[lineIdx++] = ix;
              linesArr[lineIdx++] = iy;
              linesArr[lineIdx++] = iz;
              linesArr[lineIdx++] = jx;
              linesArr[lineIdx++] = jy;
              linesArr[lineIdx++] = jz;
              connectionCount++;
            }
          }
        }
      }

      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.setDrawRange(0, lineIdx / 3);

      renderer.render(scene, camera);
    };

    tick();

    // Resize handler
    const handleResize = () => {
      if (!rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      nodeMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#111111',
      }}
    />
  );
};

export default NeuralCore;
