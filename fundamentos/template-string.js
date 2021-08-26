const name = "danmontesino";
const real = "Daniel";

const normal = "Hello I'm " + name + ' ' + real;
const template = `Hello I'm ${name} ${real}`;

console.log(normal);
console.log(template);

console.log(normal === template);

const html = `
<h1>Hola</h1>
<p>Mundo</p>
`;

console.log(html);