export const downloadQrCode = (svgId: string, filename: string): void => {
  try {
    const svgElement = document.getElementById(svgId) as SVGSVGElement | null

    if (!svgElement || svgElement.tagName !== 'svg') {
      throw new Error(`¡Ocurrió un error al obtener el elemento SVG con el ID: ${svgId}`)
    }

    const svgData = new XMLSerializer().serializeToString(svgElement)

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })

    const url = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement('a')
    downloadLink.download = `${filename}.svg`
    downloadLink.href = url

    document.body.appendChild(downloadLink)
    downloadLink.click()

    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al descargar QR:', error)
    throw error
  }
}
