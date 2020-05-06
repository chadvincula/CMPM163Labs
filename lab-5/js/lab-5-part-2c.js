// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

var particles = [];
var particleSystems;

// Create particles
function createParticles(x, y)
{
    const geometry = new THREE.Geometry();
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
                Math.random() * .004 - .002, 
                Math.random() * .004,
                Math.random() * .004 - .002)
        }
        particles.push(particle);
        geometry.vertices.push(particle.position)
    }
    console.log("particles @ (" + x + ", " + y + ")");
    geometry.translate(x, -y, 0);

    // var materials = [];
    // for(let i = 0; i < 1000; i++)
    // {
        const material = new THREE.PointsMaterial({color:0xffffff,
                                                size: 0,
                                                transparent: true,
                                                opacity: 1});
    //     materials.push(material);
    // }
    particleSystems = new THREE.Points(geometry, material); // materials);
    particleSystems.position.z = -4;
    scene.add(particleSystems);

    var origin = new THREE.Points(new THREE.Geometry(), material);
    scene.add(origin);
}
// JS Interactivity
// Function taken from three.js_shadowmap_pointlight example
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shadowmap_pointlight.html
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onClick()
{
    // console.log("clicked: (" + event.clientX + ", " + event.clientY + ")");
    var x = (event.clientX - window.innerWidth / 2) / 15;
    var y = (event.clientY - window.innerHeight / 2) / 15;
    console.log("Spawn particle effect @ (" + x + ", " + y + ")");
    createParticles(x, y);
}

window.addEventListener("resize", onWindowResize, false );
window.addEventListener("click", onClick);

function animate()
{
    if(particleSystems != null)
    {
        particles.forEach(p => {
            p.velocity.add(p.acceleration)
            p.position.add(p.velocity)
        });
        if(particleSystems.material.opacity > 0)
        {
            console.log("turning invisible");
            particleSystems.material.opacity -= 0.05;
            particleSystems.material.size += 0.1;
        }
        particleSystems.geometry.verticesNeedUpdate = true;
        // particleSystems.geometry.rotateY(0.1);
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();