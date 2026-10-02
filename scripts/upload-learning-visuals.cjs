'use strict';
// Server-side only. Credentials stay in scripts/.env, which is excluded from deployments.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {createClient}=require('@supabase/supabase-js');
const root=path.resolve(__dirname,'..'),file=path.join(root,'docs/learning-visuals/manifest.json');
const env=require('dotenv').parse(fs.readFileSync(path.join(__dirname,'.env')));
const client=createClient(env.SUPABASE_URL,env.SUPABASE_SERVICE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
async function main(){
 const manifest=JSON.parse(fs.readFileSync(file));let count=0;
 for(const a of manifest.assets.filter(a=>a.status==='reviewed'||a.status==='uploaded')){
  const bytes=fs.readFileSync(path.join(root,a.path));
  if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error('Not WebP: '+a.id);
  const hash=crypto.createHash('sha256').update(bytes).digest('hex');
  const url=client.storage.from('site-images').getPublicUrl(a.storagePath).data.publicUrl;
  if(a.status!=='uploaded'){
   const {error}=await client.storage.from('site-images').upload(a.storagePath,bytes,{contentType:'image/webp',cacheControl:'31536000',upsert:false});
   if(error&&String(error.statusCode)!=='409'&&!/already exists/i.test(error.message))throw Error(a.id+': '+error.message);
  }
  const response=await fetch(url);if(!response.ok||!response.headers.get('content-type')?.includes('image/webp'))throw Error('Public verification failed: '+a.id);
  const remote=Buffer.from(await response.arrayBuffer());if(crypto.createHash('sha256').update(remote).digest('hex')!==hash)throw Error('Remote differs; refusing overwrite: '+a.id);
  Object.assign(a,{status:'uploaded',publicUrl:url,sha256:hash,verifiedAt:new Date().toISOString()});
  fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');count++;console.log('Verified '+a.id);
 }
 console.log(JSON.stringify({verified:count,total:manifest.assets.length}));
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
