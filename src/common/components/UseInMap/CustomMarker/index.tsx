function getImage(type: string, level: number) {
  return require(`./images/${type}_${level}.png`);
}

export default function CustomMarkerHtml(data: any, meteorology: string) {
  if (!meteorology) {
    return `<div class="custom-marker" style="background-image:url(${getImage(
      'position',
      data.levelSc1,
    )})"/>`;
  }
  return `<div class="custom-marker" style="background-image:url(${getImage(
    meteorology,
    data.levelSc1,
  )})">
      <p class="custom-marker-title ${
        meteorology === 'temperature' ? 'custom-temperature-marker' : ''
      }">${data[meteorology]}${meteorology === 'temperature' ? '℃' : ''}</p>
    </div>`;
}
