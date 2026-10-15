import { Box, LayoutTemplate, Megaphone, MonitorSmartphone, Palette, Sparkles, type LucideIcon } from "lucide-react";

/** Icon per service id — kept out of lib/ so content stays framework-free. */
export const serviceIcons: Record<string, LucideIcon> = {
  "brand-identity": Palette,
  web: MonitorSmartphone,
  ai: Sparkles,
  "3d-motion": Box,
  marketing: Megaphone,
  graphic: LayoutTemplate,
};
