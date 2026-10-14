import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as C from "./constants";

export const BACKGROUND = "#102e2b";
export type Screen = "title" | "howto" | "playing" | "won";
export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type PileKind = "stock" | "waste" | "foundation" | "tableau";
export interface CardState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly faceUp: boolean;
}
export interface DragState {
  readonly cards: readonly CardState[];
  readonly fromPile: "waste" | "foundation" | "tableau";
  readonly fromIndex: number;
  readonly x: number;
  readonly y: number;
}
export interface DropTargetState {
  readonly pile: "foundation" | "tableau";
  readonly index: number;
}
export interface PointerState {
  readonly x: number;
  readonly y: number;
  readonly down: boolean;
}
export interface PressState {
  readonly x: number;
  readonly y: number;
  readonly at: number;
}
export interface FlyerState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
}
export interface CascadeState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly titleIndex: number;
  readonly stock: readonly CardState[];
  readonly waste: readonly CardState[];
  readonly wasteSets: readonly number[];
  readonly foundations: readonly (readonly CardState[])[];
  readonly tableau: readonly (readonly CardState[])[];
  readonly drag: DragState | null;
  readonly dropTarget: DropTargetState | null;
  readonly pointer: PointerState;
  readonly lastPress: PressState | null;
  readonly autoFlip: boolean;
  readonly winDetect: boolean;
  readonly launching: boolean;
  readonly trailPainting: boolean;
  readonly launchClock: number;
  readonly launched: number;
  readonly flyers: readonly FlyerState[];
  readonly cascadeDone: boolean;
  readonly trailStamps: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
type Ref = { pile: PileKind; index: number };
type PlayPile = "waste" | "foundation" | "tableau";
interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface SnapCard extends CardState {
  readonly color: "red" | "black";
}
export interface CascadeSnapshot {
  version: number;
  screen: Screen;
  menuIndex: number;
  titleIndex: number;
  dealMode: string;
  turnCount: number;
  dealModeLabel: string;
  muted: boolean;
  autoFlip: boolean;
  winDetect: boolean;
  launching: boolean;
  trailPainting: boolean;
  stock: SnapCard[];
  waste: SnapCard[];
  wasteSets: number[];
  wasteVisibleCount: number;
  foundations: SnapCard[][];
  tableau: SnapCard[][];
  drag: DragState | null;
  dropTarget: DropTargetState | null;
  pointer: PointerState;
  lastPress: PressState | null;
  launchClock: number;
  launched: number;
  flyers: FlyerState[];
  cascadeDone: boolean;
  trailStamps: number;
  simTime: number;
}
export interface CascadeDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<CascadeState>): CascadeState;
  snapshot(s: DeepReadonly<CascadeState>): CascadeSnapshot;
  reconcile(s: DeepReadonly<CascadeState>): CascadeState;
  menuItemRect(s: DeepReadonly<CascadeState>, i: number): Rect | null;
  setScreen(s: DeepReadonly<CascadeState>, v: Screen): CascadeState;
  setMenuIndex(s: DeepReadonly<CascadeState>, v: number): CascadeState;
  setTitleIndex(s: DeepReadonly<CascadeState>, v: number): CascadeState;
  addCard(
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
    u: Suit,
    r: number,
    f: boolean,
  ): CascadeState;
  removeCard(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  setCardFaceUp(
    s: DeepReadonly<CascadeState>,
    id: number,
    f: boolean,
  ): CascadeState;
  clearPile(
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
  ): CascadeState;
  clearTable(s: DeepReadonly<CascadeState>): CascadeState;
  addWasteSet(s: DeepReadonly<CascadeState>, n: number): CascadeState;
  clearWasteSets(s: DeepReadonly<CascadeState>): CascadeState;
  deal(s: DeepReadonly<CascadeState>): CascadeState;
  turnStock(s: DeepReadonly<CascadeState>): CascadeState;
  move(
    s: DeepReadonly<CascadeState>,
    a: PlayPile,
    i: number,
    r: number,
    b: "foundation" | "tableau",
    j: number,
  ): [CascadeState, boolean];
  autoMove(
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
  ): [CascadeState, boolean];
  pointerDown(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerMove(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerUp(s: DeepReadonly<CascadeState>, x: number, y: number): CascadeState;
  setAutoFlip(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setWinDetect(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setLaunching(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setTrailPainting(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  addFlyer(
    s: DeepReadonly<CascadeState>,
    u: Suit,
    r: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): CascadeState;
  setFlyerPosition(
    s: DeepReadonly<CascadeState>,
    id: number,
    x: number,
    y: number,
  ): CascadeState;
  setFlyerVelocity(
    s: DeepReadonly<CascadeState>,
    id: number,
    vx: number,
    vy: number,
  ): CascadeState;
  removeFlyer(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  clearFlyers(s: DeepReadonly<CascadeState>): CascadeState;
  setLaunchClock(s: DeepReadonly<CascadeState>, n: number): CascadeState;
  clearTrail(s: DeepReadonly<CascadeState>): CascadeState;
  drawLaunchVx(s: DeepReadonly<CascadeState>): number;
}
const red = (s: Suit) => s === "hearts" || s === "diamonds";
const clr = (s: Suit) => (red(s) ? "red" : ("black" as "red" | "black"));
const piles = () => Array.from({ length: 7 }, () => [] as CardState[]);
const blank = (muted = false): CascadeState => ({
  screen: "title",
  menuIndex: 0,
  titleIndex: 0,
  stock: [],
  waste: [],
  wasteSets: [],
  foundations: [[], [], [], []],
  tableau: piles(),
  drag: null,
  dropTarget: null,
  pointer: { x: 0, y: 0, down: false },
  lastPress: null,
  autoFlip: true,
  winDetect: true,
  launching: true,
  trailPainting: true,
  launchClock: 0,
  launched: 0,
  flyers: [],
  cascadeDone: false,
  trailStamps: 0,
  nextId: 1,
  simTime: 0,
  muted,
});
function val(s: DeepReadonly<CascadeState>, r: Ref): readonly CardState[] {
  return r.pile === "stock"
    ? s.stock
    : r.pile === "waste"
      ? s.waste
      : r.pile === "foundation"
        ? s.foundations[r.index]
        : s.tableau[r.index];
}
function put(
  s: DeepReadonly<CascadeState>,
  r: Ref,
  v: readonly CardState[],
): CascadeState {
  return r.pile === "stock"
    ? { ...s, stock: v }
    : r.pile === "waste"
      ? { ...s, waste: v }
      : r.pile === "foundation"
        ? {
            ...s,
            foundations: s.foundations.map((p, i) => (i === r.index ? v : p)),
          }
        : { ...s, tableau: s.tableau.map((p, i) => (i === r.index ? v : p)) };
}
function check(p: PileKind, i: number) {
  const n = p === "foundation" ? 3 : p === "tableau" ? 6 : 0;
  if (!Number.isInteger(i) || i < 0 || i > n)
    throw new RangeError(`invalid pile index ${i}`);
}
const suitColor = (s: Suit) => (red(s) ? "red" : "black");
const run = (a: readonly CardState[]) =>
  a.every(
    (x, i) =>
      i === 0 ||
      (x.rank === a[i - 1].rank - 1 &&
        suitColor(x.suit) !== suitColor(a[i - 1].suit) &&
        x.faceUp),
  );
function fAccept(p: readonly CardState[], a: readonly CardState[]) {
  if (a.length !== 1 || !a[0].faceUp) return false;
  const t = p[p.length - 1],
    c = a[0];
  return t ? t.suit === c.suit && c.rank === t.rank + 1 : c.rank === 1;
}
function tAccept(p: readonly CardState[], a: readonly CardState[]) {
  if (!run(a)) return false;
  const t = p[p.length - 1];
  return t
    ? t.faceUp &&
        a[0].rank === t.rank - 1 &&
        suitColor(a[0].suit) !== suitColor(t.suit)
    : a[0].rank === 13;
}
function move(
  s: DeepReadonly<CascadeState>,
  from: Ref,
  row: number,
  to: Ref,
): [CascadeState, boolean] {
  const p = val(s, from);
  if (!Number.isInteger(row) || row < 0 || row >= p.length)
    throw new RangeError(`invalid card row ${row}`);
  const a = p.slice(row);
  if (
    from.pile === "stock" ||
    (from.pile !== "tableau" && row !== p.length - 1)
  )
    return [s as CascadeState, false];
  const ok =
    to.pile === "foundation"
      ? fAccept(val(s, to), a)
      : to.pile === "tableau"
        ? tAccept(val(s, to), a)
        : false;
  if (!ok) return [s as CascadeState, false];
  let n = put(s, from, p.slice(0, row));
  n = put(n, to, [...val(n, to), ...a]);
  if (from.pile === "tableau" && n.autoFlip) {
    const q = n.tableau[from.index];
    if (q.length && !q[q.length - 1].faceUp)
      n = put(n, { pile: "tableau", index: from.index }, [
        ...q.slice(0, -1),
        { ...q[q.length - 1], faceUp: true },
      ]);
  }
  if (n.winDetect && n.foundations.reduce((x, p) => x + p.length, 0) === 52)
    n = { ...n, screen: "won", launchClock: C.LAUNCH_INTERVAL };
  return [n, true];
}
function turn(s: DeepReadonly<CascadeState>): CascadeState {
  if (s.stock.length) {
    const c = s.stock[s.stock.length - 1];
    return {
      ...s,
      stock: s.stock.slice(0, -1),
      waste: [...s.waste, { ...c, faceUp: true }],
      wasteSets: [...s.wasteSets, 1],
    };
  }
  return s.waste.length
    ? {
        ...s,
        stock: [...s.waste].reverse().map((c) => ({ ...c, faceUp: false })),
        waste: [],
        wasteSets: [],
      }
    : (s as CascadeState);
}
function deal(s: DeepReadonly<CascadeState>): CascadeState {
  const d: CardState[] = [];
  let id = s.nextId;
  for (const u of C.SUITS)
    for (let r = 1; r <= 13; r++)
      d.push({ id: id++, suit: u, rank: r, faceUp: false });
  for (let i = 51; i; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  const t = piles();
  let k = 0;
  for (let i = 0; i < 7; i++)
    for (let j = 0; j <= i; j++) t[i].push({ ...d[k++], faceUp: j === i });
  return {
    ...s,
    screen: "playing",
    menuIndex: 0,
    stock: d.slice(k),
    waste: [],
    wasteSets: [],
    foundations: [[], [], [], []],
    tableau: t,
    drag: null,
    dropTarget: null,
    launchClock: 0,
    launched: 0,
    flyers: [],
    cascadeDone: false,
    trailStamps: 0,
    nextId: id,
  };
}
function rect(screen: Screen, i: number): Rect | null {
  const n =
    screen === "title"
      ? 2
      : screen === "howto"
        ? 1
        : screen === "playing"
          ? 3
          : 0;
  if (i < 0 || i >= n) return null;
  return screen === "playing"
    ? { x: 24 + i * 132, y: C.HUD_Y + 4, w: 116, h: 28 }
    : { x: 440, y: screen === "title" ? 390 + i * 64 : 580, w: 400, h: 48 };
}
function pos(s: DeepReadonly<CascadeState>, i: number, r: number) {
  let y = C.TABLEAU_Y;
  for (let k = 0; k < r; k++) y += s.tableau[i][k].faceUp ? 34 : 24;
  return { x: C.COLUMN_X[i], y };
}
function target(
  s: DeepReadonly<CascadeState>,
  d: DragState,
): DropTargetState | null {
  const x = d.x + 50,
    y = d.y + 70;
  for (let i = 0; i < 4; i++)
    if (
      x >= C.FOUNDATION_X[i] &&
      x <= C.FOUNDATION_X[i] + 100 &&
      y >= 24 &&
      y <= 164 &&
      fAccept(s.foundations[i], d.cards)
    )
      return { pile: "foundation", index: i };
  for (let i = 0; i < 7; i++) {
    const q = s.tableau[i],
      h = q.length ? pos(s, i, q.length - 1).y + 140 - C.TABLEAU_Y : 140;
    if (
      x >= C.COLUMN_X[i] &&
      x <= C.COLUMN_X[i] + 100 &&
      y >= 180 &&
      y <= 180 + h &&
      tAccept(q, d.cards)
    )
      return { pile: "tableau", index: i };
  }
  return null;
}
function press(
  s: DeepReadonly<CascadeState>,
  x: number,
  y: number,
): CascadeState {
  const n = {
    ...s,
    pointer: { x, y, down: true },
    lastPress: { x, y, at: s.simTime },
  } as CascadeState;
  if (s.screen === "won") return deal(n);
  if (s.screen !== "playing") return n;
  for (let i = 0; i < 7; i++) {
    const q = s.tableau[i];
    for (let r = q.length - 1; r >= 0; r--) {
      const p = pos(s, i, r);
      if (
        x >= p.x &&
        x <= p.x + 100 &&
        y >= p.y &&
        y <= p.y + 140 &&
        q[r].faceUp
      )
        return {
          ...n,
          drag: {
            cards: q.slice(r),
            fromPile: "tableau",
            fromIndex: i,
            x: p.x,
            y: p.y,
          },
        };
    }
  }
  if (
    x >= C.WASTE_X &&
    x <= C.WASTE_X + 100 &&
    y >= 24 &&
    y <= 164 &&
    s.waste.length &&
    s.wasteSets.length
  )
    return {
      ...n,
      drag: {
        cards: [s.waste[s.waste.length - 1]],
        fromPile: "waste",
        fromIndex: 0,
        x: C.WASTE_X,
        y: 24,
      },
    };
  if (x >= C.STOCK_X && x <= C.STOCK_X + 100 && y >= 24 && y <= 164)
    return turn(n);
  return n;
}
function movePointer(
  s: DeepReadonly<CascadeState>,
  x: number,
  y: number,
): CascadeState {
  if (!s.drag) return { ...s, pointer: { x, y, down: s.pointer.down } };
  const d = {
    ...s.drag,
    x: s.drag.x + x - s.pointer.x,
    y: s.drag.y + y - s.pointer.y,
  };
  return {
    ...s,
    pointer: { x, y, down: s.pointer.down },
    drag: d,
    dropTarget: target(s, d),
  };
}
function release(
  s: DeepReadonly<CascadeState>,
  x: number,
  y: number,
): CascadeState {
  if (!s.drag) return { ...s, pointer: { x, y, down: false } };
  const d = {
    ...s.drag,
    x: s.drag.x + x - s.pointer.x,
    y: s.drag.y + y - s.pointer.y,
  };
  if (Math.hypot(x - s.pointer.x, y - s.pointer.y) <= C.DRAG_THRESHOLD)
    return {
      ...s,
      pointer: { x, y, down: false },
      drag: null,
      dropTarget: null,
    };
  const z = target(s, d);
  if (!z)
    return {
      ...s,
      pointer: { x, y, down: false },
      drag: null,
      dropTarget: null,
    };
  const row =
    d.fromPile === "tableau"
      ? s.tableau[d.fromIndex].length - d.cards.length
      : val(s, { pile: d.fromPile, index: d.fromIndex }).length - 1;
  const n = move(s, { pile: d.fromPile, index: d.fromIndex }, row, z)[0];
  return { ...n, pointer: { x, y, down: false }, drag: null, dropTarget: null };
}
function auto(
  s: DeepReadonly<CascadeState>,
  p: "waste" | "tableau",
  i: number,
): [CascadeState, boolean] {
  const q = p === "waste" ? s.waste : s.tableau[i],
    c = q[q.length - 1];
  if (!c) return [s as CascadeState, false];
  const f = s.foundations.findIndex((x) => fAccept(x, [c]));
  if (f < 0) return [s as CascadeState, false];
  const n = move(s, { pile: p, index: i }, q.length - 1, {
    pile: "foundation",
    index: f,
  })[0];
  return [n, true];
}
function vx() {
  return (
    (C.LAUNCH_VX_MIN + Math.random() * (C.LAUNCH_VX_MAX - C.LAUNCH_VX_MIN)) *
    (Math.random() < 0.5 ? -1 : 1)
  );
}
function advance(s: CascadeState, dt: number): CascadeState {
  let n = { ...s, simTime: s.simTime + dt } as CascadeState;
  let fs = n.flyers
    .map((f) => {
      let vy = f.vy + C.GRAVITY * dt,
        y = f.y + vy * dt;
      if (y >= C.FLOOR_Y && vy > 0) {
        y = C.FLOOR_Y;
        vy = -vy * C.BOUNCE_DAMP;
      }
      return { ...f, x: f.x + f.vx * dt, y, vy };
    })
    .filter((f) => f.x + 100 >= 0 && f.x <= C.STAGE_W);
  n = { ...n, flyers: fs };
  if (n.screen === "won" && n.launching) {
    let clock = n.launchClock + dt,
      launched = n.launched;
    const found = n.foundations.map((p) => [...p]);
    while (clock >= C.LAUNCH_INTERVAL && launched < 52) {
      clock -= C.LAUNCH_INTERVAL;
      const i = launched % 4;
      if (!found[i].length) {
        launched++;
        continue;
      }
      const c = found[i].pop()!;
      fs = [
        ...fs,
        {
          id: c.id,
          suit: c.suit,
          rank: c.rank,
          x: C.FOUNDATION_X[i],
          y: C.TOP_ROW_Y,
          vx: vx(),
          vy: C.LAUNCH_VY,
        },
      ];
      launched++;
    }
    n = {
      ...n,
      foundations: found,
      flyers: fs,
      launched,
      launchClock: clock,
      cascadeDone: launched === 52 && !fs.length,
    };
  }
  return n;
}
function debugApi(init: InitApi<CascadeState>): CascadeDebugApi {
  const snap = (s: DeepReadonly<CascadeState>): CascadeSnapshot => {
    const c = (x: CardState) => ({ ...x, color: clr(x.suit) });
    return {
      version: C.CASCADE_DEBUG_VERSION,
      screen: s.screen,
      menuIndex: s.menuIndex,
      titleIndex: s.titleIndex,
      dealMode: C.DEAL_MODE,
      turnCount: C.TURN_COUNT,
      dealModeLabel: C.DEAL_MODE_LABEL,
      muted: s.muted,
      autoFlip: s.autoFlip,
      winDetect: s.winDetect,
      launching: s.launching,
      trailPainting: s.trailPainting,
      stock: s.stock.map(c),
      waste: s.waste.map(c),
      wasteSets: [...s.wasteSets],
      wasteVisibleCount: s.wasteSets[s.wasteSets.length - 1] || 0,
      foundations: s.foundations.map((p) => p.map(c)),
      tableau: s.tableau.map((p) => p.map(c)),
      drag: s.drag,
      dropTarget: s.dropTarget,
      pointer: s.pointer,
      lastPress: s.lastPress,
      launchClock: s.launchClock,
      launched: s.launched,
      flyers: [...s.flyers],
      cascadeDone: s.cascadeDone,
      trailStamps: s.trailStamps,
      simTime: s.simTime,
    };
  };
  const pile = (
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
    fn: (a: readonly CardState[]) => readonly CardState[],
  ) => {
    check(p, i);
    return put(s, { pile: p, index: i }, fn(val(s, { pile: p, index: i })));
  };
  const find = (s: DeepReadonly<CascadeState>, id: number): Ref => {
    for (const p of ["stock", "waste"] as const)
      if (s[p].some((c) => c.id === id)) return { pile: p, index: 0 };
    for (let i = 0; i < 4; i++)
      if (s.foundations[i].some((c) => c.id === id))
        return { pile: "foundation", index: i };
    for (let i = 0; i < 7; i++)
      if (s.tableau[i].some((c) => c.id === id))
        return { pile: "tableau", index: i };
    throw new Error(`unknown card ${id}`);
  };
  void init;
  return {
    version: C.CASCADE_DEBUG_VERSION,
    reset: (s) => blank(s.muted),
    snapshot: snap,
    reconcile: (s) => s as CascadeState,
    menuItemRect: (s, i) => rect(s.screen, i),
    setScreen: (s, v) => ({ ...s, screen: v }),
    setMenuIndex: (s, v) => ({ ...s, menuIndex: v }),
    setTitleIndex: (s, v) => ({ ...s, titleIndex: v }),
    addCard: (s, p, i, u, r, f) =>
      pile({ ...s, nextId: s.nextId + 1 }, p, i, (a) => [
        ...a,
        { id: s.nextId, suit: u, rank: r, faceUp: f },
      ]),
    removeCard: (s, id) => {
      const r = find(s, id);
      return pile(s, r.pile, r.index, (a) => a.filter((c) => c.id !== id));
    },
    setCardFaceUp: (s, id, f) => {
      const r = find(s, id);
      return pile(s, r.pile, r.index, (a) =>
        a.map((c) => (c.id === id ? { ...c, faceUp: f } : c)),
      );
    },
    clearPile: (s, p, i) =>
      pile(
        { ...s, ...(p === "waste" ? { wasteSets: [] } : {}) },
        p,
        i,
        () => [],
      ),
    clearTable: (s) => ({
      ...s,
      stock: [],
      waste: [],
      wasteSets: [],
      foundations: [[], [], [], []],
      tableau: piles(),
      drag: null,
      dropTarget: null,
    }),
    addWasteSet: (s, n) => {
      if (!Number.isInteger(n) || n < 0)
        throw new RangeError(`invalid count ${n}`);
      return { ...s, wasteSets: [...s.wasteSets, n] };
    },
    clearWasteSets: (s) => ({ ...s, wasteSets: [] }),
    deal: (s) => deal(s),
    turnStock: (s) => turn(s),
    move: (s, a, i, r, b, j) =>
      move(s, { pile: a, index: i }, r, { pile: b, index: j }),
    autoMove: (s, p, i) =>
      p === "waste" || p === "tableau"
        ? auto(s, p, i)
        : [s as CascadeState, false],
    pointerDown: press,
    pointerMove: movePointer,
    pointerUp: release,
    setAutoFlip: (s, v) => ({ ...s, autoFlip: v }),
    setWinDetect: (s, v) => ({ ...s, winDetect: v }),
    setLaunching: (s, v) => ({ ...s, launching: v }),
    setTrailPainting: (s, v) => ({ ...s, trailPainting: v }),
    addFlyer: (s, u, r, x, y, vx0, vy) => ({
      ...s,
      nextId: s.nextId + 1,
      flyers: [
        ...s.flyers,
        { id: s.nextId, suit: u, rank: r, x, y, vx: vx0, vy },
      ],
    }),
    setFlyerPosition: (s, id, x, y) => ({
      ...s,
      flyers: s.flyers.map((f) => (f.id === id ? { ...f, x, y } : f)),
    }),
    setFlyerVelocity: (s, id, vx0, vy) => ({
      ...s,
      flyers: s.flyers.map((f) => (f.id === id ? { ...f, vx: vx0, vy } : f)),
    }),
    removeFlyer: (s, id) => ({
      ...s,
      flyers: s.flyers.filter((f) => f.id !== id),
    }),
    clearFlyers: (s) => ({ ...s, flyers: [] }),
    setLaunchClock: (s, n) => ({ ...s, launchClock: n }),
    clearTrail: (s) => ({ ...s, trailStamps: 0 }),
    drawLaunchVx: () => vx(),
  };
}
function drawCard(
  ctx: CanvasRenderingContext2D,
  c: CardState,
  x: number,
  y: number,
) {
  ctx.fillStyle = c.faceUp ? "#f8f3e8" : "#174f61";
  ctx.strokeStyle = c.faceUp ? "#d8c8a8" : "#67c4c2";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, 100, 140, 10);
  ctx.fill();
  ctx.stroke();
  if (!c.faceUp) {
    ctx.fillStyle = "#8ee1d6";
    ctx.font = "46px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("✦", x + 50, y + 82);
    return;
  }
  const sym = { hearts: "♥", diamonds: "♦", spades: "♠", clubs: "♣" }[c.suit];
  const r =
    c.rank === 1
      ? "A"
      : c.rank === 11
        ? "J"
        : c.rank === 12
          ? "Q"
          : c.rank === 13
            ? "K"
            : String(c.rank);
  ctx.fillStyle = red(c.suit) ? "#bd3f4d" : "#142b3b";
  ctx.font = "bold 25px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(r, x + 10, y + 29);
  ctx.font = "23px Georgia";
  ctx.fillText(sym, x + 10, y + 53);
  ctx.font = "58px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(sym, x + 50, y + 91);
}
function text(
  ctx: CanvasRenderingContext2D,
  t: string,
  x: number,
  y: number,
  size: number,
  col = "#eaf5e1",
) {
  ctx.fillStyle = col;
  ctx.font = `${size}px Trebuchet MS,sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(t, x, y);
}
function table(s: DeepReadonly<CascadeState>, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
  for (let i = 0; i < 4; i++)
    if (s.foundations[i].length)
      drawCard(
        ctx,
        s.foundations[i][s.foundations[i].length - 1],
        C.FOUNDATION_X[i],
        24,
      );
  if (s.stock.length) drawCard(ctx, s.stock[s.stock.length - 1], 224, 24);
  if (s.waste.length && s.wasteSets.length)
    drawCard(ctx, s.waste[s.waste.length - 1], 346, 24);
  for (let i = 0; i < 7; i++) {
    let y = 180;
    for (const c of s.tableau[i]) {
      drawCard(ctx, c, C.COLUMN_X[i], y);
      y += c.faceUp ? 34 : 24;
    }
  }
  for (const f of s.flyers) drawCard(ctx, { ...f, faceUp: true }, f.x, f.y);
  ctx.fillStyle = "#071217";
  ctx.fillRect(0, C.HUD_Y, C.STAGE_W, 40);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = s.menuIndex === i ? "#e3c56f" : "#2b655f";
    ctx.fillRect(24 + i * 132, C.HUD_Y + 4, 116, 28);
    text(
      ctx,
      C.HUD_ITEMS[i],
      82 + i * 132,
      C.HUD_Y + 24,
      14,
      s.menuIndex === i ? "#173c36" : "#fff",
    );
  }
  text(ctx, C.DEAL_MODE_LABEL, 1190, 704, 15, "#d9cb86");
}
export const game: Game<CascadeState, CascadeDebugApi> = {
  initialize(api: InitApi<CascadeState>) {
    for (const [n, k] of Object.entries(C.MENU_BINDINGS))
      api.input.register(n, { keys: [...k] });
    for (const [n, f] of Object.entries(C.CUES))
      api.audio.define(f, {
        freq: 300 + Object.keys(C.CUES).indexOf(n) * 50,
        durationMs: 80,
        gain: 0.12,
      });
    api.diagnostics.register("screen", (s) => `${s.screen} · ${C.DEAL_MODE}`);
    api.diagnostics.register(
      "piles",
      (s) =>
        `stock ${s.stock.length} waste ${s.waste.length} foundations ${s.foundations.map((p) => p.length).join("/")}`,
    );
    api.diagnostics.register(
      "columns",
      (s) => `columns ${s.tableau.map((p) => p.length).join("/")}`,
    );
    api.diagnostics.register(
      "hand",
      (s) => `hand ${s.drag?.cards.length ?? 0}`,
    );
    api.diagnostics.register(
      "cascade",
      (s) => `cascade ${s.launched}/52 · flight ${s.flyers.length}`,
    );
    return [blank(), debugApi(api)];
  },
  update(s: DeepReadonly<CascadeState>, api: UpdateApi, dt: number) {
    let n = { ...s, muted: api.audio.muted() } as CascadeState;
    for (const p of api.input.pointerSamples())
      n =
        p.type === "down"
          ? press(n, p.x, p.y)
          : p.type === "move"
            ? movePointer(n, p.x, p.y)
            : release(n, p.x, p.y);
    if (api.input.pressed(C.MENU_UP))
      n = {
        ...n,
        menuIndex: n.menuIndex
          ? n.menuIndex - 1
          : n.screen === "playing"
            ? 2
            : n.screen === "title"
              ? 1
              : 0,
      };
    else if (api.input.pressed(C.MENU_DOWN))
      n = {
        ...n,
        menuIndex:
          n.menuIndex <
          (n.screen === "playing" ? 2 : n.screen === "title" ? 1 : 0)
            ? n.menuIndex + 1
            : 0,
      };
    else if (api.input.pressed(C.MENU_CONFIRM)) {
      if (n.screen === "title")
        n =
          n.menuIndex === 0
            ? deal({ ...n, titleIndex: 0 })
            : { ...n, screen: "howto", titleIndex: 1, menuIndex: 0 };
      else if (n.screen === "howto")
        n = { ...n, screen: "title", menuIndex: n.titleIndex };
      else if (n.menuIndex === 0) n = deal(n);
      else if (n.menuIndex === 1)
        n = { ...n, screen: "title", menuIndex: n.titleIndex };
      else {
        api.audio.setMuted(!api.audio.muted());
        n = { ...n, muted: api.audio.muted() };
      }
    } else if (api.input.pressed(C.MENU_BACK) && n.screen === "howto")
      n = { ...n, screen: "title", menuIndex: n.titleIndex };
    return advance(n, dt);
  },
  render(s: DeepReadonly<CascadeState>, api: RenderApi) {
    const ctx = api.ctx;
    if (s.screen === "playing" || s.screen === "won") table(s, ctx);
    else {
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, C.STAGE_W, C.STAGE_H);
      text(ctx, C.TITLE_TEXT, 640, 190, 78, "#f4d98a");
      text(ctx, C.TAGLINE_TEXT, 640, 230, 18);
      if (s.screen === "howto") {
        text(ctx, "ACE · KING · STOCK · DOUBLE-CLICK", 640, 350, 24);
        text(ctx, C.HOWTO_BACK_LABEL, 640, 600, 22, "#f4d98a");
      } else {
        for (let i = 0; i < 2; i++)
          text(
            ctx,
            C.TITLE_ITEMS[i],
            640,
            420 + i * 64,
            22,
            s.menuIndex === i ? "#f4d98a" : "#a8d4c4",
          );
      }
    }
    if (s.screen === "won") text(ctx, C.WIN_TEXT, 640, 350, 80, "#f4d98a");
  },
};
