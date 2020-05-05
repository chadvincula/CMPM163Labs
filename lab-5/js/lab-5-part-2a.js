// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;

// Creating a Billboard for particles
var vertices = [];

for ( var i = 0; i < 1000; i ++ ) {
    var x = THREE.MathUtils.randFloatSpread( 500 );
    var y = THREE.MathUtils.randFloatSpread( 500 );
    var z = THREE.MathUtils.randFloatSpread( 500 );
    vertices.push( x, y, z );
}

var geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
var texture = new THREE.TextureLoader().load("textures/disc.png.");
var material = new THREE.PointsMaterial( { map: texture,
                                           size: 40,
                                           alphaTest: 0.5,
                                           transparent: true } );

var points = new THREE.Points(geometry, material);
scene.add(points);

// Function taken from three.js_shadowmap_pointlight example
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pointlight.html
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

// Adding interactivity
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0;
var mouseY = 0;

function onDocumentMouseMove(event)
{
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event)
{
    if(event.touches.length == 1)
    {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event)
{
    if (event.touches.length == 1)
    {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Animate particle texture
    material.color.setHSL(performance.now() / 1500, 0.5, 0.5);
    material.size = (Math.cos(performance.now() / 1500) + 1.1) * 40;

    // Mouse-camera functionality
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;
}
animate();