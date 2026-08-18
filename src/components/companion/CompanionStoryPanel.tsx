"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PASSPORT_FIELD_LIMITS } from "@/lib/passport-form";

const STORY_PROMPTS = [
  "How did you meet?",
  "What are they like?",
  "What makes them special?",
  "A memory you never want to forget",
] as const;

type CompanionStoryPanelProps = {
  companionId: string;
  companionName: string;
  initialStory: string;
  canEdit: boolean;
};

function StoryParagraphs({ text }: { text: string }) {
  return text
    .trim()
    .split(/\n\n+/)
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

export function CompanionStoryPanel({
  companionId,
  companionName,
  initialStory,
  canEdit,
}: CompanionStoryPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [story, setStory] = useState(initialStory);
  const [draft, setDraft] = useState(initialStory);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStory(initialStory);
    setDraft(initialStory);
  }, [initialStory]);

  useEffect(() => {
    if (searchParams.get("editStory") === "1" && canEdit) {
      setIsEditing(true);
    }
  }, [canEdit, searchParams]);

  function clearEditStoryParam() {
    if (searchParams.get("editStory") !== "1") {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("editStory");
    const query = nextParams.toString();
    router.replace(
      `/companion/${encodeURIComponent(companionId)}${query ? `?${query}` : ""}`,
      { scroll: false },
    );
  }

  function handleStartEditing() {
    setDraft(story);
    setError(null);
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setDraft(story);
    setError(null);
    setIsEditing(false);
    clearEditStoryParam();
  }

  async function handleSaveStory() {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/companion/${encodeURIComponent(companionId)}/story`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ story: draft }),
        },
      );

      const payload = (await response.json()) as {
        error?: string;
        story?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Could not save story.");
      }

      const savedStory = typeof payload.story === "string" ? payload.story : draft.trim();
      setStory(savedStory);
      setDraft(savedStory);
      setIsEditing(false);
      clearEditStoryParam();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : "Could not save story.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }

  const hasStory = Boolean(story.trim());

  return (
    <section className="companion-archive__narrative" aria-labelledby="companion-story-title">
      <div className="companion-archive__container">
        <div className="companion-archive__narrative-inner">
          <div className="companion-archive__story-header">
            <h2 id="companion-story-title" className="companion-archive__section-title">
              Their Story
            </h2>
            {canEdit && !isEditing && hasStory ? (
              <button
                type="button"
                onClick={handleStartEditing}
                className="companion-archive__story-action"
              >
                Edit story
              </button>
            ) : null}
          </div>

          {isEditing ? (
            <div className="companion-archive__story-editor">
              <p className="companion-archive__story-editor-lead">
                Tell the story of how your lives came together, what makes{" "}
                {companionName} special, or a memory you never want to forget.
              </p>

              <ul className="companion-archive__story-prompts" aria-label="Optional prompts">
                {STORY_PROMPTS.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>

              <label className="companion-archive__story-field">
                <span className="sr-only">Their story</span>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={PASSPORT_FIELD_LIMITS.story}
                  rows={8}
                  placeholder="Write freely — nothing here is required."
                  className="companion-archive__story-textarea"
                />
              </label>

              {error ? (
                <p className="companion-archive__story-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="companion-archive__story-editor-actions">
                <button
                  type="button"
                  onClick={handleSaveStory}
                  disabled={isSaving}
                  className="companion-archive__story-save"
                >
                  {isSaving ? "Saving…" : "Save story"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  disabled={isSaving}
                  className="companion-archive__story-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="companion-archive__narrative-body">
              {hasStory ? (
                <StoryParagraphs text={story} />
              ) : (
                <>
                  <p className="companion-archive__story-status">No story added yet.</p>
                  <p className="companion-archive__narrative-placeholder">
                    Tell the story of how your lives came together, what makes them
                    special, or a memory you never want to forget.
                  </p>
                  {canEdit ? (
                    <button
                      type="button"
                      onClick={handleStartEditing}
                      className="companion-archive__story-action companion-archive__story-action--inline"
                    >
                      Add their story
                    </button>
                  ) : null}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
