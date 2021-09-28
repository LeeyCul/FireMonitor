/**
 * 进入全屏
 */
export default () => {
  let ele = document.documentElement;
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullScreen) {
    ele.webkitRequestFullScreen();
  }
};
