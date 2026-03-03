export interface Project {
  name: string;
  type: string;
  description: string;
  github_url: string;
  live_url: string;
  image_url: string;
  gradientFrom: string;
  gradientTo: string;
  install_cmd?: string;
}

export const projects: Project[] = [
  
  {
    name: "pixelwind",
    type: "NPM Package",
    description: "A lightweight, utility-first CSS package for exact pixel-based spacing and sizing without configuration.",
    install_cmd: "npm install pixelwind",
    github_url: "https://github.com/therohitmahar/pixelwind",
    live_url: "https://therohitmahar.github.io/pixelwind/",
    image_url: "https://github.com/therohitmahar/pixelwind/blob/main/images/homeGraphImage.png?raw=true",
    gradientFrom: "from-red-500/20",
    gradientTo: "to-orange-500/20",
  },
  {
    name: "context-flow-ai",
    type: "Web App",
    description: "An AI-powered application for context-aware task management and flow.",
    github_url: "https://github.com/therohitmahar/context-flow-ai",
    live_url: "https://context-stacker.vercel.app/",
    image_url: "/images/context-flow-image.png",
    gradientFrom: "from-indigo-500/20",
    gradientTo: "to-blue-500/20",
  },
  {
    name: "ovisgardenglow",
    type: "Web App",
    description: "E-commerce or landing page project for a gardening brand.",
    github_url: "https://github.com/therohitmahar/ovisgardenglow",
    live_url: "https://ovisgardenglow.vercel.app",
    image_url: "/images/ovisgardenglow.png",
    gradientFrom: "from-green-500/20",
    gradientTo: "to-emerald-500/20",
  },
  {
    name: "leet-clone",
    type: "Web App",
    description: "A full-stack LeetCode clone for practicing coding challenges.",
    github_url: "https://github.com/therohitmahar/leet-clone",
    live_url: "https://leet-clone-react.vercel.app/",
    image_url: "/images/leetclone-image.png",
    gradientFrom: "from-yellow-500/20",
    gradientTo: "to-orange-500/20",
  },
  {
    name: "auto-dynamic-importer",
    type: "VS Code Extension",
    description: "Refactor React imports into Next.js dynamic imports instantly with SSR control and one-click commands.",
    github_url: "https://github.com/therohitmahar/auto-dynamic-importer",
    live_url: "https://marketplace.visualstudio.com/items?itemName=therohitmahar.auto-dynamic-importer",
    image_url: "https://opengraph.githubassets.com/1/therohitmahar/auto-dynamic-importer",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-cyan-500/20",
  },
  {
    name: "quick-wrapper",
    type: "VS Code Extension",
    description: "A lightweight extension to wrap code blocks using Emmet abbreviations with a single shortcut (Ctrl+Alt+,).",
    github_url: "https://github.com/therohitmahar/quick-wrapper",
    live_url: "https://marketplace.visualstudio.com/items?itemName=therohitmahar.quick-wrapper",
    image_url: "https://opengraph.githubassets.com/1/therohitmahar/quick-wrapper",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-500/20",
  },
  {
    name: "Budget-app",
    type: "Web App",
    description: "Personal finance tracker to manage income and expenses.",
    github_url: "https://github.com/therohitmahar/Budget-app",
    live_url: "https://budget-tracker-app-react.vercel.app/",
    image_url: "/images/budeget-app.png",
    gradientFrom: "from-teal-500/20",
    gradientTo: "to-cyan-500/20",
  },
  {
    name: "My-Dictionary---JavaScript-Project",
    type: "Web App",
    description: "A dictionary web app built using vanilla JavaScript and Dictionary API.",
    github_url: "https://github.com/therohitmahar/My-Dictionary---JavaScript-Project",
    live_url: "https://therohitmahar.github.io/My-Dictionary---JavaScript-Project/",
    image_url: "/images/dictionary.png",
    gradientFrom: "from-fuchsia-500/20",
    gradientTo: "to-pink-500/20",
  },
  {
    name: "meesho-Reboot",
    type: "Web App",
    description: "A frontend reboot/clone of the Meesho e-commerce platform.",
    github_url: "https://github.com/therohitmahar/meesho-Reboot",
    live_url: "https://meesho-reboot.vercel.app",
    image_url: "https://opengraph.githubassets.com/1/therohitmahar/meesho-Reboot",
    gradientFrom: "from-rose-500/20",
    gradientTo: "to-red-500/20",
  }
];
