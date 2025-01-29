import React from "react"
import { Link } from "react-router-dom"

function Header(){
    return <header className="app-heading no-highlight">
    <h1>
    <Link to="/">NoteWall</Link>
    </h1>
    </header>
}
export default Header