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

  // Determine color based on level to mimic resource usage (Green -> Amber -> Redish, but we'll stick to tech accents)
  const isHigh = level >= 85;
  const barColor = isHigh ? "bg-accent" : "bg-primary";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-sm bg-secondary border border-border">
      <div
        ref={barRef}
        className={cn("h-full transition-[width] duration-300 ease-out", barColor)}
      />
    </div>
  );
}

export function SkillsTabs({ categories, initialCategory }: SkillsTabsProps) {
  const [value, setValue] = useState(initialCategory ?? categories[0]?.id ?? "");
  const items = useMemo(() => categories ?? [], [categories]);

  if (!items.length) return null;

  return (
    <Card className="border-border bg-card shadow-none">
      <CardHeader className="p-4 sm:p-6 pb-0">
        <Tabs value={value} onValueChange={setValue} className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-start gap-2 bg-transparent p-0 mb-6">
            {items.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "rounded-md border border-border px-4 py-2 text-sm transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary hover:bg-secondary",
                )}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <CardContent className="space-y-4 p-0">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="space-y-2 rounded-md bg-secondary/30 border border-border/50 p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <SkillIcon name={skill.icon} />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
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
