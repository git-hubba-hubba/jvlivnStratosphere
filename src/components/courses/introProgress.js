export function reviewedTopics(course, progress = {}) {
  return course.syllabusDesc.filter(title => progress.reviewedConcepts?.includes(title));
}

export function demoComplete(course, progress = {}) {
  return reviewedTopics(course, progress).length === course.syllabusDesc.length &&
    course.demo.lessons.every((_, index) => progress.passed?.includes(index));
}

export function normalizeDemoProgress(course, saved = {}) {
  if (!saved || typeof saved !== 'object') saved = {};
  const lessonCount = course.demo.lessons.length;
  return {
    passed: Array.isArray(saved.passed) ? [...new Set(saved.passed.filter(index => Number.isInteger(index) && index >= 0 && index < lessonCount))] : [],
    lesson: Number.isInteger(saved.lesson) && saved.lesson >= 0 && saved.lesson < lessonCount ? saved.lesson : 0,
    notes: saved.notes && typeof saved.notes === 'object' ? saved.notes : {},
    lab: saved.lab && typeof saved.lab === 'object' ? saved.lab : {},
    reviewedConcepts: Array.isArray(saved.reviewedConcepts) ? course.syllabusDesc.filter(title => saved.reviewedConcepts.includes(title)) : [],
    concept: Number.isInteger(saved.concept) && saved.concept >= 0 && saved.concept < course.syllabusDesc.length ? saved.concept : 0,
    conceptNotes: saved.conceptNotes && typeof saved.conceptNotes === 'object' ? saved.conceptNotes : {},
  };
}
