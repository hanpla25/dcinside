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

export function formatDateTime(datetime) {
  const date = new Date(datetime);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const isThisYear = date.getFullYear() === now.getFullYear();

  const timeString = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (isToday) {
    return timeString;
  } else {
    const options = isThisYear
      ? { month: "2-digit", day: "2-digit" }
      : { year: "numeric", month: "2-digit", day: "2-digit" };

    const dateString = date.toLocaleDateString([], options);
    return `${dateString} ${timeString}`;
  }
}


