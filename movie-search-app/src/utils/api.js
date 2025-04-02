export const getDataFromApi = async (query) => {
  const nextProxy = await fetch(`/api/proxy?targetUrl=${encodeURIComponent(query)}`);
  const resp = await nextProxy.json();
  return resp;
};
