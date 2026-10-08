// STAGING MOCK DATA — Replace with:
// supabase.from('subjects').select('*')

export const SUBJECTS = [
  {
    id: 'math',
    name: 'Математика',
    nameEn: 'Mathematics',
    emoji: '📐',
    levels: [
      'основно_6', 'основно_7', 'основно_8', 'основно_9',
      'средно_1', 'средно_2', 'средно_3', 'средно_4',
    ],
  },
  {
    id: 'physics',
    name: 'Физика',
    nameEn: 'Physics',
    emoji: '⚡',
    levels: ['средно_1', 'средно_2', 'средно_3', 'средно_4'],
  },
  {
    id: 'chemistry',
    name: 'Хемија',
    nameEn: 'Chemistry',
    emoji: '🧪',
    levels: ['основно_8', 'основно_9', 'средно_1', 'средно_2', 'средно_3', 'средно_4'],
  },
  {
    id: 'biology',
    name: 'Биологија',
    nameEn: 'Biology',
    emoji: '🌿',
    levels: ['основно_6', 'основно_7', 'основно_8', 'основно_9', 'средно_1', 'средно_2'],
  },
  {
    id: 'english',
    name: 'Англиски јазик',
    nameEn: 'English Language',
    emoji: '🌍',
    levels: [
      'основно_6', 'основно_7', 'основно_8', 'основно_9',
      'средно_1', 'средно_2', 'средно_3', 'средно_4',
    ],
  },
  {
    id: 'macedonian',
    name: 'Македонски јазик',
    nameEn: 'Macedonian Language',
    emoji: '📚',
    levels: ['основно_6', 'основно_7', 'основно_8', 'основно_9'],
  },
  {
    id: 'informatics',
    name: 'Информатика',
    nameEn: 'Informatics',
    emoji: '💻',
    levels: [
      'основно_7', 'основно_8', 'основно_9',
      'средно_1', 'средно_2', 'средно_3', 'средно_4',
    ],
  },
  {
    id: 'geography',
    name: 'Географија',
    nameEn: 'Geography',
    emoji: '🗺️',
    levels: ['основно_6', 'основно_7', 'основно_8', 'основно_9', 'средно_1', 'средно_2'],
  },
]

export function getSubjectById(id) {
  return SUBJECTS.find((s) => s.id === id)
}
