export const projects = [
  {
    id: "ecart",
    number: "01",
    title: "ecart.ma",
    category: "Commerce platform",
    url: "https://ecart.ma",
    description:
      "A commerce platform for Moroccan merchants to launch their own storefronts and manage cash-on-delivery orders. Brings products, order confirmation, team access, and Google Sheets integration together, with an Android app for managing the business on the go.",
    mobileDescription:
      "Storefronts and cash-on-delivery order management for Moroccan merchants, with Google Sheets integration and an Android companion app.",
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
      "A shipping platform for Moroccan merchants to manage orders, pickup addresses, shipping fees, and shipments in one workspace. Includes a Speedaf carrier integration, shipment tracking, and cash-on-delivery reconciliation, with French and Arabic interfaces and role-based team access.",
    mobileDescription:
      "Orders, shipping fees, carrier tracking, and cash-on-delivery reconciliation for Moroccan merchants, with French and Arabic interfaces.",
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
