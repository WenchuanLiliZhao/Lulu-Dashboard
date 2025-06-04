import { BrowserRouter, Route, Routes } from "react-router"
import type { PageShape } from "./object-shapes/Page"
import { Pages } from "./pages/_pages"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={Pages.Home.content} />

        {Object.values(Pages).map((page: PageShape, i: number) => {
          return (
            <Route key={i} path={`/${page.info.slug}`} element={page.content} />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
