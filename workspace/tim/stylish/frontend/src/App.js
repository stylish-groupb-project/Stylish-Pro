
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageLayout from "./pages/homePage";
const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePageLayout endpoint="all" />} />
            <Route
              path="/women"
              element={<HomePageLayout endpoint="women" />}
            />
            <Route path="/men" element={<HomePageLayout endpoint="men" />} />
            <Route
              path="/accessories"
              element={<HomePageLayout endpoint="accessories" />}
            />
            <Route path="/search" element={<HomePageLayout endpoint="search"/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
    

  );
}

export default App;
