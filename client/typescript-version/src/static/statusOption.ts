export const statusOptions = [
  '응답없음',
  '',
  '서류지원',
  '서류합격',
  '서류 + 코테합격',
  '서류불합격',
  '서류 + 코테불합격',
  '',
  '코딩테스트합격',
  '코딩테스트불합격',
  '',
  '과제테스트합격',
  '과제테스트불합격',
  '',
  '테스트합격',
  '테스트불합격',
  '',
  '1차면접합격',
  '1차면접불합격',
  '',
  '2차면접',
  '2차면접합격',
  '2차면접불합격',
  '',
  '최종면접합격',
  '최종면접불합격',
  '',
  '최종합격',
  '최종불합격'
]

export const statusColorOption = (status: string) => {
  if (status.includes('불합격')) return 'warning'
  if (status.includes('합격')) return 'success'
  if (status.includes('응답없음')) return 'default'

  return 'primary'
}
