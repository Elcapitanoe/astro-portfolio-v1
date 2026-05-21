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
          variant="outline"
          size="icon"
          aria-label={menuLabel}
          className="text-foreground hover:bg-secondary/80 h-9 w-9 rounded-md"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(92vw,22rem)] gap-6 bg-card border-border shadow-lg p-6">
        <DialogHeader className="space-y-1 border-b border-border/50 pb-4">
          <DialogTitle className="text-sm font-mono tracking-tight">{menuLabel}</DialogTitle>
        </DialogHeader>
        <nav aria-label={menuLabel} className="space-y-2 mt-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-md bg-secondary/30 px-4 py-2.5 text-sm font-mono font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground border border-transparent hover:border-border"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 pt-4 border-t border-border/50">
          <LanguageSwitcherDropdown
            locales={locales}
            menuLabel={menuLabel}
            selectLabel={selectLabel}
          />
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="mt-2 w-full gap-2 text-xs font-mono text-muted-foreground">
            <X className="h-3 w-3" aria-hidden="true" />
            {closeLabel}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default MobileNavMenu;
