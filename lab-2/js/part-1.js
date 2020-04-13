// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, false);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( {color: 0x4c9775} );
var cube = new THREE.Mesh(geometry, material);
var material2 = new THREE.MeshBasicMaterial( {color: 0xff0923});
var cube2 = new THREE.Mesh(geometry, material2);
var material3 = new THREE.MeshBasicMaterial( {color: 0x345678});
var cube3 = new THREE.Mesh(geometry, material3);
var theta = Math.PI / 360;
var radius = 0.01;
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
camera.position.z = 3; //this moves the camera towards the viewer

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // Animate the first cube
    cube.translateX(Math.cos(theta) * radius);
    cube.translateY(Math.sin(theta) * radius);
    cube.rotateX(0.01);
    cube.rotateY(0.01);

    // Animate the second cube
    cube2.translateX(Math.cos(theta) * radius);
    cube2.translateY(Math.sin(theta) * radius);
    cube2.rotateX(-0.01);
    cube2.rotateY(-0.01);

    // Animate the third cube
    cube3.translateX(Math.cos(theta) * radius * 50);
    cube3.rotateY(0.1);
    cube3.rotateZ(0.1);

    theta += Math.PI / 360;
}
animate();