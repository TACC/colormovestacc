//export
const vsAlpha = `
    precision mediump float;
    precision mediump int;
    uniform float colorMapStart[15], colorMapEnd[15];
    uniform float colorMapStartValue[15], colorMapEndValue[15];
    uniform float colorMapStartAlpha[15], colorMapEndAlpha[15];
    uniform int colorMapFlipped[15];
    attribute vec3 vpos;
    uniform mat4 matWorldViewProj;
    uniform mat4 matTexCoordTransform;
    varying vec2 uv;

    void main()
    {
    float u = ((matTexCoordTransform * vec4(2.0 * vpos.x - 1.0, 0.0, 0.0, 1.0)).x + 1.0) / 2.0;
    uv = vec2(u, 0.5);

    if(vpos.y != 0.0)
    {
        float y = 1.0;
        for(int i = 0; i < 15; ++i)
            if(uv.x >= colorMapStart[i] && uv.x <= colorMapEnd[i])
            {
                float v = (uv.x - colorMapStart[i]) / (colorMapEnd[i] - colorMapStart[i]);
                float a = v * colorMapEndAlpha[i] + (1.0 - v) * colorMapStartAlpha[i];
                y = 1.0 + a * 9.0;
                break;
            }
        gl_Position = matWorldViewProj * vec4(vpos.x, y, vpos.z, 1.0);
    }
    else
        gl_Position = matWorldViewProj * vec4(vpos, 1.0);
    }
`;