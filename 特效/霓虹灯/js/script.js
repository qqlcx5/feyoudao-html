/**
 * Referenced / https://wgld.org/d/glsl/g001.html
 * Referenced / https://thebookofshaders.com
 */

// variable for global
let c, // canvas
cw, ch, // window size
mx, my, // mouse
gl, // context
uniLocation, // for shader
run, // not used
eCheck, // not used
startTime, time, tempTime; // times

/**
 * Make canvas
 */
const createCanvas = () => {
  const b = document.getElementsByTagName('body')[0];
  const c = document.createElement('canvas');
  c.setAttribute('id', 'canvas');
  c.style.position = 'fixed';
  c.style.display = 'block';
  c.style.zIndex = '-1';
  c.style.top = '0';
  c.style.left = '0';
  c.style.width = '100%';
  c.style.height = '100%';
  c.style.background = 'black';
  b.appendChild(c);
};

/**
 * Check event
 * @params {Object} e - check event
 */
const checkChange = e => {
  run = e.currentTarget.checked;
  if (run) {
    startTime = new Date().getTime();
    render();
  } else {
    tempTime += time;
  }
};

/**
 * Mouse event
 * @params {Object} e - mouse event
 */
const mouseMove = e => {
  mx = e.clientX / cw;
  my = e.clientY / ch;
};

/**
 * Resize window
 */
const resizeWindow = () => {
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
  init();
};

/**
 * Rendering function
 */
const render = () => {
  // run?
  if (!run) return;
  // time
  time = (new Date().getTime() - startTime) * 0.001;
  // clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
  // uniforms
  gl.uniform1f(uniLocation[0], time);
  gl.uniform2fv(uniLocation[1], [mx, my]);
  gl.uniform2fv(uniLocation[2], [cw, ch]);
  // draw
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  gl.flush();
  // recur
  requestAnimationFrame(render);
};

/**
 * Create shader
 * @params {String} id - element id
 * @return {Object} shader - shader object
 */
const create_shader = id => {
  let shader;
  // get reference tag
  const scriptElement = document.getElementById(id);
  // if not exsist return
  if (!scriptElement) return;
  // check script attribute
  switch (scriptElement.type) {
    // vertex shader
    case 'x-shader/x-vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    // fragment shader
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default:
      return;}

  // assign source to shader
  gl.shaderSource(shader, scriptElement.text);
  // compile shader
  gl.compileShader(shader);
  // check shader was compiled?
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

    return shader;
  } else {
    console.log(gl.getShaderInfoLog(shader));
  }
};

/**
 * Create program object and link shader function
 * @param {String} vs - element name
 * @param {String} fs - element name
 * @return {object} program - return program object
 */
const create_program = (vs, fs) => {
  let program;
  // create program object
  program = gl.createProgram();
  // attach shader program object
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  // link shader
  gl.linkProgram(program);
  // check shader link
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // if success enable program
    gl.useProgram(program);

    return program;
  } else {

    return null;
  }
};

/**
 * Create vbo function
 * @param {Array} - Array in position
 * @return {Object} - vertex buffer object 
 */
const create_vbo = data => {
  //create buffer object
  const vbo = gl.createBuffer();
  // bind buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  // set data to buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  // invalidata buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
};

/**
 * Create index buffer object function
 * @param {Array} data - Array in index
 * @return {Object} ibo - index buffer object
 */
const create_ibo = data => {
  // create buffer object
  const ibo = gl.createBuffer();
  // bind buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  // set data to buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  // invalidate buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
};

/**
 * Init canvas
 */
const init = () => {
  time = 0.0;
  tempTime = 0.0;
  uniLocation = new Array();

  // get element
  c = document.getElementById('canvas');
  //eCheck = document.getElementById('check');

  // canvas size
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;

  // get webgl context
  gl = c.getContext('webgl') || c.getContext('experimental-webgl');

  // set viewport
  gl.viewport(0, 0, cw, ch);

  // init shader
  const prg = create_program(create_shader('vs'), create_shader('fs'));
  run = prg != null;if (!run) {eCheck.checked = false;}
  uniLocation[0] = gl.getUniformLocation(prg, 'time');
  uniLocation[1] = gl.getUniformLocation(prg, 'mouse');
  uniLocation[2] = gl.getUniformLocation(prg, 'resolution');

  // init vertex
  const position = [
  -1.0, 1.0, 0.0,
  1.0, 1.0, 0.0,
  -1.0, -1.0, 0.0,
  1.0, -1.0, 0.0];

  const index = [
  0, 2, 1,
  1, 2, 3];


  const vPosition = create_vbo(position);
  const vIndex = create_ibo(index);
  const vAttLocation = gl.getAttribLocation(prg, 'position');
  gl.bindBuffer(gl.ARRAY_BUFFER, vPosition);
  gl.enableVertexAttribArray(vAttLocation);
  gl.vertexAttribPointer(vAttLocation, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex);

  // etc init
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  mx = 0.5;
  my = 0.5;
  startTime = new Date().getTime();
};

window.addEventListener('load', () => {
  createCanvas();
  init();
  render();

  // event
  c.addEventListener('mousemove', mouseMove, false);
  //eCheck.addEventListener('change', checkChange, false);
  window.addEventListener('resize', resizeWindow, false);
}, false);