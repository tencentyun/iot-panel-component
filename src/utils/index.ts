export const noop = () => null;

export const delay = (timeout: number) => new Promise<void>(resolve => setTimeout(() => resolve(), timeout));


export const isUrl = (url: string) => {
  return /(http|https)?\/\/:.+/.test(url);
};

