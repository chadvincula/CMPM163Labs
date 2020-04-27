uniform sampler2D texture1;
varying vec2 vUv;

void main() {
    vec2 tiled = 9.0 * vUv;
    tiled = fract(tiled); // Use the fract() function to get the tiled grid effect
    // sample from the texture based on the uv coordinates
    gl_FragColor = texture2D(texture1, tiled);
}