import { useEffect, useMemo, useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Cloud,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  Network,
  Shield,
  Terminal,
  Wifi,
} from "lucide-react";

type SkillItem = {
  id: string;
  name: string;
  level: number;
  icon: string;
};

type SkillCategory = {
  id: string;
  title: string;
  skills: SkillItem[];
};

interface SkillsTabsProps {
  categories: SkillCategory[];
  initialCategory?: string;
}

const iconMap: Record<string, LucideIcon> = {
  cloud: Cloud,
  terminal: Terminal,
  shield: Shield,
  layers: Layers,
  database: Database,
  globe: Globe,
  network: Network,
  cpu: Cpu,
  harddrive: Database,
  activity: Activity,
  lock: Lock,
  wifi: Wifi,
};

function SkillIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Terminal;
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

function SkillProgress({ level }: { level: number }) {
  const reduceMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;
    if (reduceMotion) {
      node.style.width = `${level}%`;
      return;
    }
    node.style.transitionProperty = "width";
    node.style.transitionTimingFunction = "ease-out";
    node.style.transitionDuration = "400ms";
    node.style.width = "0%";
    requestAnimationFrame(() => {
      node.style.width = `${level}%`;
    });
    return () => {
      node.style.transitionProperty = "";
    };
  }, [level, reduceMotion]);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        ref={barRef}
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-[width] duration-300 ease-out"
      />
    </div>
  );
}

export function SkillsTabs({ categories, initialCategory }: SkillsTabsProps) {
  const [value, setValue] = useState(initialCategory ?? categories[0]?.id ?? "");
  const items = useMemo(() => categories ?? [], [categories]);

  if (!items.length) return null;

  return (
    <Card className="border-white/5 bg-slate-900/70">
      <CardHeader>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent p-0">
            {items.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "rounded-xl border border-transparent px-4 py-2 text-sm transition",
                  value === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10",
                )}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="space-y-2 rounded-xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-white">
                        <SkillIcon name={skill.icon} />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <SkillProgress level={skill.level} />
                  </div>
                ))}
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </CardHeader>
    </Card>
  );
}

export default SkillsTabs;
