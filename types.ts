export type QuizCategory = 'vehicle' | 'signs' | 'rules' | 'accidents';

export interface QuizQuestion {
  question_number: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_answer_key: 'a' | 'b' | 'c' | 'd';
  correct_answer_text: string;
  visual_required: 'Yego' | 'Oya';
  visual_description: string;
  category: QuizCategory;
}
