import { Types } from 'mongoose'

export function isIdValid(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    return false
  }

  return true
}
