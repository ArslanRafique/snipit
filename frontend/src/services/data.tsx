import { API_URL } from "../constants";
import SnippetType from "../../../common/types/SnippetType";

const headers = { "Content-Type": "application/json" };

export const getFetch = async () => {
  const response = await fetch(`${API_URL}/snippets`);
  return await response.json();
};

export const postFetch = async (endPoint: string = "snippets", snippet: SnippetType) => {
    const response = await fetch(`${API_URL}/${endPoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(snippet),
    });
    return await response.json();
  };


export const deleteFetch = async (endPoint: string = "snippets", snippet: SnippetType) => {
  return await fetch(`${API_URL}/${endPoint}/${snippet.uuid}`, {
    method: "DELETE",
    headers,
  });
};

export const putFetch = async (endPoint: string = "snippets", snippet: SnippetType) => {
  const response =  await fetch(`${API_URL}/${endPoint}/${snippet.uuid}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(snippet),
  });
  return await response.json();
};