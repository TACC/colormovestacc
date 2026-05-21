export const vsSimple = `
    attribute vec3 vpos;
    attribute vec2 vtexcoord;
    uniform mat4 matWorldViewProj;
    varying vec2 uv;

    void main()
    {
        gl_Position = matWorldViewProj * vec4(vpos, 1.0);
        uv = vtexcoord;
    }
`;