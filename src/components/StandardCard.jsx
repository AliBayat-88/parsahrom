import { useState } from "react";
import { Download, Copy, Check, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function StandardCard({ standard }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(standard.accessPassword);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("خطا در کپی رمز در کلیپ‌بورد:", error);
    }
  };

  return (
    <Card className="flex flex-col justify-between border-border/70 shadow-sm transition-all duration-200 hover:shadow-md">
      <div>
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="font-mono text-xs">
              {standard.code}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {standard.category}
            </span>
          </div>
          <CardTitle className="text-lg font-bold leading-snug">
            {standard.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2 leading-relaxed">
            {standard.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              رمز دسترسی به فایل:
            </span>
            <div className="flex items-center justify-between rounded-md border bg-muted/40 px-3 py-1.5 transition-colors">
              <div className="flex items-center gap-2 font-mono text-sm text-foreground">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="tracking-wider">{standard.accessPassword}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label="کپی رمز"
                className="h-7 w-7 hover:bg-background"
              >
                {isCopied ? (
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-2">
        <Button asChild className="w-full gap-2">
          <a
            href={standard.downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" />
            <span>دانلود مستندات</span>
            <span className="text-xs opacity-75 font-mono">
              ({standard.fileSize})
            </span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}