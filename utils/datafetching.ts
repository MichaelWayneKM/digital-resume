const fetcher = (path: string) => fetch(`/api/${path}`).then(data => data.json());

export { fetcher };