export function dim(x1: number, y1: number, x2?: number, y2?: number): object {
  if (x2 === undefined)
    x2 = x1
  if (y2 === undefined)
    y2 = y1
  return { gridColumn: `${x1} / span ${x2 - x1 + 1}`, gridRow: `${y1} / span ${y2 - y1 + 1}` }
}
