export const geofenceIsActive = (data: any) => {
  const pattern = /^(\s*\d+\.\d+\s*,-\s*\d+\.\d+\s*,){2,}\s*\d+\.\d+\s*,-\s*\d+\.\d+\s*$/

  if (/\s/.test(data.geofence.toString())) {
    throw new Error('La geocerca no puede contener espacios')
  }

  if (pattern.test(data.geofence.toString())) {
    data.isActive = 'Activo'
  } else {
    data.isActive = 'Inactivo'
  }
}
