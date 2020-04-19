varying vec3 vUv;
// uniform vec3 color;
// uniform vec3 shade;

void main() {
    // gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); //rgba, return blue
    gl_FragColor = vec4(vUv.x, vUv.y, vUv.z, 1.0);
}