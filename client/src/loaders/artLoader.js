// Loader for individual art page
export async function getIndArt(artId) {
      const res = await fetch(`api/art/${artId}`)
      return res.json()
  }
