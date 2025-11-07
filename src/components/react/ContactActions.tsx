import { useCallback, useId, useRef, useState } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Toast, ToastClose, ToastDescription, ToastTitle, Toaster } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ContactActionsProps {
  email: string;
  copyLabel: string;
  copiedLabel: string;
  popoverTitle: string;
  popoverDescription: string;
  sendLabel: string;
  mailtoHref: string;
}

export function ContactActions({
  email,
  copyLabel,
  copiedLabel,
  popoverTitle,
  popoverDescription,
  sendLabel,
  mailtoHref,
}: ContactActionsProps) {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const toastTitleRef = useRef(copyLabel);
  const toastDescriptionRef = useRef(copiedLabel);
  const buttonId = useId();

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = email;
        tempInput.setAttribute("aria-hidden", "true");
        tempInput.style.position = "fixed";
        tempInput.style.opacity = "0";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      toastTitleRef.current = copyLabel;
      toastDescriptionRef.current = copiedLabel;
      setToastKey((key) => key + 1);
      setToastOpen(true);
    } catch (error) {
      console.error("Unable to copy email", error);
    }
  }, [copiedLabel, copyLabel, email]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              id={buttonId}
              variant="default"
              className="w-full gap-2 sm:w-auto"
              onClick={copyToClipboard}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{copyLabel}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{email}</TooltipContent>
        </Tooltip>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>{sendLabel}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-3 text-sm">
            <h4 className="text-base font-semibold text-white">{popoverTitle}</h4>
            <p className="text-muted-foreground">{popoverDescription}</p>
            <a
              href={mailtoHref}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{email}</span>
            </a>
          </PopoverContent>
        </Popover>
      </div>
      <Toaster duration={3500} swipeDirection="right">
        <Toast key={toastKey} open={toastOpen} onOpenChange={setToastOpen}>
          <ToastTitle>{toastTitleRef.current}</ToastTitle>
          <ToastDescription>{toastDescriptionRef.current}</ToastDescription>
          <ToastClose />
        </Toast>
      </Toaster>
    </TooltipProvider>
  );
}

export default ContactActions;
