/**
 *
 * @param text 获取括号内数据
 * @returns string
 */
export const getBracketStr = (text: string) => {
  const rt: any = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(text);
  return rt[2];
};

export const dataURL2Blob = (base64Data: string) => {
  let byteString = '';
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = window.atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
    type: mimeString,
  });
};
export function dataURLtoFile(dataurl: string, filename: string) {
  // 将base64转换为文件
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
}
