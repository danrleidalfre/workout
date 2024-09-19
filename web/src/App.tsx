import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="items-center flex justify-center h-screen">
        <ModeToggle />
        <Button>Button</Button>
      </div>
    </ThemeProvider>
  )
}