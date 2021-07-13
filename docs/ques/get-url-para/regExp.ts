const getUrlParasByExp = (props: { key: string; url?: string }) => {
  const { key, url = window.location.href } = props;
  const search = url.substring(url.indexOf('?') + 1);

  const regExp = new RegExp(`(^|&)${key}=([^&#]*)($|&|#)`);
  const result = search.match(regExp);
  // const result = regExp.exec(search)); // 当 match 方法 regExp 不使用 g 标志时，同效果
  if (result) {
    return result[2];
  }
  return null;
};

const s = getUrlParasByExp({
  key: 'a',
  url: 'https://www.test.me?x=1&a=2#id',
});

console.log(s);

export { getUrlParasByExp };
