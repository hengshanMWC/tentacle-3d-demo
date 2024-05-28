export function createIframe() {
  // Create the iframe element
  const iframe = document.createElement('iframe');

  // Set the src attribute
  iframe.src = import.meta.env.VITE_IFRAME_PATH;

  // Set the style attributes
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.position = 'absolute';
  iframe.style.border = 'none';
  iframe.style.filter = 'blur(2px)';
  iframe.style.opacity = 0
  document.body.appendChild(iframe)
  return iframe
}

export function getAbsolutePosition(element) {
  const rect = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const position = {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
  };
  return position;
} 

export function getElementSize(element) {
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  return { width, height };
}