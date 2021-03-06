import React from "react";

const SearchContext = new React.createContext({
  animal: "",
  breed: "",
  breeds: [],
  handleLocationChange() {},
  handleAnimalChange() {},
  handleBreedChange() {},
  getBreeds() {}
});

export const SearchProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;
