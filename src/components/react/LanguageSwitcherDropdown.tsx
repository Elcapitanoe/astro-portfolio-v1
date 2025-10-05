import { useCallback, useId } from "react";

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
          variant="subtle"
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          className="gap-2"
        >
          <span id={labelId} className="text-sm">
            {activeLocale?.name ?? menuLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        aria-label={menuLabel}
        className="min-w-[12rem]"
        sideOffset={12}
      >
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
            <span>{locale.name}</span>
            {locale.active ? (
              <span aria-hidden="true" className="text-xs text-primary">
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
