import { EndButtons } from "@/components/shared/end-buttons";
import { XCircle } from "lucide-react";

export default function NotAvailablePage() {
  return (
    <div className="flex items-center justify-center min-h-[80dvh]">
      <div className="flex flex-col items-center p-8 space-y-4">
        <XCircle className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-semibold text-center">
          Sorry, that vehicle is no longer available.
        </p>
        <p className="text-center text-muted-foreground">
          We have a large number of other vehicles that might suit your needs,
          to view our current stock please check our website.
        </p>
        <EndButtons />
      </div>
    </div>
  );
}
