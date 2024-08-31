/* import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LikesProvider } from "./Contexts/LikesProvider";
import { CategoriesProvider } from "./Contexts/CategoriesContext";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <LikesProvider>
          <CategoriesProvider>
            <Routes />
          </CategoriesProvider>
        </LikesProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App; */

// App.js
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LikesProvider } from "./Contexts/LikesProvider";
import { CategoriesProvider } from "./Contexts/CategoriesContext";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./Components/Loading";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LikesProvider>
            <CategoriesProvider>
              <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loading/></div>}>
                <Routes />
              </Suspense>
            </CategoriesProvider>
          </LikesProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
