import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

export { profilePageSchema } from './lib/jsonld'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
