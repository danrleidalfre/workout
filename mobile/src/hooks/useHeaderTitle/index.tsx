import { HeaderTitleContext } from "@/contexts/header-title";
import { useContext } from "react";

export function useHeaderTitle() {
  return useContext(HeaderTitleContext)
}