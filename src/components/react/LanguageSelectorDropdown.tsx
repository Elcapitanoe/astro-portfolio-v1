import { useCallback, useId } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type LocaleOption } from "@/lib/locale-options";
import { cn } from "@/lib/utils";

interface LanguageSelectorDropdownProps {
  locales: LocaleOption[];
  menuLabel: string;
  cookieName?: string;
  cookieMaxAge?: number;
  triggerClassName?: string;
}

export function LanguageSelectorDropdown({
  locales,
  menuLabel,
  cookieName = "lang",
  cookieMaxAge = 60 * 60 * 24 * 365,
  triggerClassName,
}: LanguageSelectorDropdownProps) {
  const labelId = useId();

  const handleSelect = useCallback(
    (option: LocaleOption) => {
      if (typeof document === "undefined") return;
      document.cookie = `${cookieName}=${option.code}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
      if (option.href) {
        window.location.assign(option.href);
      }
    },
    [cookieMaxAge, cookieName],
  );

  const activeLocale = locales.find((locale) => locale.active) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="subtle"
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          className={cn("gap-2", triggerClassName)}
        >
          <span id={labelId} className="truncate text-sm font-medium">
            {activeLocale?.name ?? menuLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        aria-label={menuLabel}
        className="min-w-[12rem] max-w-[calc(100vw-2rem)]"
        sideOffset={12}
      >
        <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {menuLabel}
        </DropdownMenuLabel>
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className="justify-between"
            data-active={locale.active}
            onSelect={(event) => {
              event.preventDefault();
              handleSelect(locale);
            }}
            role="option"
            aria-selected={locale.active}
          >
            <span className="truncate">{locale.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelectorDropdown;
