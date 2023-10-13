export const geofenceIsActive = (data: any) => {
  const pattern = /^(\s*\d+\.\d+\s*,-\s*\d+\.\d+\s*,){2,}\s*\d+\.\d+\s*,-\s*\d+\.\d+\s*$/

  data.geofence = data.geofence.replace(/\s+/g, '')

  // Divide la geocerca en pares de coordenadas
  const coordinates = data.geofence.split(',')

  // Verifica si hay al menos 6 pares de coordenadas
  if (coordinates.length < 6) {
    throw new Error('debe ingresar al menos 3 pares de coordenadas (lat y lng) en la geocerca')
  }

  if (pattern.test(data.geofence.toString())) {
    data.isActive = 'Activo'
  } else {
    data.isActive = 'Inactivo'
  }
}
