// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;

var particles = [];
const geometry = new THREE.Geometry()
for(let i = 0; i < 1000; i++)
{
    const particle = {
        position: new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 3 - 3),
        velocity: new THREE.Vector3(
            Math.random() * .02 - .01,
            0.06,
            Math.random() * .02 - .01),
        acceleration: new THREE.Vector3(
            Math.random() * .002 - .001, 
            Math.random() * .002 - .001,
            0)
    }
    particles.push(particle);
    geometry.vertices.push(particle.position)
}

const material = new THREE.PointsMaterial({color:0xffffff,size: 0.5});
var mesh = new THREE.Points(geometry, material);
mesh.position.z = -4;
scene.add(mesh);

// Function taken from three.js_shadowmap_pointlight example
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pointlight.html
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

function animate()
{
    particles.forEach(p => {
        p.velocity.add(p.acceleration)
        p.position.add(p.velocity)
    });
    mesh.geometry.verticesNeedUpdate = true;        
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();