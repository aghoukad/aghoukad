export const projects = [
  {
    id: "alpha",
    number: "01",
    title: "Project Alpha",
    category: "Web application",
    description:
      "A high-throughput web application exploring reactive state patterns and low-latency interaction models. Designed to probe computational efficiency and micro-benchmark state isolation in modern browser environments.",
    mobileDescription:
      "A collaborative workspace utility exploring real-time state synchronization, modular layout engines, and keyboard-first user ergonomics.",
    scope: "Architecture, Frontend Engineering",
    stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    id: "beta",
    number: "02",
    title: "Project Beta",
    category: "Developer tool",
    description:
      "A minimalist CLI utility for streamlining developer workflow across distributed codebases. Focuses on zero-config static analysis parsing, unified directory navigation, and binary footprint minimalism.",
    mobileDescription:
      "A command-line interface toolchain built for high-throughput code validation, AST transformation, and zero-config asset bundling.",
    scope: "CLI Architecture, Systems Tooling",
    stack: ["Rust", "Shell", "Node.js"],
  },
  {
    id: "gamma",
    number: "03",
    title: "Project Gamma",
    category: "Interface experiment",
    description:
      "Canvas and typography experiment exploring editorial layout geometry and fluid sizing. Renders vector-derived mathematical curves coupled directly to text baseline metrics in hardware-accelerated viewports.",
    mobileDescription:
      "Interactive canvas playground testing generative grain fields, physics-driven typography reactions, and variable font coordinate mapping.",
    scope: "Interaction Design, Creative Coding",
    stack: ["Canvas API", "Vanilla JS", "CSS Subgrid"],
  },
] as const
