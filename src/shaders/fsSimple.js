export const fsSimple = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D uSampler;

    void main()
    {
        gl_FragColor = texture2D(uSampler, uv);
    }
`;