export const statusOptions = [
  '응답없음',
  '',
  '서류지원',
  '서류합격',
  '서류불합격',
  '',
  '과제테스트',
  '과제테스트합격',
  '과제테스트불합격',
  '',
  '면접합격',
  '면접불합격',
  '',
  '최종합격',
  '최종불합격'
]

export const statusColorOption = (status: string) => {
  if (status.includes('불합격')) return 'warning'
  if (status.includes('합격')) return 'success'

  return 'primary'
}
