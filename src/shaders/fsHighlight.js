//export
const fsHighlight = `
    precision mediump float;
    varying vec2 uv;

    void main()
    {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.4 + 0.2 * uv.x * uv.y);
    }
`;