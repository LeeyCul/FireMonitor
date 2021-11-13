import Level5 from './images/level5.png';
import Level4 from './images/level4.png';
import Level3 from './images/level3.png';
import Level2 from './images/level2.png';
import Level1 from './images/level1.png';

export default function CustomMarkerHtml(temperature: number, level: number) {
  const url = { 1: Level1, 2: Level2, 3: Level3, 4: Level4, 5: Level5 }[level];
  return `<div class="custom-marker" style="background-image:url(${url})">
      <p class="custom-marker-title">${temperature}℃</p>
    </div>`;
}
