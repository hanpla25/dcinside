export function createTouchSwipeHandlers({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}) {
  const isTouchingRef = { current: false };
  const startXRef = { current: 0 };
  const dragOffsetRef = { current: 0 };

  const handleTouchStart = (e) => {
    isTouchingRef.current = true;
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isTouchingRef.current) return;
    const currentX = e.touches[0].clientX;
    dragOffsetRef.current = currentX - startXRef.current;
  };

  const handleTouchEnd = () => {
    if (!isTouchingRef.current) return;

    const offset = dragOffsetRef.current;
    if (offset < -threshold) {
      onSwipeLeft?.();
    } else if (offset > threshold) {
      onSwipeRight?.();
    }

    isTouchingRef.current = false;
    dragOffsetRef.current = 0;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
}
