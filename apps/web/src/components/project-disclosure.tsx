import { useEffect, useRef, type MouseEvent, type ReactNode } from "react"

export function ProjectDisclosure({
  heading,
  children,
}: {
  heading: ReactNode
  children: ReactNode
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const targetOpenRef = useRef<boolean | null>(null)

  useEffect(() => () => animationRef.current?.cancel(), [])

  function toggle(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current
    const panel = details?.querySelector<HTMLElement>(".project-panel")
    if (!details || !panel) return

    event.preventDefault()
    const open = !(targetOpenRef.current ?? details.open)
    const height = details.open ? panel.getBoundingClientRect().height : 0
    const opacity = details.open ? getComputedStyle(panel).opacity : "0"
    animationRef.current?.cancel()
    animationRef.current = null
    targetOpenRef.current = null
    delete details.dataset.closing

    // Native keyboard and assistive-technology activation stays immediate.
    details.toggleAttribute("data-instant", event.detail === 0)
    if (event.detail === 0) {
      details.open = open
      return
    }

    // Keep the native disclosure open until its closing animation finishes.
    details.open = true
    details.toggleAttribute("data-closing", !open)
    targetOpenRef.current = open

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const frames: Keyframe[] = reduceMotion
      ? [{ opacity }, { opacity: open ? 1 : 0 }]
      : [
          { height: `${height}px`, opacity },
          {
            height: `${open ? panel.getBoundingClientRect().height : 0}px`,
            opacity: open ? 1 : 0,
          },
        ]
    const animation = panel.animate(frames, {
      duration: 200,
      easing: reduceMotion
        ? "ease"
        : getComputedStyle(details).getPropertyValue("--ease-out").trim(),
      fill: "both",
    })
    animationRef.current = animation
    animation.onfinish = () => {
      if (animationRef.current !== animation) return
      details.open = open
      animation.cancel()
      animationRef.current = null
      targetOpenRef.current = null
      delete details.dataset.closing
    }
  }

  return (
    <details ref={detailsRef} className="project-item">
      <summary className="project-trigger" onClick={toggle}>
        {heading}
      </summary>
      <div className="project-panel">
        <div className="project-content">{children}</div>
      </div>
    </details>
  )
}
