/**
 * 处理字符串和数组得到参数
 * @param props key: 需要获取的key，url 传入的网址（可选）
 * @returns
 */
const getUrlParas = (props: { key: string; url?: string }) => {
  const { key, url = window.location.href } = props;

  const search = url.substring(url.indexOf('?') + 1);
  let keyValues = search
    .substring(
      1,
      search.indexOf('#') == -1 ? search.length : search.indexOf('#')
    )
    .split('&')
    .reduce((result: any, item: string) => {
      const [k, v] = item.split('=');
      result[k] = v;
      return result;
    }, <any>[]);
  if (key in keyValues) {
    return keyValues[key];
  } else {
    return null;
  }
};

const s = getUrlParas({
  key: 'a',
  url: 'https://www.test.me?x=1&a=2#id',
});

console.log(s);

export { getUrlParas };
