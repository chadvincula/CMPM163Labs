# CMPM163Labs  
## Lab 6  
- Point Light: A type of light in Unity that acts as a sort of light bulb. It projects light equally in all directions in 3D space. Its range and intensity parameters can affect how far the light travels.  
- Spotlight: A type of light in Unity that acts as a sort of flashlight. It projects light in a cone shape. Also, the spot light's position and rotation are important to consider went thinking about how to project light onto objects using this type of light component.  
- Directional Light: A type of light that acts the Sun and affects all game objects in a scene. The main difference between directional lights and point lights is that position of the directional light doesn't matter, but its rotation does instead.  
- Area Light: Only relevant for baked lightings. This type of light projects light in all directions, but only onto one side of a rectangular plane  
## Lab 4  
[Video of 5 Fairly Static Cubes](https://drive.google.com/open?id=1Cab6s-uDRfzhxwNkYRXNpPm9bTj6QRyv)  
- The first cube on the left uses Three.js functionality for applying textures to a mesh.  
- The second cube on the left also uses Three.js functionality for applying textures to a mesh. The different is that it also applies a normal map onto the mesh.  
- The middle cube is the same thing as the second cube, but with a different texture and normal map.
- The cube to the right of the middle one uses shaders to apply the texture onto the mesh.  
- And the last cube on the right uses shaders, and more specifically, **the GLSL fract() function** to apply a texture in a grid-like pattern onto the mesh. Passing the uv vector multiplied by a scalar into the fract() function gives the grid effect. Apparently it has to do with returning the modulo of the vector? I can't say I completely understand how the fract() function produces the grid effect, but it works and I know how to modify the grid's dimensions.  

**24a)** Given a u coordinate in [0.1], I can use the formula, **f(u) = floor(8 * u)**, to get the corresponding x value of the pixel to sample from in the 8x8 texture.  
**24b)** Given a v coordinate in [0.1], I can use the formula, **f(v) = floor(8 * v)**, to get the corresponding y value of the pixel to sample from in the 8x8 texture.  
**24c)** If f'(u,v) = f'(f(u), f(v)), then f'(0.375,0.25) will give me (3,2). (3,2) in the 8x8 texture will give me the **white color**. 
## Lab 3  
[Video of 4 Cubes](https://drive.google.com/open?id=1glBU7U0A-sg660rtpf8CkN4yMhhIApfE)  
- The first cube on the left was made using 6 wireframe + flatshaded MeshToonMaterials, each with a different color.  
- The second cube on the left was made using the MeshPhongMaterial with a green specular color.  
- The next cube was made using an example shader that apparently interpolates between a color called Perano and Aquamarine.  
- The farthest cube on the right was made by mapping the material's x, y, and z coordinate to an r, g, and b value respectively.

## Lab 2  
[Part 1](https://drive.google.com/open?id=1H8sRQeu4GFrrTNECBo6yhnfCkGMqBlyU)  
Part 2  
![Part 2](/lab-2/img/lab-2-part-2-screenshot.png)  
