import type { NavigationItem } from "@/types/navigation";

import { ROUTES } from "@/config/constants";

export const primaryNavigation: readonly NavigationItem[] = [
  {
    href: ROUTES.home,
    label: "Home",
  },
];