//export
const fsColorMapping = `
    precision mediump float;
    precision mediump int;
    uniform float colorMapStart[15], colorMapEnd[15];
    uniform float colorMapStartValue[15], colorMapEndValue[15];
    uniform float colorMapStartAlpha[15], colorMapEndAlpha[15];
    uniform int colorMapFlipped[15];
    varying vec2 uv;
    uniform sampler2D uSampler, colorMap[15];
    uniform vec3 NanColor;
    uniform vec2 InvSize;
    uniform float highlightValue;

    float sampleValue(in sampler2D sampler, in vec2 uv)
    {
        // Get float value (valueS) from RGB data
        vec4 rgba = texture2D(sampler, uv);
        if(rgba.a <= 1e-5)
            return -1e20;
        float valueI = floor(rgba.r * 255.0) * 65536.0 + floor(rgba.g * 255.0) * 256.0 + floor(rgba.b * 255.0);
        if(valueI < 0.5)
            return -1e20;
        float valueS = (valueI - 1.0) / 16777214.0; // 0 is reserved as 'nothing' //float(0xfffffe)
        valueS = clamp(valueS, 0.0, 1.0);
        return valueS;
    }

    void main()
    {
        float value = sampleValue(uSampler, uv);

        if (value == -1e20)
        {
            gl_FragColor = vec4(NanColor, 0.0);
            return;
        }

        float f, n, h = 0.0;

        if (highlightValue != -1e20 &&(n = sampleValue(uSampler, uv + vec2(-InvSize.x, 0.0))) != -1e20 &&
            (f = (highlightValue - n) / (value - n)) > 0.0 && f <= 1.0)
            h += f;
        if (highlightValue != -1e20 && (n = sampleValue(uSampler, uv + vec2(InvSize.x, 0.0))) != -1e20 &&
            (f = (highlightValue - n) / (value - n)) > 0.0 && f <= 1.0)
            h += f;
        if (highlightValue != -1e20 && (n = sampleValue(uSampler, uv + vec2(0.0, -InvSize.y))) != -1e20 &&
            (f = (highlightValue - n) / (value - n)) > 0.0 && f <= 1.0)
            h += f;
        if (highlightValue != -1e20 && (n = sampleValue(uSampler, uv + vec2(0.0, InvSize.y))) != -1e20 &&
            (f = (highlightValue - n) / (value - n)) > 0.0 && f <= 1.0)
            h += f;
        h /= 2.0;

        if(value >= colorMapStart[0] && value <= colorMapEnd[0])
        {
            float v = (value - colorMapStart[0]) / (colorMapEnd[0] - colorMapStart[0]);
            v = (v - colorMapStartValue[0]) / (colorMapEndValue[0] - colorMapStartValue[0]);
            float a = v * colorMapEndAlpha[0] + (1.0 - v) * colorMapStartAlpha[0];
            if(colorMapFlipped[0] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[0], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[1] && value <= colorMapEnd[1])
        {
            float v = (value - colorMapStart[1]) / (colorMapEnd[1] - colorMapStart[1]);
            v = (v - colorMapStartValue[1]) / (colorMapEndValue[1] - colorMapStartValue[1]);
            float a = v * colorMapEndAlpha[1] + (1.0 - v) * colorMapStartAlpha[1];
            if(colorMapFlipped[1] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[1], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[2] && value <= colorMapEnd[2])
        {
            float v = (value - colorMapStart[2]) / (colorMapEnd[2] - colorMapStart[2]);
            v = (v - colorMapStartValue[2]) / (colorMapEndValue[2] - colorMapStartValue[2]);
            float a = v * colorMapEndAlpha[2] + (1.0 - v) * colorMapStartAlpha[2];
            if(colorMapFlipped[2] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[2], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[3] && value <= colorMapEnd[3])
        {
            float v = (value - colorMapStart[3]) / (colorMapEnd[3] - colorMapStart[3]);
            v = (v - colorMapStartValue[3]) / (colorMapEndValue[3] - colorMapStartValue[3]);
            float a = v * colorMapEndAlpha[3] + (1.0 - v) * colorMapStartAlpha[3];
            if(colorMapFlipped[3] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[3], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[4] && value <= colorMapEnd[4])
        {
            float v = (value - colorMapStart[4]) / (colorMapEnd[4] - colorMapStart[4]);
            v = (v - colorMapStartValue[4]) / (colorMapEndValue[4] - colorMapStartValue[4]);
            float a = v * colorMapEndAlpha[4] + (1.0 - v) * colorMapStartAlpha[4];
            if(colorMapFlipped[4] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[4], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[5] && value <= colorMapEnd[5])
        {
            float v = (value - colorMapStart[5]) / (colorMapEnd[5] - colorMapStart[5]);
            v = (v - colorMapStartValue[5]) / (colorMapEndValue[5] - colorMapStartValue[5]);
            float a = v * colorMapEndAlpha[5] + (1.0 - v) * colorMapStartAlpha[5];
            if(colorMapFlipped[5] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[5], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[6] && value <= colorMapEnd[6])
        {
            float v = (value - colorMapStart[6]) / (colorMapEnd[6] - colorMapStart[6]);
            v = (v - colorMapStartValue[6]) / (colorMapEndValue[6] - colorMapStartValue[6]);
            float a = v * colorMapEndAlpha[6] + (1.0 - v) * colorMapStartAlpha[6];
            if(colorMapFlipped[6] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[6], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[7] && value <= colorMapEnd[7])
        {
            float v = (value - colorMapStart[7]) / (colorMapEnd[7] - colorMapStart[7]);
            v = (v - colorMapStartValue[7]) / (colorMapEndValue[7] - colorMapStartValue[7]);
            float a = v * colorMapEndAlpha[7] + (1.0 - v) * colorMapStartAlpha[7];
            if(colorMapFlipped[7] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[7], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[8] && value <= colorMapEnd[8])
        {
            float v = (value - colorMapStart[8]) / (colorMapEnd[8] - colorMapStart[8]);
            v = (v - colorMapStartValue[8]) / (colorMapEndValue[8] - colorMapStartValue[8]);
            float a = v * colorMapEndAlpha[8] + (1.0 - v) * colorMapStartAlpha[8];
            if(colorMapFlipped[8] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[8], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[9] && value <= colorMapEnd[9])
        {
            float v = (value - colorMapStart[9]) / (colorMapEnd[9] - colorMapStart[9]);
            v = (v - colorMapStartValue[9]) / (colorMapEndValue[9] - colorMapStartValue[9]);
            float a = v * colorMapEndAlpha[9] + (1.0 - v) * colorMapStartAlpha[9];
            if(colorMapFlipped[9] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[9], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[10] && value <= colorMapEnd[10])
        {
            float v = (value - colorMapStart[10]) / (colorMapEnd[10] - colorMapStart[10]);
            v = (v - colorMapStartValue[10]) / (colorMapEndValue[10] - colorMapStartValue[10]);
            float a = v * colorMapEndAlpha[10] + (1.0 - v) * colorMapStartAlpha[10];
            if(colorMapFlipped[10] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[10], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[11] && value <= colorMapEnd[11])
        {
            float v = (value - colorMapStart[11]) / (colorMapEnd[11] - colorMapStart[11]);
            v = (v - colorMapStartValue[11]) / (colorMapEndValue[11] - colorMapStartValue[11]);
            float a = v * colorMapEndAlpha[11] + (1.0 - v) * colorMapStartAlpha[11];
            if(colorMapFlipped[11] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[11], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[12] && value <= colorMapEnd[12])
        {
            float v = (value - colorMapStart[12]) / (colorMapEnd[12] - colorMapStart[12]);
            v = (v - colorMapStartValue[12]) / (colorMapEndValue[12] - colorMapStartValue[12]);
            float a = v * colorMapEndAlpha[12] + (1.0 - v) * colorMapStartAlpha[12];
            if(colorMapFlipped[12] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[12], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[13] && value <= colorMapEnd[13])
        {
            float v = (value - colorMapStart[13]) / (colorMapEnd[13] - colorMapStart[13]);
            v = (v - colorMapStartValue[13]) / (colorMapEndValue[13] - colorMapStartValue[13]);
            float a = v * colorMapEndAlpha[13] + (1.0 - v) * colorMapStartAlpha[13];
            if(colorMapFlipped[13] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[13], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
        else if(value >= colorMapStart[14] && value <= colorMapEnd[14])
        {
            float v = (value - colorMapStart[14]) / (colorMapEnd[14] - colorMapStart[14]);
            v = (v - colorMapStartValue[14]) / (colorMapEndValue[14] - colorMapStartValue[14]);
            float a = v * colorMapEndAlpha[14] + (1.0 - v) * colorMapStartAlpha[14];
            if(colorMapFlipped[14] == 1) v = 1.0 - v;
            gl_FragColor = vec4(texture2D(colorMap[14], vec2(v, 0.5)).rgb + vec3(-h, h, -h), a + h);
        }
    }
`;