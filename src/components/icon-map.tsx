/* ============================================================
   icon-map — turns the icon names written in the data files
   (e.g. "Coffee" in features.ts, "Video" in site.ts) into
   actual lucide icon components. If a name here ever falls out
   of date, the compass icon is used as a safe fallback.
   ============================================================ */

import {
  Beer,
  CalendarDays,
  Coffee,
  Compass,
  Flower2,
  Gem,
  Gift,
  Heart,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sprout,
  ThumbsUp,
  TreePine,
  TrendingUp,
  Users,
  Utensils,
  Video,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Beer,
  CalendarDays,
  Coffee,
  Compass,
  Flower2,
  Gem,
  Gift,
  Heart,
  Shirt,
  ShoppingBasket,
  Smartphone,
  Sprout,
  ThumbsUp,
  TreePine,
  TrendingUp,
  Users,
  Utensils,
  Video,
};

export function iconByName(name: string): LucideIcon {
  return icons[name] ?? Compass;
}
