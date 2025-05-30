import { BrowserRouter, Route, Routes } from "react-router"
import { pages } from "./assets/pages/_pages"
import type { PageShape } from "./assets/object-shapes/page"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={pages.Home.content} />

        {Object.values(pages).map((page: PageShape, i: number) => {
          return (
            <Route key={i} path={page.info.slug} element={page.content} />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
