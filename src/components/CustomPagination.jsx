import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2 border-t border-border/50 py-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="rounded-xl border-border/50 transition-all hover:bg-muted/50 active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="mx-4 flex items-center gap-1.5">
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl font-bold transition-all active:scale-90 ${
              currentPage === page
                ? "shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {page + 1}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="rounded-xl border-border/50 transition-all hover:bg-muted/50 active:scale-95"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CustomPagination;
