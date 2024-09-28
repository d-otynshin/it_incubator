// import {VideoDBType} from './video-db-type'

export type DBType = {
  videos: any[] // VideoDBType[]
  // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
  videos: [],
  // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
    db.videos = []
    // db.some = []
    return
  }

  db.videos = dataset.videos || db.videos
  // db.some = dataset.some || db.some
}
