export function createIframe() {
  // Create the iframe element
  const iframe = document.createElement('iframe');
  const parentElement = document.createElement('div');

  // Set the src attribute
  iframe.src = import.meta.env.VITE_TENTACLE_PATH;

  // Set the style attributes
  iframe.style.width = '700%';
  iframe.style.height = '700%';
  iframe.style.border = 'none';
  iframe.style.filter = 'blur(5px)';
  
  parentElement.style.position = 'absolute';
  parentElement.style.overflow = 'hidden'
  parentElement.style.opacity = 0
  parentElement.style.display = 'flex'
  parentElement.style['justify-content'] = 'center'
  parentElement.style['align-items'] = 'center'

  parentElement.appendChild(iframe)
  document.body.appendChild(parentElement)

  return iframe
}

export function setDomShow (dom, targetDom) {
  const {
    top, 
    left
  } = getAbsolutePosition(targetDom)
  const {
    width, 
    height
  } = getElementSize(targetDom)
  dom.style.top = top + 'px'
  dom.style.left = left + 'px'
  dom.style.width = width + 'px'
  dom.style.height = height + 'px'
  dom.style.opacity = 1
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