import { getImageUrl } from './getImageBucket'

export const transformProducts = async (data: any) => {
  return await Promise.all(
    data.map(async (path: any) => {
      const newImageUrl = await getImageUrl(path?.image)
      path.image = newImageUrl
      return path
    })
  )
}
