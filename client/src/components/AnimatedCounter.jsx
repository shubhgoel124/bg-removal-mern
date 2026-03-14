import { useEffect, useRef, useState } from 'react'

const ANIMATION_DURATION = 800

const AnimatedCounter = ({ value, formatter }) => {
    const [displayValue, setDisplayValue] = useState(value)
    const previousValueRef = useRef(value)
    const rafRef = useRef(null)

    useEffect(() => {
        const startValue = previousValueRef.current
        const endValue = value

        if (startValue === endValue) return

        const startTime = performance.now()
        const diff = endValue - startValue

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1)

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)

            const current = Math.round(startValue + diff * eased)
            setDisplayValue(current)

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate)
            } else {
                previousValueRef.current = endValue
            }
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [value])

    return <>{formatter ? formatter.format(displayValue) : displayValue}</>
}

export default AnimatedCounter
