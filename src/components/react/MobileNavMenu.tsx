import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import LanguageSwitcherDropdown from "./LanguageSwitcherDropdown";

type NavItem = {
  href: string;
  label: string;
};

type LocaleOption = {
  code: string;
  name: string;
  href: string;
  active: boolean;
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
          <DialogTitle className="mb-5 text-lg font-semibold">{menuLabel}</DialogTitle>
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
        <div className="mt-4 space-y-2">
          <LanguageSwitcherDropdown
            locales={locales}
            menuLabel={menuLabel}
            selectLabel={selectLabel}
          />
        </div>

<DialogClose asChild>
  <Button variant="ghost" className="mt-5 gap-2 mx-auto text-sm text-muted-foreground">
    <X className="h-4 w-4" aria-hidden="true" />
    {closeLabel}
  </Button>
</DialogClose>


      </DialogContent>
    </Dialog>
  );
}

export default MobileNavMenu;
