"use client";

import { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  PCFShadowMap,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type TrailerJackModelProps = {
  src: string;
  className?: string;
};

export function TrailerJackModel({
  src,
  className = "",
}: TrailerJackModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    let frameId = 0;
    let isDisposed = false;
    let hasUserMovedCamera = false;

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    const modelRoot = new Group();
    const loader = new GLTFLoader();

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    renderer.setClearColor(0x08111f, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "h-full w-full cursor-grab active:cursor-grabbing";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute(
      "aria-label",
      "Interactive 3D model of the RC Trailer Jack prototype",
    );

    mount.appendChild(renderer.domElement);
    scene.add(modelRoot);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 8;

    const markUserCamera = () => {
      hasUserMovedCamera = true;
    };

    controls.addEventListener("start", markUserCamera);

    const hemisphereLight = new HemisphereLight(0xd8fbff, 0x2d2418, 2.1);
    const ambientLight = new AmbientLight(0xffffff, 0.72);
    const keyLight = new DirectionalLight(0xffffff, 4.3);
    const rimLight = new DirectionalLight(0x7dd3fc, 3.1);
    const warmLight = new DirectionalLight(0xf6c453, 1.9);

    keyLight.position.set(4, 5, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    rimLight.position.set(-5, 3, -4);
    warmLight.position.set(2, 1.5, -5);
    scene.add(hemisphereLight, ambientLight, keyLight, rimLight, warmLight);

    const fitModel = () => {
      const box = new Box3().setFromObject(modelRoot);
      const size = new Vector3();
      const center = new Vector3();

      box.getSize(size);
      box.getCenter(center);

      const maxDimension = Math.max(size.x, size.y, size.z) || 1;
      const scale = 3.15 / maxDimension;

      modelRoot.scale.setScalar(scale);
      modelRoot.position.x -= center.x * scale;
      modelRoot.position.y -= center.y * scale;
      modelRoot.position.z -= center.z * scale;

      const fittedBox = new Box3().setFromObject(modelRoot);
      modelRoot.position.y -= fittedBox.min.y;
    };

    const frameScene = () => {
      const width = mount.clientWidth || 1;
      const isNarrow = width < 640;
      const modelX = 0;
      const modelY = isNarrow ? 0.35 : 0.2;

      modelRoot.position.x += modelX;
      modelRoot.position.y += modelY;

      controls.target.set(modelX, modelY + 0.92, 0);

      if (!hasUserMovedCamera) {
        camera.position.set(
          modelX + (isNarrow ? 2.75 : 3.35),
          modelY + (isNarrow ? 1.9 : 2.05),
          isNarrow ? 4.9 : 5,
        );
      }

      controls.update();
    };

    const resize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const currentBaseX = modelRoot.userData.baseX ?? 0;
      const currentBaseY = modelRoot.userData.baseY ?? 0;
      const currentBaseZ = modelRoot.userData.baseZ ?? 0;

      modelRoot.position.set(currentBaseX, currentBaseY, currentBaseZ);
      frameScene();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    loader.load(
      src,
      (gltf) => {
        if (isDisposed) {
          return;
        }

        const model = gltf.scene;

        model.traverse((object) => {
          const mesh = object as Mesh;

          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        modelRoot.position.set(0, 0, 0);
        modelRoot.add(model);
        fitModel();
        modelRoot.rotation.y = -Math.PI / 8;
        modelRoot.userData.baseX = modelRoot.position.x;
        modelRoot.userData.baseY = modelRoot.position.y;
        modelRoot.userData.baseZ = modelRoot.position.z;
        resize();
        setIsReady(true);
      },
      undefined,
      () => {
        if (!isDisposed) {
          setHasError(true);
        }
      },
    );

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener("start", markUserCamera);
      controls.dispose();

      modelRoot.traverse((object) => {
        const mesh = object as Mesh;

        if (mesh.isMesh) {
          mesh.geometry?.dispose();

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });

      renderer.dispose();

      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full ${className}`}
      aria-label="Interactive 3D RC Trailer Jack model"
    >
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isReady || hasError ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-12 w-12 rounded-full border-2 border-cyan-200/20 border-t-[#f6c453] animate-spin" />
      </div>
      {hasError ? (
        <div className="pointer-events-none absolute inset-x-6 top-24 rounded-lg border border-red-300/30 bg-red-950/55 p-4 text-sm font-semibold text-red-100 backdrop-blur md:left-auto md:right-10 md:w-72">
          3D model unavailable
        </div>
      ) : null}
    </div>
  );
}
