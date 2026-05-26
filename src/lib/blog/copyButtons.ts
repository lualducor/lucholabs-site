export function initCopyButtons(container: HTMLElement): () => void {
  const wrappers: HTMLDivElement[] = []

  container.querySelectorAll('pre').forEach(pre => {
    const wrapper = document.createElement('div')
    wrapper.className = 'code-block'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.textContent = 'Copy'
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.textContent ?? '').catch(() => {})
      btn.textContent = 'Copied'
      setTimeout(() => { btn.textContent = 'Copy' }, 1500)
    })
    wrapper.appendChild(btn)
    wrappers.push(wrapper)
  })

  return () => {
    wrappers.forEach(wrapper => {
      const pre = wrapper.querySelector('pre')
      if (pre) wrapper.parentNode?.insertBefore(pre, wrapper)
      wrapper.remove()
    })
  }
}
