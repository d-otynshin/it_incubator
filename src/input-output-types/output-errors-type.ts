export type BlogInputModel = {
  name: string // max 15
  description: string // max 500
  websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$
}

export type PostInputModel = {
  title: string // max 30
  shortDescription: string // max 100
  content: string // max 1000
  blogId: string // valid
}


export type Error = {
  message: string;
  field: string;
}

export type OutputErrorsType = {
  errorsMessages: Error[]
}

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel

