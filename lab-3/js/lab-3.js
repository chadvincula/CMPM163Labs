// Ensure that shaders have been loaded
THREE.Cache.enabled = true;
var count = 0;
var loader = new THREE.FileLoader();
var fshader, vshader;

loader.load('shaders/vertex-shader.vert',
    // onLoad callback
    function (data)
    {
        console.log(data); // output the text to the console
        vshader = data;
        count += 1;
        addCoolCube(); // we will write this method
    },
    // onProgress callback
    function (xhr)
    {
        console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
    },
    // onError callback
    function (err)
    {
        console.error('An error happened');
    }
);

loader.load('shaders/fragment-shader.frag',
    // onLoad callback
    function (data)
    {
        console.log(data); // output the text to the console
        fshader = data;
        count += 1;
        addCoolCube(); // we will write this method
    },
    // onProgress callback
    function (xhr)
    {
        console.log((xhr.loaded/xhr.total * 100)+ '% loaded');
    },
    // onError callback
    function (err)
    {
        console.error('An error happened');
    }
);

// Add cool cube method
var geometry1, material1, mesh1;

function addCoolCube()
{
    if(count == 2)
    {
        let uniforms = {
            colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
        };
    
        geometry1 = new THREE.BoxGeometry(1, 1, 1);
        material1 =  new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"});

        mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.position.x = 3;
        scene.add(mesh1);
    }    
}


// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// setup the 1st cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshPhongMaterial( { color: 0xdddddd, 
                                              specular: 0x00ff00,
                                              shininess: 30 });    
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);

// setup the 2nd cube
var texture = new THREE.TextureLoader().load("../textures/lab-2-part-2-screenshot.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.encoding = THREE.sRGBEncoding;
texture.anisotropy = 16;
texture = null;

cubeMaterials = [
    new THREE.MeshToonMaterial( {color: 0x01234ef, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} ),
    new THREE.MeshToonMaterial( {color: 0x2938457, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} ),
    new THREE.MeshToonMaterial( {color: 0xfedcba, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} ),
    new THREE.MeshToonMaterial( {color: 0x47fe91, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} ),
    new THREE.MeshToonMaterial( {color: 0xab4758, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} ),
    new THREE.MeshToonMaterial( {color: 0x1928dc, side: THREE.DoubleSide, bumpMap: texture, bumpScale: 1, specular: 0x222222, shininess: 50, wireframe: true, flatShading: true} )
];
var material2 = new THREE.MeshFaceMaterial(cubeMaterials);
var cube2 = new THREE.Mesh( geometry, material2 );
cube2.position.set(-3, 0, 0);
scene.add(cube2);

// add the light
var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(10, 10, 10);
scene.add(light);

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
    requestAnimationFrame(animate);
    geometry.rotateX(0.01);
    geometry.rotateY(0.01);
    renderer.render(scene, camera);

    // Animate cool cube
    if(geometry1) {
        geometry1.rotateX(0.01);
        geometry1.rotateY(0.01);
    }
}
animate();