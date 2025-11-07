import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type LocaleOption } from "@/lib/locale-options";
import LanguageSelectorDropdown from "./LanguageSelectorDropdown";

type NavItem = {
  href: string;
  label: string;
};

interface MobileNavMenuProps {
  navItems: NavItem[];
  locales: LocaleOption[];
  menuLabel: string;
  closeLabel: string;
  selectLabel: string;
}

export function MobileNavMenu({
  navItems,
  locales,
  menuLabel,
  closeLabel,
  selectLabel,
}: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);

  const items = useMemo(() => navItems ?? [], [navItems]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={menuLabel}
          className="text-slate-200 hover:text-white"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(92vw,22rem)] gap-6 bg-slate-950/90">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-semibold">{menuLabel}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {selectLabel}
          </DialogDescription>
        </DialogHeader>
        <nav aria-label={menuLabel} className="space-y-3">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-xl bg-white/5 px-4 py-3 text-base font-medium text-foreground transition hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{selectLabel}</p>
          <LanguageSelectorDropdown
            locales={locales}
            menuLabel={menuLabel}
            selectLabel={selectLabel}
            triggerClassName="w-full justify-between"
          />
        </div>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-2 gap-2 text-sm text-muted-foreground">
            <X className="h-4 w-4" aria-hidden="true" />
            {closeLabel}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default MobileNavMenu;
