import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Router } from "@/pages/router.tsx";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);
