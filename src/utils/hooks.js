import { useState, useRef, useEffect } from 'react'

/**
 * 
 * @param {{x: number, y: number}} initialPosition 
 * @param {function} onWidgetMove - a function that should be called when the widget's position is being moved
 * @returns {position, handleMouseDown} - position returns the current mouse pos, the handleMouseDown should receive mouse event from your component
 */
export const useMovable = (initialPosition = { x: 10, y: 10 }, onWidgetMove) => {
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

        if (onWidgetMove)
            onWidgetMove({x: e.clientX - offset.current.x, 
                            y: e.clientY - offset.current.y})
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

