import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

type Props = { onSelectedFile: Function }

export default function DropZone(props: Props) {

    const [selectedFile, setSelectedFile] = useState<string>('')

    const onDrop = useCallback(acceptedFiles => {
        const [file] = acceptedFiles
        const fileUrl = URL.createObjectURL(file)
        setSelectedFile(fileUrl)
        props.onSelectedFile(file)
    }, [props.onSelectedFile])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            { selectedFile
                ? <img src={selectedFile} />
                : isDragActive
                    ? <p>Solte a imagem aqui...</p>
                    : <p> <FiUpload /> Imagem do Estabelecimento </p>
            }
        </div>
    )
}
