const openaiKeyInput = document.getElementById('openaiKey');
const saveBtn = document.getElementById('saveKey');
const clearBtn = document.getElementById('clearKey');
const reportsDiv = document.getElementById('reports');

async function load(){
  chrome.storage.local.get(null, (items)=>{
    if(items.openaiKey) openaiKeyInput.value = items.openaiKey;
    renderReports(items);
  });
}

function renderReports(items){
  reportsDiv.innerHTML = '';
  const keys = Object.keys(items).filter(k=>k.startsWith('report-')).sort().reverse();
  if(keys.length===0){ reportsDiv.textContent = 'No saved reports.'; return; }
  keys.forEach(k=>{
    const pre = document.createElement('pre');
    pre.style.maxHeight = '180px';
    pre.style.overflow = 'auto';
    pre.textContent = JSON.stringify(items[k], null, 2);
    const btns = document.createElement('div');
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = ()=> { chrome.storage.local.remove(k, load); };
    const decrypt = document.createElement('button');
    decrypt.textContent = 'Decrypt & View';
    decrypt.onclick = async ()=>{
      const pass = prompt('Enter passphrase to decrypt:');
      if(!pass) return;
      try {
        const obj = items[k];
        // If object is not an encrypted object (already string), just show
        if(obj && obj.version){
          const plain = await CryptoUtil.decryptObject(pass, obj);
          alert(plain);
        } else {
          alert(JSON.stringify(obj, null, 2));
        }
      } catch(e){
        alert('Decryption failed: ' + e.message);
      }
    };
    btns.appendChild(decrypt);
    btns.appendChild(del);
    const wrap = document.createElement('div');
    wrap.appendChild(btns);
    wrap.appendChild(pre);
    reportsDiv.appendChild(wrap);
  });
}

saveBtn.onclick = ()=> {
  const k = openaiKeyInput.value.trim();
  chrome.storage.local.set({openaiKey: k}, ()=> alert('Saved.'));
};

clearBtn.onclick = ()=> {
  chrome.storage.local.remove('openaiKey', ()=>{ openaiKeyInput.value=''; alert('Cleared.'); });
};

load();
