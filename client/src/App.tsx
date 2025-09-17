import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ExpenseSplitter from "@/components/ExpenseSplitter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <ExpenseSplitter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
