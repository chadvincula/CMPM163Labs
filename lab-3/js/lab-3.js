// Ensure that shaders have been loaded
THREE.Cache.enabled = true;
var count = 0;
var loader = new THREE.FileLoader();
var fshader, fshader2, vshader;

loader.load('shaders/vertex-shader.vert',
    // onLoad callback
    function (data)
    {
        console.log(data); // output the text to the console
        vshader = data;
        count += 1;
        // addCoolCube(); // we will write this method
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
        addCoolCube(fshader); // we will write this method
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

loader.load('shaders/fragment-shader-2.frag',
    // onLoad callback
    function (data)
    {
        console.log(data); // output the text to the console
        fshader2 = data;
        count += 1;
        addCoolCube(fshader2); // we will write this method
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
var coolGeometries = [];
var coolMaterials = [];
var coolMeshes = [];

function addCoolCube(fragShader)
{
    if(count >= 2)
    {
        let uniforms = {
            colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
        };
    
        coolGeometries.push(new THREE.BoxGeometry(1, 1, 1));
        coolMaterials.push(new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fragShader,
            vertexShader: vshader,
            precision: "mediump"}));

        coolMeshes.push(new THREE.Mesh(coolGeometries[coolGeometries.length - 1], coolMaterials[coolMaterials.length - 1]));
        // coolMeshes.position.x = 3;
        coolMeshes[coolMeshes.length - 1].position.x = coolMeshes.length * 3;
        for(var i = 0; i < coolMeshes.length; i++)
            scene.add(coolMeshes[i]);
    }    
}


// setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.x = 1.5;
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
var light = new THREE.PointLight(0xffffff, 1, 1000);
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

    // Animate cool cubes
    for(var i = 0; i < coolGeometries.length; i++)
    {
        if(coolGeometries[i]) {
            coolGeometries[i].rotateX(0.01);
            coolGeometries[i].rotateY(0.01);
        }
    }
}
animate();