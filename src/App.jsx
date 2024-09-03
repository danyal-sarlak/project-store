
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LikesProvider } from "./Contexts/LikesProvider";
import { CategoriesProvider } from "./Contexts/CategoriesContext";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LikesProvider>
            <CategoriesProvider>
              <Routes />
            </CategoriesProvider>
          </LikesProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
