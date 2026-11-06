import {profile} from './projects.mjs';
import {page,header,footer,escape} from './components.mjs';
import {photos} from './photo-data.mjs';
export const photosPath = 'photos/';
export function photosPage() {
  const description = 'Photos of Pamindu Karunadasa at KDU student community events, including the BCS KDU Vortexa 2026 annual general meeting and CRE8X 3.0.';
  const person = {'@type':'Person','@id':profile.site+'#person',name:profile.name,url:profile.site};
  const images = photos.map(p=>({'@type':'ImageObject','@id':profile.site+'assets/photos/'+p.file,contentUrl:profile.site+'assets/photos/'+p.file,url:profile.site+'assets/photos/'+p.file,name:p.title,caption:p.caption,width:p.width,height:p.height,about:person,creditText:p.credit}));
  const structuredData = {'@context':'https://schema.org','@type':'ImageGallery',url:profile.site+photosPath,name:'Pamindu Karunadasa — Photos & events',description,about:person,image:images,mainEntity:images};
  const body = `${header('../',false)}<main id="main" class="photo-page wrap"><div class="photo-intro"><a class="text-link" href="../#about">← About Pamindu</a><p class="eyebrow">COMMUNITY / MOMENTS AT KDU</p><h1>Beyond the<br>project desk<span class="accent">.</span></h1><p>Photos of Pamindu Karunadasa from student community events at Kotelawala Defence University.</p></div><div class="photo-columns">${photos.map((p,i)=>`<figure class="event-photo"><a href="../assets/photos/${p.file}" aria-label="View full photograph: ${escape(p.title)}"><img src="../assets/photos/${p.file}" width="${p.width}" height="${p.height}" alt="${escape(p.caption)}" loading="${i===0?'eager':'lazy'}" decoding="async"></a><figcaption><span class="eyebrow">0${i+1} / KDU COMMUNITY</span><h2>${escape(p.title)}</h2><p>${escape(p.caption)}</p><small>Photography: ${escape(p.credit)}</small></figcaption></figure>`).join('')}</div><div class="photo-return"><a class="button outline" href="../#volunteering">Explore my community work ↗</a></div></main>${footer('../')}`;
  return page({title:'Pamindu Karunadasa — Photos & events',description,body,base:'../',path:photosPath,image:'assets/photos/'+photos[0].file,structuredData});
}
