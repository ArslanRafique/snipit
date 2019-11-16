import bodyParser from "body-parser";
import cors from "cors";
import ElectronStore from "electron-store";
import express from "express";
import path from "path";
import { createSnippet, deleteSnippet, getAllSnippets, updateSnippet } from "./snippets";


const defaultPath = "snippets";

// Initiate the Express server
export const initServer = (store: ElectronStore) => {
  const app = express();

  // I don't think someone will write this much
  // but, why not!
  app.use(cors());
  app.use(bodyParser.json({ limit: "1000mb" }));

  // Map root to public
  // eslint-disable-next-line no-undef
  app.use("/", express.static(path.join(__dirname, "../public")));

  // API Routes
  app.post(`/api/snippets`, (req, res) => createSnippet(req, res, store, defaultPath));

  app.get(`/api/snippets`, (req, res) => getAllSnippets(res, store, defaultPath));
  // app.get(`/api/snippets/:id`, (req, res) => getOne(req, res, store, resource));

  app.put(`/api/snippets/:id`, (req, res) =>
    updateSnippet(req, res, store, defaultPath),
  );

  app.delete(`/api/snippets/:id`, (req, res) => deleteSnippet(req, res, store, defaultPath));

  // Start listening
  return app.listen(7682);
};
