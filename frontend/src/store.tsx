import React, { createContext, useContext, useState } from "react";
import { getFetch, postFetch, deleteFetch, putFetch } from "./services/data";
import { AsyncUseEffect } from "./utils/AsyncUseEffect";
import SnippetType from "../../common/types/SnippetType";

interface ContextInterface {
  snippets: SnippetType[];
  activeSnippet?: SnippetType;
  autoSaving: boolean;
  createSnippet: (newSnippet: SnippetType) => void;
  updateSnippet: (index: number, updateSnippet: SnippetType) => void;
  changeActiveSnippet: (activeSnippet: SnippetType) => void;
  updateActiveSnippet: (activeSnippet: SnippetType) => void;
  deleteActiveSnippet: (key?: string, activeSnippetKey?: string) => void;
  searchSnippet: (search: string) => void;
}

// Create the context
const StoreContext = createContext<ContextInterface>({
  snippets: [],
  activeSnippet: undefined,
  autoSaving: false,
  createSnippet: newSnippet => null,
  updateSnippet: (index, updatedSnippet) => null,
  changeActiveSnippet: activeSnippet => null,
  updateActiveSnippet: activeSnippet => null,
  deleteActiveSnippet: (key, activeSnippetKey) => null,
  searchSnippet: search => null
});

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {

  const [data, setData] = useState();
  const [backingSnippets, setBackingSnippets] = useState([]);
  const [autoSaving, setAutoSaving] = useState(false);

  AsyncUseEffect(async () => {
    const snippets: SnippetType[] = await getFetch();
    let activeSnippet = undefined;

    snippets.sort((a, b) => (a.date < b.date ? 1 : -1));

    if (snippets.length > 0) {
      activeSnippet = snippets[0];
    }

    setData({ snippets, activeSnippet });
  }, []);

  /**
   * Creates snippet locally and in backend.
   * @param newSnippet 
   */
  const createSnippet = async (newSnippet: SnippetType) => {
    if (newSnippet && newSnippet.uuid !== "") {
      await postFetch("snippets", newSnippet);

      const updatedData = JSON.parse(JSON.stringify(data));
      updatedData["snippets"].push(newSnippet);

      updatedData["snippets"].sort((a: SnippetType, b: SnippetType) =>
        a.date < b.date ? 1 : -1
      );

      updatedData["activeSnippet"] = newSnippet;
      setData(updatedData);
    }
  };

  /**
   * Update Snippet
   * @param index index of snippet from data -> snippets.
   * @param updatedSnippet 
   */
  const updateSnippet = async (index: number, updatedSnippet: SnippetType) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData["snippets"][index] = { ...updatedSnippet };

    setData(updatedData);
    await putFetch("snippets", updatedSnippet);
  };

  /**
   * Change Active snippet, which will appear in editor.
   * @param snippet 
   */
  const changeActiveSnippet = (snippet: SnippetType) => {
    const updatedData = JSON.parse(JSON.stringify(data));

    if (updatedData["activeSnippet"]) {
      const index = updatedData.snippets.findIndex(
        (s: SnippetType) => s.uuid === updatedData["activeSnippet"].uuid
      );
      updatedData["snippets"][index] = updatedData["activeSnippet"];
    }

    updatedData["activeSnippet"] = snippet;
    setData(updatedData);
  };

  /**
   * Updates changes in active snippet.
   * @param activeSnippet 
   */
  const updateActiveSnippet = async (activeSnippet: SnippetType) => {
    setAutoSaving(true);
    await putFetch("snippets", activeSnippet);

    setTimeout(() => {
      setAutoSaving(false); // ;)
    }, 1000);
  };

  /**
   * Delete active snipept
   * @param key 
   * @param activeSnippetKey 
   */
  const deleteActiveSnippet = async (
    key: string = "snippets",
    activeSnippetKey = "activeSnippet"
  ) => {
    const updatedSnippets = JSON.parse(JSON.stringify(data));
    let backing = JSON.parse(JSON.stringify(backingSnippets));

    await deleteFetch("snippets", updatedSnippets["activeSnippet"]);

    updatedSnippets[key] = updatedSnippets["snippets"].filter(
      (snap: SnippetType) =>
        snap.uuid !== updatedSnippets[activeSnippetKey].uuid
    );

    // If search is in action
    backing = backing.filter(
      (snap: SnippetType) =>
        snap.uuid !== updatedSnippets[activeSnippetKey].uuid
    );

    setBackingSnippets(backing);

    if (updatedSnippets[key].length > 0) {
      updatedSnippets["activeSnippet"] = updatedSnippets[key][0];
    } else {
      updatedSnippets["activeSnippet"] = undefined;
    }

    setData(updatedSnippets);
  };

  /**
   * Search and update context snippets
   * @param search 
   */
  const searchSnippet = async (search: string) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const searchString = search.toUpperCase();
    let searchSnippets: SnippetType[]; // State update delays, so using this.

    if (backingSnippets.length == 0) {
      setBackingSnippets(updatedData["snippets"]);
      searchSnippets = updatedData["snippets"];
    } else {
      searchSnippets = backingSnippets;
    }

    if (searchString !== "") {
      let snippets: SnippetType[];

      // UpperCase may not be a good option, but good enough for now.
      snippets = searchSnippets.filter(
        (snap: SnippetType) =>
          snap.content.toUpperCase().includes(searchString) ||
          snap.description.toUpperCase().includes(searchString) ||
          snap.dateSearch.toUpperCase().includes(searchString)
      ) || [];

      setData({ snippets, activeSnippet: undefined });
    } else {
      setData({
        snippets: backingSnippets,
        activeSnippet: backingSnippets[0]
      });

      //Clean for next search
      setBackingSnippets([]);
    }
  };

  // Expose
  const contextState = {
    ...data,
    autoSaving,
    createSnippet,
    updateSnippet,
    changeActiveSnippet,
    updateActiveSnippet,
    deleteActiveSnippet,
    searchSnippet
  };

  return (
    <StoreContext.Provider value={contextState}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export { StoreContext, StoreProvider, useStore };
