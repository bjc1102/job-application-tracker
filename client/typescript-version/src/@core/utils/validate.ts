import { Application } from 'src/types/Application'

function isValidUrl(url: string): boolean {
  // URL 유효성을 검사하는 정규 표현식
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  return urlPattern.test(url)
}

export const validateApplication = (application: Application) => {
  const errors: Partial<Application> = {}

  if (!application.link) errors.link = '채용 공고 링크는 필수 항목입니다.'
  else if (!isValidUrl(application.link)) errors.link = '유효한 URL 형식이 아닙니다.'

  if (!application.title) errors.title = '공고명은 필수 항목입니다.'
  if (!application.platform) errors.platform = '플랫폼은 필수 항목입니다.'

  //0이면 false
  return { isError: Object.keys(errors).length !== 0, error: errors }
}

export const validateURL = (url: string) => {
  if (!url) return '채용 공고 링크는 필수 항목입니다.'
  else if (!isValidUrl(url)) return '유효한 URL 형식이 아닙니다.'

  return ''
}
