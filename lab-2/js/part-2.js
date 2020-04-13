var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(-50, 20, 75);

// Add light
var light = new THREE.PointLight(0xffffff, 2.5, 600, 2);
scene.add(light);

// Load first 3D model
var loader = new THREE.GLTFLoader();
loader.load('little_lamp3.glb', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(-50, 0, 0);
    gltf.scene.scale.set(50, 50, 50);
    light.position.set(gltf.scene.position.x,
                        gltf.scene.position.y + 2 * gltf.scene.scale.x,
                        gltf.scene.position.z);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
}, function (error) {
    console.error(error);
});

// Load 2nd 3D model
loader.load('deskLamp1.glb', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(-80, 0, -30)
    gltf.scene.scale.set(0.5, 0.5, 0.5);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
}, function (error) {
    console.error(error);
});

// Load 3rd 3D model
loader.load('cup.glb', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(-25, 0, 0);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
}, function (error) {
    console.error(error);
});

// "Animate" everything
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();