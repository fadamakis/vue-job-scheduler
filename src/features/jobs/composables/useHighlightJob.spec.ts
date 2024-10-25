import { describe, it, expect } from "vitest";
import { useHighlightJob } from "./useHighlightJob";

describe("useHighlightJob", () => {
  it("should initialize with null as highlightedJob", () => {
    const { highlightedJob } = useHighlightJob();
    expect(highlightedJob.value).toBe(null);
  });

  it("should update highlightedJob with a string", () => {
    const { highlightTask, highlightedJob } = useHighlightJob();

    highlightTask("JobA");
    expect(highlightedJob.value).toBe("JobA");
  });

  it("should set highlightedJob to null when passed null", () => {
    const { highlightTask, highlightedJob } = useHighlightJob();

    highlightTask("JobA");
    expect(highlightedJob.value).toBe("JobA");
    highlightTask(null);
    expect(highlightedJob.value).toBe(null);
  });

  it("should set highlightedJob to null when passed undefined", () => {
    const { highlightTask, highlightedJob } = useHighlightJob();

    highlightTask("JobA");
    expect(highlightedJob.value).toBe("JobA");
    highlightTask(undefined);
    expect(highlightedJob.value).toBe(null);
  });
});
