export type ItemType = 'story' | 'comment' | 'job' | 'poll' | 'pollopt'

export interface Item {
  id: number
  type: ItemType
  by?: string
  time: number
  title?: string
  url?: string
  text?: string
  score?: number
  descendants?: number
  kids?: number[]
  parent?: number
  poll?: number
  parts?: number[]
  deleted?: boolean
  dead?: boolean
}

export interface User {
  id: string
  created: number
  karma: number
  about?: string
  submitted?: number[]
}

export type ListKind = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job'
