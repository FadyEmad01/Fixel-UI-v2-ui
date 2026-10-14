export interface CatalogItem {
  id: string;
  href: string;
  item: {
    title: string;
    description?: string;
  };
  preview: {
    src: string;
    thumbnail?: string;
  };
  tags: string[];
}

export const MOCK_CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "1",
    href: "/ui/nav-bar",
    item: {
      title: "Navigation Bar",
      description: "An animated, interactive macOS-style navbar component with smooth spring physics.",
    },
    preview: {
      // Sample video source for testing hover playback
      src: "/data/fixel-ui-navbar-01.mp4",
      thumbnail: "/data/image-navbar-01.png",
    },
    tags: ["Motion", "React", "Animation"],
  },
  {
    id: "2",
    href: "/components/display-card",
    item: {
      title: "Display Card",
      description: "A versatile catalog card featuring hover video previews optimized with Intersection Observers.",
    },
    preview: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    },
    tags: ["Next.js", "Video", "Performance"],
  },
  {
    id: "3",
    href: "/components/command-palette",
    item: {
      title: "Command Palette",
      description: "A lightning-fast spotlight and command menu built for modern web applications.",
    },
    preview: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    },
    tags: ["Radix", "Keyboard", "Search"],
  },
  {
    id: "4",
    href: "/components/glow-button",
    item: {
      title: "Glow Button",
      description: "A high-impact CTA button with interactive mouse-following glow highlights.",
    },
    preview: {
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
    },
    tags: ["Tailwind", "Interactive"],
  },
];