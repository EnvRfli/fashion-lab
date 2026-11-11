import { useContext } from "react";
import {
  DemoDataContext,
  type DemoDataContextValue,
} from "./demo-context";

export function useDemoData(): DemoDataContextValue {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error("useDemoData must be used within DemoDataProvider");
  }
  return context;
}
