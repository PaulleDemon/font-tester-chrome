import { useState, useRef, useEffect } from 'react'

export const useMovable = (initialPosition = { x: 10, y: 10 }) => {
    const [position, setPosition] = useState(initialPosition)
    const [isDragging, setIsDragging] = useState(false)
    const offset = useRef({ x: 0, y: 0 })

    const handleMouseDown = (e) => {
        setIsDragging(true)
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        })
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging])

    return {
        position,
        handleMouseDown,
    }
}

