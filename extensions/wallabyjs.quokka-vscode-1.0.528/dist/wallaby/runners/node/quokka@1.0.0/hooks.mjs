import{parse as parseUrl,format as formatUrl,fileURLToPath,pathToFileURL}from"url";import{extname}from"path";function getTracer(){return global.$_$tracer}export async function getSource(t,e,r){const o=getTracer();if(o&&o._esm){const e=o._esm;if(t===e.scratchFileUrl)return{source:e.scratchFileContent}}return r(t,e,r)}export async function resolve(t,e,r){const o=getTracer();if(o&&o._esm){const s=o._esm,a=s.scratchFileUrl;if(t===a)return{url:a,shortCircuit:!0};if(t.startsWith("file:")||t.startsWith("data:")||t.startsWith(".")){if(t.startsWith(".")||t.startsWith("file:")){let a,i=`${t}?session=${global.$_$session}`;const n=s.tsNodeResolve;try{a=n?await n.defaultResolve(i,e,r):await r(i,e,r)}catch(o){if(!n||t.endsWith(".js")||t.endsWith(".ts"))throw o;try{i=`${t}.ts?session=${global.$_$session}`,a=await n.defaultResolve(i,e,r)}catch(t){throw o}}return o._doWhenReceiverIsReady((()=>{o._send("module",{path:fileURLToPath(a.url)})})),{...a,shortCircuit:!0}}}else{const o=s.localProjectDirUrl;if(e.parentURL.startsWith(o)){const a=e.parentURL;try{return await r(t,e,r)}catch(i){if("ERR_MODULE_NOT_FOUND"!==i.code)throw i;try{return e.parentURL=a.replace(o,s.tempDirUrl),await r(t,e,r)}catch(i){if("ERR_MODULE_NOT_FOUND"!==i.code)throw i;try{return e.parentURL=a.replace(o,s.settingsDirUrl),await r(t,e,r)}catch(o){if("ERR_MODULE_NOT_FOUND"!==o.code||!s.tsNodeResolve)throw o;{let i;e.parentURL=a;try{i=s.tsNodeResolve.defaultResolve(t,e,r).url}catch(t){}const n=async o=>{if("ERR_MODULE_NOT_FOUND"===o.code){if(t.endsWith(".js"))return resolve(t.substring(0,t.length-3),e,r);if(s.tsConfigPathsMatchPath){const a=s.tsConfigPathsMatchPath(t);if(a)return resolve(a,e,r);throw o}throw o}throw o};if(!i)return n(o);try{return resolve(i,e,r)}catch(t){return n(t)}}}}}}}}return r(t,e,r)}export async function getFormat(t,e,r){const o=getTracer();if(o&&o._esm){const s=o._esm;if(t===s.scratchFileUrl)return{format:"module"};const a=s.tsNode;if(a){const o=parseUrl(t);if((null===o.protocol||"file:"===o.protocol)&&!o.hostname){const o=fileURLToPath(t);let s;if(s=".js"===extname(o)||a.ignored(o)?await r(t,e,r):await r(formatUrl(pathToFileURL(o+".js")),e,r),!a.ignored(o)&&("commonjs"===s.format||"module"===s.format)){const{moduleType:t}=(a.moduleTypeClassifier.classifyModule||a.moduleTypeClassifier.classifyModuleByModuleTypeOverrides)(o.replace(/\\/g,"/"));if("cjs"===t)return{format:"commonjs"};if("esm"===t)return{format:"module"}}return s}}}return r(t,e,r)}export async function transformSource(t,e,r){const o=getTracer();if(o&&o._esm){const r=o._esm;if(e.url===r.scratchFileUrl)return{source:t};const s=r.tsNode;if(s){t="string"==typeof t?t:t.toString("utf8");const r=parseUrl(e.url);if(null===r.protocol||"file:"===r.protocol){const r=fileURLToPath(e.url);if(!s.ignored(r))return{source:s.compile(t,r)}}}}return r(t,e,r)}