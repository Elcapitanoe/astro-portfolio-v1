import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { fadeInScale } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement);

  React.useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    fadeInScale(node, { duration: 0.12 });
  }, []);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={contentRef}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-xs rounded-lg border border-white/10 bg-slate-900/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
