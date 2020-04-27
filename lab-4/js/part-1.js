// Load shaders
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
                // addTextureShaderCube(); // we will write this method
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
            });

loader.load('shaders/fragment-shader.frag',
            // onLoad callback
            function (data)
            {
                console.log(data); // output the text to the console
                fshader = data;
                count += 1;
                addTextureShaderCube(fshader); // we will write this method
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
            });

loader.load('shaders/fragment-shader-2.frag',
            // onLoad callback
            function (data)
            {
                console.log(data); // output the text to the console
                fshader = data;
                count += 1;
                addTextureShaderCube(fshader); // we will write this method
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
            });

var geometry1, material1, mesh1;
var geometries = [];
var materials = [];
var meshes = [];

function addTextureShaderCube(fragShader)
{
    if(count >= 2)
    {
        let uniforms = {
            texture1: {type: "t", value: new THREE.TextureLoader().load("textures/galaxy-paint.jpg")}
        };
    
        geometries.push(new THREE.BoxGeometry(1, 1, 1));
        materials.push(new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fragShader,
            vertexShader: vshader}));

        meshes.push(new THREE.Mesh(geometries[geometries.length - 1], materials[materials.length - 1]));
        meshes[meshes.length - 1].position.x = meshes.length * 2;
        for(var i = 0; i < meshes.length; i++)
            scene.add(meshes[i]);
    }    
}

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
cube.position.x = -2;

material = new THREE.MeshPhongMaterial( { map: texture } );
var cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);
cube2.position.x = -4;

var texture2 = new THREE.TextureLoader().load("textures/galaxy-paint.jpg");
var nMap2 = new THREE.TextureLoader().load("normal-maps/carved-wood.jpg");
var material2 = new THREE.MeshPhongMaterial( { map: texture2,
                                               normalMap: nMap2 } );
var cube3 = new THREE.Mesh(geometry, material2);
scene.add(cube3);

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