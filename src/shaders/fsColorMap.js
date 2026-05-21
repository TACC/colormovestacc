export const fsColorMap = `
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D colorMap[15];
    uniform float colorMapStart[15], colorMapEnd[15];
    uniform float colorMapStartValue[15], colorMapEndValue[15];
    uniform int colorMapFlipped[15];
    uniform vec3 NanColor;

    void main()
    {
        if(uv.x >= colorMapStart[0] && uv.x <= colorMapEnd[0])
        {
            float v = (uv.x - colorMapStart[0]) / (colorMapEnd[0] - colorMapStart[0]);
            v = (v - colorMapStartValue[0]) / (colorMapEndValue[0] - colorMapStartValue[0]);
            if(colorMapFlipped[0] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[0], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[1] && uv.x <= colorMapEnd[1])
        {
            float v = (uv.x - colorMapStart[1]) / (colorMapEnd[1] - colorMapStart[1]);
            v = (v - colorMapStartValue[1]) / (colorMapEndValue[1] - colorMapStartValue[1]);
            if(colorMapFlipped[1] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[1], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[2] && uv.x <= colorMapEnd[2])
        {
            float v = (uv.x - colorMapStart[2]) / (colorMapEnd[2] - colorMapStart[2]);
            v = (v - colorMapStartValue[2]) / (colorMapEndValue[2] - colorMapStartValue[2]);
            if(colorMapFlipped[2] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[2], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[3] && uv.x <= colorMapEnd[3])
        {
            float v = (uv.x - colorMapStart[3]) / (colorMapEnd[3] - colorMapStart[3]);
            v = (v - colorMapStartValue[3]) / (colorMapEndValue[3] - colorMapStartValue[3]);
            if(colorMapFlipped[3] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[3], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[4] && uv.x <= colorMapEnd[4])
        {
            float v = (uv.x - colorMapStart[4]) / (colorMapEnd[4] - colorMapStart[4]);
            v = (v - colorMapStartValue[4]) / (colorMapEndValue[4] - colorMapStartValue[4]);
            if(colorMapFlipped[4] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[4], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[5] && uv.x <= colorMapEnd[5])
        {
            float v = (uv.x - colorMapStart[5]) / (colorMapEnd[5] - colorMapStart[5]);
            v = (v - colorMapStartValue[5]) / (colorMapEndValue[5] - colorMapStartValue[5]);
            if(colorMapFlipped[5] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[5], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[6] && uv.x <= colorMapEnd[6])
        {
            float v = (uv.x - colorMapStart[6]) / (colorMapEnd[6] - colorMapStart[6]);
            v = (v - colorMapStartValue[6]) / (colorMapEndValue[6] - colorMapStartValue[6]);
            if(colorMapFlipped[6] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[6], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[7] && uv.x <= colorMapEnd[7])
        {
            float v = (uv.x - colorMapStart[7]) / (colorMapEnd[7] - colorMapStart[7]);
            v = (v - colorMapStartValue[7]) / (colorMapEndValue[7] - colorMapStartValue[7]);
            if(colorMapFlipped[7] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[7], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[8] && uv.x <= colorMapEnd[8])
        {
            float v = (uv.x - colorMapStart[8]) / (colorMapEnd[8] - colorMapStart[8]);
            v = (v - colorMapStartValue[8]) / (colorMapEndValue[8] - colorMapStartValue[8]);
            if(colorMapFlipped[8] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[8], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[9] && uv.x <= colorMapEnd[9])
        {
            float v = (uv.x - colorMapStart[9]) / (colorMapEnd[9] - colorMapStart[9]);
            v = (v - colorMapStartValue[9]) / (colorMapEndValue[9] - colorMapStartValue[9]);
            if(colorMapFlipped[9] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[9], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[10] && uv.x <= colorMapEnd[10])
        {
            float v = (uv.x - colorMapStart[10]) / (colorMapEnd[10] - colorMapStart[10]);
            v = (v - colorMapStartValue[10]) / (colorMapEndValue[10] - colorMapStartValue[10]);
            if(colorMapFlipped[10] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[10], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[11] && uv.x <= colorMapEnd[11])
        {
            float v = (uv.x - colorMapStart[11]) / (colorMapEnd[11] - colorMapStart[11]);
            v = (v - colorMapStartValue[11]) / (colorMapEndValue[11] - colorMapStartValue[11]);
            if(colorMapFlipped[11] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[11], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[12] && uv.x <= colorMapEnd[12])
        {
            float v = (uv.x - colorMapStart[12]) / (colorMapEnd[12] - colorMapStart[12]);
            v = (v - colorMapStartValue[12]) / (colorMapEndValue[12] - colorMapStartValue[12]);
            if(colorMapFlipped[12] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[12], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[13] && uv.x <= colorMapEnd[13])
        {
            float v = (uv.x - colorMapStart[13]) / (colorMapEnd[13] - colorMapStart[13]);
            v = (v - colorMapStartValue[13]) / (colorMapEndValue[13] - colorMapStartValue[13]);
            if(colorMapFlipped[13] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[13], vec2(v, 0.5)).rgb, 1.0);
        }
        else if(uv.x >= colorMapStart[14] && uv.x <= colorMapEnd[14])
        {
            float v = (uv.x - colorMapStart[14]) / (colorMapEnd[14] - colorMapStart[14]);
            v = (v - colorMapStartValue[14]) / (colorMapEndValue[14] - colorMapStartValue[14]);
            if(colorMapFlipped[14] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[14], vec2(v, 0.5)).rgb, 1.0);
        }
    }
`;