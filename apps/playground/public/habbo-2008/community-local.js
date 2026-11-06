// Use only content that is already stored in the archive.
for(const [buttonId,contentId,more,less] of [
 ['room-toggle-more-data-h124','room-more-data-h124','Show more rooms','Show fewer rooms'],
 ['discussions-toggle-more-data-h126','active-discussions-toplist-hidden-h126','Show more discussions','Show fewer discussions']
]){const button=document.getElementById(buttonId),content=document.getElementById(contentId);if(button&&content)button.addEventListener('click',event=>{event.preventDefault();const expand=content.style.display==='none';content.style.display=expand?'block':'none';button.textContent=expand?less:more;button.setAttribute('aria-expanded',String(expand));});}
const homes=document.getElementById('homes-habblet-list-container');
if(homes&&!homes.querySelector('img')){const note=document.createElement('p');note.className='archive-missing-avatars';note.textContent='Los avatares de esta sección no están conservados en el archivo.';homes.append(note);}
