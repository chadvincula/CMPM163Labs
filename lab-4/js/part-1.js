// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// setup the cubes
var texture = new THREE.TextureLoader().load("textures/moss.jpg.");
var nMap = new THREE.TextureLoader().load("normal-maps/moon.jpg");
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { map: texture,
                                              normalMap: nMap } );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

material = new THREE.MeshPhongMaterial( { map: texture } );
var cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);
cube2.position.x -= 2;

var texture2 = new THREE.TextureLoader().load("textures/galaxy-paint.jpg");
var nMap2 = new THREE.TextureLoader().load("normal-maps/carved-wood.jpg");
var material2 = new THREE.MeshPhongMaterial( { map: texture2,
                                               normalMap: nMap2 } );
var cube3 = new THREE.Mesh(geometry, material2);
scene.add(cube3);
cube3.position.x += 2;

// add the light
var light = new THREE.PointLight(0xffffff, 0.75, 1000);
light.position.set(10, 10, 10);
scene.add(light);

var bottomLight = new THREE.PointLight(0xfffff, 1.5, 1000);
bottomLight.position.set(0, -50, -50);
scene.add(bottomLight);

// Function taken from three.js_shadowmap_pointlight example
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pointlight.html
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    light.position.x = Math.cos(performance.now() / 1500) * 10;
    light.position.y = Math.sin(performance.now() / 1500) * 10;
}
animate();