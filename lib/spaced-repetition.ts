export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export type ReviewState = {
  intervalDays: number;
  easeFactor: number;
  reviewCount: number;
  lapseCount: number;
};

export function scheduleReview(state: ReviewState, rating: ReviewRating) {
  let intervalDays = state.intervalDays;
  let easeFactor = state.easeFactor || 2.5;
  let lapseCount = state.lapseCount;

  if (rating === 'again') {
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    lapseCount += 1;
  } else if (rating === 'hard') {
    intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === 'good') {
    intervalDays =
      state.reviewCount === 0
        ? 1
        : state.reviewCount === 1
          ? 3
          : Math.max(1, Math.round(intervalDays * easeFactor));
  } else {
    intervalDays =
      state.reviewCount === 0
        ? 4
        : Math.max(4, Math.round((intervalDays || 1) * easeFactor * 1.3));
    easeFactor = Math.min(3, easeFactor + 0.15);
  }

  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + intervalDays);

  return {
    intervalDays,
    easeFactor,
    reviewCount: state.reviewCount + 1,
    lapseCount,
    dueAt: dueAt.toISOString(),
  };
}
