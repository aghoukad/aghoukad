export const projects = [
  {
    id: "ecart",
    number: "01",
    title: "ecart.ma",
    category: "Commerce platform",
    url: "https://ecart.ma",
    description:
      "I built ecart.ma to help Moroccan merchants launch storefronts and manage cash-on-delivery orders. It brings product management, order confirmation, team access, and Google Sheets integration into one platform, with an Android app for managing stores on the go.",
    mobileDescription:
      "I built ecart.ma for Moroccan merchants to launch storefronts and manage cash-on-delivery orders on the web and Android.",
    scope: "Full-stack & Mobile Development",
    stack: [
      "TypeScript",
      "React",
      "TanStack Start",
      "Express",
      "MongoDB",
      "Expo",
    ],
  },
  {
    id: "eship",
    number: "02",
    title: "eship.ma",
    category: "Shipping platform",
    url: "https://eship.ma",
    description:
      "I built eship.ma for Moroccan merchants to manage orders, pickup addresses, shipping fees, and shipments. It includes a Speedaf carrier integration, tracking, and cash-on-delivery reconciliation, with French and Arabic interfaces and role-based team access.",
    mobileDescription:
      "I built eship.ma for Moroccan merchants to manage shipping and cash-on-delivery reconciliation, with French and Arabic interfaces.",
    scope: "Full-stack Development",
    stack: [
      "TypeScript",
      "React",
      "TanStack Start",
      "Convex",
      "Better Auth",
      "Tailwind CSS",
    ],
  },
] as const
