const postPxToRem = () => {
  const baseSize = 100;
  // 表示1920的设计图,使用100PX的默认值
  let basePc = baseSize / 1920;
  // 获取窗口宽度、高度
  let vW = window.innerWidth;
  let vH = window.innerHeight;
  let dueH = (vW * 1080) / 1920;
  if (vH < dueH) {
    vW = (vH * 1920) / 1080;
  }
  let rem = vW * basePc;
  document.documentElement.style.fontSize = rem + 'px';
};

postPxToRem();

window.onresize = () => {
  postPxToRem();
};
