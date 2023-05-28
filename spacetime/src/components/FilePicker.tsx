'use client'

import { ChangeEvent, useState } from 'react'

export function FilePicker() {
  const [preview, setPreview] = useState<string | null>()

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return false
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        onChange={onFileSelected}
        id="media"
        accept="*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
