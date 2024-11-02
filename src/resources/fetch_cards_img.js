// https://marvelsnap.163.com/zlk/
let imageInfo = [];
function simulateClick(dataNum) {
  console.log(`模拟点击 data-num="${dataNum}"`);
  document.querySelector(`li[data-num="${dataNum}"]`).click();
  const movieElements = document.querySelectorAll('ul.list.card_list.on li.movie');
  const imgInfoArray = Array.from(movieElements).map(li => {
    const img = li.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      return {
        name: img.src.split('/').pop().replace('.png', ''),
        src: src,
        pool: dataNum
      };
    }
    return null;
  }).filter(Boolean);
  imageInfo.push(...imgInfoArray)
}

for (let i = 0; i <= 7; i++) {
  simulateClick(i.toString());
}

let jsonString = JSON.stringify(imageInfo, null, 2);
let blob = new Blob([jsonString], {type: "application/json"});
let a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'snap_cards.json';
a.textContent = 'download json';
a.style.display = 'block';
document.body.appendChild(a);
console.log('click the link to download json');