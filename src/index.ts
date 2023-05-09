import { TheRenderer } from './TheRenderer'

const renderer = new TheRenderer();

window.addEventListener('resize', renderer.onWindowResize, false);
window.document.getElementById('root')?.appendChild(renderer.domElement);
renderer.updateAnimation();