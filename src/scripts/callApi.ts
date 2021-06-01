const baseUrl = "https://test.swipejobs.com/api/";

export default function callApi(path: string) {
  return fetch(`${baseUrl}${path}`);
}
