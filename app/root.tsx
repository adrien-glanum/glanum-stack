import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import { getUser } from "~/domains/auth/utils/session.server"
import stylesheet from "~/tailwind.css"
import { useIsBot } from "~/hooks/use-is-bot"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) })
}

export default function App() {
  const isBot = useIsBot()
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        {isBot ? null : <Scripts />}
        <LiveReload />
      </body>
    </html>
  )
}
