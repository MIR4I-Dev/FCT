import { BUTTONS, EVENTS } from '../utils/consts.js'

export function navigate (href) {
  // pushState cambia la URL sin recargar la página
  window.history.pushState({}, '', href)
  // Disparamos un evento para que el Router se entere de que la URL ha cambiado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  // Disparamos el evento en window para que el Router lo pueda capturar
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary // ¿Se ha hecho click primario?
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // ¿Se ha usado alguna tecla modificadora?
    const isManageableEvent = target === undefined || target === '_self' // ¿Se ha usado un target por defecto o _self?

    // Si se ha hecho click primario, no se ha usado ninguna tecla modificadora y el target es por defecto o _self
    // Si el target no es self por pulsar una tecla modificadora, se abre en una nueva pestaña
    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // navegación con SPA
      window.scrollTo(0, 0)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
