import { getImageServicesUrl } from "./getImageBucket"

export const transformServices = async (data: any) => {
  return await Promise.all(
    data.map(async (path: any) => {
      const newImageUrl1 = await getImageServicesUrl(path?.image);
      const newImageUrl2 = await getImageServicesUrl(path?.image2);

      path.image = newImageUrl1;
      path.image2 = newImageUrl2;

      return path;
    })
  );
}
