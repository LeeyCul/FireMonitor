/**
 * 进入全屏
 */
export default () => {
  let ele = document.documentElement;
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  }
};
