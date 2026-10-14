import { describe, expect, it } from "vitest";
import { game, type CascadeDebugApi, type CascadeState } from "./game";

function initialized(): [CascadeState, CascadeDebugApi] {
  const diagnostics = { register: () => undefined };
  const input = { register: () => undefined };
  const audio = { define: () => undefined, muted: () => false };
  return game.initialize({ input, audio, diagnostics } as never) as [
    CascadeState,
    CascadeDebugApi,
  ];
}

describe("Cascade state", () => {
  it("starts on the title screen with an empty table", () => {
    const [state, debug] = initialized();
    const snapshot = debug.snapshot(state);
    expect(snapshot.screen).toBe("title");
    expect(snapshot.tableau).toHaveLength(7);
    expect(snapshot.stock).toHaveLength(0);
  });

  it("poses cards without mutating the previous state", () => {
    const [state, debug] = initialized();
    const next = debug.addCard(state, "tableau", 0, "hearts", 13, true);
    expect(state.tableau[0]).toHaveLength(0);
    expect(next.tableau[0][0].rank).toBe(13);
  });
});
