/**
 *
 * @param text 获取括号内数据
 * @returns string
 */
export const getBracketStr = (text: string) => {
  const rt: any = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(text);
  return rt[2];
};
