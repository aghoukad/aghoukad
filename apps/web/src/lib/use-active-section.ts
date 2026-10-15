import { useEffect, useRef, useState } from "react"

export const sections = ["work", "about", "contact"] as const
type Section = (typeof sections)[number]

function sectionFromHash(): Section | null {
  return (
    sections.find((section) => `#${section}` === window.location.hash) ?? null
  )
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<Section>("work")
  const destination = useRef<{
    section: Section
    arrived: boolean
  } | null>(null)

  useEffect(() => {
    let frame = 0
    const updateSection = () => {
      frame = 0
      // An anchor near the end cannot always reach the top of the viewport.
      // Keep that destination selected until the reader scrolls manually.
      const target = destination.current
      if (target) {
        const element = document.getElementById(target.section)
        const padding = parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop
        )
        const targetY = Math.max(
          0,
          Math.min(
            document.documentElement.scrollHeight - window.innerHeight,
            (element?.getBoundingClientRect().top ?? 0) +
              window.scrollY -
              padding
          )
        )
        const atDestination = Math.abs(window.scrollY - targetY) <= 2
        if (target.arrived && !atDestination) {
          destination.current = null
        } else {
          target.arrived ||= atDestination
          setActiveSection(target.section)
          return
        }
      }

      let current: Section = "work"
      for (const section of sections) {
        if (
          (document.getElementById(section)?.getBoundingClientRect().top ??
            Infinity) <= 160
        ) {
          current = section
        }
      }
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
      ) {
        current = "contact"
      }
      setActiveSection(current)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSection)
    }
    const followScroll = () => {
      destination.current = null
      scheduleUpdate()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      ) {
        followScroll()
      }
    }
    const followHash = () => {
      const section = sectionFromHash()
      destination.current = section ? { section, arrived: false } : null
      scheduleUpdate()
    }

    followHash()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", followHash)
    window.addEventListener("wheel", followScroll, { passive: true })
    window.addEventListener("touchmove", followScroll, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    const main = document.getElementById("main-content")
    if (main) resizeObserver.observe(main)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", followHash)
      window.removeEventListener("wheel", followScroll)
      window.removeEventListener("touchmove", followScroll)
      window.removeEventListener("keydown", onKeyDown)
      resizeObserver.disconnect()
    }
  }, [])

  function selectSection(section: Section) {
    destination.current = { section, arrived: false }
    setActiveSection(section)
  }

  return { activeSection, selectSection }
}
