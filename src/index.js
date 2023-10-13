//To start this simplest example running, you should just
// load the index.html file from a browser, e.g. using
//the "live server" extension.

//Import three.js library from a CDN.
//This should always give us the latest version.
//@ts-ignore
import * as THREE from "https://cdn.skypack.dev/three";

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  50
);
camera.position.set(2, 6, 6);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(2, 1, 3);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
