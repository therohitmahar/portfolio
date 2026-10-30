export const wordmarkTiming = {
  // Used only by the staged presets; coordinated motion uses the whole gesture.
  mDuration: 280,
  letterDuration: 320,
  stagger: 80,
  coordinated: true,
  letterEase: "cubic-bezier(.45, 0, .55, 1)",
};

// Shared playhead: reversing a gesture continues from the current pose.
// Release native effects at endpoints so the resting SVG stays crisp.
export function bindWordmarkMotion(
  root: HTMLElement,
  overrides: Partial<typeof wordmarkTiming> = {},
) {
  const identity = root.closest<HTMLElement>(".identity");
  if (!identity) return;
  const timing = { ...wordmarkTiming, ...overrides };
  const letterStart = timing.coordinated ? 0 : timing.mDuration;
  const duration = letterStart + timing.stagger * 3 + timing.letterDuration;
  const pointer = matchMedia(
    "(min-width: 900px) and (hover: hover) and (pointer: fine)",
  );
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mGroups = Array.from(
    root.querySelectorAll<SVGGElement>(".brand-move-m"),
  );
  const letters = Array.from(
    root.querySelectorAll<SVGGElement>(".brand-letter-step"),
  );
  const mShift = parseFloat(root.style.getPropertyValue("--monogram-m-shift"));
  const fullWidth = root.style.getPropertyValue("--wordmark-width");
  let animations: Animation[] = [];
  let position = 0;
  let generation = 0;
  let enabled = false;
  let compactWidth = "44px";
  let expandedWidth = fullWidth;
  let intro = root.closest(".site-header") && document.documentElement.dataset.brandIntro === "pending";
  const transform = (x: number) => `translateX(${x}px)`;
  const letterX = (group: SVGGElement, open: boolean) =>
    parseFloat(
      group.style.getPropertyValue(
        open ? "--letter-open-x" : "--letter-closed-x",
      ),
    );

  function pose(open: boolean) {
    root.style.width = open ? expandedWidth : compactWidth;
    mGroups.forEach((group) => {
      group.style.transform = transform(open ? mShift : 0);
    });
    letters.forEach((group) => {
      group.style.transform = transform(letterX(group, open));
    });
  }
  function cancelEffects() {
    animations.forEach((animation) => {
      void animation.finished.catch(() => {});
      animation.cancel();
    });
    animations = [];
  }
  function stage(
    from: number,
    to: number,
    delay: number,
    length: number,
    easing: string,
  ): Keyframe[] {
    const frames: Keyframe[] = [{ transform: transform(from), offset: 0 }];
    if (delay)
      frames.push({
        transform: transform(from),
        offset: delay / duration,
        easing,
      });
    else frames[0].easing = easing;
    const end = (delay + length) / duration;
    frames.push({ transform: transform(to), offset: end });
    if (end < 1) frames.push({ transform: transform(to), offset: 1 });
    return frames;
  }
  function add(element: Element, frames: Keyframe[]) {
    const animation = element.animate(frames, { duration, fill: "both" });
    animation.pause();
    animation.currentTime = position;
    animations.push(animation);
  }
  function buildEffects() {
    add(root, [
      { width: compactWidth, easing: "cubic-bezier(.4, 0, .2, 1)" },
      { width: expandedWidth },
    ]);
    mGroups.forEach((group) =>
      add(
        group,
        stage(
          0,
          mShift,
          0,
          timing.coordinated ? duration : timing.mDuration,
          timing.coordinated ? timing.letterEase : "cubic-bezier(.4, 0, .2, 1)",
        ),
      ),
    );
    letters.forEach((group) =>
      add(
        group,
        stage(
          letterX(group, false),
          letterX(group, true),
          letterStart + Number(group.dataset.step ?? 0) * timing.stagger,
          timing.letterDuration,
          timing.letterEase,
        ),
      ),
    );
  }
  function seek(open: boolean) {
    generation++;
    position = open ? duration : 0;
    pose(open);
    cancelEffects();
  }
  function play(open: boolean) {
    if (!enabled) return;
    if (animations.length)
      position = Math.max(
        0,
        Math.min(duration, Number(animations[0].currentTime ?? position)),
      );
    if ((open && position === duration) || (!open && position === 0)) {
      seek(open);
      return;
    }
    if (!animations.length) buildEffects();
    const run = ++generation;
    animations.forEach((animation) => {
      animation.pause();
      animation.currentTime = position;
      animation.playbackRate = open ? 1 : -1;
      animation.play();
      void animation.finished.catch(() => {});
    });
    void animations[0].finished
      .then(() => {
        if (run !== generation) return;
        position = open ? duration : 0;
        pose(open);
        cancelEffects();
      })
      .catch(() => {});
  }
  function clear() {
    generation++;
    enabled = false;
    cancelEffects();
    root.style.removeProperty("width");
    [...mGroups, ...letters].forEach((group) =>
      group.style.removeProperty("transform"),
    );
    delete root.dataset.motionControlled;
  }
  function configure() {
    clear();
    compactWidth = getComputedStyle(root).getPropertyValue("--logo-width").trim() || "44px";
    expandedWidth = `${parseFloat(compactWidth) * parseFloat(fullWidth) / 44}px`;
    if (reduced.matches || !root.animate) return;
    enabled = true;
    root.dataset.motionControlled = "true";
    seek(!!intro || (pointer.matches && identity!.matches(":hover, :focus-visible")));
  }
  const enter = () => {
    if (!enabled || intro || !pointer.matches) return;
    if (identity!.matches(":focus-visible")) seek(true);
    else play(true);
  };
  const leave = () => {
    if (pointer.matches && !intro && !identity!.matches(":focus-visible")) play(false);
  };
  const focus = () => {
    if (enabled && pointer.matches && identity!.matches(":focus-visible")) seek(true);
  };
  const blur = () => {
    if (enabled && !intro && !identity!.matches(":hover")) seek(false);
  };
  identity.addEventListener("pointerenter", enter);
  identity.addEventListener("pointerleave", leave);
  identity.addEventListener("focusin", focus);
  identity.addEventListener("focusout", blur);
  pointer.addEventListener("change", configure);
  reduced.addEventListener("change", configure);
  window.addEventListener("resize", configure);
  configure();
  return {
    open: () => play(true),
    startIntro: () => { intro = true; play(true); },
    seek,
    finishIntro: (immediate = false) => {
      intro = false;
      if (immediate || reduced.matches) seek(false);
      else play(false);
    },
    close: () => play(false),
    destroy() {
      identity.removeEventListener("pointerenter", enter);
      identity.removeEventListener("pointerleave", leave);
      identity.removeEventListener("focusin", focus);
      identity.removeEventListener("focusout", blur);
      pointer.removeEventListener("change", configure);
      reduced.removeEventListener("change", configure);
      window.removeEventListener("resize", configure);
      clear();
    },
  };
}
