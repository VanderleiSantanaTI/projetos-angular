export interface NavOption {
  label: string;
  url: string;
  action?: () => void; // Opcional, pois nem todos têm "action".
}

export interface NavSection {
  title: string;
  options: NavOption[];
}

export interface NavItem {
  title: string;
  sections: NavSection[];
}
