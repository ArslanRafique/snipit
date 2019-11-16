import ElectronStore from "electron-store";
import { Request, Response } from "express";
import SnippetType from "../../../common/types/SnippetType";

export const getAllSnippets = (
  response: Response,
  store: ElectronStore,
  storePath: string,
) => {
  const snippetsObject = store.get(storePath) as SnippetType[];

  if (snippetsObject) {
    const snippets = Object.keys(snippetsObject).map(
      // @ts-ignore
      (key: string) => snippetsObject[key]
    );
    return response.json(snippets);
  } else {
    response.json([]);
  }
};

export const createSnippet = (
  request: Request,
  response: Response,
  store: ElectronStore,
  storePath: string,
) => {
  const snippet: SnippetType = { ...request.body };
  store.set(`${storePath}.${snippet.uuid}`, snippet);
  response.json(snippet);
};

export const updateSnippet = (
  request: Request,
  response: Response,
  store: ElectronStore,
  storePath = "snippets",
) => {
  const snippet: SnippetType = { ...request.body };
  store.set(`${storePath}.${snippet.uuid}`, snippet);
  response.json(snippet);
};

export const deleteSnippet = (
  request: Request,
  response: Response,
  store: ElectronStore,
  storePath: string,
) => {
  const snippet: SnippetType = store.get(`${storePath}.${request.params.id}`);

  if (snippet) {
    store.delete(`${storePath}.${snippet.uuid}`);
    response.status(200);
  } else {
    response.status(400);
  }

  response.end();
};
