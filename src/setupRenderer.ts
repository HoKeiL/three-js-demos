import { PerspectiveCamera, Renderer, WebGLRenderer } from "three";

export function setupRenderer(
  camera: PerspectiveCamera,
  dim: { w: number; h: number },
): Renderer {
  const renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(dim.w, dim.h);
  document.body.appendChild(renderer.domElement);

  // add Events Global
  //TODO: fixup
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    dim.w = window.innerWidth;
    dim.h = window.innerHeight;

    camera.aspect = getAspect(dim);
    camera.updateProjectionMatrix();

    renderer.setSize(dim.w, dim.h);
  }

  return renderer;
}

export function getAspect(dim: { w: number; h: number }): number {
  return dim.w / dim.h;
}
