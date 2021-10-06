// http://www.physics.sfasu.edu/astro/color/blackbody.html
// http://www.vendian.org/mncharity/dir3/blackbody/
// http://www.vendian.org/mncharity/dir3/blackbody/UnstableURLs/bbr_color.html

export const fragmentShader = `
    uniform float iGlobalTime;
    uniform vec2 iResolution;
    float C;

    #define I_MAX   50
    #define E     .01 * C
    #define t2 iGlobalTime
    #define r2 iResolution.xy
    //#define CENTERED true

    #define CAM_PATH 1
    #define FWD_SPEED -100.

    float t;
    float a;
    vec4  march(vec3 pos, vec3 dir);
    vec3  camera(vec2 uv);
    vec2  rot(vec2 p, vec2 ang);
    void  rotate(inout vec2 v, float angle);



    // color blackbody
    vec3 blackbody(float temp) {
        vec3 col = vec3(255.);
        col.z = 5610000. * pow(temp, (-3. / 2.)) + 148. * C;
        col.y = 100.04 * log(temp) - 623.6;
        if (temp > 6500.) col.y = 720000. * pow(temp,(-3. / 2.)) + 184.;
        col.x = 194.18 * log(temp) - 1448.6;
        col = clamp(col, 0., 255.)/290.;
        if (temp < 1600.) col += temp/100000.;
        col.x += .2;
        return col;
    }

    // init blackbody
    void main() {
        C = 1.;
        vec2 f =   gl_FragCoord.xy;
        t  =       iGlobalTime * .5;
        vec3 col = vec3(0., 0., 0.) * C;
        vec2 R =   iResolution.xy,
        uv =       vec2(f-R/2.) / R.y;
        vec3       dir = camera(uv);
        vec3       pos = vec3(0.0, 0.0, 1.0) * C;
        pos.z = t*FWD_SPEED;

        vec4 inter = (march(pos, dir));

        col.xyz = blackbody(inter.x*100. * C/inter.w);
        col.xyz += blackbody(((3.0 - (length(uv) * 1.9) * 1.5) * inter.x) *16.) ;
        gl_FragColor =  vec4(col, 1.0) ;
    }

    float de_0(vec3 p) {
        float mind = cos(C);
        vec3 pr = p - cos(t * .5) *.135;

        rotate(pr.xy, (a));

        pr.xy /= .5;
        pr.xyz = fract(pr.xyz);
        pr -= .5;

        mind = min(mind, (length(pr.xyz) - .432 - sin(iGlobalTime) * .1));

        return (mind);
    }

    float de_1(vec3 p) {
        float mind = 0.0;
        vec3  pr = p*2.5;
        vec2  q;

        q = vec2(length(pr.yx) - 1., pr.z );
        // #ifdef PULSE
            // q.y = rot(q.xy, vec2(-1. + (sin(t*6.))-175., 0.)).x;
        // #else
            q.y = rot(q.xy, vec2(-1., 0.)).x;
        // #endif
        mind = length(q) - 16.;

        return mind;
    }

    // add 2 distances to constraint the de_0 to a cylinder
    float de_2(vec3 p) {
        return (de_0(p) - de_1(p) / 4.);
    }

    void nextPos(vec3 p, float t, vec2 rot) {
        p.x += rot.x*2.+sin(t*28.);
        p.y += rot.y*2.+cos(t*28.);
    }

    float scene(vec3 p) {
        float mind = 1e2;
        a = -(t*.5) + 1.5*cos( 1.8*(p.y*.015+p.x*.015+p.z *.15)  + t);
        #ifdef CAM_PATH
            vec2 rot = vec2(cos(a+1.57), sin(a+1.57));
        #else
            vec2 rot = vec2(cos(a*.5), sin(a*.5));
        #endif
        #ifndef CENTERED
            #ifdef CAM_PATH
                #if CAM_PATH == 0
                    p.x += rot.x*2.+sin(t*8.);
                    p.y += rot.y*2.+cos(t*8.);
                #elif CAM_PATH == 1
                    p.x += rot.x*2.+sin(t*2.);
                    p.y += rot.y*2.+cos(t*2.);
                #endif
            #else
                p.x += rot.x*4.;
                p.y += rot.y*4.;
            #endif
        #endif
        // nextPos(p, t, rot);
        mind = de_2(p)/2.;
        return mind;
    }

    vec4 march(vec3 pos, vec3 dir) {
        vec2 dist = vec2(10., 0.);
        vec3 p = vec3(0., 0., 0.);
        vec4 s = vec4(10., 0., 0., 0.);

        for (int i = -1; i < I_MAX; ++i) {
            p = pos + dir * dist.y;
            dist.x = scene(p);
            dist.y += dist.x;
            if (dist.x < E || dist.y > 80.) {
                s.y = 1.6180339887498948482;
                break;
            }
            s.x+= 2.;
        }
        s.w = dist.y;
        return s;
    }

    // Utilities
    void rotate(inout vec2 v, float angle) {
        v = vec2(cos(angle)*v.x+sin(angle)*v.y,-sin(angle)*v.x+cos(angle)*v.y);
    }

    vec2 rot(vec2 p, vec2 ang) {
        float c = tan(ang.x);
        float s = sin(ang.y) * tan(iGlobalTime);
        mat2 m = mat2(c, -s, s, c);
        return (p * m);
    }

    vec3 camera(vec2 uv) {
        float  fov = .3;
        vec3   forw  = vec3(0., 0.,  -2.5 + sin(iGlobalTime*1.3) );
        vec3   right = vec3(1.0, 0.0, 0.0);
        vec3   up    = vec3(0.0, 1.0, 0.0);
        return (normalize((uv.x) * right + (uv.y) * up + fov * forw));
    }
`;
