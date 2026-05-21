import { useCallback, useId } from "react";
import { navigate } from "astro:transitions/client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LocaleOption = {
  code: string;
  name: string;
  href: string;
  active: boolean;
};

interface LanguageSwitcherDropdownProps {
  locales: LocaleOption[];
  menuLabel: string;
  selectLabel: string;
  cookieName?: string;
  cookieMaxAge?: number;
}

export function LanguageSwitcherDropdown({
  locales,
  menuLabel,
  selectLabel,
  cookieName = "lang",
  cookieMaxAge = 60 * 60 * 24 * 365,
}: LanguageSwitcherDropdownProps) {
  const labelId = useId();

  const handleSelect = useCallback(
    (option: LocaleOption) => {
      if (typeof document === "undefined") return;
      document.cookie = `${cookieName}=${option.code}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
      if (option.href) {
        navigate(option.href);
      }
    },
    [cookieMaxAge, cookieName],
  );

  const activeLocale = locales.find((locale) => locale.active) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          className="gap-2 font-mono h-9"
        >
          <span id={labelId} className="text-xs font-semibold tracking-wider">
            {activeLocale?.name ?? menuLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        aria-label={menuLabel}
        className="min-w-[10rem] font-mono border-border bg-card rounded-md shadow-sm"
        sideOffset={8}
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            className="justify-between hover:bg-secondary rounded-sm px-3 py-2 text-xs"
            data-active={locale.active}
            onSelect={(event) => {
              event.preventDefault();
              handleSelect(locale);
            }}
            role="option"
            aria-selected={locale.active}
          >
            <span className="font-medium tracking-tight text-foreground">{locale.name}</span>
            {locale.active ? (
              <span aria-hidden="true" className="text-[10px] text-primary uppercase tracking-wider">
                {selectLabel}
              </span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcherDropdown;
