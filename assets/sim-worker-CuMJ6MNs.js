const e=[0,1,-1,0,0,0,0,1,-1,1,-1,1,-1,1,-1,0,0,0,0],t=[0,0,0,1,-1,0,0,1,-1,-1,1,0,0,0,0,1,-1,1,-1],n=[0,0,0,0,0,1,-1,0,0,0,0,1,-1,-1,1,1,-1,-1,1],r=e.map((e,t)=>t===0?1/3:t<7?1/18:1/36),i=e.map((r,i)=>e.findIndex((r,a)=>e[i]===-e[a]&&t[i]===-t[a]&&n[i]===-n[a]));function a(i,a,o,s){let c=1.5*(a*a+o*o+s*s);return{f:e.map((l,u)=>{let d=3*(e[u]*a+t[u]*o+n[u]*s);return r[u]*i*(1+d+.5*d*d-c)}),u:a}}function o(e,t,n,r){let i=new Float32Array(e*t*n),a=.16*e,o=.06*e,s=.1*t,c=.1*n,l=e=>e>0?Math.min(1,e)**2:0;for(let u=0;u<n;u++)for(let d=0;d<t;d++)for(let f=0;f<e;f++){let p=Math.max(l((f-(e-1-a))/a),l((o-f)/o),l((d-(t-1-s))/s),r?0:l((s-d)/s),l((u-(n-1-c))/c),l((c-u)/c));i[f+e*(d+t*u)]=p}return i}const s=1.2;function c(e,t,n,r){let i=new Float32Array(e*t*n);if(!(r>0))return i;for(let a=0;a<n;a++)for(let o=0;o<t;o++)for(let s=0;s<e;s++){let c=Math.min(s,e-1-s,o,t-1-o,a,n-1-a);i[s+e*(o+t*a)]=c<r?((r-c)/r)**2:0}return i}function l(r,i,a,o,s){let l=i*a*o,u=new Uint32Array(l),d=i,f=i*a,p=c(i,a,o,s.spongeL);for(let s=0;s<o;s++)for(let c=0;c<a;c++)for(let l=0;l<i;l++){let m=l+d*c+f*s;if(r[m]){u[m]=r[m];continue}if(l===0||c===0||s===0||l===i-1||c===a-1||s===o-1){u[m]=64;continue}let h=!1;for(let i=1;i<19;i++)if(r[m+e[i]+t[i]*d+n[i]*f]){h=!0;break}u[m]=(h?4:0)|Math.round(p[m]*255)<<8}for(let e=0;e<s.inlet.length;e++)u[s.inlet[e]]=128|s.inletQ[e]<<16|s.inletId[e]<<21;return u}function u(r,i,a,s){let c=i*a*s,l=new Uint32Array(c),u=i,d=i*a,f=o(i,a,s,r[1+d]===2);for(let o=0;o<s;o++)for(let c=0;c<a;c++)for(let p=0;p<i;p++){let m=p+u*c+d*o;if(r[m]){l[m]=r[m];continue}if(p===i-1){l[m]=16;continue}if(p===0||c===0||o===0||c===a-1||o===s-1){l[m]=8;continue}let h=!1,g=!1;for(let i=1;i<19;i++){let a=r[m+e[i]+t[i]*u+n[i]*d];a===1?h=!0:a===2&&(g=!0)}l[m]=(h||g?4|(h&&g?32:0):0)|Math.round(f[m]*255)<<8}return l}const d=e=>Number.isInteger(e)?String(e):e.toPrecision(17);function f(a,o,s){let c=a*o*s,l=a,u=a*o,f=e.map((r,i)=>e[i]+t[i]*l+n[i]*u),p=[];p.push(`let Fx = 0, Fy = 0, Fz = 0, bad = 0;`),p.push(`for (let z = 1; z < ${s-1}; z++) for (let y = 1; y < ${o-1}; y++) {`),p.push(`  let n = ${l} * y + ${u} * z;`),p.push(`  for (let x = 1; x < ${a-1}; x++) { n++;`),p.push(`    const nf = near[n]; if (nf === 255) continue;`),p.push(`    let ${e.map((e,t)=>`f`+t).join(`, `)};`),p.push(`    if (nf === 0) {`);for(let e=0;e<19;e++)p.push(`      f${e} = f[n + ${e*c-f[e]}];`);p.push(`    } else {`),p.push(`      let m, s, b; const uwc = nf === 2 ? 0 : uw;`);for(let a=0;a<19;a++){if(a===0){p.push(`      f0 = f[n];`);continue}let o=i[a];p.push(`      m = n - ${f[a]}; s = solid[m];`),p.push(`      if (s === 0) f${a} = f[m + ${a*c}]; else { b = f[n + ${o*c}];`),p.push(`        if (s === 1) { f${a} = b; b -= ${d(r[a])}; ${e[a]?`Fx += ${-2*e[a]} * b;`:``}${t[a]?` Fy += ${-2*t[a]} * b;`:``}${n[a]?` Fz += ${-2*n[a]} * b;`:``} }`),p.push(`        else f${a} = b${e[a]?` + ${d(6*r[a]*e[a])} * uwc`:``}; }`)}p.push(`    }`);let m=e=>{let t=[];for(let n=0;n<19;n++){let r=e(n);r===1?t.push(`f${n}`):r===-1?t.push(`-f${n}`):r&&t.push(`${r}*f${n}`)}return t.join(` + `).replace(/\+ -/g,`- `)};p.push(`    let r = ${m(()=>1)};`),p.push(`    const mx = ${m(t=>e[t])}, my = ${m(e=>t[e])}, mz = ${m(e=>n[e])};`),p.push(`    const pxx = ${m(t=>e[t]*e[t])}, pyy = ${m(e=>t[e]*t[e])}, pzz = ${m(e=>n[e]*n[e])};`),p.push(`    const pxy = ${m(n=>e[n]*t[n])}, pxz = ${m(t=>e[t]*n[t])}, pyz = ${m(e=>t[e]*n[e])};`),p.push(`    let ux, uy, uz, om, qxx = 0, qyy = 0, qzz = 0, qxy = 0, qxz = 0, qyz = 0;`),p.push(`    if (r > 0.2 && r < 5) {`),p.push(`      const ir = 1 / r; ux = mx * ir; uy = my * ir; uz = mz * ir;`),p.push(`      const um2 = ux * ux + uy * uy + uz * uz;`),p.push(`      if (um2 > 0.1) { const k = Math.sqrt(0.1 / um2); ux *= k; uy *= k; uz *= k; }`),p.push(`      const r3 = r / 3;`),p.push(`      qxx = pxx - r * ux * ux - r3; qyy = pyy - r * uy * uy - r3; qzz = pzz - r * uz * uz - r3;`),p.push(`      qxy = pxy - r * ux * uy; qxz = pxz - r * ux * uz; qyz = pyz - r * uy * uz;`),p.push(`      const PP = qxx * qxx + qyy * qyy + qzz * qzz + 2 * (qxy * qxy + qxz * qxz + qyz * qyz);`),p.push(`      om = 1 / (0.5 * (tau0 + Math.sqrt(tau0 * tau0 + les * Math.sqrt(2 * PP) * ir)) + SP[n]);`),p.push(`    } else { bad = 1; r = 1; ux = 0; uy = 0; uz = 0; om = 1; }`),p.push(`    R[n] = r; UX[n] = ux; UY[n] = uy; UZ[n] = uz;`),p.push(`    const usq = 1 - 1.5 * (ux * ux + uy * uy + uz * uz);`),p.push(`    const r0 = r * ${d(r[0])}, r1 = r * ${d(r[1])}, r2 = r * ${d(r[7])};`),p.push(`    const om1 = 1 - om, tr = (qxx + qyy + qzz) / 3;`),p.push(`    const k0 = om1 * ${d(r[0]*4.5)}, k1 = om1 * ${d(r[1]*4.5)}, k2 = om1 * ${d(r[7]*4.5)};`),p.push(`    let cu;`);let h={xx:`qxx`,yy:`qyy`,zz:`qzz`,xy:`qxy`,xz:`qxz`,yz:`qyz`};for(let r=0;r<19;r++){let i={x:e[r],y:t[r],z:n[r]},a=[];for(let e of[`xx`,`yy`,`zz`])i[e[0]]&&a.push(` + `+h[e]);for(let e of[`xy`,`xz`,`yz`]){let t=2*i[e[0]]*i[e[1]];t&&a.push((t>0?` + 2 * `:` - 2 * `)+h[e])}let o=a.join(``).replace(/^ \+ /,``)+` - tr`,s=r===0?`r0`:r<7?`r1`:`r2`,l=r===0?`k0`:r<7?`k1`:`k2`;if(r===0){p.push(`    g[n] = r0 * usq + k0 * (-tr);`);continue}let u=[];e[r]&&u.push(e[r]>0?`+ux`:`-ux`),t[r]&&u.push(t[r]>0?`+uy`:`-uy`),n[r]&&u.push(n[r]>0?`+uz`:`-uz`),p.push(`    cu = ${u.join(``).replace(/^\+/,``)};`),p.push(`    g[n + ${r*c}] = ${s} * (usq + 3 * cu + 4.5 * cu * cu) + ${l} * (${o});`)}return p.push(`  }`),p.push(`}`),p.push(`force[0] = Fx; force[1] = Fy; force[2] = Fz;`),p.push(`return bad;`),Function(`f`,`g`,`solid`,`near`,`SP`,`R`,`UX`,`UY`,`UZ`,`tau0`,`les`,`uw`,`force`,p.join(`
`))}var p=class{constructor(r){let{nx:i,ny:a,nz:l}=r;this.nx=i,this.ny=a,this.nz=l;let u=this.N=i*a*l;if(this.solid=r.solid,this.u0=r.u0,this.cs=r.cs??.16,this.setViscosity(r.nu),this.ground=!!r.ground,this.ground)for(let e=0;e<l;e++)for(let t=0;t<i;t++){let n=t+i*a*e;this.solid[n]===0&&(this.solid[n]=2)}this.near=new Uint8Array(u);let d=i,p=i*a;for(let r=0;r<l;r++)for(let o=0;o<a;o++)for(let s=0;s<i;s++){let c=s+d*o+p*r;if(this.solid[c]){this.near[c]=255;continue}if(s===0||o===0||r===0||s===i-1||o===a-1||r===l-1)continue;let u=!1,f=!1;for(let r=1;r<19;r++){let i=this.solid[c+e[r]+t[r]*d+n[r]*p];i===1?u=!0:i===2&&(f=!0)}(u||f)&&(this.near[c]=u&&f?2:1)}let m=this.internal=r.internal||null;this.sponge=m?c(i,a,l,m.spongeL):o(i,a,l,this.solid[1+i*a]===2);for(let e=0;e<u;e++)this.sponge[e]*=s;if(m){this.inletNb=new Int32Array(m.inlet.length);for(let r=0;r<m.inlet.length;r++){let i=m.inletQ[r];this.near[m.inlet[r]]=255,this.inletNb[r]=m.inlet[r]+e[i]+t[i]*d+n[i]*p}let r=[],o=(e,t)=>Math.min(t-2,Math.max(1,e));for(let e=0;e<l;e++)for(let t=0;t<a;t++)for(let n=0;n<i;n++)n>0&&t>0&&e>0&&n<i-1&&t<a-1&&e<l-1||r.push(n+d*t+p*e,o(n,i)+d*o(t,a)+p*o(e,l));this.shell=Int32Array.from(r)}this.f=new Float32Array(19*u),this.g=new Float32Array(19*u),this.rho=new Float32Array(u),this.ux=new Float32Array(u),this.uy=new Float32Array(u),this.uz=new Float32Array(u),this.force=[0,0,0],this.rampSteps=m&&m.ramp||0,this.kernel=f(i,a,l),this.reset()}setViscosity(e){this.tau0=3*e+.5}inletVelocity(){if(this.rampSteps<=0)return this.u0;let e=Math.min(1,this.step/this.rampSteps);return this.u0*(.5-.5*Math.cos(Math.PI*e))}reset(){this.step=0,this.diverged=!1;let{N:e,f:t,g:n,solid:r}=this,i=a(1,this.internal?0:this.inletVelocity(),0,0);for(let a=0;a<e;a++){let o=r[a]===0;this.rho[a]=1,this.ux[a]=o?i.u:0,this.uy[a]=0,this.uz[a]=0;for(let r=0;r<19;r++)t[r*e+a]=n[r*e+a]=o?i.f[r]:0}}run(e){for(let t=0;t<e;t++)this._step();return e*this.N}_step(){let e=this.inletVelocity(),t=18*this.cs*this.cs;this.kernel(this.f,this.g,this.solid,this.near,this.sponge,this.rho,this.ux,this.uy,this.uz,this.tau0,t,e,this.force)&&(this.diverged=!0),this.internal?this._internalBoundaries(this.g,e/this.u0*(this.inletGain||1)):this._boundaries(this.g,e);let n=this.f;this.f=this.g,this.g=n,this.step++}_setEq(i,a,o,s,c,l){let u=this.N,d=1-1.5*(s*s+c*c+l*l);for(let f=0;f<19;f++){let p=e[f]*s+t[f]*c+n[f]*l;i[f*u+a]=r[f]*o*(d+3*p+4.5*p*p)}this.rho[a]=o,this.ux[a]=s,this.uy[a]=c,this.uz[a]=l}_internalBoundaries(e,t){let{solid:n,shell:r,internal:i}=this;for(let t=0;t<r.length;t+=2){let i=r[t],a=r[t+1];if(n[i])continue;let o=0,s=0,c=0;if(!n[a]){o=this.ux[a],s=this.uy[a],c=this.uz[a];let e=o*o+s*s+c*c;if(e>.01){let t=Math.sqrt(.01/e);o*=t,s*=t,c*=t}}this._setEq(e,i,1,o,s,c)}for(let n=0;n<i.inlet.length;n++){let r=this.rho[this.inletNb[n]],a=r>.2&&r<5?r:1,o=i.inletId[n]*3;this._setEq(e,i.inlet[n],a,i.inletU[o]*t,i.inletU[o+1]*t,i.inletU[o+2]*t)}}_boundaries(t,n){let{nx:i,ny:a,nz:o,N:s,solid:c}=this,l=i,u=i*a,d=/* @__PURE__ */ new Float64Array(19),f=1.5*n*n;for(let t=0;t<19;t++){let i=3*e[t]*n;d[t]=r[t]*(1+i+.5*i*i-f)}let p=e=>{if(c[e]===0){for(let n=0;n<19;n++)t[n*s+e]=d[n];this.rho[e]=1,this.ux[e]=n,this.uy[e]=0,this.uz[e]=0}};for(let e=0;e<o;e++)for(let t=0;t<i-1;t++)p(t+u*e),p(t+l*(a-1)+u*e);for(let e=0;e<a;e++)for(let t=0;t<i-1;t++)p(t+l*e),p(t+l*e+u*(o-1));for(let e=0;e<o;e++)for(let t=0;t<a;t++)p(l*t+u*e);for(let e=0;e<o;e++)for(let n=0;n<a;n++){let r=i-1+l*n+u*e;if(c[r]===0){for(let e=0;e<19;e++)t[e*s+r]=t[e*s+r-1];this.rho[r]=this.rho[r-1],this.ux[r]=this.ux[r-1],this.uy[r]=this.uy[r-1],this.uz[r]=this.uz[r-1]}}}};function m(e,t,n,r){let i=0;for(let a=0;a<r;a++)for(let r=0;r<n;r++){let o=t*(r+n*a);for(let n=0;n<t;n++)if(e[o+n]===1){i++;break}}return i}function h(e,t,n,r){let i=0;for(let a=0;a<r;a++)for(let r=0;r<t;r++)for(let o=0;o<n;o++)if(e[r+t*(o+n*a)]===1){i++;break}return i}const g=.9992;function _(e,t,n,r,i){let a=new Float32Array(e*t*n).fill(-1),o=[],s=(e,t,n)=>e+(t-e)*n;if(r===`vrake`)for(let e=0;e<13;e++)o.push([s(i.y0,i.y1,(e+.5)/13),i.zc,e/12]);else if(r===`hrake`)for(let e=0;e<13;e++)o.push([i.yc,s(i.z0,i.z1,(e+.5)/13),e/12]);else for(let e=0;e<5;e++)for(let t=0;t<5;t++)o.push([s(i.y0,i.y1,(e+.5)/5),s(i.z0,i.z1,(t+.5)/5),e/4]);let c=Math.max(.9,t*.011);for(let[r,i,s]of o)for(let o=Math.floor(i-c);o<=Math.ceil(i+c);o++)for(let l=Math.floor(r-c);l<=Math.ceil(r+c);l++)if(!(l<1||o<1||l>t-2||o>n-2)&&!((l+.5-r)**2+(o+.5-i)**2>c*c))for(let n=2;n<=3;n++)a[n+e*(l+t*o)]=s;return a}var v=class{constructor(e,t,n,r){Object.assign(this,{nx:e,ny:t,nz:n,solid:r,N:e*t*n}),this.a=new Float32Array(2*this.N),this.b=new Float32Array(2*this.N),this.src=new Float32Array(this.N).fill(-1)}setSources(e){this.src=e,this.a.fill(0),this.b.fill(0)}step(e,t,n,r){let{nx:i,ny:a,nz:o,N:s,solid:c,src:l}=this,u=this.a,d=this.b,f=i,p=i*a,m=(e,t,n)=>(Math.min(i-1,Math.max(0,e))+f*Math.min(a-1,Math.max(0,t))+p*Math.min(o-1,Math.max(0,n)))*2;for(let s=0;s<o;s++)for(let o=0;o<a;o++)for(let a=0;a<i;a++){let i=a+f*o+p*s,h=i*2;if(c[i]){d[h]=0,d[h+1]=0;continue}if(l[i]>=0){d[h]=1,d[h+1]=l[i];continue}let _=a-e[i]*r,v=o-t[i]*r,y=s-n[i]*r,b=Math.floor(_),x=Math.floor(v),S=Math.floor(y),C=_-b,w=v-x,T=y-S,E=0,D=0;for(let e=0;e<8;e++){let t=e&1,n=e>>1&1,r=e>>2,i=(t?C:1-C)*(n?w:1-w)*(r?T:1-T),a=m(b+t,x+n,S+r);E+=i*u[a],D+=i*u[a+1]}d[h]=E*g,d[h+1]=D*g}return this.a=d,this.b=u,this.a}};function y(e,t,n,r,i,a){let o=t.length,s=new Uint8Array(o*4),c=255/(1.6*a);for(let a=0,l=0;a<o;a++,l+=4)if(t[a])s[l+2]=255;else{if(e){let t=e[a*2];t>.002&&(s[l]=Math.min(255,t*255),s[l+1]=Math.min(255,e[a*2+1]/t*255))}s[l+3]=Math.min(255,Math.sqrt(n[a]*n[a]+r[a]*r[a]+i[a]*i[a])*c)}return s}const b=e=>Number.isInteger(e)?e.toFixed(1):e.toPrecision(9);function x(){let a=r=>`vec3<f32>(${b(e[r])}, ${b(t[r])}, ${b(n[r])})`;return`
struct P { nx: u32, ny: u32, nz: u32, N: u32, tau0: f32, les: f32, u0: f32, mac: u32, ramp: f32, r0: f32, r1: f32, r2: f32, uin: array<vec4<f32>, 8> };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> fin: array<f32>;
@group(0) @binding(2) var<storage, read_write> fout: array<f32>;
@group(0) @binding(3) var<storage, read> flags: array<u32>;
@group(0) @binding(4) var<storage, read_write> mac: array<vec4<f32>>;
@group(0) @binding(5) var<storage, read_write> part: array<f32>;

const CI = array<vec3<i32>, 19>(${e.map((r,i)=>`vec3<i32>(${e[i]}, ${t[i]}, ${n[i]})`).join(`, `)});
const CF = array<vec3<f32>, 19>(${e.map((e,t)=>a(t)).join(`, `)});
const W = array<f32, 19>(${r.map(b).join(`, `)});
const OPP = array<u32, 19>(${i.map(e=>e+`u`).join(`, `)});
var<workgroup> red: array<vec3<f32>, 256>;

fn feq(i: u32, r: f32, u: vec3<f32>, usq: f32) -> f32 {
  let cu = dot(CF[i], u);
  return W[i] * r * (usq + 3.0 * cu + 4.5 * cu * cu);
}

fn cell(n: u32) -> vec3<f32> {
  let fl = flags[n];
  if ((fl & 3u) != 0u) { return vec3<f32>(0.0); }
  let N = p.N;
  if ((fl & 8u) != 0u) { // far-field / inlet: equilibrium at freestream
    let u = vec3<f32>(p.u0, 0.0, 0.0);
    let usq = 1.0 - 1.5 * p.u0 * p.u0;
    for (var i = 0u; i < 19u; i++) { fout[i * N + n] = feq(i, 1.0, u, usq); }
    if (p.mac == 1u) { mac[n] = vec4<f32>(u, 1.0); }
    return vec3<f32>(0.0);
  }
  if ((fl & 64u) != 0u) { // internal flow: open atmospheric face, rho = 1, velocity extrapolated from the nearest interior cell
    let x = n % p.nx;
    let y = (n / p.nx) % p.ny;
    let z = n / (p.nx * p.ny);
    let m = clamp(x, 1u, p.nx - 2u) + p.nx * (clamp(y, 1u, p.ny - 2u) + p.ny * clamp(z, 1u, p.nz - 2u));
    var u = vec3<f32>(0.0);
    if ((flags[m] & 3u) == 0u) {
      var r = 0.0;
      var mo = vec3<f32>(0.0);
      for (var i = 0u; i < 19u; i++) { let v = fin[i * N + m]; r += v; mo += v * CF[i]; }
      if (r > 0.2 && r < 5.0) { u = mo / r; }
      let um2 = dot(u, u);
      if (um2 > 0.01) { u *= sqrt(0.01 / um2); }
    }
    let usq = 1.0 - 1.5 * dot(u, u);
    for (var i = 0u; i < 19u; i++) { fout[i * N + n] = feq(i, 1.0, u, usq); }
    if (p.mac == 1u) { mac[n] = vec4<f32>(u, 1.0); }
    return vec3<f32>(0.0);
  }
  if ((fl & 128u) != 0u) { // internal flow: velocity inlet, density taken from the cavity neighbour
    let ci = CI[(fl >> 16u) & 31u];
    let m = u32(i32(n) + ci.x + ci.y * i32(p.nx) + ci.z * i32(p.nx * p.ny));
    var r = 0.0;
    for (var i = 0u; i < 19u; i++) { r += fin[i * N + m]; }
    if (!(r > 0.2 && r < 5.0)) { r = 1.0; }
    let u = p.uin[(fl >> 21u) & 7u].xyz * p.ramp;
    let usq = 1.0 - 1.5 * dot(u, u);
    for (var i = 0u; i < 19u; i++) { fout[i * N + n] = feq(i, r, u, usq); }
    if (p.mac == 1u) { mac[n] = vec4<f32>(u, r); }
    return vec3<f32>(0.0);
  }
  if ((fl & 16u) != 0u) { // outlet: zero gradient (copy upstream neighbour)
    var r = 0.0;
    var m = vec3<f32>(0.0);
    for (var i = 0u; i < 19u; i++) { let v = fin[i * N + n - 1u]; fout[i * N + n] = v; r += v; m += v * CF[i]; }
    if (p.mac == 1u) { mac[n] = vec4<f32>(m / r, r); }
    return vec3<f32>(0.0);
  }
  let sy = i32(p.nx);
  let sz = i32(p.nx * p.ny);
  let near = (fl & 4u) != 0u;
  let uw = select(p.u0, 0.0, (fl & 32u) != 0u);
  var f: array<f32, 19>;
  var F = vec3<f32>(0.0);
  for (var i = 0u; i < 19u; i++) {
    let ci = CI[i];
    let m = u32(i32(n) - (ci.x + ci.y * sy + ci.z * sz));
    var v: f32;
    if (!near) {
      v = fin[i * N + m];
    } else {
      let sm = flags[m] & 3u;
      if (sm == 0u) {
        v = fin[i * N + m];
      } else {
        let b = fin[OPP[i] * N + n];
        if (sm == 1u) { v = b; F -= 2.0 * (b - W[i]) * CF[i]; } // gauge momentum exchange
        else { v = b + 6.0 * W[i] * CF[i].x * uw; }
      }
    }
    f[i] = v;
  }
  var r = 0.0;
  var mo = vec3<f32>(0.0);
  var pd = vec3<f32>(0.0);
  var po = vec3<f32>(0.0);
  for (var i = 0u; i < 19u; i++) {
    let ci = CF[i];
    let v = f[i];
    r += v; mo += v * ci; pd += v * ci * ci;
    po += v * vec3<f32>(ci.x * ci.y, ci.x * ci.z, ci.y * ci.z);
  }
  var u = vec3<f32>(0.0);
  var om = 1.0;
  var qd = vec3<f32>(0.0);
  var qo = vec3<f32>(0.0);
  if (r > 0.2 && r < 5.0) {
    u = mo / r;
    let um2 = dot(u, u);
    if (um2 > 0.1) { u *= sqrt(0.1 / um2); }
    qd = pd - r * u * u - vec3<f32>(r / 3.0);
    qo = po - r * vec3<f32>(u.x * u.y, u.x * u.z, u.y * u.z);
    let PP = dot(qd, qd) + 2.0 * dot(qo, qo);
    let sp = f32((fl >> 8u) & 255u) * ${b(s/255)};
    om = 1.0 / (0.5 * (p.tau0 + sqrt(p.tau0 * p.tau0 + p.les * sqrt(2.0 * PP) / r)) + sp);
  } else {
    r = 1.0;
  }
  if (p.mac == 1u) { mac[n] = vec4<f32>(u, r); }
  let usq = 1.0 - 1.5 * dot(u, u);
  let k = (1.0 - om) * 4.5;
  let tr = (qd.x + qd.y + qd.z) / 3.0;
  for (var i = 0u; i < 19u; i++) {
    let ci = CF[i];
    let neq = dot(ci * ci, qd) + 2.0 * dot(vec3<f32>(ci.x * ci.y, ci.x * ci.z, ci.y * ci.z), qo) - tr;
    fout[i * N + n] = feq(i, r, u, usq) + k * W[i] * neq;
  }
  return F;
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_index) li: u32,
        @builtin(workgroup_id) wid: vec3<u32>, @builtin(num_workgroups) nwg: vec3<u32>) {
  let n = gid.x + gid.y * nwg.x * 256u;
  var F = vec3<f32>(0.0);
  if (n < p.N) { F = cell(n); }
  // per-workgroup force reduction every step, accumulated → batch-averaged force (removes step-to-step noise)
  red[li] = F;
  workgroupBarrier();
  for (var s = 128u; s > 0u; s >>= 1u) {
    if (li < s) { red[li] += red[li + s]; }
    workgroupBarrier();
  }
  if (li == 0u) {
    let w = (wid.x + wid.y * nwg.x) * 3u;
    part[w] += red[0].x; part[w + 1u] += red[0].y; part[w + 2u] += red[0].z;
  }
}`}function S(){return`
struct D { nx: u32, ny: u32, nz: u32, N: u32, dt: f32, decay: f32, p0: f32, p1: f32 };
@group(0) @binding(0) var<uniform> d: D;
@group(0) @binding(1) var<storage, read> din: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read_write> dout: array<vec2<f32>>;
@group(0) @binding(3) var<storage, read> flags: array<u32>;
@group(0) @binding(4) var<storage, read> mac: array<vec4<f32>>;
@group(0) @binding(5) var<storage, read> src: array<f32>;

fn at(x: i32, y: i32, z: i32) -> vec2<f32> {
  let xx = u32(clamp(x, 0, i32(d.nx) - 1));
  let yy = u32(clamp(y, 0, i32(d.ny) - 1));
  let zz = u32(clamp(z, 0, i32(d.nz) - 1));
  return din[xx + d.nx * (yy + d.ny * zz)];
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) nwg: vec3<u32>) {
  let n = gid.x + gid.y * nwg.x * 256u;
  if (n >= d.N) { return; }
  if ((flags[n] & 3u) != 0u) { dout[n] = vec2<f32>(0.0); return; }
  let s = src[n];
  if (s >= 0.0) { dout[n] = vec2<f32>(1.0, s); return; }
  let x = n % d.nx;
  let y = (n / d.nx) % d.ny;
  let z = n / (d.nx * d.ny);
  let p = vec3<f32>(f32(x), f32(y), f32(z)) - mac[n].xyz * d.dt;
  let b = floor(p);
  let f = p - b;
  let i = vec3<i32>(b);
  let c00 = mix(at(i.x, i.y, i.z), at(i.x + 1, i.y, i.z), f.x);
  let c10 = mix(at(i.x, i.y + 1, i.z), at(i.x + 1, i.y + 1, i.z), f.x);
  let c01 = mix(at(i.x, i.y, i.z + 1), at(i.x + 1, i.y, i.z + 1), f.x);
  let c11 = mix(at(i.x, i.y + 1, i.z + 1), at(i.x + 1, i.y + 1, i.z + 1), f.x);
  dout[n] = mix(mix(c00, c10, f.y), mix(c01, c11, f.y), f.z) * d.decay;
}`}async function C(){let e=globalThis.navigator?.gpu;if(!e)return null;let t=await e.requestAdapter({powerPreference:`high-performance`});if(!t)return null;let n=t.info||{};return{adapter:t,vendor:n.vendor||`gpu`,arch:n.architecture||``,description:n.description||``,maxBinding:t.limits.maxStorageBufferBindingSize,maxBuffer:t.limits.maxBufferSize}}var w=class e{static async create(t){let n=new e;return await n._init(t),n}async _init(e){let{nx:t,ny:n,nz:r}=e,i=this.N=t*n*r;Object.assign(this,{nx:t,ny:n,nz:r,u0:e.u0,cs:e.cs??.16,solid:e.solid,isGPU:!0,internal:e.internal||null}),this.tau0=3*e.nu+.5;let a=await C();if(!a)throw Error(`WebGPU bağdaştırıcısı bulunamadı`);this.info={vendor:a.vendor,arch:a.arch,description:a.description};let o=19*i*4;if(o>a.maxBinding||o>a.maxBuffer)throw Error(`Ağ bu GPU için çok büyük`);let s=Math.max(o,i*16,134217728),c=this.device=await a.adapter.requestDevice({requiredLimits:{maxStorageBufferBindingSize:Math.min(s,a.maxBinding),maxBufferSize:Math.min(s,a.maxBuffer)}});c.lost.then(e=>{this.lost=e.message||`device lost`});let d=Math.ceil(i/256);this.gx=Math.min(d,32768),this.gy=Math.ceil(d/this.gx);let f=this.gx*this.gy*3,p=GPUBufferUsage;this.fA=c.createBuffer({size:o,usage:p.STORAGE|p.COPY_DST}),this.fB=c.createBuffer({size:o,usage:p.STORAGE|p.COPY_DST});let m=this.internal?l(e.solid,t,n,r,this.internal):u(e.solid,t,n,r);this.flagBuf=c.createBuffer({size:i*4,usage:p.STORAGE|p.COPY_DST}),c.queue.writeBuffer(this.flagBuf,0,m),this.macBuf=c.createBuffer({size:i*16,usage:p.STORAGE|p.COPY_SRC}),this.partBuf=c.createBuffer({size:f*4,usage:p.STORAGE|p.COPY_SRC|p.COPY_DST}),this.macStage=c.createBuffer({size:i*16,usage:p.MAP_READ|p.COPY_DST}),this.partStage=c.createBuffer({size:f*4,usage:p.MAP_READ|p.COPY_DST}),this.uni=[0,1].map(()=>c.createBuffer({size:176,usage:p.UNIFORM|p.COPY_DST})),this.dyeBufs=[0,1].map(()=>c.createBuffer({size:i*8,usage:p.STORAGE|p.COPY_SRC|p.COPY_DST})),this.srcBuf=c.createBuffer({size:i*4,usage:p.STORAGE|p.COPY_DST}),c.queue.writeBuffer(this.srcBuf,0,new Float32Array(i).fill(-1)),this.dyeStage=c.createBuffer({size:i*8,usage:p.MAP_READ|p.COPY_DST}),this.dyeUni=c.createBuffer({size:32,usage:p.UNIFORM|p.COPY_DST});{let e=/* @__PURE__ */ new ArrayBuffer(32),a=new Uint32Array(e),o=new Float32Array(e);a[0]=t,a[1]=n,a[2]=r,a[3]=i,o[4]=3,o[5]=g**3,c.queue.writeBuffer(this.dyeUni,0,e)}this.dyeOn=!1,this.dyeParity=0;let h=c.createShaderModule({code:x()}),_=(await h.getCompilationInfo()).messages.filter(e=>e.type===`error`);if(_.length)throw Error(`WGSL: `+_.map(e=>`${e.lineNum}:${e.message}`).join(`; `));this.pipeline=await c.createComputePipelineAsync({layout:`auto`,compute:{module:h,entryPoint:`main`}});let v=this.pipeline.getBindGroupLayout(0),y=(e,t,n)=>c.createBindGroup({layout:v,entries:[{binding:0,resource:{buffer:n}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:t}},{binding:3,resource:{buffer:this.flagBuf}},{binding:4,resource:{buffer:this.macBuf}},{binding:5,resource:{buffer:this.partBuf}}]});this.groupsBG=[[y(this.fA,this.fB,this.uni[0]),y(this.fA,this.fB,this.uni[1])],[y(this.fB,this.fA,this.uni[0]),y(this.fB,this.fA,this.uni[1])]];let b=c.createShaderModule({code:S()}),w=(await b.getCompilationInfo()).messages.filter(e=>e.type===`error`);if(w.length)throw Error(`WGSL dye: `+w.map(e=>`${e.lineNum}:${e.message}`).join(`; `));this.dyePipe=await c.createComputePipelineAsync({layout:`auto`,compute:{module:b,entryPoint:`main`}});let T=this.dyePipe.getBindGroupLayout(0);this.dyeBG=[0,1].map(e=>c.createBindGroup({layout:T,entries:[{binding:0,resource:{buffer:this.dyeUni}},{binding:1,resource:{buffer:this.dyeBufs[e]}},{binding:2,resource:{buffer:this.dyeBufs[1-e]}},{binding:3,resource:{buffer:this.flagBuf}},{binding:4,resource:{buffer:this.macBuf}},{binding:5,resource:{buffer:this.srcBuf}}]})),this.force=[0,0,0],this.writeUniforms(),this.reset()}writeUniforms(){let e=this.internal;for(let t=0;t<2;t++){let n=/* @__PURE__ */ new ArrayBuffer(176),r=new Uint32Array(n),i=new Float32Array(n);if(r[0]=this.nx,r[1]=this.ny,r[2]=this.nz,r[3]=this.N,i[4]=this.tau0,i[5]=18*this.cs*this.cs,i[6]=this.u0,r[7]=t,i[8]=this.ramp()*(this.inletGain||1),e)for(let t=0;t<e.inletU.length/3;t++)i[12+t*4]=e.inletU[t*3],i[13+t*4]=e.inletU[t*3+1],i[14+t*4]=e.inletU[t*3+2];this.device.queue.writeBuffer(this.uni[t],0,n)}}ramp(){let e=this.internal?.ramp||0;if(e<=0)return 1;let t=Math.min(1,(this.step||0)/e);return .5-.5*Math.cos(Math.PI*t)}setViscosity(e){this.tau0=3*e+.5,this.writeUniforms()}setDye(e){if(this.dyeOn=!!e,!e)return;this.device.queue.writeBuffer(this.srcBuf,0,e);let t=new Float32Array(this.N*2);this.device.queue.writeBuffer(this.dyeBufs[0],0,t),this.device.queue.writeBuffer(this.dyeBufs[1],0,t)}inletVelocity(){return this.internal?this.u0*this.ramp():this.u0}reset(){let{N:e,solid:t}=this,n=a(1,this.internal?0:this.u0,0,0).f,r=new Float32Array(19*e);for(let i=0;i<19;i++){let a=i*e,o=n[i];for(let n=0;n<e;n++)t[n]===0&&(r[a+n]=o)}this.device.queue.writeBuffer(this.fA,0,r),this.device.queue.writeBuffer(this.fB,0,r),this.parity=0,this.step=0,this.diverged=!1,this.field=null,this.internal&&this.writeUniforms()}runBatch(e){let t=(this._queue||Promise.resolve()).then(()=>this._runBatch(e));return this._queue=t.catch(()=>{}),t}async _runBatch(e){let t=this.device;if(this.internal&&this.ramp()*(this.inletGain||1)!==this.lastRamp){this.lastRamp=this.ramp()*(this.inletGain||1);let e=new Float32Array([this.lastRamp]);for(let n of this.uni)t.queue.writeBuffer(n,32,e)}let n=t.createCommandEncoder();n.clearBuffer(this.partBuf);let r=n.beginComputePass(),i=this.dyeOn;for(let t=0;t<e;t++){let n=i&&(this.step+t)%3==2;r.setPipeline(this.pipeline),r.setBindGroup(0,this.groupsBG[this.parity][t===e-1||n?1:0]),r.dispatchWorkgroups(this.gx,this.gy),this.parity^=1,n&&(r.setPipeline(this.dyePipe),r.setBindGroup(0,this.dyeBG[this.dyeParity]),r.dispatchWorkgroups(this.gx,this.gy),this.dyeParity^=1)}r.end(),n.copyBufferToBuffer(this.macBuf,0,this.macStage,0,this.N*16),n.copyBufferToBuffer(this.partBuf,0,this.partStage,0,this.partStage.size),i&&n.copyBufferToBuffer(this.dyeBufs[this.dyeParity],0,this.dyeStage,0,this.N*8),t.queue.submit([n.finish()]),await Promise.all([this.macStage.mapAsync(GPUMapMode.READ),this.partStage.mapAsync(GPUMapMode.READ),i?this.dyeStage.mapAsync(GPUMapMode.READ):null]);let a=null;if(i&&(a=new Float32Array(this.dyeStage.getMappedRange()).slice(),this.dyeStage.unmap()),this.lost)throw Error(this.lost);let o=new Float32Array(this.macStage.getMappedRange()),s=this.N,c=new Float32Array(s),l=new Float32Array(s),u=new Float32Array(s),d=new Float32Array(s),f=!1;for(let e=0,t=0;e<s;e++,t+=4)c[e]=o[t],l[e]=o[t+1],u[e]=o[t+2],d[e]=o[t+3];for(let e=0;e<s;e+=97)if(!(d[e]>.2&&d[e]<5)&&!this.solid[e]){f=!0;break}this.macStage.unmap();let p=new Float32Array(this.partStage.getMappedRange()),m=0,h=0,g=0;for(let e=0;e<p.length;e+=3)m+=p[e],h+=p[e+1],g+=p[e+2];this.partStage.unmap(),Number.isFinite(m)||(f=!0),this.force=[m/e,h/e,g/e],this.step+=e,this.diverged=f,this.field={ux:c,uy:l,uz:u,rho:d,dye:a}}destroy(){try{this.device?.destroy()}catch{}}};function T(e,t,n,r){let i=new Uint8Array(t*n*r);E(e,i,[t,n,r],0,1,2),E(e,i,[t,n,r],1,0,2),E(e,i,[t,n,r],2,0,1);let a=new Uint8Array(i.length);for(let e=0;e<i.length;e++)a[e]=+(i[e]>=2);return a}function E(e,t,n,r,i,a){let o=n[i],s=n[a],c=n[r],l=Array(o*s),u=e.length/9,d=r===1?-1:1,f=137e-6;for(let t=0;t<u;t++){let n=t*9,c=e[n+r],u=e[n+i],p=e[n+a],m=e[n+3+r],h=e[n+3+i],g=e[n+3+a],_=e[n+6+r],v=e[n+6+i],y=e[n+6+a],b=Math.max(0,Math.ceil(Math.min(u,h,v)-.5-f)),x=Math.min(o-1,Math.floor(Math.max(u,h,v)-.5-f)),S=Math.max(0,Math.ceil(Math.min(p,g,y)-.5-f)),C=Math.min(s-1,Math.floor(Math.max(p,g,y)-.5-f));if(b>x||S>C)continue;let w=(h-u)*(y-p)-(v-u)*(g-p);if(Math.abs(w)<1e-12)continue;let T=1/w;for(let e=S;e<=C;e++){let t=e+.5+f;for(let n=b;n<=x;n++){let r=n+.5+f*.71,i=((r-u)*(y-p)-(v-u)*(t-p))*T;if(i<0||i>1)continue;let a=((h-u)*(t-p)-(r-u)*(g-p))*T;if(a<0||i+a>1)continue;let s=c+i*(m-c)+a*(_-c),b=n+o*e;(l[b]||(l[b]=[])).push(s,w*d<0?1:-1)}}}let p=r===0?1:r===1?n[0]:n[0]*n[1],m=i===0?1:i===1?n[0]:n[0]*n[1],h=a===0?1:a===1?n[0]:n[0]*n[1];for(let e=0;e<s;e++)for(let n=0;n<o;n++){let r=l[n+o*e];if(!r||r.length<4)continue;let i=[];for(let e=0;e<r.length;e+=2)i.push(e);i.sort((e,t)=>r[e]-r[t]);let a=n*m+e*h,s=0;for(let e=0;e+1<i.length;e++){if(s+=r[i[e]+1],s===0)continue;let n=Math.max(0,Math.ceil(r[i[e]]-.5)),o=Math.min(c-1,Math.floor(r[i[e+1]]-.5));for(let e=n;e<=o;e++)t[a+e*p]++}}}const D=.2,O=D*D*8/7;function k(e){let[t,n,r]=e.cells,i=e.g??9.81,a=Math.max(e.depth,e.dx*2),o=Math.max(4*e.U,3*Math.sqrt(i*a),.25),s=D*e.dx/o,c=t=>t*s/(e.dx*e.dx);c(e.nu)>.12&&(s=.12*e.dx*e.dx/e.nu);let l={mode:e.mode,nx:t,ny:n,nz:r,dx:e.dx,dt:s,U:e.U,uS:e.U*s/e.dx,gS:i*s*s/e.dx,nuS:c(e.nu),muS:8*c(e.nu),depthCells:a/e.dx,floorY:2,zLo:2,zHi:r-2,inflow:null,solid:e.solid,damp:e.damp??0},u=r/2;if(e.mode===`stream`){let t=Math.min(r-4-1,Math.max(2,e.width/e.dx));l.inflow={y0:2,y1:2+l.depthCells,z0:u-t/2,z1:u+t/2}}else e.mode===`channel`&&(l.inflow={y0:2,y1:2+l.depthCells,z0:2,z1:r-2});return l.solidInfo=A(t,n,r,e.solid),l}function A(e,t,n,r){let i=e*t*n,a=new Float32Array(i*4);if(!r)return a;let o=e,s=e*t,c=(i,a,c)=>i<0||a<0||c<0||i>=e||a>=t||c>=n?0:+!!r[i+o*a+s*c];for(let i=0;i<n;i++)for(let n=0;n<t;n++)for(let t=0;t<e;t++){let e=t+o*n+s*i,l=e*4;if(r[e]){a[l+3]=1;continue}let u=0,d=0,f=0,p=0;for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++)for(let a=-1;a<=1;a++)c(t+a,n+r,i+e)&&(p=1,u-=a,d-=r,f-=e);if(!p)continue;let m=Math.hypot(u,d,f)||1;a[l]=u/m,a[l+1]=d/m,a[l+2]=f/m,a[l+3]=2}return a}function j(e,t){let n=(Math.imul(e|0,2654435761)^Math.imul((t|0)+2135587861,2246822519))>>>0;return n^=n>>>16,n=Math.imul(n,2146121005)>>>0,n^=n>>>15,n=Math.imul(n,2221713035)>>>0,n^=n>>>16,(n>>>8)/16777216}function ee(e,t,n){let r=new Float32Array(t*4),i=new Float32Array(t*4),a=0,o=(n,o,s,c,l,u,d)=>{for(let f=Math.floor(l);f<u;f++)for(let l=Math.floor(s);l<c;l++)for(let s=Math.floor(n);s<o;s++)if(!(e.solid&&e.solid[s+e.nx*(l+e.ny*f)]))for(let e=0;e<8&&a<t;e++){let t=s+((e&1)+.25+.5*j(a,1))*.5,n=l+((e>>1&1)+.25+.5*j(a,2))*.5,p=f+((e>>2)+.25+.5*j(a,3))*.5;t>=o||n>=c||p>=u||(r.set([t,n,p,1],a*4),i[a*4]=d,a++)}};e.mode===`channel`&&o(2,e.nx-2-1,2,2+e.depthCells,2,e.nz-2,e.uS),e.mode===`tank`&&n&&o(...n,0);for(let e=a;e<t;e++)r[e*4+3]=0;return{pos:r,vel:i,count:a}}function te(e){if(!e.inflow)return 0;let t=(e.inflow.y1-e.inflow.y0)*(e.inflow.z1-e.inflow.z0);return e.uS*t*8}function M(e,t){let n=e-.5,r=Math.floor(n-.5),i=n-r;return t[0]=.5*(1.5-i)*(1.5-i),t[1]=.75-(i-1)*(i-1),t[2]=.5*(i-.5)*(i-.5),r}var N=class{constructor(e,t,n){this.s=e,this.cap=t;let r=ee(e,t,n);this.pos=r.pos,this.vel=r.vel,this.C=new Float32Array(t*9),this.alive=r.count;let i=e.nx*e.ny*e.nz;this.mass=new Float64Array(i),this.mom=new Float64Array(i*3),this.gv=new Float32Array(i*3),this.step=0,this.emitAcc=0,this.force=[0,0,0],this.forceAcc=[0,0,0,0],this.seed=1}setViscosity(e){let t=this.s;t.nuS=e*t.dt/(t.dx*t.dx),t.muS=8*t.nuS}emit(e){let t=this.s,n=t.inflow;if(!n||e<=0)return;let r=0;for(let i=0;i<this.cap&&r<e;i++){if(this.pos[i*4+3]>0)continue;let e=this.seed++,a=2.05+j(e,11)*Math.max(t.uS,.05),o=n.y0+.05+j(e,12)*(n.y1-n.y0-.1),s=n.z0+.05+j(e,13)*(n.z1-n.z0-.1);t.solid&&t.solid[(a|0)+t.nx*((o|0)+t.ny*(s|0))]||(this.pos.set([a,o,s,1],i*4),this.vel.set([t.uS,0,0,0],i*4),this.C.fill(0,i*9,i*9+9),r++,this.alive++)}}substep(){let e=this.s,{nx:t,ny:n,nz:r}=e,i=t,a=t*n,{pos:o,vel:s,C:c,mass:l,mom:u,gv:d}=this;if(l.fill(0),u.fill(0),e.inflow){this.emitAcc+=te(e);let t=Math.floor(this.emitAcc);this.emitAcc-=t,this.emit(t)}let f=/* @__PURE__ */ new Float64Array(3),p=/* @__PURE__ */ new Float64Array(3),m=/* @__PURE__ */ new Float64Array(3);for(let e=0;e<this.cap;e++){let t=e*4;if(o[t+3]<=0)continue;let n=o[t],r=o[t+1],d=o[t+2],h=M(n,f),g=M(r,p),_=M(d,m),v=e*9;for(let e=0;e<3;e++)for(let o=0;o<3;o++)for(let y=0;y<3;y++){let b=f[y]*p[o]*m[e],x=h+y+.5-n,S=g+o+.5-r,C=_+e+.5-d,w=h+y+i*(g+o)+a*(_+e);l[w]+=b,u[w*3]+=b*(s[t]+c[v]*x+c[v+1]*S+c[v+2]*C),u[w*3+1]+=b*(s[t+1]+c[v+3]*x+c[v+4]*S+c[v+5]*C),u[w*3+2]+=b*(s[t+2]+c[v+6]*x+c[v+7]*S+c[v+8]*C)}}for(let t=0;t<this.cap;t++){let n=t*4;if(o[n+3]<=0)continue;let r=o[n],d=o[n+1],h=o[n+2],g=M(r,f),_=M(d,p),v=M(h,m),y=0;for(let e=0;e<3;e++)for(let t=0;t<3;t++)for(let n=0;n<3;n++)y+=f[n]*p[t]*m[e]*l[g+n+i*(_+t)+a*(v+e)];y=Math.max(y,.001),s[n+3]=y;let b=Math.max(0,O*((y/8)**7-1)),x=t*9,S=e.muS,C=-b+2*S*c[x],w=-b+2*S*c[x+4],T=-b+2*S*c[x+8],E=S*(c[x+1]+c[x+3]),D=S*(c[x+2]+c[x+6]),k=S*(c[x+5]+c[x+7]),A=-4/y;for(let e=0;e<3;e++)for(let t=0;t<3;t++)for(let n=0;n<3;n++){let o=f[n]*p[t]*m[e]*A,s=g+n+.5-r,c=_+t+.5-d,l=v+e+.5-h,y=g+n+i*(_+t)+a*(v+e);u[y*3]+=o*(C*s+E*c+D*l),u[y*3+1]+=o*(E*s+w*c+k*l),u[y*3+2]+=o*(D*s+k*c+T*l)}}let h=0,g=0,_=0,v=e.solidInfo,y=e.inflow;for(let o=0;o<r;o++)for(let s=0;s<n;s++)for(let c=0;c<t;c++){let f=c+i*s+a*o,p=l[f];if(p<=0){d[f*3]=d[f*3+1]=d[f*3+2]=0;continue}let m=1-e.damp,b=u[f*3]/p*m,x=u[f*3+1]/p*m-e.gS,S=u[f*3+2]/p*m,C=v[f*4+3];if(C===1||C===2){let e=b,t=x,n=S;if(C===1)b=x=S=0;else{let e=v[f*4],t=v[f*4+1],n=v[f*4+2],r=b*e+x*t+S*n;r<0&&(b-=r*e,x-=r*t,S-=r*n)}h+=p*(e-b),g+=p*(t-x),_+=p*(n-S)}s<2.5&&x<0&&(x=0),s>n-2-1.5&&x>0&&(x=0),e.mode!==`stream`&&(o<2.5&&S<0&&(S=0),o>r-2-1.5&&S>0&&(S=0)),e.mode===`tank`?(c<2.5&&b<0&&(b=0),c>t-2-1.5&&b>0&&(b=0)):c<2.5&&b<0&&(b=0),y&&c<5&&s+.5<y.y1&&o+.5>=y.z0&&o+.5<y.z1&&(b=e.uS,x=0,S=0),e.mode===`channel`&&c>t-2-1-3&&s+.5<y.y1&&(b=e.uS),d[f*3]=b,d[f*3+1]=x,d[f*3+2]=S}this.forceAcc[0]+=h,this.forceAcc[1]+=g,this.forceAcc[2]+=_,this.forceAcc[3]++;let b=1.51;for(let l=0;l<this.cap;l++){let u=l*4;if(o[u+3]<=0)continue;let h=o[u],g=o[u+1],_=o[u+2],v=M(h,f),y=M(g,p),x=M(_,m),S=0,C=0,w=0,T=l*9;c.fill(0,T,T+9);for(let e=0;e<3;e++)for(let t=0;t<3;t++)for(let n=0;n<3;n++){let r=f[n]*p[t]*m[e],o=v+n+i*(y+t)+a*(x+e),s=d[o*3],l=d[o*3+1],u=d[o*3+2],b=v+n+.5-h,E=y+t+.5-g,D=x+e+.5-_;S+=r*s,C+=r*l,w+=r*u;let O=4*r;c[T]+=O*s*b,c[T+1]+=O*s*E,c[T+2]+=O*s*D,c[T+3]+=O*l*b,c[T+4]+=O*l*E,c[T+5]+=O*l*D,c[T+6]+=O*u*b,c[T+7]+=O*u*E,c[T+8]+=O*u*D}let E=h+S,D=g+C,O=_+w;e.mode!==`tank`&&(E>t-2-1||e.mode===`stream`&&(O<2||O>r-2))?(o[u+3]=0,this.alive--):(E=Math.min(t-2-.51,Math.max(b,E)),D=Math.min(n-2-.51,Math.max(b,D)),O=Math.min(r-2-.51,Math.max(b,O)),e.solid&&e.solid[(E|0)+i*(D|0)+a*(O|0)]&&(E=h,D=g,O=_,S*=0,C*=0,w*=0),o[u]=E,o[u+1]=D,o[u+2]=O,s[u]=S,s[u+1]=C,s[u+2]=w)}this.step++}run(e){for(let t=0;t<e;t++)this.substep()}takeForce(){let e=this.forceAcc,t=Math.max(1,e[3]);return this.force=[e[0]/t,e[1]/t,e[2]/t],this.forceAcc=[0,0,0,0],this.force}snapshot(){let e=new Float32Array(this.cap*4);for(let t=0;t<this.cap;t++){let n=t*4;this.pos[n+3]<=0?e[n+3]=-1:(e[n]=this.pos[n],e[n+1]=this.pos[n+1],e[n+2]=this.pos[n+2],e[n+3]=Math.hypot(this.vel[n],this.vel[n+1],this.vel[n+2]))}return e}};function ne(e,t){let n=0,r=0,i=0,a=-1/0,o=-1/0,s=0,c=0;for(let t=0;t<e.length;t+=4){let l=e[t+3];l<0||(n++,r+=e[t],i+=e[t+1],e[t]>a&&(a=e[t]),e[t+1]>o&&(o=e[t+1]),s+=.5*l*l,l>c&&(c=l))}return{alive:n,cx:n?r/n:0,cy:n?i/n:0,front:a,top:o,ke:s,vmax:c,vmaxMps:c*t.dx/t.dt}}const P=1e6,F=`
struct Particle { pos: vec4<f32>, vel: vec4<f32>, c0: vec4<f32>, c1: vec4<f32>, c2: vec4<f32> };
struct U {
  nx: u32, ny: u32, nz: u32, N: u32,
  cap: u32, mode: u32, emitCount: u32, seed: u32,
  uS: f32, gS: f32, muS: f32, damp: f32,
  iy0: f32, iy1: f32, iz0: f32, iz1: f32,
  emitSpan: f32, hasInflow: u32, p1: f32, p2: f32,
};
@group(0) @binding(0) var<uniform> u: U;
const PPC = ${8 .toFixed(1)};
const STIFF = ${O.toPrecision(9)};
const GAMMA = ${7 .toFixed(1)};
const PADF = ${2 .toFixed(1)};
const SCALE = ${P.toFixed(1)};
const INV_SCALE = ${(1/P).toExponential(9)};
fn gid1(g: vec3<u32>, n: vec3<u32>) -> u32 { return g.x + g.y * n.x * 256u; }
fn nidx(x: i32, y: i32, z: i32) -> u32 { return u32(x) + u.nx * (u32(y) + u.ny * u32(z)); }
fn fx(v: f32) -> i32 { return i32(round(v * SCALE)); }
struct W { b: vec3<i32>, w0: vec3<f32>, w1: vec3<f32>, w2: vec3<f32> };
fn weights(p: vec3<f32>) -> W {
  let xg = p - vec3<f32>(0.5);
  let bf = floor(xg - vec3<f32>(0.5));
  let f = xg - bf;
  var r: W;
  r.b = vec3<i32>(bf);
  r.w0 = 0.5 * (vec3<f32>(1.5) - f) * (vec3<f32>(1.5) - f);
  r.w1 = vec3<f32>(0.75) - (f - vec3<f32>(1.0)) * (f - vec3<f32>(1.0));
  r.w2 = 0.5 * (f - vec3<f32>(0.5)) * (f - vec3<f32>(0.5));
  return r;
}
fn wsel(r: W, i: u32, axis: u32) -> f32 {
  var w = r.w0; if (i == 1u) { w = r.w1; } else if (i == 2u) { w = r.w2; }
  return w[axis];
}
fn hash01(a: u32, b: u32) -> f32 {
  var h = (a * 0x9e3779b1u) ^ ((b + 0x7f4a7c15u) * 0x85ebca77u);
  h ^= h >> 16u; h *= 0x7feb352du; h ^= h >> 15u; h *= 0x846ca68bu; h ^= h >> 16u;
  return f32(h >> 8u) / 16777216.0;
}`,re={clear:`${F}
@group(0) @binding(1) var<storage, read_write> gi: array<atomic<i32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let n = gid1(g, nw); if (n >= u.N) { return; }
  atomicStore(&gi[n * 4u], 0); atomicStore(&gi[n * 4u + 1u], 0); atomicStore(&gi[n * 4u + 2u], 0); atomicStore(&gi[n * 4u + 3u], 0);
}`,emit:`${F}
@group(0) @binding(1) var<storage, read_write> P: array<Particle>;
@group(0) @binding(2) var<storage, read_write> counter: array<atomic<u32>>;
@group(0) @binding(3) var<storage, read> SI: array<vec4<f32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let i = gid1(g, nw); if (i >= u.cap || u.hasInflow == 0u) { return; }
  if (P[i].pos.w > 0.0) { return; }
  let slot = atomicAdd(&counter[0], 1u);
  if (slot >= u.emitCount) { return; }
  let k = u.seed + slot;
  let x = PADF + 0.05 + hash01(k, 11u) * max(u.emitSpan, 0.05);
  let y = u.iy0 + 0.05 + hash01(k, 12u) * (u.iy1 - u.iy0 - 0.1);
  let z = u.iz0 + 0.05 + hash01(k, 13u) * (u.iz1 - u.iz0 - 0.1);
  if (SI[nidx(i32(x), i32(y), i32(z))].w == 1.0) { return; }
  P[i].pos = vec4<f32>(x, y, z, 1.0);
  P[i].vel = vec4<f32>(u.uS, 0.0, 0.0, PPC);
  P[i].c0 = vec4<f32>(0.0); P[i].c1 = vec4<f32>(0.0); P[i].c2 = vec4<f32>(0.0);
}`,p2g1:`${F}
@group(0) @binding(1) var<storage, read_write> P: array<Particle>;
@group(0) @binding(2) var<storage, read_write> gi: array<atomic<i32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let i = gid1(g, nw); if (i >= u.cap) { return; }
  let pp = P[i];
  if (pp.pos.w <= 0.0) { return; }
  let p = pp.pos.xyz;
  let r = weights(p);
  for (var k = 0u; k < 3u; k++) { for (var j = 0u; j < 3u; j++) { for (var ii = 0u; ii < 3u; ii++) {
    let w = wsel(r, ii, 0u) * wsel(r, j, 1u) * wsel(r, k, 2u);
    let node = r.b + vec3<i32>(i32(ii), i32(j), i32(k));
    let d = vec3<f32>(node) + vec3<f32>(0.5) - p;
    let v = pp.vel.xyz + vec3<f32>(dot(pp.c0.xyz, d), dot(pp.c1.xyz, d), dot(pp.c2.xyz, d));
    let n = nidx(node.x, node.y, node.z) * 4u;
    atomicAdd(&gi[n], fx(w));
    atomicAdd(&gi[n + 1u], fx(w * v.x)); atomicAdd(&gi[n + 2u], fx(w * v.y)); atomicAdd(&gi[n + 3u], fx(w * v.z));
  } } }
}`,p2g2:`${F}
@group(0) @binding(1) var<storage, read_write> P: array<Particle>;
@group(0) @binding(2) var<storage, read_write> gi: array<atomic<i32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let i = gid1(g, nw); if (i >= u.cap) { return; }
  let pp = P[i];
  if (pp.pos.w <= 0.0) { return; }
  let p = pp.pos.xyz;
  let r = weights(p);
  var rho = 0.0;
  for (var k = 0u; k < 3u; k++) { for (var j = 0u; j < 3u; j++) { for (var ii = 0u; ii < 3u; ii++) {
    let w = wsel(r, ii, 0u) * wsel(r, j, 1u) * wsel(r, k, 2u);
    let node = r.b + vec3<i32>(i32(ii), i32(j), i32(k));
    rho += w * f32(atomicLoad(&gi[nidx(node.x, node.y, node.z) * 4u])) * INV_SCALE;
  } } }
  rho = max(rho, 1e-3);
  P[i].vel.w = rho;
  let pr = max(0.0, STIFF * (pow(rho / PPC, GAMMA) - 1.0));
  let c0 = pp.c0.xyz; let c1 = pp.c1.xyz; let c2 = pp.c2.xyz;
  let mu = u.muS;
  let s00 = -pr + 2.0 * mu * c0.x; let s11 = -pr + 2.0 * mu * c1.y; let s22 = -pr + 2.0 * mu * c2.z;
  let s01 = mu * (c0.y + c1.x); let s02 = mu * (c0.z + c2.x); let s12 = mu * (c1.z + c2.y);
  let f = -4.0 / rho;
  for (var k = 0u; k < 3u; k++) { for (var j = 0u; j < 3u; j++) { for (var ii = 0u; ii < 3u; ii++) {
    let w = wsel(r, ii, 0u) * wsel(r, j, 1u) * wsel(r, k, 2u) * f;
    let node = r.b + vec3<i32>(i32(ii), i32(j), i32(k));
    let d = vec3<f32>(node) + vec3<f32>(0.5) - p;
    let n = nidx(node.x, node.y, node.z) * 4u;
    atomicAdd(&gi[n + 1u], fx(w * (s00 * d.x + s01 * d.y + s02 * d.z)));
    atomicAdd(&gi[n + 2u], fx(w * (s01 * d.x + s11 * d.y + s12 * d.z)));
    atomicAdd(&gi[n + 3u], fx(w * (s02 * d.x + s12 * d.y + s22 * d.z)));
  } } }
}`,grid:`${F}
@group(0) @binding(1) var<storage, read_write> gi: array<atomic<i32>>;
@group(0) @binding(2) var<storage, read_write> gv: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> SI: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> part: array<f32>;
var<workgroup> red: array<vec3<f32>, 256>;
fn node(n: u32) -> vec3<f32> {
  let m = f32(atomicLoad(&gi[n * 4u])) * INV_SCALE;
  if (m <= 0.0) { gv[n] = vec4<f32>(0.0); return vec3<f32>(0.0); }
  let x = f32(n % u.nx); let y = f32((n / u.nx) % u.ny); let z = f32(n / (u.nx * u.ny));
  let mom = vec3<f32>(f32(atomicLoad(&gi[n * 4u + 1u])), f32(atomicLoad(&gi[n * 4u + 2u])), f32(atomicLoad(&gi[n * 4u + 3u]))) * INV_SCALE;
  var v = mom / m * (1.0 - u.damp) - vec3<f32>(0.0, u.gS, 0.0);
  var F = vec3<f32>(0.0);
  let si = SI[n];
  if (si.w == 1.0 || si.w == 2.0) {
    let o = v;
    if (si.w == 1.0) { v = vec3<f32>(0.0); }
    else { let vn = dot(v, si.xyz); if (vn < 0.0) { v -= vn * si.xyz; } }
    F = m * (o - v);
  }
  let nyf = f32(u.ny); let nzf = f32(u.nz); let nxf = f32(u.nx);
  if (y < PADF + 0.5 && v.y < 0.0) { v.y = 0.0; }
  if (y > nyf - PADF - 1.5 && v.y > 0.0) { v.y = 0.0; }
  if (u.mode != 1u) {
    if (z < PADF + 0.5 && v.z < 0.0) { v.z = 0.0; }
    if (z > nzf - PADF - 1.5 && v.z > 0.0) { v.z = 0.0; }
  }
  if (u.mode == 2u) {
    if (x < PADF + 0.5 && v.x < 0.0) { v.x = 0.0; }
    if (x > nxf - PADF - 1.5 && v.x > 0.0) { v.x = 0.0; }
  } else if (x < PADF + 0.5 && v.x < 0.0) { v.x = 0.0; }
  if (u.hasInflow == 1u && x < PADF + ${3 .toFixed(1)} && y + 0.5 < u.iy1 && z + 0.5 >= u.iz0 && z + 0.5 < u.iz1) { v = vec3<f32>(u.uS, 0.0, 0.0); }
  if (u.mode == 0u && x > nxf - PADF - 1.0 - ${3 .toFixed(1)} && y + 0.5 < u.iy1) { v.x = u.uS; }
  gv[n] = vec4<f32>(v, m);
  return F;
}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(local_invocation_index) li: u32,
    @builtin(workgroup_id) wid: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let n = gid1(g, nw);
  var F = vec3<f32>(0.0);
  if (n < u.N) { F = node(n); }
  red[li] = F;
  workgroupBarrier();
  for (var s = 128u; s > 0u; s >>= 1u) { if (li < s) { red[li] += red[li + s]; } workgroupBarrier(); }
  if (li == 0u) { let w = (wid.x + wid.y * nw.x) * 3u; part[w] += red[0].x; part[w + 1u] += red[0].y; part[w + 2u] += red[0].z; }
}`,g2p:`${F}
@group(0) @binding(1) var<storage, read_write> P: array<Particle>;
@group(0) @binding(2) var<storage, read> gv: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read> SI: array<vec4<f32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let i = gid1(g, nw); if (i >= u.cap) { return; }
  let pp = P[i];
  if (pp.pos.w <= 0.0) { return; }
  let p = pp.pos.xyz;
  let r = weights(p);
  var v = vec3<f32>(0.0);
  var c0 = vec3<f32>(0.0); var c1 = vec3<f32>(0.0); var c2 = vec3<f32>(0.0);
  for (var k = 0u; k < 3u; k++) { for (var j = 0u; j < 3u; j++) { for (var ii = 0u; ii < 3u; ii++) {
    let w = wsel(r, ii, 0u) * wsel(r, j, 1u) * wsel(r, k, 2u);
    let node = r.b + vec3<i32>(i32(ii), i32(j), i32(k));
    let gvel = gv[nidx(node.x, node.y, node.z)].xyz;
    let d = vec3<f32>(node) + vec3<f32>(0.5) - p;
    v += w * gvel;
    c0 += 4.0 * w * gvel.x * d; c1 += 4.0 * w * gvel.y * d; c2 += 4.0 * w * gvel.z * d;
  } } }
  var q = p + v;
  let nxf = f32(u.nx); let nyf = f32(u.ny); let nzf = f32(u.nz);
  if (u.mode != 2u && (q.x > nxf - PADF - 1.0 || (u.mode == 1u && (q.z < PADF || q.z > nzf - PADF)))) { P[i].pos.w = 0.0; return; }
  let lo = PADF - 0.5 + 0.01;
  q = clamp(q, vec3<f32>(lo), vec3<f32>(nxf - PADF - 0.51, nyf - PADF - 0.51, nzf - PADF - 0.51));
  if (SI[nidx(i32(q.x), i32(q.y), i32(q.z))].w == 1.0) { q = p; v = vec3<f32>(0.0); }
  P[i].pos = vec4<f32>(q, 1.0);
  P[i].vel = vec4<f32>(v, pp.vel.w);
  P[i].c0 = vec4<f32>(c0, 0.0); P[i].c1 = vec4<f32>(c1, 0.0); P[i].c2 = vec4<f32>(c2, 0.0);
}`,pack:`${F}
@group(0) @binding(1) var<storage, read_write> P: array<Particle>;
@group(0) @binding(2) var<storage, read_write> R: array<vec4<f32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let i = gid1(g, nw); if (i >= u.cap) { return; }
  let pp = P[i];
  if (pp.pos.w <= 0.0) { R[i] = vec4<f32>(0.0, 0.0, 0.0, -1.0); return; }
  R[i] = vec4<f32>(pp.pos.xyz, length(pp.vel.xyz));
}`};var ie=class e{static async create(t,n,r){let i=new e;return await i._init(t,n,r),i}async _init(e,t,n){this.s=e,this.cap=t,this.isGPU=!0;let{nx:r,ny:i,nz:a}=e,o=this.N=r*i*a,s=await C();if(!s)throw Error(`WebGPU bağdaştırıcısı bulunamadı`);this.info={vendor:s.vendor,arch:s.arch};let c=Math.max(t*80,o*16,134217728);if(c>s.maxBinding)throw Error(`Su sahnesi bu GPU için çok büyük`);let l=this.device=await s.adapter.requestDevice({requiredLimits:{maxStorageBufferBindingSize:Math.min(c,s.maxBinding),maxBufferSize:Math.min(c,s.maxBuffer)}});l.lost.then(e=>{this.lost=e.message||`device lost`});let u=GPUBufferUsage,d=e=>{let t=Math.ceil(e/256),n=Math.min(t,32768);return[n,Math.ceil(t/n)]};this.dP=d(t),this.dN=d(o),this.P=l.createBuffer({size:t*80,usage:u.STORAGE|u.COPY_DST}),this.gi=l.createBuffer({size:o*16,usage:u.STORAGE}),this.gv=l.createBuffer({size:o*16,usage:u.STORAGE}),this.SI=l.createBuffer({size:o*16,usage:u.STORAGE|u.COPY_DST}),l.queue.writeBuffer(this.SI,0,e.solidInfo);let f=this.dN[0]*this.dN[1]*3;this.part=l.createBuffer({size:f*4,usage:u.STORAGE|u.COPY_SRC|u.COPY_DST}),this.partStages=[0,1].map(()=>l.createBuffer({size:f*4,usage:u.MAP_READ|u.COPY_DST})),this.cur=0,this.pending=null,this.counter=l.createBuffer({size:16,usage:u.STORAGE|u.COPY_DST}),this.R=l.createBuffer({size:t*16,usage:u.STORAGE|u.COPY_SRC}),this.RStages=[0,1].map(()=>l.createBuffer({size:t*16,usage:u.MAP_READ|u.COPY_DST})),this.uni=l.createBuffer({size:80,usage:u.UNIFORM|u.COPY_DST});let p={};for(let[e,t]of Object.entries(re)){let n=l.createShaderModule({code:t}),r=(await n.getCompilationInfo()).messages.filter(e=>e.type===`error`);if(r.length)throw Error(`WGSL ${e}: `+r.map(e=>`${e.lineNum}:${e.message}`).join(`; `));p[e]=await l.createComputePipelineAsync({layout:`auto`,compute:{module:n,entryPoint:`main`}})}this.pipes=p;let m=(e,t)=>l.createBindGroup({layout:p[e].getBindGroupLayout(0),entries:[this.uni,...t].map((e,t)=>({binding:t,resource:{buffer:e}}))});this.bgs={clear:m(`clear`,[this.gi]),emit:m(`emit`,[this.P,this.counter,this.SI]),p2g1:m(`p2g1`,[this.P,this.gi]),p2g2:m(`p2g2`,[this.P,this.gi]),grid:m(`grid`,[this.gi,this.gv,this.SI,this.part]),g2p:m(`g2p`,[this.P,this.gv,this.SI]),pack:m(`pack`,[this.P,this.R])},this.reset(n)}reset(e){if(this.pending){let e=this.pending;this.pending=null,e.then(e=>{e&&(this.partStages[e.i].unmap(),this.RStages[e.i].unmap())})}let t=ee(this.s,this.cap,e??this.block);this.block=e??this.block;let n=new Float32Array(this.cap*20);for(let e=0;e<this.cap;e++)n.set(t.pos.subarray(e*4,e*4+4),e*20),n[e*20+4]=t.vel[e*4],n[e*20+7]=8;this.device.queue.writeBuffer(this.P,0,n),this.step=0,this.seed=1,this.emitAcc=0,this.force=[0,0,0],this.snap=null}setViscosity(e){let t=this.s;t.nuS=e*t.dt/(t.dx*t.dx),t.muS=8*t.nuS}writeUniforms(e,t){let n=this.s,r=/* @__PURE__ */ new ArrayBuffer(80),i=new Uint32Array(r),a=new Float32Array(r),o=n.inflow;i[0]=n.nx,i[1]=n.ny,i[2]=n.nz,i[3]=this.N,i[4]=this.cap,i[5]=n.mode===`channel`?0:n.mode===`stream`?1:2,i[6]=e,i[7]=this.seed,a[8]=n.uS,a[9]=n.gS,a[10]=n.muS,a[11]=n.damp,a[12]=o?o.y0:0,a[13]=o?o.y1:0,a[14]=o?o.z0:0,a[15]=o?o.z1:0,a[16]=t,i[17]=+!!o,this.device.queue.writeBuffer(this.uni,0,r)}runBatch(e){return this._enqueue(()=>this._run(e,!1))}runPipelined(e){return this._enqueue(()=>this._run(e,!0))}_enqueue(e){let t=(this._q||Promise.resolve()).then(e);return this._q=t.catch(()=>{}),t}_read(e,t){let n=new Float32Array(this.partStages[e].getMappedRange()),r=0,i=0,a=0;for(let e=0;e<n.length;e+=3)r+=n[e],i+=n[e+1],a+=n[e+2];this.partStages[e].unmap(),this.force=[r/t,i/t,a/t],this.snap=new Float32Array(this.RStages[e].getMappedRange()).slice(),this.RStages[e].unmap()}async _drain(){if(!this.pending)return;let e=await this.pending;this.pending=null,e&&this._read(e.i,e.steps)}async _run(e,t){t||await this._drain();let n=this.device,r=this.s;this.emitAcc+=te(r)*e;let i=Math.floor(this.emitAcc);this.emitAcc-=i,this.writeUniforms(i,r.uS*e),this.seed+=i+7;let a=n.createCommandEncoder();a.clearBuffer(this.part),a.clearBuffer(this.counter);let o=a.beginComputePass(),s=(e,t)=>{o.setPipeline(this.pipes[e]),o.setBindGroup(0,this.bgs[e]),o.dispatchWorkgroups(t[0],t[1])};s(`emit`,this.dP);for(let t=0;t<e;t++)s(`clear`,this.dN),s(`p2g1`,this.dP),s(`p2g2`,this.dP),s(`grid`,this.dN),s(`g2p`,this.dP);s(`pack`,this.dP),o.end();let c=this.cur;a.copyBufferToBuffer(this.part,0,this.partStages[c],0,this.partStages[c].size),a.copyBufferToBuffer(this.R,0,this.RStages[c],0,this.cap*16),n.queue.submit([a.finish()]);let l=Promise.all([this.partStages[c].mapAsync(GPUMapMode.READ),this.RStages[c].mapAsync(GPUMapMode.READ)]).then(()=>({i:c,steps:e}),()=>null);if(this.cur^=1,this.step+=e,t){let e=this.pending;if(this.pending=l,e){let t=await e;t&&this._read(t.i,t.steps)}}else{let e=await l;e&&this._read(e.i,e.steps)}if(this.lost)throw Error(this.lost)}takeForce(){return this.force}snapshot(){let e=this.snap;return this.snap=null,e}destroy(){try{this.device?.destroy()}catch{}}};function ae(e,t,n,r){let i=T(e,t,n,r),a=/* @__PURE__ */ new Float64Array(576),o=(e,a,o)=>{let s=Math.floor(e),c=Math.floor(a),l=Math.floor(o);s>=0&&c>=0&&l>=0&&s<t&&c<n&&l<r&&(i[s+t*(c+n*l)]=1)};for(let t=0;t<e.length;t+=9){for(let n=0;n<9;n++)a[n]=e[t+n];let n=1;for(;n>0;){let e=--n*9,t=a[e],r=a[e+1],i=a[e+2],s=a[e+3],c=a[e+4],l=a[e+5],u=a[e+6],d=a[e+7],f=a[e+8],p=(s-t)**2+(c-r)**2+(l-i)**2,m=(u-s)**2+(d-c)**2+(f-l)**2,h=(t-u)**2+(r-d)**2+(i-f)**2,g=Math.max(p,m,h);if(g<.25||n>60){o(t,r,i),o(s,c,l),o(u,d,f),o((t+s+u)/3,(r+c+d)/3,(i+l+f)/3);continue}let _,v,y;g===p?(_=0,v=1,y=2):g===m?(_=1,v=2,y=0):(_=2,v=0,y=1);let b=[a[e+_*3],a[e+_*3+1],a[e+_*3+2]],x=[a[e+v*3],a[e+v*3+1],a[e+v*3+2]],S=[a[e+y*3],a[e+y*3+1],a[e+y*3+2]],C=[(b[0]+x[0])/2,(b[1]+x[1])/2,(b[2]+x[2])/2];a.set([...b,...C,...S],n++*9),a.set([...C,...x,...S],n++*9)}}return i}function oe(e,t,n,r){let i=t*n*r,a=new Uint8Array(i),o=new Uint8Array(i);for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){if(!c&&!s&&!i)continue;let l=c+t*(s+n*i),u=i>0?r-1:0,d=i>0?-1:r,f=i>0?-1:1,p=s>0?n-1:0,m=s>0?-1:n,h=s>0?-1:1,g=c>0?t-1:0,_=c>0?-1:t,v=c>0?-1:1;for(let y=u;y!==d;y+=f){let u=y+i<0||y+i>=r;for(let r=p;r!==m;r+=h){let i=u||r+s<0||r+s>=n,d=g+t*(r+n*y);for(let n=g;n!==_;n+=v,d+=v){if(e[d]){o[d]=1;continue}let r=i||n+c<0||n+c>=t?0:o[d+l];o[d]=r,a[d]+=r}}}}return a}function se(e,t,n,r,i,a=22){let o=n*r*i,s=new Int32Array(o),c=new Int32Array(o),l=n,u=n*r,d=0,f=0,p=0;for(let m=0;m<o;m++){if(s[m]||e[m]||t[m]<a)continue;p++;let o=0,h=0;for(c[h++]=m,s[m]=p;o<h;){let d=c[o++],f=d%n,m=(d/n|0)%r,g=d/u|0,_=[f>0?d-1:-1,f<n-1?d+1:-1,m>0?d-l:-1,m<r-1?d+l:-1,g>0?d-u:-1,g<i-1?d+u:-1];for(let n of _)n>=0&&!s[n]&&!e[n]&&t[n]>=a&&(s[n]=p,c[h++]=n)}h>f&&(f=h,d=p)}let m=new Uint8Array(o);if(d)for(let e=0;e<o;e++)m[e]=+(s[e]===d);return{interior:m,cells:f}}const ce=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];function le(r,i,a,o,s,c){let l=o*s*c,u=o,d=o*s,f=e.map((r,i)=>e[i]+t[i]*u+n[i]*d),p=new Int32Array(l).fill(-1),m=[];for(let e=0;e<l;e++)if(i[e])for(let t=1;t<19;t++){let n=e+f[t];n>=0&&n<l&&!r[n]&&!i[n]&&p[n]===-1&&(p[n]=-2,m.push(n))}let h=[],g=new Int32Array(m.length);for(let e of m){if(p[e]!==-2)continue;let t=h.length,n=[],r=0,i=0;for(g[i++]=e,p[e]=t;r<i;){let e=g[r++];n.push(e);let a=e%o,l=(e/o|0)%s,f=e/d|0;for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++){let m=a+r,h=l+n,_=f+e;if(m<0||h<0||_<0||m>=o||h>=s||_>=c)continue;let v=m+u*h+d*_;p[v]===-2&&(p[v]=t,g[i++]=v)}}h.push({cells:n,faces:[]})}for(let e=0;e<l;e++){if(!i[e])continue;let t=e%o,n=(e/o|0)%s,r=e/d|0;for(let i=0;i<6;i++){let[a,l,f]=ce[i],m=t+a,g=n+l,_=r+f;if(m<0||g<0||_<0||m>=o||g>=s||_>=c)continue;let v=m+u*g+d*_,y=p[v];y>=0&&h[y].faces.push(e,v,i)}}let _=[],v=[];for(let e of h){let t=0,n=0,i=0;for(let r=2;r<e.faces.length;r+=3){let[a,o,s]=ce[e.faces[r]];t+=a,n+=o,i+=s}let l=Math.hypot(t,n,i);if(l<.75){v.push(...e.cells);continue}let f=[t/l,n/l,i/l],p=0,m=0,h=0;for(let t of e.cells)p+=t%o+.5,m+=(t/o|0)%s+.5,h+=(t/d|0)+.5;let g=e.cells.length,y=[p/g,m/g,h/g],b=2*Math.sqrt(l/Math.PI),x=y,S=null;for(let e=0;e<4*b+12;e+=.5){let t=[y[0]+f[0]*e,y[1]+f[1]*e,y[2]+f[2]*e],n=Math.floor(t[0]),i=Math.floor(t[1]),l=Math.floor(t[2]);if(n<1||i<1||l<1||n>o-2||i>s-2||l>c-2)break;x=t;let p=n+u*i+d*l;if(!r[p]&&a[p]<18&&!S&&(S=t),!r[p]&&a[p]<13)break}S??=x,_.push({cells:Int32Array.from(e.cells),faces:Int32Array.from(e.faces),area:l,D:b,normal:f,centroid:y,mouth:S,anchor:x})}_.sort((e,t)=>t.area-e.area);let y=[];for(let e=0;e<_.length;){let t=e+1;for(;t<_.length&&_[t].area>.85*_[e].area;)t++;let n=_.slice(e,t),r=e=>e.centroid;n.sort((e,t)=>r(e)[0]-r(t)[0]||r(e)[2]-r(t)[2]||r(e)[1]-r(t)[1]),y.push(...n),e=t}return _.splice(0,_.length,...y),_.forEach((e,t)=>e.id=t),{ports:_,minor:Int32Array.from(v)}}function ue(e,t,n,r){let i=ae(e,t,n,r),a=oe(i,t,n,r),{interior:o,cells:s}=se(i,a,t,n,r),{ports:c,minor:l}=s?le(i,o,a,t,n,r):{ports:[],minor:/* @__PURE__ */ new Int32Array},u=0;for(let e=0;e<i.length;e++)u+=i[e];return{nx:t,ny:n,nz:r,solid:i,E:a,interior:o,interiorCells:s,solidCells:u,ports:c,minor:l}}function de(r,i,a,o){let{nx:s,ny:c,nz:l,interior:u,ports:d}=r,f=s*c*l,p=s,m=s*c,h=e.map((r,i)=>e[i]+t[i]*p+n[i]*m),g=r.solid.slice();for(let e of r.minor)g[e]=1;let _=new Int16Array(f).fill(-1);for(let e of d)for(let t of e.cells)_[t]=e.id;let v=[],y=[],b=[],x=[],S=[];for(let r of d){let o=i[r.id];if(o===`closed`){for(let e of r.cells)g[e]=1;continue}if(o!==`in`)continue;if(S.length>=8){for(let e of r.cells)g[e]=1;continue}let s=S.length;S.push(r.id),x.push(-r.normal[0]*a,-r.normal[1]*a,-r.normal[2]*a);for(let i of r.cells){let a=0,o=-2;for(let s=1;s<19;s++){if(!u[i+h[s]])continue;let c=-(e[s]*r.normal[0]+t[s]*r.normal[1]+n[s]*r.normal[2])/Math.hypot(e[s],t[s],n[s]);c>o&&(o=c,a=s)}a?(v.push(i),y.push(a),b.push(s)):g[i]=1}}for(let e of v)for(let t=1;t<19;t++){let n=e+h[t];!g[n]&&!u[n]&&_[n]===-1&&(g[n]=1)}let C=new Float32Array(f).fill(-1),w=[];for(let e=0;e<v.length;e++){let t=v[e]+h[y[e]],n=d[S[b[e]]],r=Math.abs(n.normal[0])<.9?[1,0,0]:[0,1,0],i=[n.normal[1]*r[2]-n.normal[2]*r[1],n.normal[2]*r[0]-n.normal[0]*r[2],n.normal[0]*r[1]-n.normal[1]*r[0]],a=t%s+.5,o=(t/s|0)%c+.5,l=(t/m|0)+.5,u=((a-n.centroid[0])*i[0]+(o-n.centroid[1])*i[1]+(l-n.centroid[2])*i[2])/Math.max(1,n.D)+.5;C[t]=Math.min(1,Math.max(0,(u+b[e]*.37)%1.0001)),w.push(a,o,l)}let T=[],E=Math.max(1,Math.floor(r.interiorCells/2e4));for(let e=0,t=0;e<f;e++)u[e]&&t++%E===0&&T.push(e%s+.5,(e/s|0)%c+.5,(e/m|0)+.5);return{solid:g,internal:{inlet:Int32Array.from(v),inletQ:Uint8Array.from(y),inletId:Uint8Array.from(b),inletU:Float32Array.from(x),spongeL:o,ramp:0},inletPorts:S,dyeSrc:C,seeds:Float32Array.from(w),fill:Float32Array.from(T)}}function fe(e,t){let{ux:n,uy:r,uz:i,rho:a}=t,o=[n,n,r,r,i,i],s=new Float32Array(e.length*2);return e.forEach((e,t)=>{let n=e.faces,r=0,i=0;for(let e=0;e<n.length;e+=3){let t=n[e],s=n[e+1],c=n[e+2],l=o[c],u=c&1?-1:1;r+=u*.5*(a[t]*l[t]+a[s]*l[s]),i+=a[t]}s[t*2]=r,s[t*2+1]=n.length?i/(n.length/3):1}),s}function pe(e,t,n,r){if(e.inletVelocity()<.999*e.u0)return;let i=0,a=0;for(let e of n.inletPorts)i-=r[e*2],a+=t[e].area;let o=e.u0*a;if(!(i>.05*o))return;let s=e.inletGain||1;e.inletGain=Math.min(1.6,Math.max(.7,s*(1+.35*(o/i-1))))}let I=null,L=!1,R=0,z=0,B={t:0,cells:0,mlups:0},V=[0,0,0,0],H=null,U=null,me=0,W=`lbm`,G=null,K=null,q=null;function J(e){if(!I||!e)return;let{ux:t,uy:n,uz:r,rho:i}=e,a=I.isGPU?e.dye:U&&H?U.a:null,o=H?y(a,I.solid,t,n,r,I.u0):null,s=[t.buffer,n.buffer,r.buffer,i.buffer];o&&s.push(o.buffer);let c=q&&K?fe(K.ports,e):null;c&&pe(I,K.ports,q,c),postMessage({type:`field`,step:I.step,ux:t,uy:n,uz:r,rho:i,vol:o,ports:c,force:he(),uIn:I.inletVelocity(),mlups:B.mlups,running:L},s),z=performance.now()}function he(){if(I.isGPU||!V[3])return[...I.force];let e=[V[0]/V[3],V[1]/V[3],V[2]/V[3]];return V=[0,0,0,0],e}const Y=()=>({ux:I.ux.slice(),uy:I.uy.slice(),uz:I.uz.slice(),rho:I.rho.slice()});function X(){let e=I.field;return I.field=null,e}function Z(e){B.cells+=e;let t=performance.now();t-B.t>700&&(B.mlups=B.cells/((t-B.t)*1e3),B.t=t,B.cells=0)}function ge(){L=!1,postMessage({type:`diverged`,step:I.step})}function _e(e){if(!L||e!==R)return;let t=performance.now();do I.run(1),Z(I.N),V[0]+=I.force[0],V[1]+=I.force[1],V[2]+=I.force[2],V[3]++,H&&U&&++me%3==0&&U.step(I.ux,I.uy,I.uz,3);while(performance.now()-t<30);if(I.diverged)return J(Y()),ge();performance.now()-z>90&&J(Y()),setTimeout(()=>_e(e),0)}async function ve(e){let t=4,n=I.N>2e6?140:75;for(;L&&e===R;){let r=performance.now();try{await I.runBatch(t)}catch(e){L=!1,postMessage({type:`error`,message:String(e.message||e)});return}if(e!==R)return;let i=performance.now()-r;if(Z(t*I.N),t=Math.max(1,Math.min(5e3,Math.round(t*Math.min(2,Math.max(.5,n/i))))),J(X()),I.diverged)return ge()}}async function ye(e){L=!1;let t=++R;I?.destroy?.(),I=null;let n=performance.now(),{nx:r,ny:i,nz:a}=e;if(q=null,e.internal)return xe(e,t,n);let o=T(e.tri,r,i,a),s=0;for(let e=0;e<o.length;e++)o[e]&&(o[e]=1,s++);if(e.ground)for(let e=0;e<a;e++)for(let t=0;t<r;t++){let n=t+r*i*e;o[n]===0&&(o[n]=2)}let c=m(o,r,i,a),l=h(o,r,i,a),u={nx:r,ny:i,nz:a,solid:o,u0:e.u0,nu:e.nu,ground:!1,cs:e.cs},d=`cpu`,f=null,g=null;if(e.backend===`gpu`)try{let e=await w.create(u);if(t!==R){e.destroy();return}I=e,d=`gpu`,f=e.info}catch(e){g=String(e.message||e)}I||=new p(u),U=I.isGPU?null:new v(r,i,a,o),Q(),postMessage({type:`ready`,solid:o.slice(),A:c,Ap:l,bodyCells:s,backend:d,info:f,fallback:g,ms:performance.now()-n}),I.isGPU?(await I.runBatch(1),J(X())):J(Y())}function be(e){L=!1,R++,I?.destroy?.(),I=null,q=null;let t=performance.now(),n=ue(e.tri,e.nx,e.ny,e.nz);K={key:e.key,...n};let r=n.ports.map(e=>({id:e.id,area:e.area,D:e.D,normal:e.normal,centroid:e.centroid,mouth:e.mouth,anchor:e.anchor,cells:e.cells.length}));postMessage({type:`ports`,key:e.key,ports:r,interiorCells:n.interiorCells,solidCells:n.solidCells,solid:n.solid.slice(),ms:performance.now()-t})}async function xe(e,t,n){let{nx:r,ny:i,nz:a}=e;if(!K||K.key!==e.internal.key)throw Error(`port analysis is out of date`);let o=de(K,e.internal.roles,e.u0,e.internal.spongeL);o.internal.ramp=e.internal.ramp;let s=o.solid,c=0;for(let e=0;e<s.length;e++)s[e]&&c++;let l={nx:r,ny:i,nz:a,solid:s,u0:e.u0,nu:e.nu,ground:!1,cs:e.cs,internal:o.internal},u=`cpu`,d=null,f=null;if(e.backend===`gpu`)try{let e=await w.create(l);if(t!==R){e.destroy();return}I=e,u=`gpu`,d=e.info}catch(e){f=String(e.message||e)}I||=new p(l),q=o,U=I.isGPU?null:new v(r,i,a,s),Q(),postMessage({type:`ready`,internal:!0,solid:s.slice(),A:1,Ap:1,bodyCells:c,backend:u,info:d,fallback:f,inletCells:o.internal.inlet.length,seeds:o.seeds,fill:o.fill,ms:performance.now()-n}),I.isGPU?(await I.runBatch(1),J(X())):J(Y())}function Q(){if(!I||W!==`lbm`)return;let e=H?q?q.dyeSrc:_(I.nx,I.ny,I.nz,H.mode,H.seed):null;I.isGPU?I.setDye(e):U&&e&&U.setSources(e)}async function Se(e){L=!1;let t=++R;I?.destroy?.(),I=null,W=`fs`;let[n,r,i]=e.cells,a=e.tri?T(e.tri,n,r,i):null,o=0,s=0;if(a){for(let e=0;e<a.length;e++)a[e]&&o++;let t=2+e.depth/e.dx;for(let e=0;e<i;e++)for(let i=0;i<Math.min(r,Math.ceil(t));i++)for(let t=0;t<n;t++)if(a[t+n*(i+r*e)]){s++;break}}G=k({mode:e.mode,dx:e.dx,cells:e.cells,U:e.U,depth:e.depth,width:e.width,nu:e.nu,solid:a});let c=`cpu`,l=null,u=null;if(e.backend===`gpu`)try{let n=await ie.create(G,e.capacity);if(t!==R){n.destroy();return}I=n,c=`gpu`,l=n.info}catch(e){u=String(e.message||e)}I||=new N(G,e.capacityCpu),postMessage({type:`fs-ready`,backend:c,info:l,fallback:u,solid:a,solidCells:o,Awet:s,dt:G.dt,uS:G.uS,capacity:I.cap}),I.isGPU?await I.runBatch(1):I.run(1),$()}function $(){let e=I.snapshot();if(!e)return;let t=ne(e,G),n=I.takeForce();postMessage({type:`fs-frame`,snap:e,step:I.step,force:n,alive:t.alive,vmax:t.vmaxMps,sps:B.mlups,running:L},[e.buffer]),z=performance.now()}async function Ce(e){let t=2;for(;L&&e===R;){let n=performance.now();try{if(I.isGPU)await I.runPipelined(t);else{let e=0;do I.substep(),e++;while(performance.now()-n<28);t=e}}catch(e){L=!1,postMessage({type:`error`,message:String(e.message||e)});return}if(e!==R)return;let r=performance.now()-n;B.cells+=t;let i=performance.now();i-B.t>700&&(B.mlups=B.cells/((i-B.t)/1e3),B.t=i,B.cells=0),I.isGPU&&(t=Math.max(2,Math.min(400,Math.round(t*Math.min(1.5,Math.max(.6,33/r)))))),$(),I.isGPU||await new Promise(e=>setTimeout(e,0))}}onmessage=async e=>{let t=e.data;switch(t.type){case`fs-init`:try{await Se(t)}catch(e){postMessage({type:`error`,message:String(e.message||e)})}break;case`fs-speed`:W===`fs`&&G&&(G.U=t.U,G.uS=t.U*G.dt/G.dx);break;case`fs-visc`:W===`fs`&&I&&I.setViscosity(t.nu);break;case`ports`:W=`lbm`;try{be(t)}catch(e){postMessage({type:`error`,message:String(e.message||e)})}break;case`init`:W=`lbm`;try{await ye(t)}catch(e){postMessage({type:`error`,message:String(e.message||e)})}break;case`run`:if(!I||L)return;L=!0,B={t:performance.now(),cells:0,mlups:B.mlups},W===`fs`?Ce(R):I.isGPU?ve(R):_e(R);break;case`pause`:L=!1,I&&!I.isGPU&&W===`lbm`&&J(Y());break;case`reset`:if(!I)return;if(W===`fs`){I.isGPU?(I.reset(),L||(await I.runBatch(1),$())):(I=new N(G,I.cap),$());break}I.reset(),Q(),I.isGPU?L||(await I.runBatch(1),J(X())):J(Y());break;case`dye`:H=t.enabled?{mode:t.mode,seed:t.seed}:null,Q();break;case`nu`:W===`lbm`&&I?.setViscosity(t.nu);break;case`dispose`:L=!1,R++,I?.destroy?.(),I=null}};